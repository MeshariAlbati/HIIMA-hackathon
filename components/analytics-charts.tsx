'use client'

import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import {
  mockHRTrend,
  mockSpO2Trend,
  mockAlertsPerHour,
  mockAlertCategories,
} from '@/lib/mock-data'
import { Activity, Droplet, AlertTriangle, PieChart as PieChartIcon } from 'lucide-react'

const COLORS = ['#EF4444', '#F59E0B', '#10B981', '#8B5CF6', '#6B7280']

export function AnalyticsCharts() {
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      {/* Heart Rate Trend */}
      <div className="rounded-xl border border-border/50 bg-card p-6 shadow-sm">
        <div className="mb-4 flex items-center gap-2">
          <div className="rounded-lg bg-red-50 dark:bg-red-950/20 p-2">
            <Activity className="h-5 w-5 text-red-600 dark:text-red-400" />
          </div>
          <div>
            <h3 className="font-semibold">24h Heart Rate Trend</h3>
            <p className="text-xs text-muted-foreground">Average across all patients</p>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={mockHRTrend}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis
              dataKey="hour"
              className="text-xs"
              tick={{ fill: 'currentColor' }}
              stroke="currentColor"
            />
            <YAxis
              className="text-xs"
              tick={{ fill: 'currentColor' }}
              stroke="currentColor"
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'hsl(var(--popover))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px',
              }}
            />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#EF4444"
              strokeWidth={2}
              dot={{ fill: '#EF4444', r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* SpO2 Trend */}
      <div className="rounded-xl border border-border/50 bg-card p-6 shadow-sm">
        <div className="mb-4 flex items-center gap-2">
          <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 p-2">
            <Droplet className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <h3 className="font-semibold">24h SpO₂ Trend</h3>
            <p className="text-xs text-muted-foreground">Oxygen saturation levels</p>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={mockSpO2Trend}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis
              dataKey="hour"
              className="text-xs"
              tick={{ fill: 'currentColor' }}
              stroke="currentColor"
            />
            <YAxis
              className="text-xs"
              tick={{ fill: 'currentColor' }}
              stroke="currentColor"
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'hsl(var(--popover))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px',
              }}
            />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#3B82F6"
              strokeWidth={2}
              dot={{ fill: '#3B82F6', r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Alerts Per Hour */}
      <div className="rounded-xl border border-border/50 bg-card p-6 shadow-sm">
        <div className="mb-4 flex items-center gap-2">
          <div className="rounded-lg bg-orange-50 dark:bg-orange-950/20 p-2">
            <AlertTriangle className="h-5 w-5 text-orange-600 dark:text-orange-400" />
          </div>
          <div>
            <h3 className="font-semibold">Alerts Per Hour</h3>
            <p className="text-xs text-muted-foreground">Last 24 hours</p>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={mockAlertsPerHour}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis
              dataKey="hour"
              className="text-xs"
              tick={{ fill: 'currentColor' }}
              stroke="currentColor"
            />
            <YAxis
              className="text-xs"
              tick={{ fill: 'currentColor' }}
              stroke="currentColor"
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'hsl(var(--popover))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px',
              }}
            />
            <Bar dataKey="value" fill="#F59E0B" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Alert Categories */}
      <div className="rounded-xl border border-border/50 bg-card p-6 shadow-sm">
        <div className="mb-4 flex items-center gap-2">
          <div className="rounded-lg bg-purple-50 dark:bg-purple-950/20 p-2">
            <PieChartIcon className="h-5 w-5 text-purple-600 dark:text-purple-400" />
          </div>
          <div>
            <h3 className="font-semibold">Alert Categories</h3>
            <p className="text-xs text-muted-foreground">Distribution by type</p>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={200}>
          <PieChart>
            <Pie
              data={mockAlertCategories}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              outerRadius={70}
              fill="#8884d8"
              dataKey="value"
            >
              {mockAlertCategories.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: 'hsl(var(--popover))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px',
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

