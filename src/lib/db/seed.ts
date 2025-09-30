import { db } from './index';
import * as schema from './schema/index';
import { eq } from 'drizzle-orm';
import * as fs from 'fs';
import * as path from 'path';

const NIKE_PRODUCTS = [
  {
    name: 'Nike Air Max 90',
    description: 'The Nike Air Max 90 stays true to its OG running roots with the iconic Waffle sole, stitched overlays and classic TPU accents. Classic colors celebrate your fresh look while Max Air cushioning adds comfort to the journey.',
    category: 'Running',
    gender: 'Men',
  },
  {
    name: 'Nike Air Force 1 \'07',
    description: 'The radiance lives on in the Nike Air Force 1 \'07, the basketball original that puts a fresh spin on what you know best: crisp leather, bold colors and the perfect amount of flash to make you shine.',
    category: 'Lifestyle',
    gender: 'Men',
  },
  {
    name: 'Nike Dunk Low Retro',
    description: 'Created for the hardwood but taken to the streets, the Nike Dunk Low Retro returns with crisp overlays and original team colors. This basketball icon channels \'80s vibes with premium leather in the upper for a retro look.',
    category: 'Lifestyle',
    gender: 'Unisex',
  },
  {
    name: 'Nike React Infinity Run Flyknit 3',
    description: 'Keep running, keep the world running. These kicks are designed to help you run longer and push your limits. More foam means better cushioning to keep your stride smooth and comfortable.',
    category: 'Running',
    gender: 'Men',
  },
  {
    name: 'Nike Pegasus 40',
    description: 'We put Zoom Air units in the forefoot and heel, helping you stay bouncy on ascents and descents. This workhorse is designed with a more supportive collar for a secure heel fit.',
    category: 'Running',
    gender: 'Women',
  },
  {
    name: 'Nike Air Jordan 1 Mid',
    description: 'Inspired by the original AJ1, this mid-top edition maintains the iconic look you love while choice colors and crisp leather give it a distinct identity.',
    category: 'Basketball',
    gender: 'Men',
  },
  {
    name: 'Nike Blazer Mid \'77 Vintage',
    description: 'In the \'70s, Nike was the new shoe on the block. So new in fact, we were still breaking into the basketball scene and testing prototypes on the feet of our local team. The Nike Blazer Mid \'77 Vintage returns with a vintage look.',
    category: 'Lifestyle',
    gender: 'Unisex',
  },
  {
    name: 'Nike ZoomX Vaporfly Next% 3',
    description: 'Catch \'em if you can. Gives you the propulsive feel that can deliver a photobomb-worthy finish time. This is the fast shoe that\'s engineered to help you chase personal goals and records.',
    category: 'Running',
    gender: 'Unisex',
  },
  {
    name: 'Nike Metcon 9',
    description: 'The Nike Metcon 9 builds on the legacy of stability and durability with responsive cushioning for high-impact training. This shoe is made for heavy lifters and short-distance sprinters.',
    category: 'Training',
    gender: 'Men',
  },
  {
    name: 'Nike Air Max 270',
    description: 'The Nike Air Max 270 delivers visible Max Air cushioning underfoot and comes in a clean design so you look as good as you feel.',
    category: 'Lifestyle',
    gender: 'Women',
  },
  {
    name: 'Nike Court Vision Low',
    description: 'The Nike Court Vision Low takes the classic look of a basketball icon and updates it with a crisp leather upper for everyday wear.',
    category: 'Lifestyle',
    gender: 'Men',
  },
  {
    name: 'Nike Free Run 5.0',
    description: 'Flexible, light and natural, the Nike Free Run 5.0 features an updated Flyknit upper for breathability and a foam midsole for soft, responsive cushioning.',
    category: 'Running',
    gender: 'Women',
  },
  {
    name: 'Nike SB Dunk Low Pro',
    description: 'Packed with performance and ready to skate, the Nike SB Dunk Low Pro has a classic look with a flexible feel. Zoom Air cushioning helps provide a responsive ride.',
    category: 'Skateboarding',
    gender: 'Unisex',
  },
  {
    name: 'Nike Air Zoom Pegasus 39',
    description: 'Let the Nike Air Zoom Pegasus 39 help carry you to new levels of speed. Responsive cushioning and a secure midfoot band give you total comfort mile after mile.',
    category: 'Running',
    gender: 'Men',
  },
  {
    name: 'Nike Mercurial Vapor 15',
    description: 'Fast is in the Air. The Nike Mercurial Vapor 15 is made for speed on the pitch with a streamlined design and traction pattern for quick changes of direction.',
    category: 'Soccer',
    gender: 'Unisex',
  },
];

