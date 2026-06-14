'use client'

import { useEffect } from 'react'

export function Security() {
  useEffect(() => {
    // Disable right click
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault()
    }

    // Disable keyboard shortcuts for DevTools and copying
    const handleKeyDown = (e: KeyboardEvent) => {
      // F12
      if (e.key === 'F12') {
        e.preventDefault()
      }
      
      // Ctrl+Shift+I / Cmd+Option+I (DevTools)
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'I' || e.key === 'i')) {
        e.preventDefault()
      }
      
      // Ctrl+Shift+J / Cmd+Option+J (Console)
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'J' || e.key === 'j')) {
        e.preventDefault()
      }
      
      // Ctrl+U / Cmd+U (View Source)
      if ((e.ctrlKey || e.metaKey) && (e.key === 'U' || e.key === 'u')) {
        e.preventDefault()
      }
      
      // Ctrl+C / Cmd+C (Copy)
      if ((e.ctrlKey || e.metaKey) && (e.key === 'C' || e.key === 'c')) {
        e.preventDefault()
      }
    }

    // Disable dragging elements
    const handleDragStart = (e: DragEvent) => {
      e.preventDefault()
    }

    // Add event listeners
    window.addEventListener('contextmenu', handleContextMenu)
    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('dragstart', handleDragStart)

    // Add a global CSS class to disable selection
    document.body.style.setProperty('user-select', 'none')
    document.body.style.setProperty('-webkit-user-select', 'none')

    return () => {
      // Cleanup
      window.removeEventListener('contextmenu', handleContextMenu)
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('dragstart', handleDragStart)
      
      document.body.style.removeProperty('user-select')
      document.body.style.removeProperty('-webkit-user-select')
    }
  }, [])

  return null
}
