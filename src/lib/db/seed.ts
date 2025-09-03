import { db } from './index';
import { products } from './schema';

const sampleNikeProducts = [
  {
    name: 'Nike Air Max 270',
    description: 'The Nike Air Max 270 delivers visible cushioning under every step.',
    price: '150.00',
    imageUrl: 'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/awjogtdnqxniqqk0wpgf/air-max-270-mens-shoes-KkLcGR.png',
    category: 'Shoes',
    brand: 'Nike',
  },
  {
    name: 'Nike Dri-FIT Running Shirt',
    description: 'Stay dry and comfortable with Nike Dri-FIT technology.',
    price: '35.00',
    imageUrl: 'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/16a04d6e-bcaa-4c58-ab0f-0c096c2953ac/dri-fit-miler-mens-running-top-8wbhNR.png',
    category: 'Apparel',
    brand: 'Nike',
  },
  {
    name: 'Nike Air Force 1',
    description: 'The classic Nike Air Force 1 with timeless style.',
    price: '110.00',
    imageUrl: 'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/b7d9211c-26e7-431a-ac24-b0540fb3c00f/air-force-1-07-mens-shoes-jBrhbr.png',
    category: 'Shoes',
    brand: 'Nike',
  },
  {
    name: 'Nike Sportswear Tech Fleece Hoodie',
    description: 'Premium fleece hoodie with modern design.',
    price: '90.00',
    imageUrl: 'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/18e89c28-66c3-4a35-8cce-7d8e0d8b2b6c/sportswear-tech-fleece-mens-pullover-hoodie-WWn5DX.png',
    category: 'Apparel',
    brand: 'Nike',
  },
  {
    name: 'Nike React Infinity Run',
    description: 'Designed to help reduce injury and keep you running.',
    price: '160.00',
    imageUrl: 'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/i1-6cc4c2d4-59b8-4b5d-9b8f-9c2b8b8b8b8b/react-infinity-run-flyknit-3-mens-road-running-shoes-XhzpzT.png',
    category: 'Shoes',
    brand: 'Nike',
  },
  {
    name: 'Nike Pro Shorts',
    description: 'Compression shorts for training and workouts.',
    price: '30.00',
    imageUrl: 'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/i1-fb7edde6-513a-4ce6-9b0f-9c2b8b8b8b8b/pro-mens-5-shorts-2XjHtX.png',
    category: 'Apparel',
    brand: 'Nike',
  },
];

export async function seedProducts() {
  try {
    console.log('Seeding products...');
    
    // Insert sample products
    await db.insert(products).values(sampleNikeProducts);
    
    console.log('Products seeded successfully!');
  } catch (error) {
    console.error('Error seeding products:', error);
    throw error;
  }
}

// Run seed if this file is executed directly
if (require.main === module) {
  seedProducts()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
}