YummY-WebApp/
├── app/                           # Next.js App Router Pages (Frontend) 
│   ├── layout.tsx                  
│   ├── page.tsx                    
│
│   ├── recipes/                    
│   │   ├── page.tsx                # Rezepte-Liste
│   │   └── [id]/page.tsx           # Einzelrezept
│
│   ├── dashboard/                  
│   │   ├── page.tsx                # Dashboard-Übersicht
│   │   ├── my-recipes/             # Eigene erstellte Rezepte
│   │   │   ├── page.tsx
│   │   │   └── [id]/edit/page.tsx  # Rezept bearbeiten
│   │   ├── cookbook/               # Gespeicherte Rezepte mit Notizen
│   │   │   └── page.tsx
│   │   └── profile/                # Benutzerprofil
│   │       └── page.tsx
│
│   ├── auth/                       # Login / Registrierung
│   │   ├── login/page.tsx
│   │   └── register/page.tsx
│
├── components/                     
│   ├── RecipeCard.tsx
│   ├── RecipeForm.tsx
│   ├── DashboardNav.tsx
│   ├── ProfileForm.tsx
│   └── SearchBar.tsx
│
├── lib/                            # DB, Auth, Hilfsfunktionen
│   ├── db.ts                       # Drizzle DB-Client mit Neon
│   ├── auth.ts                     # Session-/Auth-Helper
│   └── utils.ts                    # z.B. Slug- oder Format-Helper
│
├── lib/schema/                     # Drizzle ORM-Datenbankschema
│   ├── schema.ts                   # Tabellen (users, recipes, etc.)
│
├── drizzle.config.ts               # Drizzle Migrations-Konfiguration
├── drizzle/                        # Automatisch generierte Migrationen
│
├── scripts/                        # Manuelle Tools/Skripte
│   └── seed.ts                     # DummyJSON-Import & Seed
│
├── types/                          # TypeScript-Typdefinitionen
│   ├── recipe.d.ts
│   ├── user.d.ts
│   └── cookbook.d.ts
│
├── pages/api/                      # Next.js API Routes (Backend)
│   ├── auth/
│   │   └── [...nextauth].ts        # Optional mit NextAuth.js
│   ├── recipes/
│   │   ├── index.ts                # GET/POST Rezepte
│   │   └── [id].ts                 # PUT/DELETE Einzelrezept
│   ├── cookbook/
│   │   └── [recipeId].ts           # Favoriten speichern/löschen
│   ├── profile/update.ts           # Benutzerprofil aktualisieren
│   └── seed.ts                     # Rezepte importieren
│
├── styles/
│   └── globals.css                 # TailwindCSS + Custom Styles
│
├── public/                         # Statische Assets (z. B. Bilder)
│   └── logo.svg
│
├── .env                            # Umgebungsvariablen (DB-URL, Auth-Secret)
├── tsconfig.json                   # TypeScript-Konfiguration
├── next.config.js                  # Next.js-Konfiguration
├── package.json                    # NPM-Dependencies & Scripts
└── README.md                       # Projektübersicht & Setup-Anleitung
