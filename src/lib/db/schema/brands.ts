import { pgTable, uuid, varchar } from 'drizzle-orm/pg-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';

export const brands = pgTable('brands', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 100 }).notNull(),
  slug: varchar('slug', { length: 100 }).notNull().unique(),
  logoUrl: varchar('logo_url', { length: 500 }),
});

export const insertBrandSchema = createInsertSchema(brands);
export const selectBrandSchema = createSelectSchema(brands);

export type Brand = z.infer<typeof selectBrandSchema>;
export type NewBrand = z.infer<typeof insertBrandSchema>;
