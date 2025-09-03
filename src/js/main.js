import { ErrorHandler } from './components/ErrorHandler.js'
import { PresentationSelector } from './components/PresentationSelector.js'
import { PresentationLoader } from './components/PresentationLoader.js'

class App {
  constructor() {
    this.errorHandler = new ErrorHandler()
    this.loader = new PresentationLoader(this.errorHandler)
    this.selector = new PresentationSelector(
      this.handlePresentationChange.bind(this),
      this.handleThemeChange.bind(this)
    )
    
    this.init()
  }

  init() {
    console.log('🚀 Markdown Presentation Editor loaded!')
    console.log('✅ App initialized with modular architecture')
  }

  handlePresentationChange(presentationPath) {
    // Update selector UI state
    this.selector.setDarkMode(!!presentationPath)
    
    if (presentationPath) {
      this.selector.blur()
    }

    this.loader.loadPresentation(presentationPath)
  }

  async handleThemeChange(theme) {
    console.log('🎨 Changing theme to:', theme)
    
    // Remove existing theme classes
    document.body.classList.remove('theme-dark', 'theme-light', 'theme-default')
    
    // Add new theme class
    document.body.classList.add(`theme-${theme}`)
    
    // Update Reveal.js theme if available
    const existingThemeLink = document.querySelector('#reveal-theme')
    if (existingThemeLink) {
      existingThemeLink.remove()
    }
    
    if (theme !== 'default') {
      try {
        // Use a switch statement to handle specific themes with static imports
        let themeModule
        switch (theme) {
          case 'dark':
            // Use custom dark theme or fallback to black
            try {
              themeModule = await import('../scss/themes/_dark.scss')
            } catch {
              themeModule = await import('reveal.js/dist/theme/black.css')
            }
            break
          case 'moon':
            themeModule = await import('reveal.js/dist/theme/moon.css')
            break
          case 'white':
            themeModule = await import('reveal.js/dist/theme/white.css')
            break
          case 'league':
            themeModule = await import('reveal.js/dist/theme/league.css')
            break
          case 'beige':
            themeModule = await import('reveal.js/dist/theme/beige.css')
            break
          case 'sky':
            themeModule = await import('reveal.js/dist/theme/sky.css')
            break
          case 'night':
            themeModule = await import('reveal.js/dist/theme/night.css')
            break
          case 'serif':
            themeModule = await import('reveal.js/dist/theme/serif.css')
            break
          case 'simple':
            themeModule = await import('reveal.js/dist/theme/simple.css')
            break
          case 'solarized':
            themeModule = await import('reveal.js/dist/theme/solarized.css')
            break
          default:
            console.warn(`⚠️ Theme "${theme}" not supported`)
            return
        }
        console.log(`✅ Theme "${theme}" loaded`)
      } catch (error) {
        console.warn(`⚠️ Could not load theme "${theme}":`, error)
      }
    }
  }
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new App()
})