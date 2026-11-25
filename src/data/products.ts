export type ProductCategory = 'all' | 'chutney-pudi' | 'masala';

export type PackWeight = '200g' | '400g' | '600g Trio';

export type SpiceHeat = 'Mild' | 'Medium' | 'Fiery';

export interface Product {
  id: string;
  name: string;
  regionalName: string;
  category: Exclude<ProductCategory, 'all'>;
  categoryLabel: string;
  tagline: string;
  description: string;
  image: string;
  heat: SpiceHeat;
  prices: {
    '200g': number;
    '400g': number;
  };
  ingredients: string[];
  pairings: string;
  shelfLife: string;
  batchNote: string;
  featuredTag?: string;
}

export interface BundleOffer {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  image: string;
  weight: '600g Trio';
  price: number;
  compareAtPrice: number;
  includes: string[];
}

export interface CartItem {
  key: string;
  productId: string;
  name: string;
  weight: PackWeight;
  unitPrice: number;
  quantity: number;
  image: string;
}

export interface OrderRecord {
  orderNumber: string;
  placedAt: string;
  customerName: string;
  phone: string;
  address: string;
  city: string;
  pincode: string;
  paymentMethod: 'COD' | 'UPI';
  upiId?: string;
  items: CartItem[];
  subtotal: number;
  shipping: number;
  total: number;
}

export const HERO_IMAGE = '/src/assets/images/hero_indian_spices_1795608726730.jpg';
export const CRAFT_IMAGE = '/src/assets/images/craft_roasting_spices_1795608734191.jpg';

export const FREE_SHIPPING_THRESHOLD = 499;
export const STANDARD_SHIPPING_FEE = 49;

export const PRODUCTS: Product[] = [
  {
    id: 'shenga-chutney-pudi',
    name: 'Shenga Chutney Pudi',
    regionalName: 'North Karnataka Roasted Peanut Pudi',
    category: 'chutney-pudi',
    categoryLabel: 'Chutney Pudi',
    tagline: 'Coarse-ground roasted groundnuts, Byadgi chilli, and slow-toasted garlic.',
    description:
      'Our house signature from Dharwad and Malnad kitchens. Plump red-skin groundnuts are slow-roasted in brass pans until deeply nutty, then pulse-ground with sun-dried Byadgi chillies, cumin, tamarind, and whole garlic pods for an unmistakable crunch.',
    image: '/src/assets/images/product_shenga_chutney_pudi_1795608728316.jpg',
    heat: 'Medium',
    prices: {
      '200g': 185,
      '400g': 350,
    },
    ingredients: [
      'Roasted red-skin peanuts',
      'Byadgi dried red chillies',
      'Whole garlic cloves',
      'Cumin seeds',
      'Organic jaggery',
      'Aged tamarind',
      'Rock salt',
    ],
    pairings: 'Hot jolada rotti with homemade butter, steaming rice with cow ghee, curd rice, or stuffed brinjal.',
    shelfLife: '4 months in an airtight jar',
    batchNote: 'Coarse stone-ground weekly',
    featuredTag: 'Bestseller',
  },
  {
    id: 'udupi-sambar-powder',
    name: 'Udupi Sambar Powder',
    regionalName: 'Coastal Temple-Style Huli Pudi',
    category: 'masala',
    categoryLabel: 'Sambar Masala',
    tagline: 'Aromatic coriander, toasted fenugreek, and sweet-smoky Byadgi chillies.',
    description:
      'Balanced, fragrant, and deeply comforting—just like an authentic Udupi kitchen. We roast coriander seeds, chana dal, urad dal, golden methi, and fragrant curry leaves separately in small iron and brass pans so every single spice blooms without bitterness.',
    image: '/src/assets/images/product_udupi_sambar_powder_1795608726932.jpg',
    heat: 'Medium',
    prices: {
      '200g': 220,
      '400g': 415,
    },
    ingredients: [
      'Byadgi & Guntur chillies',
      'Whole coriander seeds',
      'Fenugreek (methi) seeds',
      'Roasted chana & urad dal',
      'Cumin & mustard seeds',
      'Fresh curry leaves',
      'Pure hing (asafoetida)',
    ],
    pairings: 'Drumstick and ash gourd sambar, hotel-style tiffin sambar for idli-vada, and festival vegetable huli.',
    shelfLife: '6 months in an airtight jar',
    batchNote: 'Slow-roasted in brass uruli',
    featuredTag: 'House Favorite',
  },
  {
    id: 'idli-milagai-pudi',
    name: 'Idli Milagai Pudi',
    regionalName: 'Classic South Indian Gunpowder',
    category: 'chutney-pudi',
    categoryLabel: 'Chutney Pudi',
    tagline: 'Toasted urad dal, white sesame, and smoky red chillies with fragrant hing.',
    description:
      'Crafted specifically to bloom when swirled with warm melted ghee or cold-pressed gingelly oil. Our gunpowder keeps a sandy, satisfying texture—never overly powdery—delivering rich roasted lentil warmth with a clean chilli finish.',
    image: '/src/assets/images/product_idli_gunpowder_1795608730536.jpg',
    heat: 'Fiery',
    prices: {
      '200g': 195,
      '400g': 370,
    },
    ingredients: [
      'Unpolished urad dal',
      'Roasted chana dal',
      'Guntur & Byadgi red chillies',
      'Toasted white sesame seeds',
      'Natural asafoetida (hing)',
      'Sun-dried curry leaves',
      'Sea salt',
    ],
    pairings: 'Soft mallige idlis with sesame oil, crispy ghee podi masala dosa, and hot uttapam.',
    shelfLife: '5 months in an airtight jar',
    batchNote: 'Stone-milled coarse grit',
  },
  {
    id: 'karibevu-curry-leaf-pudi',
    name: 'Karibevu Chutney Pudi',
    regionalName: 'Wild Malnad Curry Leaf Pudi',
    category: 'chutney-pudi',
    categoryLabel: 'Chutney Pudi',
    tagline: 'Shade-dried native curry leaves, black pepper, and crisp roasted lentils.',
    description:
      'Made from aromatic wild-grown Malnad curry leaves washed, shade-dried to preserve their deep emerald color and iron-rich aroma, then blended with roasted gram dal, Tellicherry black pepper, and a gentle tang of tamarind.',
    image: '/src/assets/images/product_curry_leaf_pudi_1795608727938.jpg',
    heat: 'Mild',
    prices: {
      '200g': 210,
      '400g': 395,
    },
    ingredients: [
      'Shade-dried native curry leaves',
      'Roasted chana & urad dal',
      'Tellicherry black peppercorns',
      'Cumin & coriander seeds',
      'Seedless tamarind',
      'Dry red chillies',
      'Rock salt',
    ],
    pairings: 'First course of hot rice and melted cow ghee, plain rava dosa, or sprinkled over warm vegetable stir-fries.',
    shelfLife: '4 months in an airtight jar',
    batchNote: 'Shade-dried for vibrant green',
  },
  {
    id: 'mysore-rasam-powder',
    name: 'Mysore Rasam Powder',
    regionalName: 'Heirloom Saaru Pudi',
    category: 'masala',
    categoryLabel: 'Rasam Masala',
    tagline: 'Crushed black pepper, roasted cumin, and heirloom Salem turmeric.',
    description:
      'One spoonful fills the entire kitchen with comforting aroma. Designed for both everyday tomato rasam and celebratory Mysuru wedding-style pepper saaru, milled coarse so the oils release gently while simmering.',
    image: '/src/assets/images/product_rasam_powder_1795608727745.jpg',
    heat: 'Medium',
    prices: {
      '200g': 200,
      '400g': 380,
    },
    ingredients: [
      'Malnad black peppercorns',
      'Whole cumin (jeera)',
      'Coriander seeds',
      'Toor dal',
      'Byadgi red chillies',
      'Salem turmeric root',
      'Fenugreek & curry leaves',
    ],
    pairings: 'Piping hot tomato-tamarind rasam, soothing pepper-garlic rasam, and lentil broth.',
    shelfLife: '6 months in an airtight jar',
    batchNote: 'Freshly cracked pepper blend',
  },
  {
    id: 'bisi-bele-bath-masala',
    name: 'Bisi Bele Bath Masala',
    regionalName: 'Royal Mysuru Spice Blend',
    category: 'masala',
    categoryLabel: 'Rice Masala',
    tagline: 'Fragrant cinnamon, marathi moggu, cloves, and dry-roasted copra.',
    description:
      'A deeply fragrant, rich ceremonial spice mix made with rare marathi moggu (kapok buds), true Ceylon cinnamon, green cardamom, cloves, and golden roasted lentils. Turns simple rice, toor dal, and seasonal vegetables into a feast.',
    image: '/src/assets/images/product_bisibele_masala_1795608731197.jpg',
    heat: 'Medium',
    prices: {
      '200g': 240,
      '400g': 450,
    },
    ingredients: [
      'Byadgi chillies',
      'Marathi moggu (kapok buds)',
      'Cinnamon bark & cloves',
      'Green cardamom & star anise',
      'Coriander & cumin seeds',
      'Dry roasted copra (coconut)',
      'Chana & urad dal',
    ],
    pairings: 'Classic Karnataka Bisi Bele Bath topped with ghee-fried cashews and crisp khara boondi.',
    shelfLife: '5 months in an airtight jar',
    batchNote: 'Whole-spice ceremonial roast',
  },
];

