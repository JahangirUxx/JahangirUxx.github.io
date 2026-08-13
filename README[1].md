# Jahangir Hussain — Portfolio

React + Vite portfolio configured for GitHub Pages.

## Local development
```bash
npm install
npm run dev
```

## Production build
```bash
npm run build
```

## GitHub Pages
This repository includes a GitHub Actions workflow at:
`.github/workflows/deploy.yml`

After uploading the project to the repository `JahangirUxx.github.io`:

1. Open **Settings → Pages**.
2. Under **Build and deployment**, choose **GitHub Actions**.
3. Push/commit the files to the `main` branch.
4. GitHub Actions will build and deploy the `dist` folder.
5. Your site will be available at `https://JahangirUxx.github.io/`.

## Custom domain
After purchasing your domain, add it under **Settings → Pages → Custom domain** and configure the DNS records at your domain registrar. Update `public/sitemap.xml` to the final domain afterward.

## Contact form
The contact form uses Formspree. The project currently contains a placeholder endpoint.
For the live form, set the GitHub Actions repository secret:

`VITE_FORMSPREE_ENDPOINT`

to your Formspree endpoint, then redeploy.
