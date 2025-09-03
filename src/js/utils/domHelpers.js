/**
 * DOM helper utilities
 */

export const $ = (selector) => document.querySelector(selector)
export const $$ = (selector) => document.querySelectorAll(selector)

export const createElement = (tag, attributes = {}, children = []) => {
  const element = document.createElement(tag)
  
  Object.keys(attributes).forEach(key => {
    if (key === 'textContent') {
      element.textContent = attributes[key]
    } else if (key === 'innerHTML') {
      element.innerHTML = attributes[key]
    } else {
      element.setAttribute(key, attributes[key])
    }
  })
  
  children.forEach(child => {
    if (typeof child === 'string') {
      element.appendChild(document.createTextNode(child))
    } else {
      element.appendChild(child)
    }
  })
  
  return element
}

export const clearElement = (element) => {
  element.innerHTML = ''
}

export const show = (element) => {
  element.style.display = 'block'
}

export const hide = (element) => {
  element.style.display = 'none'
}

export const toggleClass = (element, className, condition) => {
  if (condition) {
    element.classList.add(className)
  } else {
    element.classList.remove(className)
  }
}