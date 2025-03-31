# Unity WebGL Player

A static webpage hosting a Unity WebGL build.

## Project Structure
```
webglplayer/
├── index.html          # Main HTML file that loads the Unity build
├── styles/
│   └── main.css       # CSS styles for the player
├── webglBuild/        # Unity WebGL build files
│   ├── Build/        # Unity build files
│   ├── TemplateData/ # Unity template assets
│   └── index.html    # Unity's original index.html
└── README.md         # Project documentation
```

## Setup
1. Clone the repository
2. Open `index.html` in a modern web browser
3. The Unity WebGL build will load and run automatically

## Requirements
- Modern web browser with WebGL support
- JavaScript enabled
- Unity WebGL build files in the `webglBuild` directory