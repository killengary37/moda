import { pgTable, uuid, varchar, numeric, integer, real, jsonb, timestamp } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';
import { products } from './products';
import { colors } from './filters/colors';
import { sizes } from './filters/sizes';
import { productImages } from './images';
import { cartItems } from './carts';
import { orderItems } from './orders';

export const productVariants = pgTable('product_variants', {
  id: uuid('id').primaryKey().defaultRandom(),
  productId: uuid('product_id').notNull(),
  sku: varchar('sku', { length: 100 }).notNull().unique(),
  price: numeric('price', { precision: 10, scale: 2 }).notNull(),
  salePrice: numeric('sale_price', { precision: 10, scale: 2 }),
  colorId: uuid('color_id').notNull(),
  sizeId: uuid('size_id').notNull(),
  inStock: integer('in_stock').notNull().default(0),
  weight: real('weight'),
  dimensions: jsonb('dimensions').$type<{ length: number; width: number; height: number }>(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});

export const productVariantsRelations = relations(productVariants, ({ one, many }) => ({
  product: one(products, {
    fields: [productVariants.productId],
    references: [products.id],
  }),
  color: one(colors, {
    fields: [productVariants.colorId],
    references: [colors.id],
  }),
  size: one(sizes, {
    fields: [productVariants.sizeId],
    references: [sizes.id],
  }),
  images: many(productImages),
  cartItems: many(cartItems),
  orderItems: many(orderItems),
}));

export const insertProductVariantSchema = createInsertSchema(productVariants);
export const selectProductVariantSchema = createSelectSchema(productVariants);

export type ProductVariant = z.infer<typeof selectProductVariantSchema>;
export type NewProductVariant = z.infer<typeof insertProductVariantSchema>;