const COLORS = [
  { name: 'Black', slug: 'black', hexCode: '#000000' },
  { name: 'White', slug: 'white', hexCode: '#FFFFFF' },
  { name: 'Red', slug: 'red', hexCode: '#FF0000' },
  { name: 'Blue', slug: 'blue', hexCode: '#0000FF' },
  { name: 'Navy', slug: 'navy', hexCode: '#000080' },
  { name: 'Grey', slug: 'grey', hexCode: '#808080' },
  { name: 'Green', slug: 'green', hexCode: '#008000' },
  { name: 'Pink', slug: 'pink', hexCode: '#FFC0CB' },
  { name: 'Orange', slug: 'orange', hexCode: '#FFA500' },
  { name: 'Yellow', slug: 'yellow', hexCode: '#FFFF00' },
];

const SIZES = [
  { name: '6', slug: 'us-6', sortOrder: 1 },
  { name: '6.5', slug: 'us-6-5', sortOrder: 2 },
  { name: '7', slug: 'us-7', sortOrder: 3 },
  { name: '7.5', slug: 'us-7-5', sortOrder: 4 },
  { name: '8', slug: 'us-8', sortOrder: 5 },
  { name: '8.5', slug: 'us-8-5', sortOrder: 6 },
  { name: '9', slug: 'us-9', sortOrder: 7 },
  { name: '9.5', slug: 'us-9-5', sortOrder: 8 },
  { name: '10', slug: 'us-10', sortOrder: 9 },
  { name: '10.5', slug: 'us-10-5', sortOrder: 10 },
  { name: '11', slug: 'us-11', sortOrder: 11 },
  { name: '11.5', slug: 'us-11-5', sortOrder: 12 },
  { name: '12', slug: 'us-12', sortOrder: 13 },
  { name: '13', slug: 'us-13', sortOrder: 14 },
];

const GENDERS = [
  { label: 'Men', slug: 'men' },
  { label: 'Women', slug: 'women' },
  { label: 'Unisex', slug: 'unisex' },
];

const CATEGORIES = [
  { name: 'Running', slug: 'running', parentId: null },
  { name: 'Basketball', slug: 'basketball', parentId: null },
  { name: 'Lifestyle', slug: 'lifestyle', parentId: null },
  { name: 'Training', slug: 'training', parentId: null },
  { name: 'Soccer', slug: 'soccer', parentId: null },
  { name: 'Skateboarding', slug: 'skateboarding', parentId: null },
];

const COLLECTIONS = [
  { name: 'New Arrivals', slug: 'new-arrivals' },
  { name: 'Best Sellers', slug: 'best-sellers' },
  { name: 'Summer 2025', slug: 'summer-2025' },
];

