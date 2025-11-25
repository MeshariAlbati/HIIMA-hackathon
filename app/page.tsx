'use client'

import { Header } from '@/components/header'
import { Sidebar } from '@/components/sidebar'
import { KPICard } from '@/components/kpi-card'
import { LiveMap } from '@/components/live-map'
import { AlertsFeed } from '@/components/alerts-feed'
import { AnalyticsCharts } from '@/components/analytics-charts'
import { mockKPIs } from '@/lib/mock-data'
import {
  Activity,
  AlertTriangle,
  Users,
  MapPin,
} from 'lucide-react'
import { useState } from 'react'

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-background">
      <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
      <div className="flex">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <main className="w-full md:ml-64 flex-1 p-4 md:p-6">
          {/* KPI Cards Section */}
          <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            <KPICard
              icon={Activity}
              value={mockKPIs.activeBracelets.toLocaleString()}
              label="Active Bracelets"
              gradient="from-blue-500/10 via-blue-400/5 to-transparent"
              trend={{ value: 2.5, isPositive: true }}
            />
            <KPICard
              icon={AlertTriangle}
              value={mockKPIs.criticalAlerts}
              label="Critical Alerts Now"
              gradient="from-red-500/10 via-red-400/5 to-transparent"
              trend={{ value: 12.3, isPositive: false }}
            />
            <KPICard
              icon={Users}
              value={mockKPIs.highRiskPatients}
              label="High-Risk Patients"
              gradient="from-orange-500/10 via-orange-400/5 to-transparent"
              trend={{ value: 5.7, isPositive: false }}
            />
            <KPICard
              icon={MapPin}
              value={mockKPIs.overcrowdedZones}
              label="Overcrowded Zones"
              gradient="from-purple-500/10 via-purple-400/5 to-transparent"
              trend={{ value: 0, isPositive: true }}
            />
          </div>

          {/* Main Content Grid */}
          <div className="mb-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
            {/* Live Map - Takes 2 columns */}
            <div className="lg:col-span-2">
              <LiveMap layout="square" />
            </div>

            {/* Alerts Feed - Takes 1 column */}
            <div className="lg:col-span-1">
              <AlertsFeed />
            </div>
          </div>

          {/* Analytics Section */}
          <div>
            <div className="mb-4">
              <h2 className="text-2xl font-bold">Analytics & Trends</h2>
              <p className="text-sm text-muted-foreground">
                Real-time monitoring and historical data insights
              </p>
            </div>
            <AnalyticsCharts />
          </div>
        </main>
      </div>
    </div>
  )
}

