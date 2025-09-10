"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { MapPin, Phone, Clock, Star, Navigation, Filter, Search, CheckCircle } from "lucide-react"

interface Pharmacy {
  id: string
  name: string
  address: string
  phone: string
  distance: number
  rating: number
  isOpen: boolean
  openHours: string
  services: string[]
  verified: boolean
  lastUpdated: string
}

interface PharmacyLocatorProps {
  onBack: () => void
}

export function PharmacyLocator({ onBack }: PharmacyLocatorProps) {
  const [searchLocation, setSearchLocation] = useState("")
  const [selectedRadius, setSelectedRadius] = useState("5km")

  const pharmacies: Pharmacy[] = [
    {
      id: "1",
      name: "Nabha Medical Store",
      address: "Main Market, Nabha, Punjab 147201",
      phone: "+91 98765 43210",
      distance: 0.5,
      rating: 4.5,
      isOpen: true,
      openHours: "8:00 AM - 10:00 PM",
      services: ["Prescription", "OTC Medicines", "Health Checkup", "Home Delivery"],
      verified: true,
      lastUpdated: "2 hours ago",
    },
    {
      id: "2",
      name: "City Pharmacy",
      address: "Bus Stand Road, Nabha, Punjab 147201",
      phone: "+91 98765 43211",
      distance: 1.2,
      rating: 4.2,
      isOpen: true,
      openHours: "9:00 AM - 9:00 PM",
      services: ["Prescription", "OTC Medicines", "Medical Equipment"],
      verified: true,
      lastUpdated: "4 hours ago",
    },
    {
      id: "3",
      name: "Health Plus Pharmacy",
      address: "Civil Hospital Road, Nabha, Punjab 147201",
      phone: "+91 98765 43212",
      distance: 2.1,
      rating: 4.0,
      isOpen: false,
      openHours: "8:00 AM - 8:00 PM",
      services: ["Prescription", "OTC Medicines", "Ayurvedic Medicines"],
      verified: false,
      lastUpdated: "1 day ago",
    },
    {
      id: "4",
      name: "Apollo Pharmacy",
      address: "GT Road, Patiala, Punjab 147001",
      phone: "+91 98765 43213",
      distance: 15.5,
      rating: 4.8,
      isOpen: true,
      openHours: "24/7",
      services: ["Prescription", "OTC Medicines", "Health Checkup", "Lab Tests", "Home Delivery"],
      verified: true,
      lastUpdated: "1 hour ago",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b sticky top-0 z-50">
        <div className="p-4">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={onBack}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </Button>
            <div>
              <h1 className="text-xl font-bold">Nearby Pharmacies</h1>
              <p className="text-sm text-muted-foreground">Find pharmacies in your area</p>
            </div>
          </div>
        </div>
      </header>

      <div className="p-4">
        {/* Search and Filters */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search by location or pharmacy name..."
                  value={searchLocation}
                  onChange={(e) => setSearchLocation(e.target.value)}
                  className="pl-10"
                />
              </div>

              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Navigation className="w-4 h-4 mr-2" />
                  Use Current Location
                </Button>
                <select
                  value={selectedRadius}
                  onChange={(e) => setSelectedRadius(e.target.value)}
                  className="px-3 py-2 border rounded-md bg-background text-sm"
                >
                  <option value="1km">Within 1km</option>
                  <option value="5km">Within 5km</option>
                  <option value="10km">Within 10km</option>
                  <option value="25km">Within 25km</option>
                </select>
                <Button variant="outline" size="sm">
                  <Filter className="w-4 h-4 mr-2" />
                  Filters
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Pharmacy List */}
        <div className="space-y-4">
          {pharmacies.map((pharmacy) => (
            <Card key={pharmacy.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-lg font-semibold">{pharmacy.name}</h3>
                      {pharmacy.verified && (
                        <Badge variant="outline" className="text-xs">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Verified
                        </Badge>
                      )}
                      <Badge
                        className={`text-xs ${pharmacy.isOpen ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}`}
                      >
                        {pharmacy.isOpen ? "Open" : "Closed"}
                      </Badge>
                    </div>

                    <div className="space-y-2 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        <span>{pharmacy.address}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4" />
                        <span>{pharmacy.phone}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        <span>{pharmacy.openHours}</span>
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="flex items-center gap-1 mb-2">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-medium">{pharmacy.rating}</span>
                    </div>
                    <div className="text-sm text-muted-foreground mb-2">{pharmacy.distance}km away</div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Phone className="w-3 h-3 mr-1" />
                        Call
                      </Button>
                      <Button size="sm">
                        <Navigation className="w-3 h-3 mr-1" />
                        Directions
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Services */}
                <div className="mb-3">
                  <h4 className="text-sm font-medium mb-2">Services:</h4>
                  <div className="flex flex-wrap gap-2">
                    {pharmacy.services.map((service, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {service}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Last Updated */}
                <div className="text-xs text-muted-foreground">Stock information updated {pharmacy.lastUpdated}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Map View Toggle */}
        <div className="fixed bottom-6 right-6">
          <Button className="rounded-full shadow-lg">
            <MapPin className="w-4 h-4 mr-2" />
            Map View
          </Button>
        </div>
      </div>
    </div>
  )
}
