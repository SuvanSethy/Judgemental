export type Product = {
  id: string;
  name: string;
  price: number;
  description: string;
  images: string[];
  category: string;
  inspiration: string;
  inStock: boolean;
  releaseDate: string; // ISO date string
};

// Generate placeholder products
const generateProducts = (): Product[] => {
  const products: Product[] = [];
  const inspirations: ('Gojo' | 'Sukuna' | 'Blue Lock')[] = ['Gojo', 'Sukuna', 'Blue Lock'];
  const categories = ['Hoodie', 'T-Shirt', 'Joggers', 'Jacket', 'Accessories'];
  
  const gojoProducts = [
    'Infinity Void Hoodie',
    'Six Eyes T-Shirt',
    'Limitless Domain Joggers',
    'Jujutsu Tech Jacket',
    'Gojo Sunglasses',
    'Hollow Purple Sweater',
    'Domain Expansion Gloves',
    'Infinity Bandana',
    'Cursed Energy Beanie',
    'Satoru Tech Pants',
  ];
  
  const sukunaProducts = [
    'Domain of Flames Hoodie',
    'King of Curses T-Shirt',
    'Malevolent Shrine Joggers',
    'Sukuna Pattern Jacket',
    'Curse Mark Rings',
    'Blood Pact Sweater',
    'Finger Vessel Pendant',
    'Ryomen Sukuna Cap',
    'Curse Technique Socks',
    'Dismantle Joggers',
  ];
  
  const blueLockProducts = [
    'Ego Challenge Hoodie',
    'Striker Zone T-Shirt',
    'Blue Lock Facility Joggers',
    'Isagi Vision Jacket',
    'Barou Beast Sneakers',
    'Bachira Monster Sweater',
    'Ego Training Gloves',
    'Striker Selection Cap',
    'Blue Lock Badge Set',
    'Goal Zone Pants',
  ];

  let id = 1;
  
  // Add Gojo products
  for (const name of gojoProducts) {
    products.push({
      id: id++,
      name,
      description: `Limited edition ${name.toLowerCase()} inspired by Satoru Gojo. Each piece embodies the power and confidence of Jujutsu Kaisen's strongest sorcerer.`,
      price: Math.floor(Math.random() * 6) * 10 + 59.99,
      images: Array(4).fill('').map((_, i) => `https://placehold.co/600x600/222/fff?text=${encodeURIComponent(name.replace(' ', '+'))}+${i+1}`),
      category: categories[Math.floor(Math.random() * categories.length)],
      inspiration: 'Gojo',
      inStock: Math.random() > 0.2,
      releaseDate: new Date(2023, 0, 1 + Math.floor(Math.random() * 365)).toISOString().split('T')[0],
    });
  }
  
  // Add Sukuna products
  for (const name of sukunaProducts) {
    products.push({
      id: id++,
      name,
      description: `Limited edition ${name.toLowerCase()} inspired by Ryomen Sukuna. Feel the power of the King of Curses with this exclusive piece.`,
      price: Math.floor(Math.random() * 6) * 10 + 59.99,
      images: Array(4).fill('').map((_, i) => `https://placehold.co/600x600/222/fff?text=${encodeURIComponent(name.replace(' ', '+'))}+${i+1}`),
      category: categories[Math.floor(Math.random() * categories.length)],
      inspiration: 'Sukuna',
      inStock: Math.random() > 0.2,
      releaseDate: new Date(2023, 0, 1 + Math.floor(Math.random() * 365)).toISOString().split('T')[0],
    });
  }
  
  // Add Blue Lock products
  for (const name of blueLockProducts) {
    products.push({
      id: id++,
      name,
      description: `Limited edition ${name.toLowerCase()} inspired by Blue Lock. Channel your inner striker with this exclusive piece designed for those who strive to be the best.`,
      price: Math.floor(Math.random() * 6) * 10 + 59.99,
      images: Array(4).fill('').map((_, i) => `https://placehold.co/600x600/222/fff?text=${encodeURIComponent(name.replace(' ', '+'))}+${i+1}`),
      category: categories[Math.floor(Math.random() * categories.length)],
      inspiration: 'Blue Lock',
      inStock: Math.random() > 0.2,
      releaseDate: new Date(2023, 0, 1 + Math.floor(Math.random() * 365)).toISOString().split('T')[0],
    });
  }
  
  return products;
};

export const products = generateProducts();

export const getProductById = (id: string): Product | undefined => {
  return products.find(product => product.id === id);
};

export const getProductsByInspiration = (inspiration: 'Gojo' | 'Sukuna' | 'Blue Lock'): Product[] => {
  return products.filter(product => product.inspiration === inspiration);
};

export const getProductsByCategory = (category: string): Product[] => {
  return products.filter(product => product.category === category);
};
