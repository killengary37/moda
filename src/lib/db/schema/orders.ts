import { pgTable, uuid, numeric, integer, varchar, timestamp, pgEnum } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';
import { addresses } from './addresses';
import { productVariants } from './variants';

export const orderStatusEnum = pgEnum('order_status', ['pending', 'paid', 'shipped', 'delivered', 'cancelled']);
export const paymentMethodEnum = pgEnum('payment_method', ['stripe', 'paypal', 'cod']);
export const paymentStatusEnum = pgEnum('payment_status', ['initiated', 'completed', 'failed']);

export const orders = pgTable('orders', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').notNull(),
  status: orderStatusEnum('status').notNull().default('pending'),
  totalAmount: numeric('total_amount', { precision: 10, scale: 2 }).notNull(),
  shippingAddressId: uuid('shipping_address_id').notNull(),
  billingAddressId: uuid('billing_address_id').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});

export const orderItems = pgTable('order_items', {
  id: uuid('id').primaryKey().defaultRandom(),
  orderId: uuid('order_id').notNull(),
  productVariantId: uuid('product_variant_id').notNull(),
  quantity: integer('quantity').notNull(),
  priceAtPurchase: numeric('price_at_purchase', { precision: 10, scale: 2 }).notNull(),
});

export const payments = pgTable('payments', {
  id: uuid('id').primaryKey().defaultRandom(),
  orderId: uuid('order_id').notNull(),
  method: paymentMethodEnum('method').notNull(),
  status: paymentStatusEnum('status').notNull().default('initiated'),
  paidAt: timestamp('paid_at'),
  transactionId: varchar('transaction_id', { length: 255 }),
});

export const ordersRelations = relations(orders, ({ one, many }) => ({
  shippingAddress: one(addresses, {
    fields: [orders.shippingAddressId],
    references: [addresses.id],
    relationName: 'order_shipping_address',
  }),
  billingAddress: one(addresses, {
    fields: [orders.billingAddressId],
    references: [addresses.id],
    relationName: 'order_billing_address',
  }),
  items: many(orderItems),
  payments: many(payments),
}));

export const orderItemsRelations = relations(orderItems, ({ one }) => ({
  order: one(orders, {
    fields: [orderItems.orderId],
    references: [orders.id],
  }),
  productVariant: one(productVariants, {
    fields: [orderItems.productVariantId],
    references: [productVariants.id],
  }),
}));

export const paymentsRelations = relations(payments, ({ one }) => ({
  order: one(orders, {
    fields: [payments.orderId],
    references: [orders.id],
  }),
}));

export const insertOrderSchema = createInsertSchema(orders);
export const selectOrderSchema = createSelectSchema(orders);
export const insertOrderItemSchema = createInsertSchema(orderItems);
export const selectOrderItemSchema = createSelectSchema(orderItems);
export const insertPaymentSchema = createInsertSchema(payments);
export const selectPaymentSchema = createSelectSchema(payments);

export type Order = z.infer<typeof selectOrderSchema>;
export type NewOrder = z.infer<typeof insertOrderSchema>;
export type OrderItem = z.infer<typeof selectOrderItemSchema>;
export type NewOrderItem = z.infer<typeof insertOrderItemSchema>;
export type Payment = z.infer<typeof selectPaymentSchema>;
export type NewPayment = z.infer<typeof insertPaymentSchema>;
