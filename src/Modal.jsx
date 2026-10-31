import { useEffect, useRef } from 'react'
import { CloseIcon } from './icons.jsx'

// Accessible modal built on the native <dialog>: focus stays inside while open, Escape closes it,
// and focus returns to whatever opened it.
export default function Modal({ title, titleId, onClose, className = '', children, footer }) {
  const dialogRef = useRef(null)

  useEffect(() => {
    const dialog = dialogRef.current
    const opener = document.activeElement
    dialog.showModal()
    return () => {
      if (dialog.open) dialog.close()
      opener?.focus?.()
    }
  }, [])

  function handleCancel(event) {
    // Escape key: let React close it so state stays in sync.
    event.preventDefault()
    onClose()
  }

  function handleClick(event) {
    // A click on the dimmed backdrop lands on the <dialog> element itself.
    if (event.target === dialogRef.current) onClose()
  }

  return (
    <dialog
      ref={dialogRef}
      className={`modal ${className}`}
      aria-labelledby={titleId}
      onCancel={handleCancel}
      onClick={handleClick}
    >
      <div className="modal-body">
        <div className="modal-header">
          <h2 id={titleId}>{title}</h2>
          <button type="button" className="icon-button" onClick={onClose} aria-label="Close">
            <CloseIcon />
          </button>
        </div>
        {children}
        {footer && <div className="modal-footer">{footer}</div>}
      </div>
    </dialog>
  )
}
