# My Portfolio

A full-stack developer portfolio and blog built with Next.js 14, featuring an admin dashboard for managing projects and blog posts, rich text editing, image uploads, and a contact form.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| **Framework** | Next.js 14 (App Router) |
| **Language** | TypeScript |
| **Database** | PostgreSQL (Neon) |
| **ORM** | Prisma 5 |
| **Auth** | NextAuth.js 4 (Credentials + JWT) |
| **Styling** | Tailwind CSS 4, shadcn/ui |
| **Rich Text** | TipTap |
| **Images** | Cloudinary |
| **Email** | Resend |
| **Deployment** | Vercel |

## Features

### Public Site

- **Home** — Hero section with featured projects
- **Projects** — Filterable project grid with tech stack badges, GitHub/live links, and images
- **Blog** — Published posts with rich HTML content, excerpts, and publication dates
- **Contact** — Form that sends emails via Resend
- **Dark Mode** — System-aware theme toggle with persistent preference

### Admin Dashboard (`/admin`)

- **Dashboard** — Stats overview (total projects, posts, published count)
- **Project Management** — Create, edit, delete projects with image uploads and featured flags
- **Blog Management** — Draft/publish workflow, rich text editor with inline image uploads
- **Auth** — Protected routes with email/password login

### Rich Text Editor

- Bold, italic, strikethrough, headings (H1-H3)
- Bullet and ordered lists
- Code blocks and inline code
- Links with URL prompt
- Inline image uploads (drag-and-drop to Cloudinary)
- Blockquotes, dividers, undo/redo

### Image Uploads

- Drag-and-drop or click to upload
- Cloudinary CDN with secure URLs
- File type validation (JPEG, PNG, WebP, GIF)
- Replace and remove actions with hover overlay

## Project Structure

```
src/
├── app/
│   ├── (public)/              # Public routes
│   │   ├── page.tsx           # Home
│   │   ├── blog/              # Blog listing + [slug] detail
│   │   ├── projects/          # Projects listing
│   │   └── contact/           # Contact form
│   ├── admin/                 # Protected admin panel
│   │   ├── page.tsx           # Dashboard
│   │   ├── blog/              # Blog CRUD
│   │   └── projects/          # Project CRUD
│   ├── api/
│   │   ├── auth/[...nextauth] # Auth endpoints
│   │   ├── blog/              # Blog REST API
│   │   ├── projects/          # Projects REST API
│   │   ├── contact/           # Contact form handler
│   │   └── upload/            # Cloudinary image upload
│   └── login/                 # Login page
├── components/
│   ├── Navbar.tsx             # Public navigation
│   ├── AdminNav.tsx           # Admin sidebar navigation
│   ├── ThemeToggle.tsx        # Dark/light mode switcher
│   ├── RichTextEditor.tsx     # TipTap editor with toolbar
│   ├── ImageUpload.tsx        # Drag-and-drop image upload
│   ├── ContactForm.tsx        # Contact form
│   ├── ProjectCard.tsx        # Project display card
│   ├── BlogCard.tsx           # Blog post card
│   ├── Providers.tsx          # Session + Theme providers
│   └── ui/                    # shadcn/ui components
├── lib/
│   ├── auth.ts                # NextAuth configuration
│   ├── prisma.ts              # Prisma client singleton
│   └── utils.ts               # Utility functions
└── types/
    └── index.ts               # TypeScript interfaces
```

## Database Schema

**Project** — `id`, `title`, `description`, `techStack[]`, `githubUrl?`, `liveUrl?`, `imageUrl?`, `featured`, `createdAt`, `updatedAt`

**Post** — `id`, `title`, `slug` (unique), `content`, `excerpt?`, `published`, `publishedAt?`, `createdAt`, `updatedAt`

## API Routes

| Method | Route | Auth | Description |
|--------|-------|------|-------------|
| GET | `/api/projects` | No | List all projects |
| POST | `/api/projects` | Yes | Create project |
| GET | `/api/projects/[id]` | No | Get project |
| PUT | `/api/projects/[id]` | Yes | Update project |
| DELETE | `/api/projects/[id]` | Yes | Delete project |
| GET | `/api/blog` | No | List posts (published or all) |
| POST | `/api/blog` | Yes | Create post |
| GET | `/api/blog/[id]` | No | Get post |
| PUT | `/api/blog/[id]` | Yes | Update post |
| DELETE | `/api/blog/[id]` | Yes | Delete post |
| POST | `/api/contact` | No | Send contact email |
| POST | `/api/upload` | Yes | Upload image to Cloudinary |

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL database (e.g., [Neon](https://neon.tech))
- [Cloudinary](https://cloudinary.com) account
- [Resend](https://resend.com) API key

### Installation

```bash
git clone https://github.com/Deepak10010/my-portfolio.git
cd my-portfolio
npm install
```

### Environment Variables

Create a `.env` file for Prisma:

```env
DATABASE_URL="postgresql://user:password@host/dbname?sslmode=require"
```

Create a `.env.local` file for the application:

```env
DATABASE_URL="postgresql://user:password@host/dbname?sslmode=require"

NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-here"

ADMIN_EMAIL="your-email@example.com"
ADMIN_PASSWORD="your-secure-password"

NEXT_PUBLIC_URL="http://localhost:3000"

RESEND_API_KEY="re_your_api_key"
CONTACT_EMAIL="your-email@example.com"

CLOUDINARY_CLOUD_NAME="your-cloud-name"
CLOUDINARY_API_KEY="your-api-key"
CLOUDINARY_API_SECRET="your-api-secret"
```

### Database Setup

```bash
npx prisma db push
npx prisma db seed    # optional — seeds sample data
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Log in at `/login` with your admin credentials.

## Deployment (Vercel)

1. Push the repo to GitHub
2. Import the repo in [Vercel](https://vercel.com)
3. Add all environment variables from `.env.local` to the Vercel project settings
4. Update `NEXTAUTH_URL` and `NEXT_PUBLIC_URL` to your Vercel domain
5. Deploy

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server |
| `npm run build` | Generate Prisma client and build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run db:push` | Push Prisma schema to database |
| `npm run db:studio` | Open Prisma Studio |
| `npm run db:generate` | Generate Prisma client |
| `npm run db:seed` | Seed the database |

## License

MIT
