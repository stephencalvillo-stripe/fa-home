# Hosting the FA Home prototype

Share a link so your team can view the dashboard without opening files locally.

---

## Option 1: GitHub Pages (recommended — free, no signup)

Your repo is already on GitHub. Turn on Pages and the site is live in about a minute.

### Steps

1. Open your repo: **https://github.com/stephencalvillo-stripe/fa-home**
2. Click **Settings** (tab at the top).
3. In the left sidebar, click **Pages** (under "Code and automation").
4. Under **Build and deployment**:
   - **Source:** Deploy from a branch
   - **Branch:** `main` (or `master`)
   - **Folder:** `/ (root)`
5. Click **Save**.

After a minute or two, the site will be at:

**https://stephencalvillo-stripe.github.io/fa-home/**

(If your org is different, the URL is `https://<org-or-username>.github.io/fa-home/`.)

Use the URL **with a trailing slash** so CSS and assets load correctly. The page also injects a `<base>` tag when served from GitHub so links work if someone visits without the slash.

Share that link; it will load `index.html` automatically. Pushing to `main` updates the live site.

---

## Option 2: Vercel (free, custom domain optional)

1. Go to **https://vercel.com** and sign in (e.g. with GitHub).
2. Click **Add New…** → **Project**.
3. Import **stephencalvillo-stripe/fa-home** from GitHub (authorize if asked).
4. Leave build settings as default (no build command needed for static HTML).
5. Click **Deploy**.

Vercel will give you a URL like `fa-home-xxx.vercel.app`. You can add a custom domain later in Project Settings.

---

## After hosting

- Add the live URL to the main **README.md** under "Quick start" so the team can find it.
- GitHub Pages: updates automatically on every push to the selected branch.
- Vercel: also auto-deploys on push if you connected the GitHub repo.
