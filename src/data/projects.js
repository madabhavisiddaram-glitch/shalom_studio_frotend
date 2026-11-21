/**
 * SAMPLE PROJECTS — placeholder data.
 * The images are 3D design renders used as samples. Names, locations and
 * details are placeholders and do NOT describe real completed projects.
 * Replace each entry with your actual project data and photographs
 * (put images in /public/images as <name>-800.webp and <name>-1600.webp).
 */
export const categories = [
  { id: 'all', label: 'All Projects' },
  { id: 'living', label: 'Living Rooms' },
  { id: 'bedroom', label: 'Bedrooms' },
  { id: 'kitchen', label: 'Modular Kitchens' },
  { id: 'complete', label: 'Complete Homes' },
  { id: 'villa', label: 'Luxury Villas' },
  { id: 'commercial', label: 'Commercial Spaces' },
]

export const projects = [
  {
    slug: 'sample-project-ivory-residence',
    name: 'The Ivory Residence',
    category: 'complete',
    propertyType: '[Property type]',
    location: '[Area], Bangalore',
    style: 'Warm Contemporary',
    cover: 'v-dining-1',
    summary:
      '[Sample description] A complete home in soft ivory and champagne tones, with backlit niches, fluted panels and warm wood accents running from the foyer to the bedrooms.',
    images: ['v-dining-1', 'v-living', 'v-tv-unit', 'v-living-kitchen', 'v-dining-3', 'v-kitchen-view', 'v-kitchen-1', 'v-kitchen-4', 'v-bed-1', 'v-bed-2', 'v-wardrobe-2', 'v-study', 'v-foyer', 'v-niche'],
  },
  {
    slug: 'sample-project-walnut-stone-residence',
    name: 'Walnut & Stone Residence',
    category: 'complete',
    propertyType: '[Property type]',
    location: '[Area], Bangalore',
    style: 'Modern Luxury',
    cover: 'd-dining-1',
    summary:
      '[Sample description] Marble-look floors, walnut accents and bronze glass come together across an open living, dining and kitchen layout with calm, textured bedrooms.',
    images: ['d-dining-1', 'd-living-1', 'd-living-2', 'd-living-5', 'd-dining-2', 'd-kitchen-1', 'd-kitchen-2', 'd-bed-1', 'd-bed-4', 'd-bed-6', 'd-study', 'd-bath-1'],
  },
  {
    slug: 'sample-project-gallery-living-room',
    name: 'The Gallery Living Room',
    category: 'living',
    propertyType: '[Property type]',
    location: '[Area], Bangalore',
    style: 'Modern Contemporary',
    cover: 'd-living-3',
    summary:
      '[Sample description] A long living room organised around a sculpted media wall, a lit display unit and an art-lined dining zone.',
    images: ['d-living-3', 'd-living-6', 'd-living-4', 'd-living-2', 'd-living-5'],
  },
  {
    slug: 'sample-project-bronze-glass-kitchen',
    name: 'Bronze Glass Kitchen',
    category: 'kitchen',
    propertyType: '[Property type]',
    location: '[Area], Bangalore',
    style: 'Modern Luxury',
    cover: 'd-kitchen-2',
    summary:
      '[Sample description] An L-shaped kitchen with bronze-glass wall units, a marble-look backsplash and a tall appliance bank.',
    images: ['d-kitchen-2', 'd-kitchen-1', 'd-kitchen-3', 'd-kitchen-4', 'd-kitchen-5'],
  },
  {
    slug: 'sample-project-champagne-kitchen',
    name: 'Champagne L-Kitchen',
    category: 'kitchen',
    propertyType: '[Property type]',
    location: '[Area], Bangalore',
    style: 'Warm Contemporary',
    cover: 'v-kitchen-2',
    summary:
      '[Sample description] Champagne and charcoal cabinetry with brass-framed open shelves, a built-in refrigerator niche and a sleek hob wall.',
    images: ['v-kitchen-2', 'v-kitchen-1', 'v-kitchen-3', 'v-kitchen-4', 'v-kitchen-view'],
  },
  {
    slug: 'sample-project-window-seat-bedroom',
    name: 'Window Seat Bedroom',
    category: 'bedroom',
    propertyType: '[Property type]',
    location: '[Area], Bangalore',
    style: 'Organic Modern',
    cover: 'd-bed-4',
    summary:
      '[Sample description] A compact bedroom with a cushioned window seat, a floating study desk and wall-to-wall wardrobes in warm beige.',
    images: ['d-bed-4', 'd-bed-2', 'd-bed-3', 'd-bed-5'],
  },
  {
    slug: 'sample-project-botanical-master-suite',
    name: 'Botanical Master Suite',
    category: 'bedroom',
    propertyType: '[Property type]',
    location: '[Area], Bangalore',
    style: 'Modern Contemporary',
    cover: 'd-bed-6',
    summary:
      '[Sample description] Botanical wallpaper, slate-grey wardrobes with walnut handles and a quiet work corner by the window.',
    images: ['d-bed-6', 'd-bed-7', 'd-bed-8', 'd-bed-9', 'd-bed-10', 'd-bath-2'],
  },
  {
    slug: 'sample-project-soft-blush-suite',
    name: 'Soft Blush Suite',
    category: 'bedroom',
    propertyType: '[Property type]',
    location: '[Area], Bangalore',
    style: 'Minimalist',
    cover: 'v-bed-1',
    summary:
      '[Sample description] Blush and sand tones, a floating bed with concealed lighting and full-height wardrobes with slim brass pulls.',
    images: ['v-bed-1', 'v-bed-3', 'v-wardrobe-1', 'v-wardrobe-3', 'v-bed-2'],
  },
  {
    slug: 'sample-project-portrait-bedrooms',
    name: 'Ceiling-Lit Bedrooms',
    category: 'bedroom',
    propertyType: '[Property type]',
    location: '[Area], Bangalore',
    style: 'Modern Luxury',
    cover: 'd-bed-portrait-1',
    summary:
      '[Sample description] Bedrooms framed by layered ceiling profiles, upholstered headboards and soft green accents.',
    images: ['d-bed-portrait-1', 'd-bed-portrait-2', 'd-bed-portrait-3'],
  },
]

export const getProject = (slug) => projects.find((p) => p.slug === slug)
