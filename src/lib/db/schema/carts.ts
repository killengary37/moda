import { pgTable, uuid, varchar, integer, timestamp } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';
import { productVariants } from './variants';

export const carts = pgTable('carts', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id'),
  guestId: varchar('guest_id', { length: 255 }),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

export const cartItems = pgTable('cart_items', {
  id: uuid('id').primaryKey().defaultRandom(),
  cartId: uuid('cart_id').notNull(),
  productVariantId: uuid('product_variant_id').notNull(),
  quantity: integer('quantity').notNull().default(1),
});

export const cartsRelations = relations(carts, ({ many }) => ({
  items: many(cartItems),
}));

export const cartItemsRelations = relations(cartItems, ({ one }) => ({
  cart: one(carts, {
    fields: [cartItems.cartId],
    references: [carts.id],
  }),
  productVariant: one(productVariants, {
    fields: [cartItems.productVariantId],
    references: [productVariants.id],
  }),
}));

export const insertCartSchema = createInsertSchema(carts);
export const selectCartSchema = createSelectSchema(carts);
export const insertCartItemSchema = createInsertSchema(cartItems);
export const selectCartItemSchema = createSelectSchema(cartItems);

export type Cart = z.infer<typeof selectCartSchema>;
export type NewCart = z.infer<typeof insertCartSchema>;
export type CartItem = z.infer<typeof selectCartItemSchema>;
export type NewCartItem = z.infer<typeof insertCartItemSchema>;