function getRandomElements<T>(arr: T[], count: number): T[] {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

function getRandomElement<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function copyImagesToStaticUploads() {
  const publicShoesDir = path.join(process.cwd(), 'public', 'shoes');
  const staticUploadsDir = path.join(process.cwd(), 'static', 'uploads');

  if (!fs.existsSync(staticUploadsDir)) {
    fs.mkdirSync(staticUploadsDir, { recursive: true });
  }

  const files = fs.readdirSync(publicShoesDir);
  const imageFiles = files.filter(f => /\.(jpg|jpeg|png|webp|avif)$/i.test(f));

  console.log(`📸 Copying ${imageFiles.length} images to static/uploads...`);

  imageFiles.forEach(file => {
    const sourcePath = path.join(publicShoesDir, file);
    const destPath = path.join(staticUploadsDir, file);
    
    if (!fs.existsSync(destPath)) {
      fs.copyFileSync(sourcePath, destPath);
    }
  });

  console.log('✅ Images copied successfully\n');
  
  return imageFiles;
}

async function seed() {
  console.log('🌱 Starting database seed...\n');

  try {
    console.log('🎨 Seeding colors...');
    const insertedColors = await db.insert(schema.colors).values(COLORS).returning();
    console.log(`✅ Created ${insertedColors.length} colors\n`);

    console.log('📏 Seeding sizes...');
    const insertedSizes = await db.insert(schema.sizes).values(SIZES).returning();
    console.log(`✅ Created ${insertedSizes.length} sizes\n`);

    console.log('👥 Seeding genders...');
    const insertedGenders = await db.insert(schema.genders).values(GENDERS).returning();
    console.log(`✅ Created ${insertedGenders.length} genders\n`);

    console.log('🏢 Seeding brand (Nike)...');
    const [nike] = await db.insert(schema.brands).values({
      name: 'Nike',
      slug: 'nike',
      logoUrl: '/logo.svg',
    }).returning();
    console.log(`✅ Created brand: ${nike.name}\n`);

    console.log('📁 Seeding categories...');
    const insertedCategories = await db.insert(schema.categories).values(CATEGORIES).returning();
    console.log(`✅ Created ${insertedCategories.length} categories\n`);

    console.log('🎁 Seeding collections...');
    const insertedCollections = await db.insert(schema.collections).values(COLLECTIONS).returning();
    console.log(`✅ Created ${insertedCollections.length} collections\n`);

    const imageFiles = copyImagesToStaticUploads();

    console.log('👟 Seeding products and variants...\n');
    
    for (let i = 0; i < NIKE_PRODUCTS.length; i++) {
      const productData = NIKE_PRODUCTS[i];
      const category = insertedCategories.find(c => c.name === productData.category);
      const gender = insertedGenders.find(g => g.label === productData.gender);

      if (!category || !gender) {
        console.error(`❌ Category or gender not found for ${productData.name}`);
        continue;
      }

      const [product] = await db.insert(schema.products).values({
        name: productData.name,
        description: productData.description,
        categoryId: category.id,
        genderId: gender.id,
        brandId: nike.id,
        isPublished: true,
      }).returning();

      console.log(`  📦 Created product: ${product.name}`);

      const productColors = getRandomElements(insertedColors, Math.floor(Math.random() * 3) + 2);
      const productSizes = getRandomElements(insertedSizes, Math.floor(Math.random() * 6) + 6);
      const variants = [];

      for (const color of productColors) {
        for (const size of productSizes) {
          const basePrice = 80 + Math.floor(Math.random() * 120);
          const hasSale = Math.random() > 0.7;
          const salePrice = hasSale ? basePrice * 0.8 : null;

          const [variant] = await db.insert(schema.productVariants).values({
            productId: product.id,
            sku: `NIKE-${product.id.slice(0, 8)}-${color.slug}-${size.slug}`.toUpperCase(),
            price: basePrice.toFixed(2),
            salePrice: salePrice?.toFixed(2),
            colorId: color.id,
            sizeId: size.id,
            inStock: Math.floor(Math.random() * 50) + 10,
            weight: 0.8 + Math.random() * 0.4,
            dimensions: {
              length: 30 + Math.random() * 5,
              width: 12 + Math.random() * 3,
              height: 10 + Math.random() * 2,
            },
          }).returning();

          variants.push({ variant, color });
        }
      }

      console.log(`    ✨ Created ${variants.length} variants`);

      if (variants.length > 0) {
        await db.update(schema.products)
          .set({ defaultVariantId: variants[0].variant.id })
          .where(eq(schema.products.id, product.id));
      }

      const variantsByColor = variants.reduce((acc, { variant, color }) => {
        if (!acc[color.id]) acc[color.id] = [];
        acc[color.id].push(variant);
        return acc;
      }, {} as Record<string, typeof variants[0]['variant'][]>);

      let imageIndex = 0;
      for (const [colorId, colorVariants] of Object.entries(variantsByColor)) {
        const shouldAddImages = Math.random() > 0.3;
        
        if (shouldAddImages && imageIndex < imageFiles.length) {
          const numImages = Math.min(Math.floor(Math.random() * 2) + 1, imageFiles.length - imageIndex);
          
          for (let imgIdx = 0; imgIdx < numImages; imgIdx++) {
            const imageFile = imageFiles[imageIndex];
            await db.insert(schema.productImages).values({
              productId: product.id,
              variantId: colorVariants[0].id,
              url: `/static/uploads/${imageFile}`,
              sortOrder: imgIdx,
              isPrimary: imgIdx === 0,
            });
            imageIndex++;
          }
        }
      }

      const generalImageCount = Math.min(2, imageFiles.length - imageIndex);
      for (let imgIdx = 0; imgIdx < generalImageCount; imgIdx++) {
        const imageFile = imageFiles[imageIndex];
        await db.insert(schema.productImages).values({
          productId: product.id,
          variantId: null,
          url: `/static/uploads/${imageFile}`,
          sortOrder: imgIdx + 100,
          isPrimary: false,
        });
        imageIndex++;
      }

      if (i < 5) {
        const productCollectionsData = getRandomElements(insertedCollections, Math.floor(Math.random() * 2) + 1);
        for (const collection of productCollectionsData) {
          await db.insert(schema.productCollections).values({
            productId: product.id,
            collectionId: collection.id,
          });
        }
      }

      console.log(`    📷 Added images for ${product.name}\n`);
    }

    console.log('✅ Database seeded successfully!');
    console.log(`\n📊 Summary:`);
    console.log(`   - ${insertedColors.length} colors`);
    console.log(`   - ${insertedSizes.length} sizes`);
    console.log(`   - ${insertedGenders.length} genders`);
    console.log(`   - 1 brand (Nike)`);
    console.log(`   - ${insertedCategories.length} categories`);
    console.log(`   - ${insertedCollections.length} collections`);
    console.log(`   - ${NIKE_PRODUCTS.length} products with variants`);
    console.log(`   - ${imageFiles.length} product images\n`);

  } catch (error) {
    console.error('❌ Error seeding database:', error);
    throw error;
  }
}

seed()
  .then(() => {
    console.log('🎉 Seed completed!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('💥 Seed failed:', error);
    process.exit(1);
  });
