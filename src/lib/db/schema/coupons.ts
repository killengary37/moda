import { pgTable, uuid, varchar, numeric, integer, timestamp, pgEnum } from 'drizzle-orm/pg-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';

export const discountTypeEnum = pgEnum('discount_type', ['percentage', 'fixed']);

export const coupons = pgTable('coupons', {
  id: uuid('id').primaryKey().defaultRandom(),
  code: varchar('code', { length: 50 }).notNull().unique(),
  discountType: discountTypeEnum('discount_type').notNull(),
  discountValue: numeric('discount_value', { precision: 10, scale: 2 }).notNull(),
  expiresAt: timestamp('expires_at'),
  maxUsage: integer('max_usage'),
  usedCount: integer('used_count').notNull().default(0),
});

export const insertCouponSchema = createInsertSchema(coupons);
export const selectCouponSchema = createSelectSchema(coupons);

export type Coupon = z.infer<typeof selectCouponSchema>;
export type NewCoupon = z.infer<typeof insertCouponSchema>;
