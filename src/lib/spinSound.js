/**
 * Classic "whoosh" spin sound, synthesised with the Web Audio API
 * (no audio file, no licensing). Filtered noise is swept rhythmically,
 * once per card passing the front, so it sounds like a turning carousel.
 */
let ctx = null

export function audioContext() {
  if (typeof window === 'undefined') return null
  const AC = window.AudioContext || window.webkitAudioContext
  if (!AC) return null
  if (!ctx) ctx = new AC()
  return ctx
}

export function createSpinSound() {
  const ac = audioContext()
  if (!ac) return null
  // 2s of pink-ish noise, looped
  const len = ac.sampleRate * 2
  const buf = ac.createBuffer(1, len, ac.sampleRate)
  const data = buf.getChannelData(0)
  let last = 0
  for (let i = 0; i < len; i++) {
    const white = Math.random() * 2 - 1
    last = (last + 0.04 * white) / 1.04
    data[i] = last * 3.2
  }
  const noise = ac.createBufferSource()
  noise.buffer = buf
  noise.loop = true

  const band = ac.createBiquadFilter()
  band.type = 'bandpass'
  band.frequency.value = 520
  band.Q.value = 0.9

  // rhythmic swell: an LFO drives both filter sweep and loudness
  const lfo = ac.createOscillator()
  lfo.type = 'sine'
  lfo.frequency.value = 3
  const lfoToFreq = ac.createGain()
  lfoToFreq.gain.value = 320
  const pulse = ac.createGain()
  pulse.gain.value = 0.55
  const lfoToGain = ac.createGain()
  lfoToGain.gain.value = 0.45

  const master = ac.createGain()
  master.gain.value = 0

  lfo.connect(lfoToFreq).connect(band.frequency)
  lfo.connect(lfoToGain).connect(pulse.gain)
  noise.connect(band).connect(pulse).connect(master).connect(ac.destination)
  noise.start()
  lfo.start()

  const ramp = (param, v, t) => {
    const now = ac.currentTime
    param.cancelScheduledValues(now)
    param.setValueAtTime(param.value, now)
    param.linearRampToValueAtTime(v, now + t)
  }

  return {
    /** degrees per second of the ring -> passes per second */
    setSpeed(degPerSec, cards = 8) {
      const rate = Math.max(0.3, Math.abs(degPerSec) / (360 / cards))
      ramp(lfo.frequency, Math.min(rate, 9), 0.2)
    },
    fadeIn(vol = 0.22, t = 0.6) { ramp(master.gain, vol, t) },
    fadeOut(t = 0.8) { ramp(master.gain, 0, t) },
    stop(t = 0.8) {
      ramp(master.gain, 0, t)
      setTimeout(() => { try { noise.stop(); lfo.stop() } catch { /* already stopped */ } }, t * 1000 + 50)
    },
  }
}

const KEY = 'shalom-sound'
export const soundPref = {
  get() { try { return localStorage.getItem(KEY) !== 'off' } catch { return true } },
  set(on) { try { localStorage.setItem(KEY, on ? 'on' : 'off') } catch { /* ignore */ } },
}