export const TRIO_BUNDLE: BundleOffer = {
  id: 'malnad-tasting-trio',
  name: 'The Everyday Indian Kitchen Trio',
  subtitle: '3 × 200g Fresh Pouches · Save ₹80',
  description:
    'Start with our three most-loved kitchen staples: Shenga Chutney Pudi, Udupi Sambar Powder, and Idli Milagai Pudi—sealed within hours of grinding and eligible for free delivery.',
  image: HERO_IMAGE,
  weight: '600g Trio',
  price: 520,
  compareAtPrice: 600,
  includes: ['Shenga Chutney Pudi (200g)', 'Udupi Sambar Powder (200g)', 'Idli Milagai Pudi (200g)'],
};

export interface CustomerVoice {
  quote: string;
  author: string;
  location: string;
  productBought: string;
}

export const CUSTOMER_VOICES: CustomerVoice[] = [
  {
    quote:
      'I stopped buying supermarket sambar powders after trying their Udupi blend. Opening the pouch smells exactly like my grandmother roasting coriander and methi on a Sunday morning.',
    author: 'Meenakshi Rao',
    location: 'Indiranagar, Bengaluru',
    productBought: 'Udupi Sambar Powder',
  },
  {
    quote:
      'The Shenga Chutney Pudi has the real coarse peanut crunch—not oiled down or overly salty. We finish a 400g jar every three weeks with hot jowar rotis and curd rice.',
    author: 'Harish Kulkarni',
    location: 'Gokulam, Mysuru',
    productBought: 'Shenga Chutney Pudi',
  },
  {
    quote:
      'Their Karibevu Pudi is genuinely deep green and earthy, never burnt. A teaspoon over hot steamed rice with ghee has become our family’s favorite five-minute lunch.',
    author: 'Ananya Subramanian',
    location: 'Mylapore, Chennai',
    productBought: 'Karibevu Chutney Pudi',
  },
];
