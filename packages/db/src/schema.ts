import { pgTable, uuid, varchar, date, timestamp, jsonb, integer, pgEnum } from 'drizzle-orm/pg-core'

export const roleEnum = pgEnum('role', ['user', 'admin'])
export const riskLevelEnum = pgEnum('risk_level', ['low', 'moderate', 'high'])

export const users = pgTable('users', {
  id: uuid('id').defaultRandom().primaryKey(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  passwordHash: varchar('password_hash', { length: 255 }).notNull(),
  name: varchar('name', { length: 255 }).notNull(),
  role: roleEnum('role').notNull().default('user'),
  dateOfBirth: date('date_of_birth'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

export const assessments = pgTable('assessments', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: uuid('user_id').references(() => users.id, { onDelete: 'cascade' }).notNull(),
  personalData: jsonb('personal_data').notNull(),
  symptomsData: jsonb('symptoms_data').notNull(),
  hormonalData: jsonb('hormonal_data'),
  lifestyleData: jsonb('lifestyle_data').notNull(),
  aiAnalysis: jsonb('ai_analysis'),
  riskScore: integer('risk_score'),
  riskLevel: riskLevelEnum('risk_level'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
})

export const auditLogs = pgTable('audit_logs', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: uuid('user_id').references(() => users.id, { onDelete: 'cascade' }),
  action: varchar('action', { length: 255 }).notNull(),
  resourceType: varchar('resource_type', { length: 255 }).notNull(),
  resourceId: varchar('resource_id', { length: 255 }),
  details: jsonb('details'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
})

import { relations } from 'drizzle-orm'

export const usersRelations = relations(users, ({ many }) => ({
  assessments: many(assessments),
  auditLogs: many(auditLogs),
}))

export const assessmentsRelations = relations(assessments, ({ one }) => ({
  user: one(users, {
    fields: [assessments.userId],
    references: [users.id],
  }),
}))

export const auditLogsRelations = relations(auditLogs, ({ one }) => ({
  user: one(users, {
    fields: [auditLogs.userId],
    references: [users.id],
  }),
}))
