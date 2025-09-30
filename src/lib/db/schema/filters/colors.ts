import { pgTable, uuid, varchar } from 'drizzle-orm/pg-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';

export const colors = pgTable('colors', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 50 }).notNull(),
  slug: varchar('slug', { length: 50 }).notNull().unique(),
  hexCode: varchar('hex_code', { length: 7 }).notNull(),
});

export const insertColorSchema = createInsertSchema(colors);
export const selectColorSchema = createSelectSchema(colors);

export type Color = z.infer<typeof selectColorSchema>;
export type NewColor = z.infer<typeof insertColorSchema>;
