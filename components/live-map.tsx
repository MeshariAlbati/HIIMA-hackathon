'use client'

import { useEffect, useMemo, useState } from 'react'
import Map, { Marker, NavigationControl, ScaleControl } from 'react-map-gl'
import { useTheme } from 'next-themes'
import { Building2, ExternalLink, MapPin } from 'lucide-react'
import type { MapPoint } from '@/lib/mock-data'
import { mockMapPoints } from '@/lib/mock-data'
import { cn } from '@/lib/utils'

const DEFAULT_MAPBOX_TOKEN =
  'pk.eyJ1IjoibWVzaGFyaWFsYmF0aSIsImEiOiJjbWllbzFsdm0wNGx5M2VzZ25wd3d2dmk2In0.7jheu97n9Xg8R444btE3MA'

const facilityMarkers = [
  {
    id: 'masjid-haram',
    label: 'Masjid al-Haram',
    lat: 21.422487,
    lng: 39.826206,
    type: 'holy',
  },
  {
    id: 'royal-clinic',
    label: 'Royal Clinic',
    lat: 21.4178,
    lng: 39.8286,
    type: 'clinic',
  },
  {
    id: 'emergency-tent',
    label: 'Emergency Tents A',
    lat: 21.4199,
    lng: 39.8229,
    type: 'field',
  },
  {
    id: 'mina-medical',
    label: 'Mina Medical Hub',
    lat: 21.4138,
    lng: 39.8257,
    type: 'clinic',
  },
] as const

type MapTheme = 'light' | 'dark' | 'satellite'

type LiveMapProps = {
  layout?: 'default' | 'square'
}

