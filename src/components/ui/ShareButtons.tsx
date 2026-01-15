'use client'

import { useState } from 'react'
import { Share2, Twitter, Linkedin, Facebook, Link as LinkIcon, Check } from 'lucide-react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface ShareButtonsProps {
  url: string
  title: string
  description?: string
  className?: string
}

export function ShareButtons({ url, title, description, className }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false)
  const fullUrl = typeof window !== 'undefined' ? `${window.location.origin}${url}` : url

  const shareData = {
    title,
    text: description || title,
    url: fullUrl,
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(fullUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Error copiando URL:', err)
    }
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share(shareData)
      } catch (err) {
        // Usuario canceló o error
      }
    }
  }

  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(fullUrl)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(fullUrl)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(fullUrl)}`,
  }

  return (
    <div className={cn('flex items-center gap-3', className)}>
      <span className="text-sm font-medium text-foreground-muted">Compartir:</span>
      <div className="flex items-center gap-2">
        {navigator.share && (
          <button
            onClick={handleShare}
            className="p-2 rounded-lg bg-background-secondary hover:bg-background-tertiary transition-colors text-foreground-muted hover:text-foreground"
            aria-label="Compartir"
            title="Compartir"
          >
            <Share2 className="w-4 h-4" />
          </button>
        )}
        <a
          href={shareLinks.twitter}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 rounded-lg bg-background-secondary hover:bg-background-tertiary transition-colors text-foreground-muted hover:text-foreground"
          aria-label="Compartir en Twitter"
          title="Compartir en Twitter"
        >
          <Twitter className="w-4 h-4" />
        </a>
        <a
          href={shareLinks.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 rounded-lg bg-background-secondary hover:bg-background-tertiary transition-colors text-foreground-muted hover:text-foreground"
          aria-label="Compartir en LinkedIn"
          title="Compartir en LinkedIn"
        >
          <Linkedin className="w-4 h-4" />
        </a>
        <a
          href={shareLinks.facebook}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 rounded-lg bg-background-secondary hover:bg-background-tertiary transition-colors text-foreground-muted hover:text-foreground"
          aria-label="Compartir en Facebook"
          title="Compartir en Facebook"
        >
          <Facebook className="w-4 h-4" />
        </a>
        <button
          onClick={handleCopy}
          className="p-2 rounded-lg bg-background-secondary hover:bg-background-tertiary transition-colors text-foreground-muted hover:text-foreground"
          aria-label="Copiar enlace"
          title="Copiar enlace"
        >
          {copied ? (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
            >
              <Check className="w-4 h-4 text-accent-blue-500" />
            </motion.div>
          ) : (
            <LinkIcon className="w-4 h-4" />
          )}
        </button>
      </div>
    </div>
  )
}
