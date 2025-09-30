import { pgTable, uuid, varchar, timestamp } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';
import { products } from './products';

export const collections = pgTable('collections', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 100 }).notNull(),
  slug: varchar('slug', { length: 100 }).notNull().unique(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});

export const productCollections = pgTable('product_collections', {
  id: uuid('id').primaryKey().defaultRandom(),
  productId: uuid('product_id').notNull(),
  collectionId: uuid('collection_id').notNull(),
});

export const collectionsRelations = relations(collections, ({ many }) => ({
  productCollections: many(productCollections),
}));

export const productCollectionsRelations = relations(productCollections, ({ one }) => ({
  product: one(products, {
    fields: [productCollections.productId],
    references: [products.id],
  }),
  collection: one(collections, {
    fields: [productCollections.collectionId],
    references: [collections.id],
  }),
}));

export const insertCollectionSchema = createInsertSchema(collections);
export const selectCollectionSchema = createSelectSchema(collections);
export const insertProductCollectionSchema = createInsertSchema(productCollections);
export const selectProductCollectionSchema = createSelectSchema(productCollections);

export type Collection = z.infer<typeof selectCollectionSchema>;
export type NewCollection = z.infer<typeof insertCollectionSchema>;
export type ProductCollection = z.infer<typeof selectProductCollectionSchema>;
export type NewProductCollection = z.infer<typeof insertProductCollectionSchema>;
