# Rail Gun - Marketing & Download Site

Marketing and download landing page for Rail Gun, the secure private messaging application.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## 📁 Project Structure

```
railgun-site/
├── src/
│   ├── app/                 # Next.js App Router pages
│   │   ├── layout.tsx       # Root layout with metadata
│   │   ├── page.tsx         # Home page
│   │   ├── privacy/         # Privacy policy page
│   │   ├── terms/           # Terms of service page
│   │   ├── security/        # Security information page
│   │   ├── sitemap.ts       # Dynamic sitemap
│   │   └── robots.ts        # Robots.txt configuration
│   ├── components/          # React components
│   │   ├── header.tsx       # Navigation header
│   │   ├── hero.tsx         # Hero section
│   │   ├── features.tsx     # Features grid
│   │   ├── downloads.tsx    # Download cards
│   │   ├── security.tsx     # Security section
│   │   ├── platforms.tsx    # Platform availability
│   │   ├── cta.tsx          # Call-to-action section
│   │   └── footer.tsx       # Site footer
│   └── lib/                 # Utilities and config
│       ├── config.ts        # Site configuration
│       └── utils.ts         # Utility functions
├── public/                  # Static assets
│   ├── downloads/           # Downloadable files (or redirects)
│   └── site.webmanifest     # PWA manifest
├── .github/workflows/       # GitHub Actions CI/CD
└── vercel.json              # Vercel configuration
```

## 🔧 Configuration

### Environment Variables

Copy `.env.example` to `.env.local` and configure:

```bash
cp .env.example .env.local
```

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_SITE_URL` | Production site URL |
| `NEXT_PUBLIC_WEB_APP_URL` | Web app URL for CTAs |
| `NEXT_PUBLIC_GITHUB_URL` | GitHub repository URL |

### Site Configuration

Edit `src/lib/config.ts` to update:

- Site name and description
- Download URLs and versions
- Social links
- Navigation links

## 🚢 Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Configure environment variables
4. Deploy

The site is configured for static export, making it fast and cacheable.

### Manual Deployment

```bash
# Build static site
npm run build

# Output is in ./out directory
# Deploy to any static hosting (Netlify, Cloudflare Pages, S3, etc.)
```

## 🎨 Customization

### Colors

Edit `tailwind.config.ts` to customize the color palette:

```typescript
colors: {
  background: {
    primary: '#0f0f10',
    secondary: '#1a1a1c',
    elevated: '#242428',
  },
  accent: {
    DEFAULT: '#6366f1',
    hover: '#4f46e5',
  },
  // ...
}
```

### Typography

The site uses system fonts for optimal performance. To add custom fonts, update `tailwind.config.ts` and import them in `globals.css`.

## 📊 Analytics & Monitoring

### Recommended Services

- **Analytics**: [Vercel Analytics](https://vercel.com/analytics), [Plausible](https://plausible.io), or [Fathom](https://usefathom.com)
- **Error Tracking**: [Sentry](https://sentry.io)
- **Uptime**: [Better Stack](https://betterstack.com) or [Checkly](https://www.checklyhq.com)

### Adding Analytics

1. Install the analytics package
2. Add tracking code to `src/app/layout.tsx`
3. Configure environment variables

## 🔒 Security

- All pages use security headers (X-Frame-Options, CSP, etc.)
- No external scripts by default
- Static export minimizes attack surface
- Downloads redirect to GitHub releases for verification

## 📝 SEO

- Automatic sitemap generation at `/sitemap.xml`
- Robots.txt configuration
- Open Graph and Twitter Card metadata
- Semantic HTML structure

## 🤝 Related Repositories

- [Rail Gun (Main App)](https://github.com/ZRosserMcIntosh/railgun) - Desktop application
- Rail Gun Web - Web application (coming soon)
- Rail Gun Mobile - iOS/Android apps (coming soon)

## 📄 License

MIT License - See [LICENSE](LICENSE) for details.
