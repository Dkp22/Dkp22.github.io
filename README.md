# Unity WebGL Player Selection

A static webpage hosting multiple Unity WebGL builds with a selection screen.

## Project Structure
```
webglplayer/
├── index.html          # Selection screen for choosing between builds
├── webgl-player.html   # Dynamic player that loads the selected build
├── styles/
│   ├── main.css        # CSS styles for the selection screen
│   └── custom.css      # CSS styles for the WebGL player
├── webglBuild/         # "Andere Ufer" Unity WebGL build files
│   ├── Build/          # Unity build files
│   ├── TemplateData/   # Unity template assets
│   └── index.html      # Unity's original index.html
├── webGLBuild1/        # "Endlich Paul" Unity WebGL build files
│   ├── Build/          # Unity build files
│   ├── TemplateData/   # Unity template assets
│   └── index.html      # Unity's original index.html
├── server.js           # Node.js server for local development
├── .github/            # GitHub configuration files
│   └── workflows/      # GitHub Actions workflows
│       └── deploy.yml  # Deployment workflow for GitHub Pages
└── README.md           # Project documentation
```

## How It Works

1. The `index.html` file displays a selection screen with two buttons:
   - **Andere Ufer** - Loads the WebGL build from the `webglBuild` directory
   - **Endlich Paul** - Loads the WebGL build from the `webGLBuild1` directory

2. When a button is clicked, it navigates to `webgl-player.html` with a parameter indicating which build to load:
   - `?build=andere-ufer` for "Andere Ufer"
   - `?build=endlich-paul` for "Endlich Paul"

3. The `webgl-player.html` file reads the URL parameter and dynamically loads the appropriate WebGL build.

### Fallback Mechanism

The player implements a robust fallback mechanism that ensures compatibility with different build file formats:

1. The player first attempts to load uncompressed files (.data, .framework.js, .wasm)
2. If loading fails, it automatically attempts to load compressed files (.data.br, .framework.js.br, .wasm.br)
3. Detailed console logging helps in troubleshooting any loading issues

This approach ensures maximum compatibility across different Unity WebGL builds and server configurations.

> **Note:** When deployed on GitHub Pages, the system will only use uncompressed files as GitHub Pages doesn't support the proper Content-Encoding headers for Brotli-compressed files.

## Local Development
1. Clone the repository
2. Run the server:
   ```
   npm install
   node server.js
   ```
3. Open a browser and navigate to `http://localhost:8000`
4. Choose between the two WebGL builds

## Deployment to GitHub Pages

### Automatic Deployment
The repository includes a GitHub Actions workflow that automatically deploys the site to GitHub Pages when changes are pushed to the main branch.

1. Ensure your repository is set up for GitHub Pages
2. Push changes to the main branch
3. GitHub Actions will build and deploy the site to the gh-pages branch

### Manual Deployment
If you prefer to deploy manually:

1. Push all files to your GitHub repository
2. Go to repository Settings → Pages
3. Select the branch to deploy from (usually main or gh-pages)
4. Set the folder to / (root)
5. Click Save

The site will be available at `https://dkp22.github.io/` or `https://dkp22.github.io/repository-name/` depending on your GitHub Pages configuration.

## Requirements
- Modern web browser with WebGL support
- JavaScript enabled
- For local development: Node.js and npm