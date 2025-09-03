import { $, createElement, clearElement, hide } from '../utils/domHelpers.js'

/**
 * Presentation loader component
 */
export class PresentationLoader {
  constructor(errorHandler) {
    this.slidesContainer = $('#slides')
    this.welcomeScreen = $('#welcome-screen')
    this.errorHandler = errorHandler
    this.revealInstance = null
    this.loadTimeout = null
    this.lastSelectedValue = ''
  }

  async loadPresentation(presentationPath) {
    console.log('🔄 Loading presentation:', presentationPath)
    this.lastSelectedValue = presentationPath
    clearTimeout(this.loadTimeout)

    this.loadTimeout = setTimeout(async () => {
      if (presentationPath === this.lastSelectedValue) {
        this.cleanup()
        this.errorHandler.hideError()

        if (!presentationPath) return

        hide(this.welcomeScreen)

        try {
          console.log('📡 Fetching:', presentationPath)
          const response = await fetch(presentationPath)
          console.log('📊 Response status:', response.status, response.statusText)
          
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
          }
          
          const markdown = await response.text()
          console.log('📝 Markdown loaded, length:', markdown.length)
          console.log('📝 First 200 chars:', markdown.substring(0, 200))
          
          // Remove YAML front-matter from markdown content
          const cleanMarkdown = this.removeFrontMatter(markdown)
          console.log('🧹 Cleaned markdown, length:', cleanMarkdown.length)
          console.log('🧹 First 200 chars after cleaning:', cleanMarkdown.substring(0, 200))
          
          await this.parseAndRenderSlides(cleanMarkdown)
          await this.initializeReveal()
          
        } catch (error) {
          console.error('❌ Error details:', error)
          this.errorHandler.showError(error.message)
        }
      }
    }, 800)
  }

  removeFrontMatter(markdown) {
    // Remove YAML front-matter (everything between the first --- and second ---)
    const frontMatterRegex = /^---\s*\n[\s\S]*?\n---\s*\n/
    return markdown.replace(frontMatterRegex, '')
  }

  parseAndRenderSlides(markdown) {
    console.log('🔍 Parsing markdown...')
    const horizontalSections = markdown.split('---\n')
    
    // Remove empty sections (can happen after front-matter removal)
    const validSections = horizontalSections.filter(section => section.trim().length > 0)
    
    console.log('📑 Found', validSections.length, 'horizontal sections')

    validSections.forEach((horizontalContent, index) => {
      console.log(`📄 Section ${index + 1}:`, horizontalContent.substring(0, 100) + '...')
      
      if (horizontalContent.includes('--\n')) {
        console.log('🔢 Vertical slides detected in section', index + 1)
        // Vertical slides
        const parentSection = createElement('section')
        const verticalSections = horizontalContent.split('--\n')
        console.log('   Found', verticalSections.length, 'vertical sections')

        verticalSections.forEach(verticalContent => {
          const verticalSection = createElement('section', {
            'data-markdown': ''
          })

          const textarea = createElement('textarea', {
            'data-template': '',
            innerHTML: verticalContent.trim()
          })

          verticalSection.appendChild(textarea)
          parentSection.appendChild(verticalSection)
        })

        this.slidesContainer.appendChild(parentSection)
      } else {
        console.log('📄 Single slide for section', index + 1)
        // Single slide
        const section = createElement('section', {
          'data-markdown': ''
        })

        const textarea = createElement('textarea', {
          'data-template': '',
          innerHTML: horizontalContent.trim()
        })

        section.appendChild(textarea)
        this.slidesContainer.appendChild(section)
      }
    })
    
    console.log('✅ Slides parsed, total slides:', this.slidesContainer.children.length)
  }

  async initializeReveal() {
    console.log('🚀 Initializing Reveal.js...')
    
    try {
      // Import Reveal.js and its dependencies via ES modules
      const [
        { default: Reveal },
        { default: Markdown }
      ] = await Promise.all([
        import('reveal.js'),
        import('reveal.js/plugin/markdown/markdown.esm.js')
      ])

      console.log('✅ Reveal.js modules loaded')

      // Import CSS through Vite
      await import('reveal.js/dist/reveal.css')

      this.revealInstance = Reveal.initialize({
        hash: true,
        plugins: [Markdown],
      })

      await this.revealInstance
      console.log('✅ Reveal.js initialized successfully')
      Reveal.slide(0, 0)
      window.location.hash = ''
    } catch (error) {
      console.error('❌ Error initializing Reveal.js:', error)
      throw error
    }
  }

  // loadScript method removed - using ES6 imports instead

  cleanup() {
    if (this.revealInstance && window.Reveal) {
      window.Reveal.destroy()
      this.revealInstance = null
    }

    clearElement(this.slidesContainer)
    document.body.className = ''
    this.welcomeScreen.style.display = 'flex'
    window.location.hash = ''
  }
}