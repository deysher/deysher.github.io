# Portfolio

A static, self-coded portfolio that redeploys itself automatically on every push.
No framework, no build step — just `index.html`, `style.css`, and `script.js`.
The projects section fetches your repos live from the GitHub REST API, so you
never have to hand-edit a project list again.

## 1. Personalize it

- In `script.js`, set `GITHUB_USERNAME` to your actual GitHub username.
- In `index.html`, update the email/GitHub/LinkedIn links in the `#contact`
  section, and the placeholder `github.com/yourusername` text.
- Edit the `#about` section copy to describe yourself.

Open `index.html` directly in a browser to preview locally — no server needed.

## 2. Push it to GitHub

```bash
cd portfolio
git init
git add .
git commit -m "Initial portfolio"
git branch -M main
git remote add origin https://github.com/yourusername/yourusername.github.io.git
git push -u origin main
```

Tip: naming the repo `yourusername.github.io` gives you the cleanest possible
URL. Any repo name works too — GitHub Pages will just serve it at
`yourusername.github.io/repo-name`.

## 3. Turn on GitHub Pages (one-time)

1. On GitHub, go to your repo → **Settings → Pages**.
2. Under **Build and deployment → Source**, choose **GitHub Actions**.
3. That's it — the included workflow at
   `.github/workflows/deploy.yml` will build and deploy automatically on
   every push to `main`. Check the **Actions** tab to watch it run.

Your site will be live at the URL shown on the Pages settings page within
a minute or two.

## 4. Optional: custom domain

Add a `CNAME` file to the repo root containing your domain
(e.g. `yourname.dev`), then point your domain's DNS at GitHub Pages per
[GitHub's custom domain docs](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site).
GitHub Pages settings will confirm once DNS is verified.

## From here on

Every future update is just:

```bash
git add .
git commit -m "Update portfolio"
git push
```

The Action rebuilds and redeploys automatically — nothing else to manage.
