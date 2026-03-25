// ROKI — Product Management System

const DEFAULT_PRODUCTS = [
  { id: 1, name: "ROKI CORE Hoodie", price: "5500 DA", image: "assets/images/col_core.jfif", desc: "Premium heavyweight cotton hoodie.", qty: 50 },
  { id: 2, name: "URBAN EDGE Jacket", price: "7200 DA", image: "assets/images/col_urban.jfif", desc: "Water-resistant tech jacket for the streets.", qty: 30 },
  { id: 3, name: "STREET CARGO Pants", price: "4800 DA", image: "assets/images/col_cargo.jfif", desc: "Multi-pocket durable cargo pants.", qty: 45 },
  { id: 4, name: "ROKI CAPS", price: "2500 DA", image: "assets/images/col_caps.jfif", desc: "Classic embroidered street cap.", qty: 100 },
  { id: 5, name: "Vintage Oversized Tee", price: "3200 DA", image: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=800&q=80", desc: "Soft washed cotton for a vintage feel.", qty: 60 },
  { id: 6, name: "Desert Sand Shorts", price: "3800 DA", image: "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?auto=format&fit=crop&w=800&q=80", desc: "Lightweight breathable shorts for summer.", qty: 40 },
  { id: 7, name: "Night Rider Joggers", price: "4500 DA", image: "https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=800&q=80", desc: "Reflective joggers for night visibility.", qty: 25 },
  { id: 8, name: "Graphic Squad Tee", price: "3400 DA", image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80", desc: "Limited edition graphic print tee.", qty: 55 },
  { id: 9, name: "Signature Beanie", price: "2200 DA", image: "https://images.unsplash.com/photo-1576871337622-98d48d1cf021?auto=format&fit=crop&w=800&q=80", desc: "Warm knitted beanie with ROKI logo.", qty: 80 },
  { id: 10, name: "Techwear Vest", price: "6800 DA", image: "https://images.unsplash.com/photo-1614633833026-00234250284c?auto=format&fit=crop&w=800&q=80", desc: "Tactical utility vest with multiple pockets.", qty: 15 },
  { id: 11, name: "Bold Stripe Socks", price: "1200 DA", image: "https://images.unsplash.com/photo-1582966298438-641ff1ec9743?auto=format&fit=crop&w=800&q=80", desc: "High-quality crew socks with bold patterns.", qty: 120 },
  { id: 12, name: "Retro Windbreaker", price: "7500 DA", image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=800&q=80", desc: "90s inspired colorful windbreaker.", qty: 20 },
  { id: 13, name: "Minimalist Polo", price: "4200 DA", image: "https://images.unsplash.com/photo-1581655353564-df123a1eb820?auto=format&fit=crop&w=800&q=80", desc: "Clean and sharp polo for a smart look.", qty: 35 },
  { id: 14, name: "Ghardaia Edition Tee", price: "3600 DA", image: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=800&q=80", desc: "Special edition celebrating Ghardaia roots.", qty: 50 },
  { id: 15, name: "Algerian Pride Hoodie", price: "5800 DA", image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=800&q=80", desc: "Stay warm while showing your identity.", qty: 45 },
  { id: 16, name: "Nomad Backpack", price: "8500 DA", image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80", desc: "Rugged backpack for city exploration.", qty: 12 }
];

const STORAGE_KEY = 'roki_products';

function getProducts() {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    saveProducts(DEFAULT_PRODUCTS);
    return DEFAULT_PRODUCTS;
  }
  return JSON.parse(stored);
}

function saveProducts(products) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
}

function addProduct(newProduct) {
  const products = getProducts();
  const id = products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;
  const productWithId = { ...newProduct, id };
  products.push(productWithId);
  saveProducts(products);
  return productWithId;
}

function updateProduct(id, updatedData) {
  const products = getProducts();
  const index = products.findIndex(p => p.id === id);
  if (index !== -1) {
    products[index] = { ...products[index], ...updatedData };
    saveProducts(products);
    return true;
  }
  return false;
}

function deleteProduct(id) {
  let products = getProducts();
  products = products.filter(p => p.id !== id);
  saveProducts(products);
  return true;
}
