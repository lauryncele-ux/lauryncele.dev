// Content for the three live demos. Kaya Ceramics is a fictional brand built to
// show the kind of storefront, site and app I can put together.
export type ProductKind = 'mug' | 'bowl' | 'vase'

export type Product = {
  id: string
  name: string
  price: number
  kind: ProductKind
  category: 'Mugs' | 'Bowls' | 'Vases'
  color: string
  note: string
}

export const shopCategories = ['All', 'Mugs', 'Bowls', 'Vases'] as const

export const shopProducts: Product[] = [
  {
    id: 'mug-ubuntu',
    name: 'Ubuntu Mug',
    price: 240,
    kind: 'mug',
    category: 'Mugs',
    color: '#FF4D6D',
    note: 'Hand thrown, 300ml',
  },
  {
    id: 'mug-speckle',
    name: 'Speckled Mug',
    price: 265,
    kind: 'mug',
    category: 'Mugs',
    color: '#FFB347',
    note: 'Matte glaze, 350ml',
  },
  {
    id: 'bowl-veld',
    name: 'Veld Bowl',
    price: 320,
    kind: 'bowl',
    category: 'Bowls',
    color: '#2EC4B6',
    note: 'Serving size, 22cm',
  },
  {
    id: 'bowl-dune',
    name: 'Dune Bowl',
    price: 290,
    kind: 'bowl',
    category: 'Bowls',
    color: '#4BB8DB',
    note: 'Everyday size, 16cm',
  },
  {
    id: 'vase-ridge',
    name: 'Ridged Vase',
    price: 560,
    kind: 'vase',
    category: 'Vases',
    color: '#7B5EA7',
    note: 'Stoneware, 28cm',
  },
  {
    id: 'vase-stoep',
    name: 'Stoep Vase',
    price: 480,
    kind: 'vase',
    category: 'Vases',
    color: '#FF4D6D',
    note: 'Wide mouth, 20cm',
  },
]

export const siteFeatures = [
  {
    title: 'Made by hand',
    body: 'Every piece is thrown, trimmed and glazed in a studio in Joburg.',
    icon: 'Hand',
  },
  {
    title: 'Delivered countrywide',
    body: 'Two to four days to most South African addresses, tracked.',
    icon: 'Truck',
  },
  {
    title: 'Built to be used',
    body: 'Dishwasher and microwave safe, because a shelf is a sad place.',
    icon: 'Sparkles',
  },
]

export const siteStats = [
  { value: '1.4k', label: 'pieces sold' },
  { value: '4.9', label: 'average rating' },
  { value: '48h', label: 'dispatch time' },
]

export const appPerks = [
  { title: 'Free delivery', detail: 'On your next order' },
  { title: 'Studio tour', detail: 'Saturday mornings' },
  { title: 'Early access', detail: 'New glazes first' },
]
