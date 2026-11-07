# FrostMine Website

A responsive static website for [frostmine.xyz](https://frostmine.xyz), built with plain HTML, CSS and JavaScript.

## Included

- Home / landing page with FrostMine branding and copy-IP buttons
- Server rules section
- Live Java server status and player count via the mcsrvstat.us status API
- Discord community section
- Mobile navigation and responsive styling

There is intentionally **no store, leaderboard or voting section**.

## Configure

Open `script.js` and edit the settings at the top:

```js
const FROSTMINE_CONFIG = {
  serverAddress: "frostmine.xyz",
  discordInvite: "https://discord.gg/frostmine"
};
```

The FrostMine Discord invite is already configured as `https://discord.gg/frostmine`.

Review the starter rules in `index.html` and replace them with FrostMine's official rules before publishing.

## Publish with GitHub Pages

1. Open the repository **Settings**.
2. Select **Pages** in the sidebar.
3. Under **Build and deployment**, choose **Deploy from a branch**.
4. Select branch **main** and folder **/(root)**, then save.
5. After GitHub Pages finishes deploying, add the provided Pages address to your domain's DNS and set up the custom domain `frostmine.xyz` in the Pages settings.

This is a static site; no Node.js build step or server hosting is required.
