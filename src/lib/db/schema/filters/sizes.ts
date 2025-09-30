import { pgTable, uuid, varchar, integer } from 'drizzle-orm/pg-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';

export const sizes = pgTable('sizes', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 10 }).notNull(),
  slug: varchar('slug', { length: 10 }).notNull().unique(),
  sortOrder: integer('sort_order').notNull().default(0),
});

export const insertSizeSchema = createInsertSchema(sizes);
export const selectSizeSchema = createSelectSchema(sizes);

export type Size = z.infer<typeof selectSizeSchema>;
export type NewSize = z.infer<typeof insertSizeSchema>;
