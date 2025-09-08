import { pgTable, uuid, varchar, timestamp } from 'drizzle-orm/pg-core';

export const guests = pgTable('guest', {
  id: uuid('id').primaryKey().defaultRandom(),
  sessionToken: varchar('session_token', { length: 255 }).notNull().unique(),
  createdAt: timestamp('created_at', { mode: 'date' }).notNull().defaultNow(),
  expiresAt: timestamp('expires_at', { mode: 'date' }).notNull(),
});

export type Guest = typeof guests.$inferSelect;
export type NewGuest = typeof guests.$inferInsert;
