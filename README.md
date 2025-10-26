# BodaSergioMery.github.io

This small PR prepares the repository to be published as a GitHub Pages project site at:

https://mldiego.github.io/BodaSergioMery.github.io/

What this PR does:
- Adds a minimal index.html at the repository root to ensure GitHub Pages has an index to serve.
- Adds a .nojekyll file to disable Jekyll processing so static assets and folders starting with underscores are served unchanged.

How to finish publishing the site:
1. Ensure the repository branch (main) is selected as the Pages source in Settings → Pages and the folder is set to / (root).
2. Wait a few minutes for GitHub Pages to deploy, then visit the URL above.
3. Replace the index.html in this PR with your real site entrypoint or move your site files to the repository root.

If you prefer a different branch (e.g., gh-pages) or a /docs folder, change the Pages source in Settings → Pages after merging.
