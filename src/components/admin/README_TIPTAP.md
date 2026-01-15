# Instalación de Tiptap para Editor Rich Text

Para mejorar el editor de texto enriquecido del blog, puedes instalar Tiptap:

## Instalación

```bash
npm install @tiptap/react @tiptap/starter-kit @tiptap/extension-image @tiptap/extension-link
```

## Uso en BlogPostModal

Reemplaza el textarea actual con:

```tsx
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Image from '@tiptap/extension-image'
import Link from '@tiptap/extension-link'

// En el componente:
const editor = useEditor({
  extensions: [
    StarterKit,
    Image.configure({
      inline: true,
      allowBase64: true,
    }),
    Link.configure({
      openOnClick: false,
    }),
  ],
  content: content,
  onUpdate: ({ editor }) => {
    setContent(editor.getHTML())
    setValue('content', editor.getHTML())
  },
})

// En el JSX:
<EditorContent editor={editor} />
```

## Extensions adicionales recomendadas

```bash
npm install @tiptap/extension-placeholder @tiptap/extension-character-count
```
