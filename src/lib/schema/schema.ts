import {
  pgTable,
  uuid,
  serial,
  varchar,
  text,
  timestamp,
  integer,
  doublePrecision,
  primaryKey,
} from "drizzle-orm/pg-core";

// users
export const users = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  username: varchar("username", { length: 50 }).notNull().unique(),
  passwordHash: varchar("password_hash", { length: 255 }).notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

// recipes
export const recipes = pgTable("recipes", {
  id: serial("id").primaryKey(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "set null" }),
  name: varchar("name", { length: 100 }).notNull(),
  instructions: text("instructions").notNull(),
  prepTime: integer("prep_time_minutes").notNull(),
  cookTime: integer("cook_time_minutes").notNull(),
  servings: integer("servings").notNull(),
  difficulty: varchar("difficulty", { length: 20 }).notNull(),
  cuisine: varchar("cuisine", { length: 50 }).notNull(),
  calories: integer("calories_per_serving").notNull(),
  rating: doublePrecision("rating"),
  reviewCount: integer("review_count"),
  image: varchar("image", { length: 255 }).notNull(),
});

// ingredients
export const ingredients = pgTable("ingredients", {
  id: serial("id").primaryKey(),
  recipeId: integer("recipe_id").references(() => recipes.id, {
    onDelete: "cascade",
  }),
  name: varchar("name", { length: 100 }).notNull(),
});

// tags
export const tags = pgTable("tags", {
  id: serial("id").primaryKey(),
  recipeId: integer("recipe_id").references(() => recipes.id, {
    onDelete: "cascade",
  }),
  tag: varchar("tag", { length: 50 }).notNull(),
});

// meal_types
export const mealTypes = pgTable("meal_types", {
  id: serial("id").primaryKey(),
  recipeId: integer("recipe_id").references(() => recipes.id, {
    onDelete: "cascade",
  }),
  mealType: varchar("meal_type", { length: 50 }).notNull(),
});

// cookbook_notes
export const cookbookNotes = pgTable("cookbook_notes", {
  id: serial("id").primaryKey(),
  recipeId: integer("recipe_id").references(() => recipes.id, {
    onDelete: "cascade",
  }),
  userId: uuid("user_id").references(() => users.id, { onDelete: "cascade" }),
  note: text("note"),
});

// saved_recipes
export const savedRecipes = pgTable(
  "saved_recipes",
  {
    userId: uuid("user_id")
      .references(() => users.id)
      .notNull(),
    recipeId: integer("recipe_id")
      .references(() => recipes.id)
      .notNull(),
    savedAt: timestamp("saved_at").defaultNow(),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.userId, table.recipeId] }),
  })
);
