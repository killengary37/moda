import { pgTable, uuid, integer, text, timestamp } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';
import { products } from './products';

export const reviews = pgTable('reviews', {
  id: uuid('id').primaryKey().defaultRandom(),
  productId: uuid('product_id').notNull(),
  userId: uuid('user_id').notNull(),
  rating: integer('rating').notNull(),
  comment: text('comment'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});

export const reviewsRelations = relations(reviews, ({ one }) => ({
  product: one(products, {
    fields: [reviews.productId],
    references: [products.id],
  }),
}));

export const insertReviewSchema = createInsertSchema(reviews, {
  rating: z.number().int().min(1).max(5),
});
export const selectReviewSchema = createSelectSchema(reviews);

export type Review = z.infer<typeof selectReviewSchema>;
export type NewReview = z.infer<typeof insertReviewSchema>;
