'use client'

import { useState } from 'react'
import { Header } from '@/components/header'
import { Sidebar } from '@/components/sidebar'
import { LiveMap } from '@/components/live-map'

export default function LiveMapPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-background">
      <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
      <div className="flex">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <main className="w-full md:ml-64 flex-1 p-4 md:p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold">Live Map</h1>
            <p className="text-sm text-muted-foreground">
              Real-time positioning, facility overlays, and zone monitoring
            </p>
          </div>
          <LiveMap />
        </main>
      </div>
    </div>
  )
}

