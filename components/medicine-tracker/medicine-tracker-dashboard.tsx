"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Pill,
  Search,
  MapPin,
  Clock,
  Phone,
  Star,
  CheckCircle,
  AlertCircle,
  XCircle,
  ShoppingCart,
  Bell,
  Filter,
  Navigation,
  Upload,
  Camera,
  Bookmark,
  Share2,
  TrendingUp,
  TrendingDown,
  Minus,
  Heart,
  Info,
} from "lucide-react"

interface Medicine {
  id: string
  name: string
  genericName: string
  strength: string
  form: "tablet" | "capsule" | "syrup" | "injection" | "cream" | "drops"
  category: string
  manufacturer: string
  description: string
  sideEffects: string[]
  alternatives: string[]
}

interface PharmacyStock {
  pharmacyId: string
  pharmacyName: string
  address: string
  phone: string
  distance: number
  rating: number
  stock: number
  price: number
  lastUpdated: string
  status: "available" | "low-stock" | "out-of-stock"
  verified: boolean
}

interface MedicineTrackerProps {
  onBack: () => void
}

export function MedicineTrackerDashboard({ onBack }: MedicineTrackerProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [sortBy, setSortBy] = useState("distance")
  const [selectedMedicine, setSelectedMedicine] = useState<Medicine | null>(null)
  const [showPrescriptionUpload, setShowPrescriptionUpload] = useState(false)

  const medicines: Medicine[] = [
    {
      id: "1",
      name: "Paracetamol",
      genericName: "Acetaminophen",
      strength: "500mg",
      form: "tablet",
      category: "Pain Relief",
      manufacturer: "Various",
      description: "Used to treat pain and reduce fever",
      sideEffects: ["Nausea", "Stomach upset", "Allergic reactions (rare)"],
      alternatives: ["Ibuprofen", "Aspirin", "Diclofenac"],
    },
    {
      id: "2",
      name: "Metformin",
      genericName: "Metformin Hydrochloride",
      strength: "500mg",
      form: "tablet",
      category: "Diabetes",
      manufacturer: "Sun Pharma",
      description: "Used to control blood sugar in type 2 diabetes",
      sideEffects: ["Nausea", "Diarrhea", "Metallic taste"],
      alternatives: ["Glimepiride", "Gliclazide", "Pioglitazone"],
    },
    {
      id: "3",
      name: "Amoxicillin",
      genericName: "Amoxicillin",
      strength: "250mg",
      form: "capsule",
      category: "Antibiotic",
      manufacturer: "Cipla",
      description: "Antibiotic used to treat bacterial infections",
      sideEffects: ["Nausea", "Diarrhea", "Allergic reactions"],
      alternatives: ["Azithromycin", "Cephalexin", "Doxycycline"],
    },
  ]

  const pharmacyStocks: PharmacyStock[] = [
    {
      pharmacyId: "1",
      pharmacyName: "Nabha Medical Store",
      address: "Main Market, Nabha, Punjab",
      phone: "+91 98765 43210",
      distance: 0.5,
      rating: 4.5,
      stock: 50,
      price: 25,
      lastUpdated: "2 hours ago",
      status: "available",
      verified: true,
    },
    {
      pharmacyId: "2",
      pharmacyName: "City Pharmacy",
      address: "Bus Stand Road, Nabha, Punjab",
      phone: "+91 98765 43211",
      distance: 1.2,
      rating: 4.2,
      stock: 5,
      price: 28,
      lastUpdated: "4 hours ago",
      status: "low-stock",
      verified: true,
    },
    {
      pharmacyId: "3",
      pharmacyName: "Health Plus Pharmacy",
      address: "Civil Hospital Road, Nabha, Punjab",
      phone: "+91 98765 43212",
      distance: 2.1,
      rating: 4.0,
      stock: 0,
      price: 30,
      lastUpdated: "1 day ago",
      status: "out-of-stock",
      verified: false,
    },
    {
      pharmacyId: "4",
      pharmacyName: "Apollo Pharmacy",
      address: "GT Road, Patiala, Punjab",
      phone: "+91 98765 43213",
      distance: 15.5,
      rating: 4.8,
      stock: 100,
      price: 22,
      lastUpdated: "1 hour ago",
      status: "available",
      verified: true,
    },
  ]

  const categories = [
    "all",
    "Pain Relief",
    "Diabetes",
    "Antibiotic",
    "Heart Disease",
    "Blood Pressure",
    "Vitamins",
    "Skin Care",
    "Eye Care",
    "Respiratory",
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "available":
        return "text-green-600 bg-green-50 border-green-200"
      case "low-stock":
        return "text-yellow-600 bg-yellow-50 border-yellow-200"
      case "out-of-stock":
        return "text-red-600 bg-red-50 border-red-200"
      default:
        return "text-gray-600 bg-gray-50 border-gray-200"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "available":
        return <CheckCircle className="w-4 h-4" />
      case "low-stock":
        return <AlertCircle className="w-4 h-4" />
      case "out-of-stock":
        return <XCircle className="w-4 h-4" />
      default:
        return <Minus className="w-4 h-4" />
    }
  }

  const filteredMedicines = medicines.filter((medicine) => {
    const matchesSearch =
      medicine.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      medicine.genericName.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "all" || medicine.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const MedicineSearch = () => (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Pill className="w-5 h-5" />
          Medicine Search
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search medicines by name or generic name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="flex gap-2">
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category === "all" ? "All Categories" : category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button variant="outline" onClick={() => setShowPrescriptionUpload(true)}>
            <Upload className="w-4 h-4 mr-2" />
            Upload Prescription
          </Button>

          <Button variant="outline">
            <Camera className="w-4 h-4 mr-2" />
            Scan Medicine
          </Button>
        </div>
      </CardContent>
    </Card>
  )

  const MedicineResults = () => (
    <div className="space-y-4">
      {filteredMedicines.map((medicine) => (
        <Card key={medicine.id} className="hover:shadow-md transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-lg font-semibold">{medicine.name}</h3>
                  <Badge variant="outline">{medicine.strength}</Badge>
                  <Badge variant="secondary">{medicine.form}</Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-1">Generic: {medicine.genericName}</p>
                <p className="text-sm text-muted-foreground mb-2">
                  Category: {medicine.category} • {medicine.manufacturer}
                </p>
                <p className="text-sm">{medicine.description}</p>
              </div>
              <div className="flex gap-2">
                <Button variant="ghost" size="icon">
                  <Bookmark className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="icon">
                  <Share2 className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="icon">
                  <Info className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Pharmacy Availability */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="font-medium">Available at:</h4>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="distance">Distance</SelectItem>
                    <SelectItem value="price">Price</SelectItem>
                    <SelectItem value="rating">Rating</SelectItem>
                    <SelectItem value="stock">Stock</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {pharmacyStocks.slice(0, 3).map((pharmacy) => (
                <div key={pharmacy.pharmacyId} className="p-3 border rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h5 className="font-medium">{pharmacy.pharmacyName}</h5>
                        {pharmacy.verified && (
                          <Badge variant="outline" className="text-xs">
                            <CheckCircle className="w-3 h-3 mr-1" />
                            Verified
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          <span>{pharmacy.distance}km away</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                          <span>{pharmacy.rating}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          <span>Updated {pharmacy.lastUpdated}</span>
                        </div>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge className={`text-xs ${getStatusColor(pharmacy.status)}`}>
                          {getStatusIcon(pharmacy.status)}
                          {pharmacy.status === "available" && `${pharmacy.stock} in stock`}
                          {pharmacy.status === "low-stock" && `${pharmacy.stock} left`}
                          {pharmacy.status === "out-of-stock" && "Out of stock"}
                        </Badge>
                      </div>
                      <div className="text-lg font-semibold">₹{pharmacy.price}</div>
                      <div className="flex gap-1 mt-2">
                        <Button variant="outline" size="sm" disabled={pharmacy.status === "out-of-stock"}>
                          <Phone className="w-3 h-3 mr-1" />
                          Call
                        </Button>
                        <Button size="sm" disabled={pharmacy.status === "out-of-stock"}>
                          <ShoppingCart className="w-3 h-3 mr-1" />
                          Reserve
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              <Button variant="ghost" className="w-full">
                View All Pharmacies ({pharmacyStocks.length})
              </Button>
            </div>

            {/* Medicine Info */}
            <div className="mt-4 pt-4 border-t">
              <Tabs defaultValue="alternatives" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="alternatives">Alternatives</TabsTrigger>
                  <TabsTrigger value="side-effects">Side Effects</TabsTrigger>
                  <TabsTrigger value="price-trend">Price Trend</TabsTrigger>
                </TabsList>

                <TabsContent value="alternatives" className="mt-3">
                  <div className="flex flex-wrap gap-2">
                    {medicine.alternatives.map((alt, index) => (
                      <Badge key={index} variant="outline" className="cursor-pointer hover:bg-muted">
                        {alt}
                      </Badge>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="side-effects" className="mt-3">
                  <ul className="text-sm space-y-1">
                    {medicine.sideEffects.map((effect, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <AlertCircle className="w-3 h-3 text-yellow-500" />
                        {effect}
                      </li>
                    ))}
                  </ul>
                </TabsContent>

                <TabsContent value="price-trend" className="mt-3">
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-1 text-green-600">
                      <TrendingDown className="w-4 h-4" />
                      <span>Price decreased by 8% this month</span>
                    </div>
                    <div className="text-muted-foreground">Avg: ₹26 | Range: ₹22-₹30</div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )

  const QuickActions = () => (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      <Card className="cursor-pointer hover:shadow-md transition-shadow">
        <CardContent className="p-4 text-center">
          <Bell className="w-8 h-8 text-primary mx-auto mb-2" />
          <h3 className="font-semibold text-sm">Stock Alerts</h3>
          <p className="text-xs text-muted-foreground">Get notified when available</p>
        </CardContent>
      </Card>

      <Card className="cursor-pointer hover:shadow-md transition-shadow">
        <CardContent className="p-4 text-center">
          <Navigation className="w-8 h-8 text-primary mx-auto mb-2" />
          <h3 className="font-semibold text-sm">Nearby Pharmacies</h3>
          <p className="text-xs text-muted-foreground">Find closest stores</p>
        </CardContent>
      </Card>

      <Card className="cursor-pointer hover:shadow-md transition-shadow">
        <CardContent className="p-4 text-center">
          <Heart className="w-8 h-8 text-primary mx-auto mb-2" />
          <h3 className="font-semibold text-sm">My Medicines</h3>
          <p className="text-xs text-muted-foreground">Saved prescriptions</p>
        </CardContent>
      </Card>

      <Card className="cursor-pointer hover:shadow-md transition-shadow">
        <CardContent className="p-4 text-center">
          <TrendingUp className="w-8 h-8 text-primary mx-auto mb-2" />
          <h3 className="font-semibold text-sm">Price Alerts</h3>
          <p className="text-xs text-muted-foreground">Track price changes</p>
        </CardContent>
      </Card>
    </div>
  )

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
              <h1 className="text-xl font-bold">Medicine Tracker</h1>
              <p className="text-sm text-muted-foreground">Find medicines in nearby pharmacies</p>
            </div>
          </div>
        </div>
      </header>

      <div className="p-4">
        <QuickActions />
        <MedicineSearch />

        {searchQuery || selectedCategory !== "all" ? (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Search Results ({filteredMedicines.length})</h2>
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4 mr-2" />
                Filters
              </Button>
            </div>
            <MedicineResults />
          </div>
        ) : (
          <div className="text-center py-12">
            <Pill className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Search for Medicines</h3>
            <p className="text-muted-foreground mb-4">
              Enter medicine name or upload prescription to find availability
            </p>
            <div className="flex gap-2 justify-center">
              <Button onClick={() => setSearchQuery("paracetamol")}>Try "Paracetamol"</Button>
              <Button variant="outline" onClick={() => setShowPrescriptionUpload(true)}>
                Upload Prescription
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
