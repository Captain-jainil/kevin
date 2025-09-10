"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import {
  Search,
  Star,
  Clock,
  Video,
  Phone,
  MapPin,
  Languages,
  Stethoscope,
  Heart,
  Brain,
  Baby,
  Eye,
  Bone,
  CheckCircle,
  Circle,
} from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Doctor {
  id: string
  name: string
  specialization: string
  rating: number
  experience: number
  languages: string[]
  availability: "available" | "busy" | "offline"
  nextSlot: string
  consultationFee: number
  image: string
  location: string
  verified: boolean
}

interface DoctorSelectionProps {
  onSelectDoctor: (doctor: Doctor, callType: "video" | "audio") => void
  onBack: () => void
}

export function DoctorSelection({ onSelectDoctor, onBack }: DoctorSelectionProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedSpecialization, setSelectedSpecialization] = useState("all")
  const [selectedLanguage, setSelectedLanguage] = useState("all")
  const [sortBy, setSortBy] = useState("rating")

  const doctors: Doctor[] = [
    {
      id: "1",
      name: "Dr. Simran Kaur",
      specialization: "General Medicine",
      rating: 4.8,
      experience: 12,
      languages: ["English", "Hindi", "Punjabi"],
      availability: "available",
      nextSlot: "Available now",
      consultationFee: 200,
      image: "/indian-female-doctor.png",
      location: "Patiala Medical College",
      verified: true,
    },
    {
      id: "2",
      name: "Dr. Rajesh Kumar",
      specialization: "Cardiology",
      rating: 4.9,
      experience: 15,
      languages: ["English", "Hindi"],
      availability: "available",
      nextSlot: "Available now",
      consultationFee: 350,
      image: "/indian-doctor.jpg",
      location: "AIIMS Chandigarh",
      verified: true,
    },
    {
      id: "3",
      name: "Dr. Priya Sharma",
      specialization: "Pediatrics",
      rating: 4.7,
      experience: 8,
      languages: ["English", "Hindi", "Punjabi"],
      availability: "busy",
      nextSlot: "2:30 PM today",
      consultationFee: 250,
      image: "/indian-female-pediatrician.jpg",
      location: "Child Care Hospital",
      verified: true,
    },
    {
      id: "4",
      name: "Dr. Manpreet Singh",
      specialization: "Orthopedics",
      rating: 4.6,
      experience: 10,
      languages: ["English", "Punjabi", "Hindi"],
      availability: "available",
      nextSlot: "Available now",
      consultationFee: 300,
      image: "/indian-male-orthopedic-doctor.jpg",
      location: "Bone & Joint Clinic",
      verified: true,
    },
  ]

  const specializations = [
    { value: "all", label: "All Specializations", icon: Stethoscope },
    { value: "general", label: "General Medicine", icon: Heart },
    { value: "cardiology", label: "Cardiology", icon: Heart },
    { value: "pediatrics", label: "Pediatrics", icon: Baby },
    { value: "orthopedics", label: "Orthopedics", icon: Bone },
    { value: "neurology", label: "Neurology", icon: Brain },
    { value: "ophthalmology", label: "Eye Care", icon: Eye },
  ]

  const filteredDoctors = doctors.filter((doctor) => {
    const matchesSearch =
      doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doctor.specialization.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesSpecialization =
      selectedSpecialization === "all" || doctor.specialization.toLowerCase().includes(selectedSpecialization)
    const matchesLanguage =
      selectedLanguage === "all" || doctor.languages.some((lang) => lang.toLowerCase().includes(selectedLanguage))

    return matchesSearch && matchesSpecialization && matchesLanguage
  })

  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case "available":
        return "text-green-600 bg-green-50 border-green-200"
      case "busy":
        return "text-yellow-600 bg-yellow-50 border-yellow-200"
      case "offline":
        return "text-red-600 bg-red-50 border-red-200"
      default:
        return "text-gray-600 bg-gray-50 border-gray-200"
    }
  }

  const getSpecializationIcon = (specialization: string) => {
    const spec = specializations.find((s) => specialization.toLowerCase().includes(s.value))
    const IconComponent = spec?.icon || Stethoscope
    return <IconComponent className="w-4 h-4" />
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b sticky top-0 z-50">
        <div className="p-4">
          <div className="flex items-center gap-3 mb-4">
            <Button variant="ghost" size="icon" onClick={onBack}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </Button>
            <div>
              <h1 className="text-xl font-bold">Select Doctor</h1>
              <p className="text-sm text-muted-foreground">Choose a doctor for consultation</p>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="space-y-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search doctors by name or specialization..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            <div className="flex gap-2 overflow-x-auto">
              <Select value={selectedSpecialization} onValueChange={setSelectedSpecialization}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Specialization" />
                </SelectTrigger>
                <SelectContent>
                  {specializations.map((spec) => (
                    <SelectItem key={spec.value} value={spec.value}>
                      <div className="flex items-center gap-2">
                        <spec.icon className="w-4 h-4" />
                        {spec.label}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Languages</SelectItem>
                  <SelectItem value="english">English</SelectItem>
                  <SelectItem value="hindi">Hindi</SelectItem>
                  <SelectItem value="punjabi">Punjabi</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </header>

      {/* Doctor List */}
      <div className="p-4 space-y-4">
        {filteredDoctors.map((doctor) => (
          <Card key={doctor.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex gap-4">
                <div className="relative">
                  <Avatar className="w-16 h-16">
                    <AvatarImage src={doctor.image || "/placeholder.svg"} />
                    <AvatarFallback>
                      {doctor.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  {doctor.verified && (
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-4 h-4 text-white" />
                    </div>
                  )}
                </div>

                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-semibold text-lg">{doctor.name}</h3>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        {getSpecializationIcon(doctor.specialization)}
                        <span>{doctor.specialization}</span>
                        <span>•</span>
                        <span>{doctor.experience} years exp.</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-1 mb-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-medium">{doctor.rating}</span>
                      </div>
                      <p className="text-sm font-semibold">₹{doctor.consultationFee}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mb-3">
                    <MapPin className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">{doctor.location}</span>
                  </div>

                  <div className="flex items-center gap-2 mb-3">
                    <Languages className="w-4 h-4 text-muted-foreground" />
                    <div className="flex gap-1">
                      {doctor.languages.map((lang, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {lang}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div
                        className={`flex items-center gap-1 px-2 py-1 rounded-full border text-xs ${getAvailabilityColor(doctor.availability)}`}
                      >
                        <Circle className="w-2 h-2 fill-current" />
                        <span className="capitalize">{doctor.availability}</span>
                      </div>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Clock className="w-4 h-4" />
                        <span>{doctor.nextSlot}</span>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onSelectDoctor(doctor, "audio")}
                        disabled={doctor.availability === "offline"}
                        className="flex items-center gap-1"
                      >
                        <Phone className="w-4 h-4" />
                        Audio
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => onSelectDoctor(doctor, "video")}
                        disabled={doctor.availability === "offline"}
                        className="flex items-center gap-1"
                      >
                        <Video className="w-4 h-4" />
                        Video
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {filteredDoctors.length === 0 && (
          <div className="text-center py-12">
            <Stethoscope className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No doctors found</h3>
            <p className="text-muted-foreground">Try adjusting your search criteria</p>
          </div>
        )}
      </div>
    </div>
  )
}
