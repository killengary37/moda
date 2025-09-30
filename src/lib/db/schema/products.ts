import { pgTable, uuid, varchar, text, boolean, timestamp } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';
import { categories } from './categories';
import { genders } from './filters/genders';
import { brands } from './brands';
import { productVariants } from './variants';
import { productImages } from './images';
import { reviews } from './reviews';
import { wishlists } from './wishlists';
import { productCollections } from './collections';

export const products = pgTable('products', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 255 }).notNull(),
  description: text('description'),
  categoryId: uuid('category_id').notNull(),
  genderId: uuid('gender_id').notNull(),
  brandId: uuid('brand_id').notNull(),
  isPublished: boolean('is_published').notNull().default(false),
  defaultVariantId: uuid('default_variant_id'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

export const productsRelations = relations(products, ({ one, many }) => ({
  category: one(categories, {
    fields: [products.categoryId],
    references: [categories.id],
  }),
  gender: one(genders, {
    fields: [products.genderId],
    references: [genders.id],
  }),
  brand: one(brands, {
    fields: [products.brandId],
    references: [brands.id],
  }),
  defaultVariant: one(productVariants, {
    fields: [products.defaultVariantId],
    references: [productVariants.id],
    relationName: 'product_default_variant',
  }),
  variants: many(productVariants),
  images: many(productImages),
  reviews: many(reviews),
  wishlists: many(wishlists),
  productCollections: many(productCollections),
}));

export const insertProductSchema = createInsertSchema(products);
export const selectProductSchema = createSelectSchema(products);

export type Product = z.infer<typeof selectProductSchema>;
export type NewProduct = z.infer<typeof insertProductSchema>;
