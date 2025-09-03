import { $, toggleClass } from '../utils/domHelpers.js'

/**
 * Presentation selector component
 */
export class PresentationSelector {
  constructor(onPresentationChange, onThemeChange) {
    this.select = $('#presentation-select')
    this.selector = $('.presentation-selector')
    this.onPresentationChange = onPresentationChange
    this.onThemeChange = onThemeChange
    this.fadeTimeout = null
    this.presentations = []
    
    this.init()
  }

  async init() {
    // Reset select to empty value on page load
    this.select.value = ''
    
    await this.loadPresentations()
    this.bindEvents()
  }

  async loadPresentations() {
    try {
      console.log('📋 Loading presentations list...')
      const response = await fetch('/api/presentations/')
      const presentations = await response.json()
      
      console.log('📋 Found presentations:', presentations)
      this.presentations = presentations
      
      // Clear existing options except the first one
      while (this.select.children.length > 1) {
        this.select.removeChild(this.select.lastChild)
      }
      
      // Add presentations to select
      presentations.forEach(presentation => {
        const option = document.createElement('option')
        option.value = presentation.path
        option.textContent = presentation.metadata.title
        option.dataset.theme = presentation.metadata.theme
        option.dataset.description = presentation.metadata.description
        this.select.appendChild(option)
      })
      
    } catch (error) {
      console.error('❌ Error loading presentations:', error)
    }
  }

  bindEvents() {
    // Handle presentation selection
    this.select.addEventListener('change', (e) => {
      const selectedOption = e.target.selectedOptions[0]
      const theme = selectedOption?.dataset.theme || 'default'
      
      this.onPresentationChange(e.target.value)
      this.onThemeChange && this.onThemeChange(theme)
    })

    // Keyboard navigation
    this.select.addEventListener('keydown', (e) => {
      e.stopPropagation()
      if (e.key === 'Enter') {
        this.onPresentationChange(this.select.value)
      }
    })

    // Focus/blur handlers for opacity effects
    this.select.addEventListener('focus', () => {
      this.clearFadeTimeout()
      this.select.style.opacity = '1'
      this.selector.style.opacity = '1'
    })

    this.select.addEventListener('blur', () => {
      this.resetFadeTimeout()
    })
  }

  setDarkMode(isDark) {
    toggleClass(this.selector, 'dark', isDark)
  }

  blur() {
    this.select.blur()
  }

  clearFadeTimeout() {
    clearTimeout(this.fadeTimeout)
    this.select.style.opacity = '1'
    this.selector.style.opacity = '1'
  }

  resetFadeTimeout() {
    this.clearFadeTimeout()
    this.fadeTimeout = setTimeout(() => {
      if (!this.select.matches(':focus')) {
        this.select.style.opacity = '0.7'
        this.selector.style.opacity = '0.7'
      }
    }, 1000)
  }
}