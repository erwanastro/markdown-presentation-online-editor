import { $, show, hide } from '../utils/domHelpers.js'

/**
 * Error handling component
 */
export class ErrorHandler {
  constructor() {
    this.errorContainer = $('#error-container')
    this.errorDetails = this.errorContainer.querySelector('.error-details')
  }

  showError(message) {
    if (this.errorDetails) {
      this.errorDetails.textContent = message
    }
    show(this.errorContainer)
    window.location.hash = ''
  }

  hideError() {
    hide(this.errorContainer)
  }
}