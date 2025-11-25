'use client'

import { AlertCircle, Clock, MapPin, ChevronRight } from 'lucide-react'
import { mockAlerts } from '@/lib/mock-data'
import { cn } from '@/lib/utils'
import { useState } from 'react'

const MAX_VISIBLE_ALERTS = 4

export function AlertsFeed() {
  const [selectedAlert, setSelectedAlert] = useState<string | null>(null)
  const [showAll, setShowAll] = useState(false)

  const getSeverityStyles = (severity: string) => {
    switch (severity) {
      case 'critical':
        return {
          bg: 'bg-red-50 dark:bg-red-950/20',
          border: 'border-red-200 dark:border-red-900/50',
          text: 'text-red-700 dark:text-red-400',
          badge: 'bg-red-500 text-white',
        }
      case 'warning':
        return {
          bg: 'bg-orange-50 dark:bg-orange-950/20',
          border: 'border-orange-200 dark:border-orange-900/50',
          text: 'text-orange-700 dark:text-orange-400',
          badge: 'bg-orange-500 text-white',
        }
      default:
        return {
          bg: 'bg-green-50 dark:bg-green-950/20',
          border: 'border-green-200 dark:border-green-900/50',
          text: 'text-green-700 dark:text-green-400',
          badge: 'bg-green-500 text-white',
        }
    }
  }

  return (
    <div className="flex h-full min-h-[500px] flex-col rounded-xl border border-border/50 bg-card shadow-lg">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border/50 p-4">
        <div className="flex items-center gap-2">
          <AlertCircle className="h-5 w-5 text-saudi-green" />
          <h3 className="text-lg font-semibold">Live Alerts Feed</h3>
        </div>
        <div className="rounded-full bg-red-500 px-2 py-1 text-xs font-bold text-white">
          {mockAlerts.length}
        </div>
      </div>

      {/* Alerts List */}
      <div className="flex-1 space-y-2 overflow-y-auto p-4">
        {(showAll ? mockAlerts : mockAlerts.slice(0, MAX_VISIBLE_ALERTS)).map((alert) => {
          const styles = getSeverityStyles(alert.severity)
          const isSelected = selectedAlert === alert.id

          return (
            <div
              key={alert.id}
              onClick={() => setSelectedAlert(alert.id === selectedAlert ? null : alert.id)}
              className={cn(
                'group cursor-pointer rounded-lg border p-4 transition-all duration-200 hover:shadow-md',
                styles.bg,
                styles.border,
                isSelected && 'ring-2 ring-saudi-green ring-offset-2'
              )}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-2">
                    <span
                      className={cn(
                        'rounded-full px-2 py-0.5 text-xs font-semibold uppercase',
                        styles.badge
                      )}
                    >
                      {alert.severity}
                    </span>
                    <span className="text-xs font-medium text-muted-foreground">
                      {alert.braceletId}
                    </span>
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">{alert.type}</div>
                    <div className="text-sm text-muted-foreground">{alert.patientId}</div>
                  </div>
                  {alert.location && (
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <MapPin className="h-3 w-3" />
                      {alert.location}
                    </div>
                  )}
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    {alert.time}
                  </div>
                </div>
                <ChevronRight
                  className={cn(
                    'h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-1',
                    isSelected && 'text-saudi-green'
                  )}
                />
              </div>
            </div>
          )
        })}
      </div>
      {mockAlerts.length > MAX_VISIBLE_ALERTS && (
        <div className="border-t border-border/50 p-4">
          <button
            type="button"
            onClick={() => setShowAll(!showAll)}
            className="w-full rounded-lg border border-border bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent"
          >
            {showAll ? 'Show fewer alerts' : `View all ${mockAlerts.length} alerts`}
          </button>
        </div>
      )}
    </div>
  )
}

