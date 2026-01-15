'use client'

/**
 * Editor de texto enriquecido básico
 * 
 * NOTA: Para un editor más completo, instala Tiptap:
 * npm install @tiptap/react @tiptap/starter-kit @tiptap/extension-image
 * 
 * Ejemplo de uso con Tiptap:
 * 
 * import { useEditor, EditorContent } from '@tiptap/react'
 * import StarterKit from '@tiptap/starter-kit'
 * import Image from '@tiptap/extension-image'
 * 
 * const editor = useEditor({
 *   extensions: [StarterKit, Image],
 *   content: initialContent,
 * })
 * 
 * return <EditorContent editor={editor} />
 */

import { useState } from 'react'
import { Bold, Italic, List, Heading2, Link as LinkIcon, Code } from 'lucide-react'

interface RichTextEditorProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  error?: string
}

export function RichTextEditor({ value, onChange, placeholder, error }: RichTextEditorProps) {
  const [selection, setSelection] = useState({ start: 0, end: 0 })

  const handleSelection = () => {
    const textarea = document.querySelector('textarea[name="content"]') as HTMLTextAreaElement
    if (textarea) {
      setSelection({
        start: textarea.selectionStart,
        end: textarea.selectionEnd,
      })
    }
  }

  const insertMarkdown = (before: string, after: string = '') => {
    const textarea = document.querySelector('textarea[name="content"]') as HTMLTextAreaElement
    if (!textarea) return

    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const selected = value.substring(start, end)
    const newValue = value.substring(0, start) + before + selected + after + value.substring(end)
    onChange(newValue)
    
    // Restaurar selección
    setTimeout(() => {
      textarea.focus()
      textarea.setSelectionRange(start + before.length, start + before.length + selected.length)
    }, 0)
  }

  const toolbarButtons = [
    {
      icon: Bold,
      label: 'Negrita',
      action: () => insertMarkdown('**', '**'),
    },
    {
      icon: Italic,
      label: 'Cursiva',
      action: () => insertMarkdown('*', '*'),
    },
    {
      icon: Heading2,
      label: 'Título',
      action: () => insertMarkdown('\n## ', '\n'),
    },
    {
      icon: List,
      label: 'Lista',
      action: () => insertMarkdown('\n- ', ''),
    },
    {
      icon: LinkIcon,
      label: 'Enlace',
      action: () => insertMarkdown('[', '](url)'),
    },
    {
      icon: Code,
      label: 'Código',
      action: () => insertMarkdown('`', '`'),
    },
  ]

  return (
    <div>
      <div className="mb-2 flex gap-2 flex-wrap border-b border-foreground/10 pb-2">
        {toolbarButtons.map((btn) => {
          const Icon = btn.icon
          return (
            <button
              key={btn.label}
              type="button"
              onClick={btn.action}
              className="p-2 hover:bg-background-secondary rounded transition-colors"
              title={btn.label}
              aria-label={btn.label}
            >
              <Icon className="w-4 h-4" />
            </button>
          )
        })}
      </div>
      <textarea
        name="content"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onSelect={handleSelection}
        placeholder={placeholder}
        className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 resize-y font-mono text-sm min-h-[400px] ${
          error
            ? 'border-error focus:ring-error/20'
            : 'border-foreground/20 focus:ring-accent-blue-500/20 focus:border-accent-blue-500'
        }`}
      />
      {error && <p className="mt-1 text-sm text-error">{error}</p>}
    </div>
  )
}
