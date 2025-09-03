# Markdown Presentation Online Editor

A modern, lightweight presentation editor that transforms Markdown files into beautiful interactive slideshows using Reveal.js.

![Welcome windows](/screenshots/welcome-screen.png)

## Features

- **Markdown-based**: Write presentations in simple Markdown format
- **Multiple themes**: Support for Reveal.js themes
- **Auto-discovery**: Automatically lists available presentations
- **Metadata support**: YAML front-matter for title, description, theme, author
- **Interactive slides**: Navigate with keyboard, mouse, or touch
- **Responsive**: Works on desktop, tablet, and mobile
- **Fast development**: Hot reload with Vite
- **Modern architecture**: Vanilla JavaScript with ES6 modules
- **Custom themes**: Easy to create and customize themes

## Quick Start

### Prerequisites

- Node.js >= 16.0.0
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/erwanastro/markdown-presentation-online-editor.git
   cd markdown-presentation-online-editor
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:3000
   ```

## Creating Presentations

1. **Create a Markdown file** in the `presentations/` folder:
   ```bash
   touch presentations/my-presentation.md
   ```

2. **Add YAML front-matter** with metadata:
   ```yaml
   ---
   title: "🚀 My Awesome Presentation"
   description: "A presentation about awesome things"
   theme: "dark"
   author: "Your Name"
   date: "2025-09-01"
   ---
   ```

3. **Write your slides** using Markdown:
   ```markdown
   # First Slide
   
   Content of the first slide.
   
   ---
   
   ## Second Slide
   
   Content of the second slide.
   
   --
   
   ### Sub-slide
   
   Vertical sub-slide content.
   ```

4. **Reload the app** - your presentation will appear in the dropdown!

## Project Architecture

```
├── src/                        # Source code
│   ├── js/                     # JavaScript modules
│   │   ├── main.js             # Application entry point
│   │   ├── components/         # Reusable components
│   │   │   ├── ErrorHandler.js         # Error handling
│   │   │   ├── PresentationLoader.js   # Markdown parser & Reveal.js integration
│   │   │   └── PresentationSelector.js # Dropdown selector
│   │   └── utils/
│   │       └── domHelpers.js   # DOM utility functions
│   ├── scss/                   # Styles (Sass)
│   │   ├── main.scss           # Main stylesheet
│   │   ├── base/               # Base styles & reset
│   │   ├── components/         # Component styles
│   │   ├── utils/              # Variables & mixins
│   │   └── themes/             # Custom themes
│   │       └── _dark.scss      # Custom dark theme
│   ├── assets/                 # Static assets
│   │   └── images/
│   │       └── favicon.svg     # App icon
│   └── index.html              # Main HTML template
├── presentations/              # Presentation files (ignored by Git)
│   └── example.md              # Example presentation
├── dist/                       # Build output (ignored by Git)
├── vite.config.js              # Vite configuration
└── package.json                # Dependencies & scripts
```

## Available Themes

### Built-in Reveal.js Themes
- `black` - Dark theme with black background
- `white` - Light theme with white background  
- `moon` - Dark blue theme
- `beige` - Warm beige theme
- `sky` - Blue sky theme
- `night` - Dark theme with purple accents
- `serif` - Classic serif font theme
- `simple` - Minimalist theme
- `solarized` - Solarized color scheme
- `league` - Gray theme with orange accents

### Custom Themes
- `dark` - Project's custom dark theme with gradient background

##  Development Scripts

```bash
# Start development server with hot reload
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Serve production build on port 3000
npm run serve

# Clean build directory
npm run clean
```

## Markdown Syntax

### Slide Separators
- `---` - Horizontal slide separator
- `--` - Vertical slide separator (sub-slides)

### Front-matter
```yaml
---
title: "Presentation Title"
description: "Brief description"
theme: "dark"
author: "Author Name"
date: "2025-09-01"
---
```

### Code Blocks
```javascript
// JavaScript example
function hello() {
  console.log('Hello, World!')
}
```

### Lists
- Bullet point 1
- Bullet point 2
  - Sub-item
  - Sub-item

### Emphasis
- **Bold text**
- *Italic text*
- `Inline code`

## Navigation

- **Arrow keys** - Navigate slides
- **Space** - Next slide
- **Esc** - Slide overview
- **F** - Fullscreen

## Customization

### Adding Custom Themes

1. Create a new theme file in `src/scss/themes/_mytheme.scss`
2. Add the theme to the switch statement in `src/js/main.js`
3. Use `theme: "mytheme"` in your presentation's front-matter

### Extending Components

The application uses a modular architecture with ES6 classes:
- `PresentationLoader` - Handles Markdown parsing and Reveal.js integration
- `PresentationSelector` - Manages the dropdown and presentation listing
- `ErrorHandler` - Handles error display

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Reveal.js](https://revealjs.com/) - The HTML presentation framework
- [Vite](https://vitejs.dev/) - Next generation frontend tooling
- [Sass](https://sass-lang.com/) - CSS with superpowers

## Tech Stack

- **Frontend**: Vanilla JavaScript (ES6+)
- **Styling**: Sass/SCSS
- **Build Tool**: Vite
- **Presentation Engine**: Reveal.js
- **Package Manager**: npm
