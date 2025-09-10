"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Calendar } from "@/components/ui/calendar"
import { Textarea } from "@/components/ui/textarea"
import { CalendarIcon, Clock, Video, Phone, FileText, AlertCircle, CheckCircle, Star, MapPin } from "lucide-react"
import { format, addDays, isSameDay } from "date-fns"

interface Doctor {
  id: string
  name: string
  specialization: string
  rating: number
  image: string
  location: string
  consultationFee: number
}

interface AppointmentSchedulerProps {
  doctor: Doctor
  callType: "video" | "audio"
  onSchedule: (appointmentData: any) => void
  onBack: () => void
}

export function AppointmentScheduler({ doctor, callType, onSchedule, onBack }: AppointmentSchedulerProps) {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
  const [selectedTime, setSelectedTime] = useState<string>("")
  const [symptoms, setSymptoms] = useState("")
  const [urgency, setUrgency] = useState<"routine" | "urgent" | "emergency">("routine")

  // Generate available time slots
  const generateTimeSlots = (date: Date) => {
    const slots = []
    const isToday = isSameDay(date, new Date())
    const currentHour = new Date().getHours()

    // Morning slots (9 AM - 12 PM)
    for (let hour = 9; hour < 12; hour++) {
      if (!isToday || hour > currentHour) {
        slots.push(`${hour}:00 AM`)
        slots.push(`${hour}:30 AM`)
      }
    }

    // Afternoon slots (2 PM - 6 PM)
    for (let hour = 14; hour < 18; hour++) {
      if (!isToday || hour > currentHour) {
        const displayHour = hour > 12 ? hour - 12 : hour
        slots.push(`${displayHour}:00 PM`)
        slots.push(`${displayHour}:30 PM`)
      }
    }

    return slots
  }

  const availableSlots = generateTimeSlots(selectedDate)

  const handleSchedule = () => {
    const appointmentData = {
      doctorId: doctor.id,
      doctorName: doctor.name,
      date: selectedDate,
      time: selectedTime,
      callType,
      symptoms,
      urgency,
      fee: doctor.consultationFee,
    }
    onSchedule(appointmentData)
  }

  const getUrgencyColor = (level: string) => {
    switch (level) {
      case "routine":
        return "bg-green-50 text-green-700 border-green-200"
      case "urgent":
        return "bg-yellow-50 text-yellow-700 border-yellow-200"
      case "emergency":
        return "bg-red-50 text-red-700 border-red-200"
      default:
        return "bg-gray-50 text-gray-700 border-gray-200"
    }
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
              <h1 className="text-xl font-bold">Schedule Appointment</h1>
              <p className="text-sm text-muted-foreground">Book your consultation</p>
            </div>
          </div>
        </div>
      </header>

      <div className="p-4 space-y-6">
        {/* Doctor Info */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-4">
              <Avatar className="w-16 h-16">
                <AvatarImage src={doctor.image || "/placeholder.svg"} />
                <AvatarFallback>
                  {doctor.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h3 className="font-semibold text-lg">{doctor.name}</h3>
                <p className="text-muted-foreground">{doctor.specialization}</p>
                <div className="flex items-center gap-4 mt-2">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm">{doctor.rating}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">{doctor.location}</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <Badge variant={callType === "video" ? "default" : "secondary"} className="mb-2">
                  {callType === "video" ? <Video className="w-3 h-3 mr-1" /> : <Phone className="w-3 h-3 mr-1" />}
                  {callType === "video" ? "Video Call" : "Audio Call"}
                </Badge>
                <p className="text-lg font-semibold">₹{doctor.consultationFee}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Date Selection */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CalendarIcon className="w-5 h-5" />
              Select Date
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={(date) => date && setSelectedDate(date)}
              disabled={(date) => date < new Date() || date > addDays(new Date(), 30)}
              className="rounded-md border"
            />
          </CardContent>
        </Card>

        {/* Time Selection */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              Available Times - {format(selectedDate, "MMMM d, yyyy")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-2">
              {availableSlots.map((slot) => (
                <Button
                  key={slot}
                  variant={selectedTime === slot ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedTime(slot)}
                  className="text-sm"
                >
                  {slot}
                </Button>
              ))}
            </div>
            {availableSlots.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                <Clock className="w-12 h-12 mx-auto mb-2 opacity-50" />
                <p>No available slots for this date</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Urgency Level */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5" />
              Urgency Level
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-3">
              {[
                { value: "routine", label: "Routine Check-up", desc: "Regular consultation, no immediate concerns" },
                { value: "urgent", label: "Urgent Care", desc: "Need medical attention within 24 hours" },
                { value: "emergency", label: "Emergency", desc: "Immediate medical attention required" },
              ].map((option) => (
                <Button
                  key={option.value}
                  variant={urgency === option.value ? "default" : "outline"}
                  className={`p-4 h-auto justify-start ${urgency === option.value ? "" : "hover:bg-muted/50"}`}
                  onClick={() => setUrgency(option.value as any)}
                >
                  <div className="text-left">
                    <div className="font-medium">{option.label}</div>
                    <div className="text-sm opacity-70">{option.desc}</div>
                  </div>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Symptoms Description */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Describe Your Symptoms
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              placeholder="Please describe your symptoms, concerns, or reason for consultation. This helps the doctor prepare for your appointment."
              value={symptoms}
              onChange={(e) => setSymptoms(e.target.value)}
              rows={4}
              className="resize-none"
            />
            <p className="text-sm text-muted-foreground mt-2">Optional but recommended for better consultation</p>
          </CardContent>
        </Card>

        {/* Summary & Schedule */}
        <Card>
          <CardHeader>
            <CardTitle>Appointment Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">Date:</span>
                <p className="font-medium">{format(selectedDate, "MMMM d, yyyy")}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Time:</span>
                <p className="font-medium">{selectedTime || "Not selected"}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Type:</span>
                <p className="font-medium capitalize">{callType} Call</p>
              </div>
              <div>
                <span className="text-muted-foreground">Fee:</span>
                <p className="font-medium">₹{doctor.consultationFee}</p>
              </div>
            </div>

            <div className={`p-3 rounded-lg border ${getUrgencyColor(urgency)}`}>
              <p className="font-medium capitalize">{urgency} Consultation</p>
            </div>

            <Button className="w-full" size="lg" onClick={handleSchedule} disabled={!selectedTime}>
              <CheckCircle className="w-5 h-5 mr-2" />
              Schedule Appointment
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
