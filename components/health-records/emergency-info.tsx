"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { AlertTriangle, Phone, User, Pill, FileText, Share2 } from "lucide-react"

interface EmergencyInfoProps {
  onBack: () => void
}

export function EmergencyInfo({ onBack }: EmergencyInfoProps) {
  const emergencyContacts = [
    { name: "Gurpreet Singh (Son)", phone: "+91 98765 43211", relation: "Son" },
    { name: "Dr. Simran Kaur", phone: "+91 98765 43212", relation: "Primary Doctor" },
    { name: "Village Health Worker", phone: "+91 98765 43213", relation: "Local Health Worker" },
  ]

  const medicalAlerts = [
    { type: "Allergy", description: "Penicillin allergy - severe reaction", severity: "critical" },
    { type: "Condition", description: "Type 2 Diabetes", severity: "important" },
    { type: "Medication", description: "Currently taking Metformin", severity: "normal" },
  ]

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical":
        return "bg-red-100 text-red-800 border-red-200"
      case "important":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "normal":
        return "bg-blue-100 text-blue-800 border-blue-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-red-50 border-b border-red-200 sticky top-0 z-50">
        <div className="p-4">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={onBack}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </Button>
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-6 h-6 text-red-600" />
              <div>
                <h1 className="text-xl font-bold text-red-800">Emergency Information</h1>
                <p className="text-sm text-red-600">Critical medical information for emergencies</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="p-4 space-y-6">
        {/* Patient Quick Info */}
        <Card className="border-red-200">
          <CardHeader className="bg-red-50">
            <CardTitle className="flex items-center gap-2 text-red-800">
              <User className="w-5 h-5" />
              Patient Information
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium">Name:</span>
                <p>Ram Kumar</p>
              </div>
              <div>
                <span className="font-medium">Age:</span>
                <p>45 years, Male</p>
              </div>
              <div>
                <span className="font-medium">Blood Type:</span>
                <p className="text-red-600 font-semibold">O+ (Universal Donor)</p>
              </div>
              <div>
                <span className="font-medium">Phone:</span>
                <p>+91 98765 43210</p>
              </div>
              <div className="col-span-2">
                <span className="font-medium">Address:</span>
                <p>Village Nabha, District Patiala, Punjab, India</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Medical Alerts */}
        <Card className="border-yellow-200">
          <CardHeader className="bg-yellow-50">
            <CardTitle className="flex items-center gap-2 text-yellow-800">
              <AlertTriangle className="w-5 h-5" />
              Medical Alerts
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <div className="space-y-3">
              {medicalAlerts.map((alert, index) => (
                <div key={index} className={`p-3 rounded-lg border ${getSeverityColor(alert.severity)}`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-medium">{alert.type}:</span>
                      <p className="text-sm">{alert.description}</p>
                    </div>
                    <Badge variant="outline" className={getSeverityColor(alert.severity)}>
                      {alert.severity}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Emergency Contacts */}
        <Card className="border-blue-200">
          <CardHeader className="bg-blue-50">
            <CardTitle className="flex items-center gap-2 text-blue-800">
              <Phone className="w-5 h-5" />
              Emergency Contacts
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <div className="space-y-3">
              {emergencyContacts.map((contact, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                  <div>
                    <p className="font-medium">{contact.name}</p>
                    <p className="text-sm text-muted-foreground">{contact.relation}</p>
                  </div>
                  <Button variant="outline" size="sm" className="text-blue-600 border-blue-200 bg-transparent">
                    <Phone className="w-4 h-4 mr-1" />
                    {contact.phone}
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Current Medications */}
        <Card className="border-green-200">
          <CardHeader className="bg-green-50">
            <CardTitle className="flex items-center gap-2 text-green-800">
              <Pill className="w-5 h-5" />
              Current Medications
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <div className="space-y-3">
              <div className="p-3 bg-green-50 rounded-lg">
                <p className="font-medium">Metformin 500mg</p>
                <p className="text-sm text-muted-foreground">Twice daily with meals - For diabetes</p>
              </div>
              <div className="p-3 bg-green-50 rounded-lg">
                <p className="font-medium">Glimepiride 1mg</p>
                <p className="text-sm text-muted-foreground">Once daily before breakfast - For diabetes</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Medical History */}
        <Card className="border-purple-200">
          <CardHeader className="bg-purple-50">
            <CardTitle className="flex items-center gap-2 text-purple-800">
              <FileText className="w-5 h-5" />
              Recent Medical History
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <div className="space-y-3 text-sm">
              <div className="p-3 bg-purple-50 rounded-lg">
                <p className="font-medium">Dec 15, 2024 - General Checkup</p>
                <p className="text-muted-foreground">Dr. Simran Kaur - Blood pressure normal, diabetes controlled</p>
              </div>
              <div className="p-3 bg-purple-50 rounded-lg">
                <p className="font-medium">Dec 10, 2024 - Blood Test</p>
                <p className="text-muted-foreground">Slightly elevated blood sugar, medication adjusted</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Share Emergency Info */}
        <Card className="border-gray-200">
          <CardContent className="p-4">
            <div className="text-center space-y-4">
              <h3 className="font-semibold">Share Emergency Information</h3>
              <p className="text-sm text-muted-foreground">
                Generate a QR code or share link for quick access to emergency medical information
              </p>
              <div className="flex gap-2 justify-center">
                <Button variant="outline">
                  <Share2 className="w-4 h-4 mr-2" />
                  Generate QR Code
                </Button>
                <Button variant="outline">
                  <FileText className="w-4 h-4 mr-2" />
                  Print Summary
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
