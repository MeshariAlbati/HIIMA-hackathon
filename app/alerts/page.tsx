'use client'

import { useMemo, useState } from 'react'
import { Header } from '@/components/header'
import { Sidebar } from '@/components/sidebar'
import { AlertsFeed } from '@/components/alerts-feed'
import { mockAlerts } from '@/lib/mock-data'

export default function AlertsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const alertStats = useMemo(() => {
    return mockAlerts.reduce(
      (acc, alert) => {
        acc.total += 1
        acc[alert.severity] += 1
        return acc
      },
      { total: 0, critical: 0, warning: 0, normal: 0 }
    )
  }, [])

  return (
    <div className="min-h-screen bg-background">
      <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
      <div className="flex">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <main className="w-full md:ml-64 flex-1 p-4 md:p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold">Alerts Center</h1>
            <p className="text-sm text-muted-foreground">
              Live feed of patient alerts with severity indicators and context
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <div className="rounded-xl border border-border/50 bg-card p-6 shadow-sm lg:col-span-1">
              <h2 className="text-xl font-semibold">Alert Snapshot</h2>
              <p className="text-sm text-muted-foreground mb-4">Current distribution</p>
              <div className="space-y-4">
                <Stat label="Total Alerts" value={alertStats.total} />
                <Stat label="Critical" value={alertStats.critical} variant="text-red-500" />
                <Stat label="Warning" value={alertStats.warning} variant="text-orange-500" />
                <Stat label="Normal" value={alertStats.normal} variant="text-green-500" />
              </div>
            </div>
            <div className="lg:col-span-2">
              <AlertsFeed />
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

function Stat({ label, value, variant }: { label: string; value: number; variant?: string }) {
  return (
    <div className="flex items-center justify-between rounded-lg bg-muted/30 px-3 py-2">
      <span className="text-sm text-muted-foreground">{label}</span>
      <span className={variant ? `text-lg font-semibold ${variant}` : 'text-lg font-semibold'}>{value}</span>
    </div>
  )
}

