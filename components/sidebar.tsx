'use client'

import {
  LayoutDashboard,
  Map,
  AlertCircle,
  Users,
  BarChart3,
  Settings,
  X,
} from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { useState, useEffect } from 'react'

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/' },
  { icon: Map, label: 'Live Map', href: '/map' },
  { icon: AlertCircle, label: 'Alerts Center', href: '/alerts' },
  { icon: Users, label: 'Patients / Bracelets', href: '/patients' },
  { icon: BarChart3, label: 'Analytics', href: '/analytics' },
  { icon: Settings, label: 'Settings', href: '/settings' },
]

export function Sidebar({ isOpen, onClose }: { isOpen?: boolean; onClose?: () => void }) {
  const pathname = usePathname()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (isOpen && window.innerWidth < 768) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  if (!mounted) return null

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 backdrop-blur-sm md:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={cn(
          'fixed left-0 top-16 z-40 h-[calc(100vh-4rem)] w-64 border-r border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 transition-transform duration-300',
          'md:translate-x-0',
          isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        )}
      >
        {/* Mobile Close Button */}
        {onClose && (
          <div className="flex items-center justify-between border-b border-border/40 p-4 md:hidden">
            <span className="font-semibold">Menu</span>
            <button
              onClick={onClose}
              className="flex h-8 w-8 items-center justify-center rounded-lg hover:bg-accent"
              aria-label="Close menu"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        )}

        <nav className="flex flex-col gap-1 p-4">
          {navItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => {
                if (onClose && window.innerWidth < 768) {
                  onClose()
                }
              }}
              className={cn(
                'group flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-all duration-200',
                isActive
                  ? 'bg-gradient-to-r from-saudi-green/10 to-saudi-mint/10 text-saudi-green shadow-sm border border-saudi-green/20'
                  : 'text-muted-foreground hover:bg-accent hover:text-foreground hover:shadow-sm'
              )}
            >
              <Icon
                className={cn(
                  'h-5 w-5 transition-transform group-hover:scale-110',
                  isActive && 'text-saudi-green'
                )}
              />
              <span>{item.label}</span>
            </Link>
          )
        })}
        </nav>
      </aside>
    </>
  )
}

