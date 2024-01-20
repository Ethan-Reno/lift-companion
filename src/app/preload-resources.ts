'use client'

import ReactDOM from 'react-dom'

export function PreloadResources() {
  ReactDOM.preload('good-nice-ui/dist/index.css', { as: 'style' })

  return null
}