"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2 } from "lucide-react"
import {
  Heart,
  Phone,
  Video,
  FileText,
  Pill,
  Brain,
  Users,
  Globe,
  Stethoscope,
  Activity,
  MessageCircle,
  Bell,
  Menu,
  ChevronRight,
  CheckCircle,
  AlertCircle,
  Wifi,
  WifiOff,
  Shield,
} from "lucide-react"
import { DoctorSelection } from "@/components/telemedicine/doctor-selection"
import { AppointmentScheduler } from "@/components/telemedicine/appointment-scheduler"
import { VideoCall } from "@/components/telemedicine/video-call"
import { HealthRecordsDashboard } from "@/components/health-records/health-records-dashboard"
import { EmergencyInfo } from "@/components/health-records/emergency-info"
import { MedicineTrackerDashboard } from "@/components/medicine-tracker/medicine-tracker-dashboard"
import { PharmacyLocator } from "@/components/medicine-tracker/pharmacy-locator"
import { SymptomCheckerDashboard } from "@/components/ai-symptom-checker/symptom-checker-dashboard"
import { AdminDashboard } from "@/components/admin/admin-dashboard"
import { useLanguage, useTranslation } from "@/lib/i18n/language-context"
import type { Language } from "@/lib/i18n/translations"

export default function RuralHealthcarePlatform() {
  const [currentUser, setCurrentUser] = useState<"patient" | "doctor" | "admin" | null>(null)
  const [isOnline, setIsOnline] = useState(true)
  const [currentView, setCurrentView] = useState<
    | "dashboard"
    | "doctor-selection"
    | "appointment-scheduler"
    | "video-call"
    | "health-records"
    | "emergency-info"
    | "medicine-tracker"
    | "pharmacy-locator"
    | "ai-symptom-checker"
    | "admin-dashboard"
  >("dashboard")
  const [selectedDoctor, setSelectedDoctor] = useState<any>(null)
  const [selectedCallType, setSelectedCallType] = useState<"video" | "audio">("video")

  const [loginForm, setLoginForm] = useState({
    phone: "",
    password: "",
    isLoading: false,
    error: "",
  })

  const { language, setLanguage, isRTL } = useLanguage()
  const { t } = useTranslation()

  const languages = [
    { code: "en" as Language, name: "English", native: "English" },
    { code: "hi" as Language, name: "Hindi", native: "हिंदी" },
    { code: "pa" as Language, name: "Punjabi", native: "ਪੰਜਾਬੀ" },
    { code: "ur" as Language, name: "Urdu", native: "اردو" },
  ]

  const validateForm = () => {
    if (!loginForm.phone.trim()) {
      setLoginForm((prev) => ({ ...prev, error: "Phone number is required" }))
      return false
    }
    if (!loginForm.password.trim()) {
      setLoginForm((prev) => ({ ...prev, error: "Password is required" }))
      return false
    }
    if (loginForm.phone.length < 10) {
      setLoginForm((prev) => ({ ...prev, error: "Please enter a valid phone number" }))
      return false
    }
    return true
  }

  const handleLogin = async (userType: "patient" | "doctor" | "admin") => {
    if (!validateForm()) return

    setLoginForm((prev) => ({ ...prev, isLoading: true, error: "" }))

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // In a real app, this would validate credentials with backend
      setCurrentUser(userType)
      setLoginForm({ phone: "", password: "", isLoading: false, error: "" })
    } catch (error) {
      setLoginForm((prev) => ({
        ...prev,
        isLoading: false,
        error: "Login failed. Please check your credentials.",
      }))
    }
  }

  const LoginForm = ({ userType }: { userType: "patient" | "doctor" | "admin" }) => (
    <Card className="w-full max-w-md mx-auto shadow-lg border-0 bg-card/50 backdrop-blur-sm">
      <CardHeader className="text-center pb-6">
        <div className="mx-auto w-20 h-20 bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
          {userType === "patient" ? (
            <Heart className="w-10 h-10 text-primary" />
          ) : userType === "doctor" ? (
            <Stethoscope className="w-10 h-10 text-primary" />
          ) : (
            <Shield className="w-10 h-10 text-primary" />
          )}
        </div>
        <CardTitle className="text-2xl font-bold text-balance mb-2">{t(`auth.${userType}Login`)}</CardTitle>
        <CardDescription className="text-pretty text-base leading-relaxed">
          {t(`auth.${userType}LoginDesc`)}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {loginForm.error && (
          <Alert variant="destructive" className="border-destructive/20">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{loginForm.error}</AlertDescription>
          </Alert>
        )}

        <div className="space-y-3">
          <Label htmlFor="phone" className="text-sm font-medium">
            {t("auth.phoneNumber")}
          </Label>
          <Input
            id="phone"
            type="tel"
            placeholder="+91 98765 43210"
            className="h-12 text-base border-2 focus:border-primary transition-colors"
            value={loginForm.phone}
            onChange={(e) => setLoginForm((prev) => ({ ...prev, phone: e.target.value, error: "" }))}
            disabled={loginForm.isLoading}
          />
        </div>

        <div className="space-y-3">
          <Label htmlFor="password" className="text-sm font-medium">
            {t("auth.password")}
          </Label>
          <Input
            id="password"
            type="password"
            className="h-12 text-base border-2 focus:border-primary transition-colors"
            value={loginForm.password}
            onChange={(e) => setLoginForm((prev) => ({ ...prev, password: e.target.value, error: "" }))}
            disabled={loginForm.isLoading}
          />
        </div>

        <Button
          className="w-full h-12 text-base font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
          onClick={() => handleLogin(userType)}
          disabled={loginForm.isLoading}
        >
          {loginForm.isLoading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Signing in...
            </>
          ) : (
            t("auth.signIn")
          )}
        </Button>

        <div className="text-center">
          <Button variant="link" className="text-sm font-medium hover:text-primary transition-colors">
            {t("auth.forgotPassword")}
          </Button>
        </div>
      </CardContent>
    </Card>
  )

  const PatientDashboard = () => (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-accent/5">
      {/* Header */}
      <header className="bg-card/80 backdrop-blur-md border-b shadow-sm sticky top-0 z-50">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-4">
            <Avatar className="w-12 h-12 border-2 border-primary/20">
              <AvatarImage src="/rural-patient-avatar.jpg" />
              <AvatarFallback className="bg-primary/10 text-primary font-semibold">RK</AvatarFallback>
            </Avatar>
            <div>
              <h2 className="font-semibold text-lg">Ram Kumar</h2>
              <p className="text-sm text-muted-foreground">{t("dashboard.village")}: Nabha, Punjab</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-muted/50">
              {isOnline ? <Wifi className="w-4 h-4 text-green-500" /> : <WifiOff className="w-4 h-4 text-red-500" />}
              <span className="text-xs font-medium">{isOnline ? t("dashboard.online") : t("dashboard.offline")}</span>
            </div>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-destructive rounded-full text-xs"></span>
            </Button>
            <Button variant="ghost" size="icon" onClick={() => setCurrentUser(null)}>
              <Menu className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </header>

      {/* Language Selector */}
      <div className="bg-muted/30 border-b">
        <div className="flex items-center gap-3 p-4 overflow-x-auto">
          <Globe className="w-5 h-5 text-muted-foreground flex-shrink-0" />
          <div className="flex gap-2">
            {languages.map((lang) => (
              <Button
                key={lang.code}
                variant={language === lang.code ? "default" : "outline"}
                size="sm"
                onClick={() => setLanguage(lang.code)}
                className="flex-shrink-0 font-medium"
              >
                {lang.native}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="p-6">
        <div className="grid grid-cols-2 gap-4 mb-8">
          <Card
            className="cursor-pointer hover:shadow-lg hover:scale-[1.02] transition-all duration-200 border-2 hover:border-primary/20"
            onClick={() => {
              setSelectedCallType("video")
              setCurrentView("doctor-selection")
            }}
          >
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-3">
                <Video className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold text-base mb-1">{t("dashboard.videoCall")}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{t("dashboard.connectWithDoctor")}</p>
            </CardContent>
          </Card>

          <Card
            className="cursor-pointer hover:shadow-lg hover:scale-[1.02] transition-all duration-200 border-2 hover:border-primary/20"
            onClick={() => {
              setSelectedCallType("audio")
              setCurrentView("doctor-selection")
            }}
          >
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center mx-auto mb-3">
                <Phone className="w-6 h-6 text-accent" />
              </div>
              <h3 className="font-semibold text-base mb-1">{t("dashboard.audioCall")}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{t("dashboard.voiceConsultation")}</p>
            </CardContent>
          </Card>

          <Card
            className="cursor-pointer hover:shadow-lg hover:scale-[1.02] transition-all duration-200 border-2 hover:border-secondary/20"
            onClick={() => setCurrentView("ai-symptom-checker")}
          >
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center mx-auto mb-3">
                <Brain className="w-6 h-6 text-secondary" />
              </div>
              <h3 className="font-semibold text-base mb-1">{t("dashboard.aiChecker")}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{t("dashboard.checkSymptoms")}</p>
            </CardContent>
          </Card>

          <Card
            className="cursor-pointer hover:shadow-lg hover:scale-[1.02] transition-all duration-200 border-2 hover:border-accent/20"
            onClick={() => setCurrentView("medicine-tracker")}
          >
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center mx-auto mb-3">
                <Pill className="w-6 h-6 text-accent" />
              </div>
              <h3 className="font-semibold text-base mb-1">{t("dashboard.medicines")}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{t("dashboard.findAvailability")}</p>
            </CardContent>
          </Card>
        </div>

        {/* Health Status */}
        <Card className="mb-8 shadow-sm border-2">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-3 text-xl">
              <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                <Activity className="w-5 h-5 text-primary" />
              </div>
              {t("dashboard.healthStatus")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-6">
              <div className="text-center p-4 bg-green-50 rounded-xl border border-green-200">
                <div className="text-3xl font-bold text-green-600 mb-1">{t("dashboard.normal")}</div>
                <div className="text-sm font-medium text-green-700">{t("dashboard.bloodPressure")}</div>
                <div className="text-xs text-green-600 mt-1">120/80 mmHg</div>
              </div>
              <div className="text-center p-4 bg-blue-50 rounded-xl border border-blue-200">
                <div className="text-3xl font-bold text-blue-600 mb-1">98.6°F</div>
                <div className="text-sm font-medium text-blue-700">{t("dashboard.temperature")}</div>
                <div className="text-xs text-blue-600 mt-1">37°C</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Consultations */}
        <Card className="mb-8 shadow-sm border-2">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center gap-3">
                <FileText className="w-5 h-5" />
                {t("dashboard.recentConsultations")}
              </span>
              <Button variant="ghost" size="sm">
                {t("dashboard.viewAll")}
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
              <div className="flex items-center gap-3">
                <Avatar className="w-10 h-10">
                  <AvatarImage src="/indian-doctor.jpg" />
                  <AvatarFallback>DS</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">Dr. Simran</p>
                  <p className="text-sm text-muted-foreground">{t("telemedicine.generalMedicine")}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium">Dec 15</p>
                <Badge variant="secondary" className="text-xs">
                  Completed
                </Badge>
              </div>
            </div>
            <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
              <div className="flex items-center gap-3">
                <Avatar className="w-10 h-10">
                  <AvatarImage src="/indian-female-doctor.png" />
                  <AvatarFallback>DK</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">Dr. Kavita</p>
                  <p className="text-sm text-muted-foreground">{t("telemedicine.pediatrics")}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium">Dec 10</p>
                <Badge variant="secondary" className="text-xs">
                  Completed
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Medicine Availability */}
        <Card className="shadow-sm border-2">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center gap-3">
                <Pill className="w-5 h-5" />
                {t("dashboard.medicineAvailability")}
              </span>
              <Button variant="ghost" size="sm" onClick={() => setCurrentView("medicine-tracker")}>
                {t("dashboard.viewAll")}
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
                <div>
                  <p className="font-medium">Paracetamol 500mg</p>
                  <p className="text-sm text-muted-foreground">Nabha Medical Store</p>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="text-sm font-medium text-green-600">{t("dashboard.available")}</span>
                </div>
              </div>
              <div className="flex items-center justify-between p-3 bg-red-50 border border-red-200 rounded-lg">
                <div>
                  <p className="font-medium">Insulin Injection</p>
                  <p className="text-sm text-muted-foreground">City Pharmacy</p>
                </div>
                <div className="flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-red-600" />
                  <span className="text-sm font-medium text-red-600">{t("dashboard.outOfStock")}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-card/90 backdrop-blur-md border-t shadow-lg">
        <div className="grid grid-cols-4 gap-1 p-2">
          <Button
            variant="ghost"
            className="flex-col h-16 gap-1 hover:bg-primary/10 transition-colors"
            onClick={() => setCurrentView("dashboard")}
          >
            <Heart className="w-5 h-5" />
            <span className="text-xs font-medium">{t("dashboard.home")}</span>
          </Button>
          <Button
            variant="ghost"
            className="flex-col h-16 gap-1 hover:bg-primary/10 transition-colors"
            onClick={() => setCurrentView("health-records")}
          >
            <FileText className="w-5 h-5" />
            <span className="text-xs font-medium">{t("dashboard.records")}</span>
          </Button>
          <Button variant="ghost" className="flex-col h-16 gap-1 hover:bg-primary/10 transition-colors">
            <MessageCircle className="w-5 h-5" />
            <span className="text-xs font-medium">{t("dashboard.chat")}</span>
          </Button>
          <Button
            variant="ghost"
            className="flex-col h-16 gap-1 hover:bg-primary/10 transition-colors"
            onClick={() => setCurrentUser(null)}
          >
            <Users className="w-5 h-5" />
            <span className="text-xs font-medium">{t("dashboard.profile")}</span>
          </Button>
        </div>
      </nav>
    </div>
  )

  // Handle doctor selection
  const handleDoctorSelection = (doctor: any, callType: "video" | "audio") => {
    setSelectedDoctor(doctor)
    setSelectedCallType(callType)
    setCurrentView("appointment-scheduler")
  }

  // Handle appointment scheduling
  const handleAppointmentSchedule = (appointmentData: any) => {
    // In a real app, this would save to database
    console.log("Appointment scheduled:", appointmentData)
    setCurrentView("video-call")
  }

  // Handle call end
  const handleCallEnd = () => {
    setCurrentView("dashboard")
    setSelectedDoctor(null)
  }

  // Handle AI symptom checker consultation booking
  const handleSymptomCheckerConsultation = (urgency: string) => {
    // Set urgency-based doctor selection or go directly to booking
    setCurrentView("doctor-selection")
  }

  // Handle admin logout
  const handleAdminLogout = () => {
    setCurrentUser(null)
    setCurrentView("dashboard")
  }

  // Render different views based on current state
  if (currentUser === "admin") {
    return <AdminDashboard onLogout={handleAdminLogout} />
  }

  if (currentUser === "patient") {
    switch (currentView) {
      case "doctor-selection":
        return <DoctorSelection onSelectDoctor={handleDoctorSelection} onBack={() => setCurrentView("dashboard")} />
      case "appointment-scheduler":
        return (
          <AppointmentScheduler
            doctor={selectedDoctor}
            callType={selectedCallType}
            onSchedule={handleAppointmentSchedule}
            onBack={() => setCurrentView("doctor-selection")}
          />
        )
      case "video-call":
        return (
          <VideoCall
            doctorName={selectedDoctor?.name || "Dr. Simran Kaur"}
            doctorSpecialization={selectedDoctor?.specialization || "General Medicine"}
            doctorImage={selectedDoctor?.image || "/indian-female-doctor.png"}
            patientName="Ram Kumar"
            callType={selectedCallType}
            onEndCall={handleCallEnd}
          />
        )
      case "health-records":
        return <HealthRecordsDashboard onBack={() => setCurrentView("dashboard")} />
      case "emergency-info":
        return <EmergencyInfo onBack={() => setCurrentView("health-records")} />
      case "medicine-tracker":
        return <MedicineTrackerDashboard onBack={() => setCurrentView("dashboard")} />
      case "pharmacy-locator":
        return <PharmacyLocator onBack={() => setCurrentView("medicine-tracker")} />
      case "ai-symptom-checker":
        return (
          <SymptomCheckerDashboard
            onBack={() => setCurrentView("dashboard")}
            onBookConsultation={handleSymptomCheckerConsultation}
          />
        )
      default:
        return <PatientDashboard />
    }
  }

  return (
    <div
      className={`min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5 ${isRTL ? "rtl" : "ltr"}`}
    >
      <header className="bg-card/90 backdrop-blur-md border-b shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center shadow-lg">
                <Heart className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-balance">{t("header.title")}</h1>
                <p className="text-sm text-muted-foreground font-medium">{t("header.subtitle")}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-muted/50 rounded-full px-4 py-2">
              <Globe className="w-4 h-4 text-muted-foreground" />
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value as Language)}
                className="bg-transparent border-none text-sm font-medium focus:outline-none cursor-pointer"
              >
                {languages.map((lang) => (
                  <option key={lang.code} value={lang.code}>
                    {lang.native}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-16 text-center">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-5xl md:text-7xl font-bold text-balance mb-8 bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent leading-tight">
            {t("header.heroTitle")}
          </h2>
          <p className="text-xl md:text-2xl text-muted-foreground text-pretty mb-12 max-w-3xl mx-auto leading-relaxed">
            {t("header.heroDescription")}
          </p>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
            <div className="text-center p-6 bg-card/50 rounded-2xl border shadow-sm">
              <div className="text-4xl font-bold text-primary mb-2">173</div>
              <div className="text-sm font-medium text-muted-foreground">{t("header.villagesServed")}</div>
            </div>
            <div className="text-center p-6 bg-card/50 rounded-2xl border shadow-sm">
              <div className="text-4xl font-bold text-accent mb-2">24/7</div>
              <div className="text-sm font-medium text-muted-foreground">{t("header.available247")}</div>
            </div>
            <div className="text-center p-6 bg-card/50 rounded-2xl border shadow-sm">
              <div className="text-4xl font-bold text-secondary mb-2">50+</div>
              <div className="text-sm font-medium text-muted-foreground">{t("header.doctors")}</div>
            </div>
            <div className="text-center p-6 bg-card/50 rounded-2xl border shadow-sm">
              <div className="text-4xl font-bold text-primary mb-2">4</div>
              <div className="text-sm font-medium text-muted-foreground">{t("header.languages")}</div>
            </div>
          </div>

          {/* Login Options */}
          <Tabs defaultValue="patient" className="max-w-lg mx-auto">
            <TabsList className="grid w-full grid-cols-3 mb-10 h-14 bg-muted/50 p-1">
              <TabsTrigger value="patient" className="flex items-center gap-2 h-12 font-semibold">
                <Heart className="w-4 h-4" />
                Patient
              </TabsTrigger>
              <TabsTrigger value="doctor" className="flex items-center gap-2 h-12 font-semibold">
                <Stethoscope className="w-4 h-4" />
                Doctor
              </TabsTrigger>
              <TabsTrigger value="admin" className="flex items-center gap-2 h-12 font-semibold">
                <Shield className="w-4 h-4" />
                Admin
              </TabsTrigger>
            </TabsList>
            <TabsContent value="patient">
              <LoginForm userType="patient" />
            </TabsContent>
            <TabsContent value="doctor">
              <LoginForm userType="doctor" />
            </TabsContent>
            <TabsContent value="admin">
              <LoginForm userType="admin" />
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-muted/20 py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold text-balance mb-6">{t("features.title")}</h3>
            <p className="text-xl text-muted-foreground text-pretty max-w-3xl mx-auto leading-relaxed">
              {t("features.description")}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center hover:shadow-xl hover:scale-[1.02] transition-all duration-300 border-2 hover:border-primary/20 bg-card/50">
              <CardContent className="p-8">
                <div className="w-20 h-20 bg-gradient-to-br from-primary/20 to-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <Video className="w-10 h-10 text-primary" />
                </div>
                <h4 className="text-xl font-semibold mb-4">{t("features.telemedicine")}</h4>
                <p className="text-sm text-muted-foreground text-pretty leading-relaxed">
                  {t("features.telemedicineDesc")}
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-xl hover:scale-[1.02] transition-all duration-300 border-2 hover:border-accent/20 bg-card/50">
              <CardContent className="p-8">
                <div className="w-20 h-20 bg-gradient-to-br from-accent/20 to-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <FileText className="w-10 h-10 text-accent" />
                </div>
                <h4 className="text-xl font-semibold mb-4">{t("features.digitalRecords")}</h4>
                <p className="text-sm text-muted-foreground text-pretty leading-relaxed">
                  {t("features.digitalRecordsDesc")}
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-xl hover:scale-[1.02] transition-all duration-300 border-2 hover:border-secondary/20 bg-card/50">
              <CardContent className="p-8">
                <div className="w-20 h-20 bg-gradient-to-br from-secondary/20 to-secondary/10 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <Pill className="w-10 h-10 text-secondary" />
                </div>
                <h4 className="text-xl font-semibold mb-4">{t("features.medicineTracker")}</h4>
                <p className="text-sm text-muted-foreground text-pretty leading-relaxed">
                  {t("features.medicineTrackerDesc")}
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-xl hover:scale-[1.02] transition-all duration-300 border-2 hover:border-primary/20 bg-card/50">
              <CardContent className="p-8">
                <div className="w-20 h-20 bg-gradient-to-br from-primary/20 to-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <Brain className="w-10 h-10 text-primary" />
                </div>
                <h4 className="text-xl font-semibold mb-4">{t("features.aiSymptomChecker")}</h4>
                <p className="text-sm text-muted-foreground text-pretty leading-relaxed">
                  {t("features.aiSymptomCheckerDesc")}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t py-12">
        <div className="container mx-auto px-6 text-center">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center shadow-lg">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold">{t("header.title")}</span>
          </div>
          <p className="text-base text-muted-foreground mb-6 max-w-2xl mx-auto leading-relaxed">
            {t("footer.tagline")}
          </p>
          <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground font-medium">
            <span>{t("footer.copyright")}</span>
            <span>•</span>
            <span>{t("footer.madeFor")}</span>
          </div>
        </div>
      </footer>
    </div>
  )
}
