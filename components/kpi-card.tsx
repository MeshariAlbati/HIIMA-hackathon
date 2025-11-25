'use client'

import { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

interface KPICardProps {
  icon: LucideIcon
  value: number | string
  label: string
  gradient: string
  trend?: {
    value: number
    isPositive: boolean
  }
}

export function KPICard({ icon: Icon, value, label, gradient, trend }: KPICardProps) {
  return (
    <div
      className={cn(
        'group relative overflow-hidden rounded-xl border border-border/50 bg-card p-6 shadow-sm transition-all duration-300 hover:shadow-lg hover:scale-[1.02]',
        'before:absolute before:inset-0 before:bg-gradient-to-br before:opacity-5 before:transition-opacity hover:before:opacity-10',
        gradient
      )}
    >
      <div className="relative z-10 flex items-start justify-between">
        <div className="flex-1 text-center">
          <div className="mb-2 flex justify-center">
            <div className="rounded-lg bg-background/80 p-2 backdrop-blur-sm">
              <Icon className="h-5 w-5 text-foreground" />
            </div>
          </div>
          <div className="mb-1 text-3xl font-bold text-foreground">{value}</div>
          <div className="text-sm font-medium text-muted-foreground">{label}</div>
          {trend && (
            <div
              className={cn(
                'mt-2 text-xs font-medium',
                trend.isPositive ? 'text-green-600' : 'text-red-600'
              )}
            >
              {trend.isPositive ? '↑' : '↓'} {Math.abs(trend.value)}% from last hour
            </div>
          )}
        </div>
      </div>
      <div
        className={cn(
          'absolute -right-8 -top-8 h-24 w-24 rounded-full opacity-10 blur-2xl transition-opacity group-hover:opacity-20',
          gradient
        )}
      />
    </div>
  )
}

