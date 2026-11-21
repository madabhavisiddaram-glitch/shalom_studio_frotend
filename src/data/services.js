// Service descriptions describe the scope of work generally. They make no
// claims about experience, volume or results. Images are sample 3D renders.
export const services = [
  {
    slug: 'residential-interiors',
    title: 'Residential Interiors',
    short: 'Beautifully planned living spaces designed around your lifestyle, comfort and personal taste.',
    image: 'd-living-1',
    gallery: ['d-living-2', 'd-dining-1', 'v-living'],
    intro:
      'Whether it is a 2BHK apartment or a large family home, residential interiors begin with how you live. We plan each room around your routines, storage needs and the atmosphere you want to come home to.',
    scope: [
      'Space planning and furniture layouts for every room',
      'Living, dining, bedroom, kitchen and utility design',
      'Material, finish and colour palette selection',
      'Lighting plans, false ceilings and feature walls',
      'Loose furniture, soft furnishing and décor guidance',
    ],
    idealFor: ['1BHK to 4BHK apartments', 'Independent houses', 'Villas and row houses'],
  },
  {
    slug: 'modular-kitchen',
    title: 'Modular Kitchen',
    short: 'Functional, elegant kitchens combining intelligent storage, premium finishes and efficient layouts.',
    image: 'd-kitchen-1',
    gallery: ['d-kitchen-3', 'v-kitchen-1', 'v-kitchen-4'],
    intro:
      'A kitchen has to work hard every day and still look composed. We design around your cooking habits, appliances and storage, then refine the finishes so the kitchen sits naturally with the rest of your home.',
    scope: [
      'L-shaped, U-shaped, parallel, straight and island layouts',
      'Carcass, shutter and countertop material options',
      'Tall units, pull-outs, corner solutions and organisers',
      'Appliance planning: hob, chimney, built-in oven, refrigerator',
      'Under-cabinet and task lighting',
    ],
    idealFor: ['New kitchens', 'Kitchen renovations', 'Open and semi-open kitchens'],
  },
  {
    slug: 'living-room-design',
    title: 'Living Room Design',
    short: 'Inviting living spaces that bring together comfort, sophistication and thoughtful detailing.',
    image: 'd-living-5',
    gallery: ['d-living-6', 'v-tv-unit', 'd-living-3'],
    intro:
      'The living room is where your home introduces itself. We balance seating, circulation, media and display so the space feels generous for guests and relaxed for everyday family time.',
    scope: [
      'Seating layouts and furniture selection',
      'TV and media walls with concealed storage',
      'Feature walls, panelling and display units',
      'Layered ambient, accent and decorative lighting',
      'Rugs, curtains and finishing décor',
    ],
    idealFor: ['Formal and family living rooms', 'Living–dining combinations', 'Home theatre corners'],
  },
  {
    slug: 'bedroom-interiors',
    title: 'Bedroom Interiors',
    short: 'Personalised bedroom spaces designed for relaxation, warmth and everyday comfort.',
    image: 'd-bed-1',
    gallery: ['d-bed-2', 'v-bed-2', 'd-bed-8'],
    intro:
      'Bedrooms should feel calm. We consider light, acoustics, storage and the small rituals of your day, so the room is restful while still holding everything you need.',
    scope: [
      'Master, children’s and guest bedrooms',
      'Bed back panels, headboards and side tables',
      'Wardrobes, dressers and study corners',
      'Window seating, curtains and blinds',
      'Soft, dimmable lighting schemes',
    ],
    idealFor: ['Master suites', 'Kids’ and teen rooms', 'Guest bedrooms'],
  },
  {
    slug: 'wardrobes-storage',
    title: 'Wardrobes & Storage',
    short: 'Smart storage solutions that maximise space without compromising aesthetics.',
    image: 'v-wardrobe-2',
    gallery: ['v-wardrobe-3', 'd-bed-9', 'v-wardrobe-1'],
    intro:
      'Good storage is planned, not added. We map what you own and how you use it, then design wardrobes and cabinets that disappear into the architecture of the room.',
    scope: [
      'Hinged, sliding and walk-in wardrobes',
      'Internal organisers, lofts and accessories',
      'Crockery units, shoe racks and foyer storage',
      'Study units and bookshelves',
      'Finish options: laminate, acrylic, veneer, lacquer, glass',
    ],
    idealFor: ['Bedrooms', 'Foyers and passages', 'Utility and storage rooms'],
  },
  {
    slug: 'false-ceiling-lighting',
    title: 'False Ceiling & Lighting',
    short: 'Thoughtfully layered lighting and ceiling designs that enhance the atmosphere of every room.',
    image: 'v-ceiling',
    gallery: ['v-ceiling-2', 'd-bed-portrait-3', 'v-dining-2'],
    intro:
      'Ceilings and lighting quietly set the mood of a home. We design ceiling profiles together with the lighting plan, so cove lights, spotlights and pendants each have a clear purpose.',
    scope: [
      'Gypsum and POP ceiling designs',
      'Cove, profile and linear lighting',
      'Spotlights, downlights and accent lighting',
      'Pendant and decorative light selection',
      'Lighting plans coordinated with switch layouts',
    ],
    idealFor: ['Living and dining areas', 'Bedrooms', 'Commercial spaces'],
  },
  {
    slug: 'custom-furniture',
    title: 'Custom Furniture',
    short: 'Made-to-measure furniture that complements the architecture and character of your interiors.',
    image: 'd-living-4',
    gallery: ['d-dining-2', 'v-foyer', 'd-study'],
    intro:
      'When a standard piece does not fit, we design one that does. Custom furniture lets proportions, materials and details match your room exactly.',
    scope: [
      'Consoles, crockery and display units',
      'Dining tables, beds and side tables',
      'Study tables and work-from-home setups',
      'Pooja units and foyer furniture',
      'Detailed drawings and finish samples before production',
    ],
    idealFor: ['Unusual room sizes', 'Statement pieces', 'Coordinated furniture sets'],
  },
  {
    slug: 'turnkey-interior-solutions',
    title: 'Turnkey Interior Solutions',
    short:
      'From initial planning and design development to material selection, coordination and final execution, experience a complete interior transformation under one roof.',
    image: 'd-living-2',
    gallery: ['v-living-kitchen', 'd-dining-1', 'v-dining-1'],
    intro:
      'Turnkey means one team takes responsibility from first sketch to final handover. You make the key decisions with us, and we coordinate the design, materials, vendors and site work in between.',
    scope: [
      'Design consultation, space planning and 3D visualisation',
      'Material, finish and furniture selection',
      'Civil, electrical, plumbing and carpentry coordination',
      'Procurement, installation and on-site supervision',
      'Quality checks, final inspection and handover',
    ],
    idealFor: ['New apartments and villas', 'Complete home renovations', 'Offices and commercial spaces'],
  },
]

export const getService = (slug) => services.find((s) => s.slug === slug)
