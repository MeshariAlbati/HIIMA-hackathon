'use client'

import { Bell, Globe, Moon, Sun, User, Menu, Activity } from 'lucide-react'
import { useState, useEffect, useRef } from 'react'
import { useTheme } from 'next-themes'
import { cn } from '@/lib/utils'

export function Header({ onMenuClick }: { onMenuClick?: () => void }) {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [language, setLanguage] = useState<'AR' | 'EN'>('EN')
  const [showProfileMenu, setShowProfileMenu] = useState(false)
  const profileMenuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        profileMenuRef.current &&
        !profileMenuRef.current.contains(event.target as Node)
      ) {
        setShowProfileMenu(false)
      }
    }

    if (showProfileMenu) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [showProfileMenu])

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center justify-between px-4 md:px-6">
        {/* Left Section - Logo & System Name */}
        <div className="flex items-center gap-2 md:gap-4">
          {onMenuClick && (
            <button
              onClick={onMenuClick}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-background transition-all hover:bg-accent hover:shadow-sm md:hidden"
              aria-label="Toggle menu"
            >
              <Menu className="h-5 w-5 text-muted-foreground" />
            </button>
          )}
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-saudi-green to-saudi-mint shadow-lg">
            <Activity className="h-5 w-5 text-white" aria-hidden />
          </div>
          <div className="hidden md:block">
            <h1 className="text-sm font-semibold text-foreground">
              Saudi CrowdCare Integrated System
            </h1>
            <p className="text-xs text-muted-foreground">Hima Lifeline Bracelet</p>
          </div>
        </div>

        {/* Right Section - Actions */}
        <div className="flex items-center gap-3">
          {/* Language Switch */}
          <button
            onClick={() => setLanguage(language === 'EN' ? 'AR' : 'EN')}
            className="flex h-9 items-center gap-2 rounded-lg border border-border bg-background px-3 transition-all hover:bg-accent hover:shadow-sm"
            aria-label="Toggle language"
          >
            <Globe className="h-4 w-4 text-muted-foreground" />
            <span className="text-xs font-medium">{language}</span>
          </button>

          {/* Theme Toggle */}
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-background transition-all hover:bg-accent hover:shadow-sm"
            aria-label="Toggle theme"
          >
            {mounted && theme === 'dark' ? (
              <Sun className="h-4 w-4 text-muted-foreground" />
            ) : (
              <Moon className="h-4 w-4 text-muted-foreground" />
            )}
          </button>

          {/* Notifications */}
          <button
            className="relative flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-background transition-all hover:bg-accent hover:shadow-sm"
            aria-label="Notifications"
          >
            <Bell className="h-4 w-4 text-muted-foreground" />
            <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-red-500 ring-2 ring-background" />
          </button>

          {/* Profile Menu */}
          <div className="relative" ref={profileMenuRef}>
            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-background transition-all hover:bg-accent hover:shadow-sm"
              aria-label="User menu"
            >
              <User className="h-4 w-4 text-muted-foreground" />
            </button>
            {showProfileMenu && (
              <div className="absolute right-0 top-12 z-50 w-48 rounded-lg border border-border bg-popover p-2 shadow-lg">
                <div className="px-3 py-2 text-sm font-medium">Dr. Ahmed Al-Saud</div>
                <div className="px-3 pb-2 text-xs text-muted-foreground">admin@hlb.sa</div>
                <div className="my-2 h-px bg-border" />
                <button className="w-full rounded-md px-3 py-2 text-left text-sm transition-colors hover:bg-accent">
                  Profile Settings
                </button>
                <button className="w-full rounded-md px-3 py-2 text-left text-sm transition-colors hover:bg-accent">
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

