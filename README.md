# Meridian Journal

> Independent travel dispatches from writers who go where the story is.

A dark editorial travel blog built with React + Vite. Features: stories, photo journal, social feed, route comparisons, about page, and an AI writing assistant (Claude).

---

## 🚀 Deploy to Vercel in 5 minutes

### Step 1 — Push to GitHub

1. Go to [github.com](https://github.com) and create a **new repository** called `meridian`
2. On your machine, open a terminal and run:

```bash
# Navigate to this folder (wherever you unzipped it)
cd meridian

# Initialize git and push
git init
git add .
git commit -m "Initial commit — Meridian travel blog"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/meridian.git
git push -u origin main
```

Replace `YOUR_USERNAME` with your GitHub username.

---

### Step 2 — Deploy on Vercel

1. Go to [vercel.com](https://vercel.com) and sign in (free — use your GitHub account)
2. Click **"Add New Project"**
3. Import your `meridian` repository from GitHub
4. Vercel auto-detects Vite — no settings to change
5. Click **"Deploy"**

Your site will be live at `https://meridian-[hash].vercel.app` in about 60 seconds.

---

### Step 3 — Add a custom domain (optional)

1. In your Vercel project, go to **Settings → Domains**
2. Add your domain (e.g. `meridianjournal.com`)
3. Follow the DNS instructions to point your domain to Vercel

---

## 🔑 AI Writing Assistant

The Write page uses the Anthropic API. It works out of the box in this artifact environment. For your deployed site:

1. Get an API key at [console.anthropic.com](https://console.anthropic.com)
2. In Vercel dashboard → **Settings → Environment Variables**, add:
   ```
   VITE_ANTHROPIC_API_KEY=sk-ant-your-key-here
   ```
3. Update `src/App.jsx` — find the fetch call and replace the headers with:
   ```js
   headers: {
     "Content-Type": "application/json",
     "x-api-key": import.meta.env.VITE_ANTHROPIC_API_KEY,
     "anthropic-version": "2023-06-01",
   }
   ```

> ⚠️ For a production site, route the API call through a serverless function (Vercel Functions) so your key isn't exposed client-side.

---

## 🛠 Local development

```bash
# Install dependencies
npm install

# Start dev server at http://localhost:5173
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview
```

---

## 📁 Project structure

```
meridian/
├── index.html          # HTML entry point
├── vite.config.js      # Vite configuration
├── vercel.json         # Vercel SPA routing
├── package.json
├── .gitignore
├──favicon.svg     # Meridian compass favicon
├── main.jsx        # React entry — mounts App
├── index.css       # Global CSS reset
└── App.jsx         # Entire blog (single component file)
```

---

## ✏️ Customising content

All content is in `src/App.jsx`:

| What to change | Where in App.jsx |
|---|---|
| Your name / bio | `AboutPage` component + `POSTS` author fields |
| Blog posts | `POSTS` array |
| Photo journal | `PHOTOS` array |
| Social posts | `SOCIAL_POSTS` array |
| Routes | `ROUTES` array |
| Destinations | `DESTINATIONS` array |
| Colour scheme | `:root` CSS variables at top of `CSS` string |
| Site name | Search for `Meridian` / `Meri<span>dian</span>` |

---

## 📦 Tech stack

- **React 18** — UI
- **Vite 5** — build tool & dev server
- **Anthropic claude-sonnet** — AI writing assistant
- **Google Fonts** — Cormorant Garamond, Syne, JetBrains Mono
- Zero other dependencies

---

Built with [Claude](https://claude.ai) · Hosted on [Vercel](https://vercel.com)
