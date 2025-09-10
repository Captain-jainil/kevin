"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  FileText,
  Heart,
  Activity,
  Pill,
  Syringe,
  Download,
  Upload,
  Share2,
  Search,
  Calendar,
  User,
  Phone,
  MapPin,
  AlertTriangle,
  CheckCircle,
  Clock,
  Plus,
  Eye,
  Edit,
  CloudOff,
  Cloud,
  Users,
} from "lucide-react"

interface HealthRecord {
  id: string
  type: "consultation" | "prescription" | "lab-result" | "vaccination" | "vital-signs"
  title: string
  date: string
  doctor?: string
  hospital?: string
  status: "normal" | "abnormal" | "critical" | "pending"
  summary: string
  attachments?: string[]
  synced: boolean
}

interface HealthRecordsDashboardProps {
  onBack: () => void
}

export function HealthRecordsDashboard({ onBack }: HealthRecordsDashboardProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedFilter, setSelectedFilter] = useState("all")
  const [isOfflineMode, setIsOfflineMode] = useState(false)
  const [selectedRecord, setSelectedRecord] = useState<HealthRecord | null>(null)

  const healthRecords: HealthRecord[] = [
    {
      id: "1",
      type: "consultation",
      title: "General Health Checkup",
      date: "2024-12-15",
      doctor: "Dr. Simran Kaur",
      hospital: "Patiala Medical College",
      status: "normal",
      summary: "Regular checkup completed. Blood pressure and vitals normal. Recommended continued medication.",
      attachments: ["prescription.pdf", "notes.txt"],
      synced: true,
    },
    {
      id: "2",
      type: "lab-result",
      title: "Blood Test Results",
      date: "2024-12-10",
      doctor: "Dr. Rajesh Kumar",
      hospital: "AIIMS Chandigarh",
      status: "abnormal",
      summary: "Slightly elevated blood sugar levels. Recommended dietary changes and follow-up in 3 months.",
      attachments: ["blood-test.pdf"],
      synced: true,
    },
    {
      id: "3",
      type: "prescription",
      title: "Diabetes Medication",
      date: "2024-12-08",
      doctor: "Dr. Simran Kaur",
      hospital: "Patiala Medical College",
      status: "normal",
      summary: "Metformin 500mg twice daily, Glimepiride 1mg once daily. Take with meals.",
      synced: false,
    },
    {
      id: "4",
      type: "vaccination",
      title: "COVID-19 Booster",
      date: "2024-11-20",
      hospital: "Village Health Center",
      status: "normal",
      summary: "COVID-19 booster vaccination administered. No adverse reactions observed.",
      synced: true,
    },
    {
      id: "5",
      type: "vital-signs",
      title: "Daily Vitals",
      date: "2024-12-16",
      status: "normal",
      summary: "BP: 120/80, Heart Rate: 72 bpm, Temperature: 98.6°F, Weight: 68kg",
      synced: false,
    },
  ]

  const getRecordIcon = (type: string) => {
    switch (type) {
      case "consultation":
        return <FileText className="w-5 h-5" />
      case "prescription":
        return <Pill className="w-5 h-5" />
      case "lab-result":
        return <Activity className="w-5 h-5" />
      case "vaccination":
        return <Syringe className="w-5 h-5" />
      case "vital-signs":
        return <Heart className="w-5 h-5" />
      default:
        return <FileText className="w-5 h-5" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "normal":
        return "bg-green-50 text-green-700 border-green-200"
      case "abnormal":
        return "bg-yellow-50 text-yellow-700 border-yellow-200"
      case "critical":
        return "bg-red-50 text-red-700 border-red-200"
      case "pending":
        return "bg-blue-50 text-blue-700 border-blue-200"
      default:
        return "bg-gray-50 text-gray-700 border-gray-200"
    }
  }

  const filteredRecords = healthRecords.filter((record) => {
    const matchesSearch =
      record.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.doctor?.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesFilter = selectedFilter === "all" || record.type === selectedFilter
    return matchesSearch && matchesFilter
  })

  const PatientInfo = () => (
    <Card className="mb-6">
      <CardContent className="p-4">
        <div className="flex items-center gap-4">
          <Avatar className="w-16 h-16">
            <AvatarImage src="/rural-patient-avatar.jpg" />
            <AvatarFallback>RK</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <h2 className="text-xl font-semibold">Ram Kumar</h2>
            <div className="grid grid-cols-2 gap-2 mt-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <User className="w-4 h-4" />
                <span>Age: 45, Male</span>
              </div>
              <div className="flex items-center gap-1">
                <Phone className="w-4 h-4" />
                <span>+91 98765 43210</span>
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                <span>Village Nabha, Punjab</span>
              </div>
              <div className="flex items-center gap-1">
                <Heart className="w-4 h-4" />
                <span>Blood Type: O+</span>
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-2 mb-2">
              {isOfflineMode ? (
                <CloudOff className="w-4 h-4 text-red-500" />
              ) : (
                <Cloud className="w-4 h-4 text-green-500" />
              )}
              <span className="text-sm">{isOfflineMode ? "Offline" : "Online"}</span>
            </div>
            <Button variant="outline" size="sm">
              <Share2 className="w-4 h-4 mr-1" />
              Share Records
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )

  const QuickStats = () => (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      <Card>
        <CardContent className="p-4 text-center">
          <FileText className="w-8 h-8 text-primary mx-auto mb-2" />
          <div className="text-2xl font-bold">{healthRecords.length}</div>
          <div className="text-sm text-muted-foreground">Total Records</div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-4 text-center">
          <Activity className="w-8 h-8 text-green-600 mx-auto mb-2" />
          <div className="text-2xl font-bold">3</div>
          <div className="text-sm text-muted-foreground">Lab Results</div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-4 text-center">
          <Pill className="w-8 h-8 text-blue-600 mx-auto mb-2" />
          <div className="text-2xl font-bold">2</div>
          <div className="text-sm text-muted-foreground">Prescriptions</div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-4 text-center">
          <Syringe className="w-8 h-8 text-purple-600 mx-auto mb-2" />
          <div className="text-2xl font-bold">4</div>
          <div className="text-sm text-muted-foreground">Vaccinations</div>
        </CardContent>
      </Card>
    </div>
  )

  const RecordsList = () => (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Health Records</CardTitle>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Upload className="w-4 h-4 mr-1" />
              Upload
            </Button>
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-1" />
              Export
            </Button>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="flex gap-2 mt-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search records..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <select
            value={selectedFilter}
            onChange={(e) => setSelectedFilter(e.target.value)}
            className="px-3 py-2 border rounded-md bg-background"
          >
            <option value="all">All Records</option>
            <option value="consultation">Consultations</option>
            <option value="prescription">Prescriptions</option>
            <option value="lab-result">Lab Results</option>
            <option value="vaccination">Vaccinations</option>
            <option value="vital-signs">Vital Signs</option>
          </select>
        </div>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-96">
          <div className="space-y-3">
            {filteredRecords.map((record) => (
              <div key={record.id} className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3 flex-1">
                    <div className="p-2 bg-primary/10 rounded-lg">{getRecordIcon(record.type)}</div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-medium">{record.title}</h4>
                        {!record.synced && (
                          <Badge variant="outline" className="text-xs">
                            <CloudOff className="w-3 h-3 mr-1" />
                            Offline
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{record.summary}</p>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          <span>{new Date(record.date).toLocaleDateString()}</span>
                        </div>
                        {record.doctor && (
                          <div className="flex items-center gap-1">
                            <User className="w-3 h-3" />
                            <span>{record.doctor}</span>
                          </div>
                        )}
                        {record.hospital && (
                          <div className="flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            <span>{record.hospital}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={`text-xs ${getStatusColor(record.status)}`}>
                      {record.status === "normal" && <CheckCircle className="w-3 h-3 mr-1" />}
                      {record.status === "abnormal" && <AlertTriangle className="w-3 h-3 mr-1" />}
                      {record.status === "critical" && <AlertTriangle className="w-3 h-3 mr-1" />}
                      {record.status === "pending" && <Clock className="w-3 h-3 mr-1" />}
                      {record.status}
                    </Badge>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Share2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
                {record.attachments && record.attachments.length > 0 && (
                  <div className="mt-3 pt-3 border-t">
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground">Attachments:</span>
                      {record.attachments.map((attachment, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {attachment}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
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
              <h1 className="text-xl font-bold">Health Records</h1>
              <p className="text-sm text-muted-foreground">Your complete medical history</p>
            </div>
          </div>
        </div>
      </header>

      <div className="p-4">
        <PatientInfo />
        <QuickStats />

        <Tabs defaultValue="all-records" className="space-y-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all-records">All Records</TabsTrigger>
            <TabsTrigger value="vitals">Vitals</TabsTrigger>
            <TabsTrigger value="medications">Medications</TabsTrigger>
            <TabsTrigger value="family-history">Family</TabsTrigger>
          </TabsList>

          <TabsContent value="all-records">
            <RecordsList />
          </TabsContent>

          <TabsContent value="vitals">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="w-5 h-5" />
                  Vital Signs Tracking
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">120/80</div>
                    <div className="text-sm text-muted-foreground">Blood Pressure</div>
                    <div className="text-xs text-green-600">Normal</div>
                  </div>
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">72</div>
                    <div className="text-sm text-muted-foreground">Heart Rate</div>
                    <div className="text-xs text-blue-600">Normal</div>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">98.6°F</div>
                    <div className="text-sm text-muted-foreground">Temperature</div>
                    <div className="text-xs text-purple-600">Normal</div>
                  </div>
                  <div className="text-center p-4 bg-orange-50 rounded-lg">
                    <div className="text-2xl font-bold text-orange-600">68kg</div>
                    <div className="text-sm text-muted-foreground">Weight</div>
                    <div className="text-xs text-orange-600">Stable</div>
                  </div>
                </div>
                <Button className="w-full mt-4">
                  <Plus className="w-4 h-4 mr-2" />
                  Record New Vitals
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="medications">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Pill className="w-5 h-5" />
                  Current Medications
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Metformin 500mg</h4>
                        <p className="text-sm text-muted-foreground">Twice daily with meals</p>
                      </div>
                      <Badge className="bg-green-50 text-green-700">Active</Badge>
                    </div>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Glimepiride 1mg</h4>
                        <p className="text-sm text-muted-foreground">Once daily before breakfast</p>
                      </div>
                      <Badge className="bg-green-50 text-green-700">Active</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="family-history">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Family Medical History
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-2">Father - Deceased (Age 72)</h4>
                    <div className="text-sm text-muted-foreground">
                      <p>• Diabetes Type 2 (diagnosed at 55)</p>
                      <p>• Hypertension</p>
                      <p>• Heart disease</p>
                    </div>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-2">Mother - Age 68</h4>
                    <div className="text-sm text-muted-foreground">
                      <p>• Arthritis</p>
                      <p>• High cholesterol</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