export function LiveMap({ layout = 'default' }: LiveMapProps) {
  const { resolvedTheme } = useTheme()
  const [activePoint, setActivePoint] = useState<MapPoint | null>(null)
  const [mapTheme, setMapTheme] = useState<MapTheme>('light')
  const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN ?? DEFAULT_MAPBOX_TOKEN

  useEffect(() => {
    setMapTheme(resolvedTheme === 'dark' ? 'dark' : 'light')
  }, [resolvedTheme])

  const { centerLat, centerLng, zoomLevel, statusCounts } = useMemo(() => {
    const latitudes = mockMapPoints.map((point) => point.lat)
    const longitudes = mockMapPoints.map((point) => point.lng)
    const minLat = Math.min(...latitudes)
    const maxLat = Math.max(...latitudes)
    const minLng = Math.min(...longitudes)
    const maxLng = Math.max(...longitudes)
    const latRange = Math.max(maxLat - minLat, 0.0005)
    const lngRange = Math.max(maxLng - minLng, 0.0005)
    const approxRange = Math.max(latRange, lngRange)

    const zoomLevel = approxRange < 0.0008 ? 16 : approxRange < 0.002 ? 15 : approxRange < 0.005 ? 14 : 13

    const statusCounts = mockMapPoints.reduce(
      (acc, point) => {
        acc[point.status] += 1
        return acc
      },
      { critical: 0, warning: 0, normal: 0 }
    )

    return {
      centerLat: minLat + latRange / 2,
      centerLng: minLng + lngRange / 2,
      zoomLevel,
      statusCounts,
    }
  }, [])

  const getStatusStyles = (status: MapPoint['status']) => {
    switch (status) {
      case 'critical':
        return 'bg-red-500 ring-red-300 shadow-red-500/30'
      case 'warning':
        return 'bg-orange-500 ring-orange-300 shadow-orange-500/30'
      case 'normal':
      default:
        return 'bg-green-500 ring-green-300 shadow-green-500/30'
    }
  }

  const currentMapStyle =
    mapTheme === 'satellite'
      ? 'mapbox://styles/mapbox/satellite-streets-v12'
      : mapTheme === 'dark'
        ? 'mapbox://styles/mapbox/dark-v11'
        : 'mapbox://styles/mapbox/light-v11'

  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-xl border border-border/50 bg-card shadow-lg',
        layout === 'square' ? 'aspect-square min-h-[320px]' : 'h-full min-h-[500px]'
      )}
    >
      <Map
        mapboxAccessToken={mapboxToken}
        initialViewState={{
          latitude: centerLat,
          longitude: centerLng,
          zoom: zoomLevel,
        }}
        minZoom={12}
        maxZoom={18}
        mapStyle={currentMapStyle}
        attributionControl={false}
        style={{ width: '100%', height: '100%' }}
        reuseMaps
        dragRotate={false}
        boxZoom={false}
      >
        <div className="absolute top-4 left-4 flex flex-col gap-3">
          {activePoint && (
            <div className="w-60 rounded-lg border border-border/60 bg-background/95 p-3 text-xs shadow-lg backdrop-blur">
              <p className="text-[10px] uppercase text-muted-foreground tracking-[0.2em]">Patient</p>
              <p className="text-base font-semibold">{activePoint.patientId}</p>
              <p className="flex items-center gap-1 text-sm capitalize">
                <MapPin className="h-3 w-3 text-primary" />
                {activePoint.status} status
              </p>
              <div className="mt-2 grid grid-cols-2 gap-y-1 text-[11px] text-muted-foreground">
                <span>Lat:</span>
                <span className="text-right">{activePoint.lat.toFixed(4)}</span>
                <span>Lng:</span>
                <span className="text-right">{activePoint.lng.toFixed(4)}</span>
              </div>
            </div>
          )}

          <div className="rounded-lg border border-border/60 bg-background/95 p-3 text-xs shadow-lg backdrop-blur">
            <p className="mb-2 text-[10px] uppercase text-muted-foreground tracking-[0.2em]">Status mix</p>
            <div className="flex flex-col gap-2">
              <LegendItem label="Critical" count={statusCounts.critical} color="bg-red-500 ring-red-300" />
              <LegendItem label="Warning" count={statusCounts.warning} color="bg-orange-500 ring-orange-300" />
              <LegendItem label="Normal" count={statusCounts.normal} color="bg-green-500 ring-green-300" />
            </div>
          </div>
        </div>

        <div className="absolute top-4 right-4 flex flex-col gap-2 rounded-lg border border-border/60 bg-background/95 p-2 text-[11px] shadow-lg backdrop-blur">
          <p className="px-2 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Map layers</p>
          <div className="flex gap-1">
            <LayerToggle label="Light" active={mapTheme === 'light'} onClick={() => setMapTheme('light')} />
            <LayerToggle label="Dark" active={mapTheme === 'dark'} onClick={() => setMapTheme('dark')} />
            <LayerToggle label="Sat" active={mapTheme === 'satellite'} onClick={() => setMapTheme('satellite')} />
          </div>
        </div>

        {facilityMarkers.map((facility) => (
          <Marker key={facility.id} latitude={facility.lat} longitude={facility.lng} anchor="bottom">
            <div className="flex flex-col items-center text-center">
              <div className="rounded-full border border-primary/40 bg-background/95 px-2 py-1 text-[10px] font-semibold shadow-lg backdrop-blur">
                <p>{facility.label}</p>
              </div>
              <div className="mt-1 rounded-full bg-primary/90 p-2 text-background shadow-lg">
                <MapPin className="h-4 w-4" aria-hidden />
              </div>
            </div>
            <span className="sr-only">{facility.label}</span>
          </Marker>
        ))}

        {mockMapPoints.map((point) => (
          <Marker key={point.id} latitude={point.lat} longitude={point.lng} anchor="bottom">
            <button
              type="button"
              className={cn(
                'group relative flex h-6 w-6 items-center justify-center rounded-full ring-4 ring-offset-2 ring-offset-background shadow-lg transition-transform hover:scale-110 focus:outline-none',
                getStatusStyles(point.status)
              )}
              onMouseEnter={() => setActivePoint(point)}
              onMouseLeave={() => setActivePoint((prev) => (prev?.id === point.id ? null : prev))}
              onFocus={() => setActivePoint(point)}
              onBlur={() => setActivePoint((prev) => (prev?.id === point.id ? null : prev))}
            >
              <span className="sr-only">{`Patient ${point.patientId} is ${point.status}`}</span>
              <div className="absolute inset-0 rounded-full bg-white/40" aria-hidden />
            </button>
          </Marker>
        ))}

        <div className="absolute bottom-4 right-4 flex flex-col gap-3">
          <NavigationControl visualizePitch={false} showCompass={false} position="bottom-right" />
          <ScaleControl unit="metric" maxWidth={120} />
          <button className="flex items-center gap-2 rounded-lg border border-border/60 bg-background/95 px-4 py-2 text-sm font-medium shadow-lg backdrop-blur transition-all hover:bg-accent">
            <ExternalLink className="h-4 w-4" />
            View Full Map
          </button>
        </div>
      </Map>
    </div>
  )
}

function LegendItem({ label, count, color }: { label: string; count: number; color: string }) {
  return (
    <div className="flex items-center justify-between text-xs">
      <div className="flex items-center gap-2">
        <span className={cn('h-3 w-3 rounded-full ring-2', color)} aria-hidden />
        <span className="font-medium">{label}</span>
      </div>
      <span className="text-muted-foreground">{count}</span>
    </div>
  )
}

function LayerToggle({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      className={cn(
        'rounded-md px-2 py-1 text-[11px] font-medium transition-all',
        active ? 'bg-primary/90 text-white shadow' : 'bg-muted text-foreground/70 hover:bg-muted/80'
      )}
      onClick={onClick}
    >
      {label}
    </button>
  )
}

