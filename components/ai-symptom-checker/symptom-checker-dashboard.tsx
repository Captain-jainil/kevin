"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Brain,
  ArrowLeft,
  Mic,
  MicOff,
  AlertTriangle,
  CheckCircle,
  Clock,
  Thermometer,
  Heart,
  Activity,
  Phone,
  Video,
  User,
} from "lucide-react"

interface SymptomCheckerProps {
  onBack: () => void
  onBookConsultation?: (urgency: string) => void
}

export function SymptomCheckerDashboard({ onBack, onBookConsultation }: SymptomCheckerProps) {
  const [currentStep, setCurrentStep] = useState<"input" | "analysis" | "results">("input")
  const [symptoms, setSymptoms] = useState("")
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([])
  const [isListening, setIsListening] = useState(false)
  const [analysisProgress, setAnalysisProgress] = useState(0)
  const [patientInfo, setPatientInfo] = useState({
    age: "",
    gender: "",
    duration: "",
    severity: "mild",
  })

  const commonSymptoms = [
    { id: "fever", name: "Fever", icon: Thermometer, category: "general" },
    { id: "headache", name: "Headache", icon: Brain, category: "neurological" },
    { id: "cough", name: "Cough", icon: Activity, category: "respiratory" },
    { id: "chest_pain", name: "Chest Pain", icon: Heart, category: "cardiac" },
    { id: "stomach_pain", name: "Stomach Pain", icon: Activity, category: "digestive" },
    { id: "fatigue", name: "Fatigue", icon: Clock, category: "general" },
    { id: "nausea", name: "Nausea", icon: Activity, category: "digestive" },
    { id: "dizziness", name: "Dizziness", icon: Brain, category: "neurological" },
  ]

  const mockAnalysisResults = {
    primaryCondition: "Upper Respiratory Tract Infection",
    confidence: 85,
    urgency: "moderate",
    riskLevel: "Low to Moderate",
    recommendations: [
      "Rest and stay hydrated",
      "Take paracetamol for fever and pain relief",
      "Use warm salt water gargles for throat irritation",
      "Monitor symptoms for 3-5 days",
    ],
    redFlags: [
      "Difficulty breathing or shortness of breath",
      "High fever above 103°F (39.4°C)",
      "Severe chest pain",
      "Persistent vomiting",
    ],
    nextSteps: {
      selfCare: "Continue home remedies and monitor symptoms",
      telemedicine: "Consult with a doctor if symptoms worsen",
      emergency: "Seek immediate medical attention if red flag symptoms appear",
    },
  }

  const handleSymptomToggle = (symptomId: string) => {
    setSelectedSymptoms((prev) =>
      prev.includes(symptomId) ? prev.filter((id) => id !== symptomId) : [...prev, symptomId],
    )
  }

  const handleVoiceInput = () => {
    setIsListening(!isListening)
    // In a real app, this would integrate with speech recognition API
    if (!isListening) {
      setTimeout(() => {
        setSymptoms((prev) => prev + " fever and headache for 2 days")
        setIsListening(false)
      }, 3000)
    }
  }

  const handleAnalyze = () => {
    setCurrentStep("analysis")
    setAnalysisProgress(0)

    // Simulate AI analysis progress
    const interval = setInterval(() => {
      setAnalysisProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setTimeout(() => setCurrentStep("results"), 500)
          return 100
        }
        return prev + 10
      })
    }, 200)
  }

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case "low":
        return "text-green-600 bg-green-50 border-green-200"
      case "moderate":
        return "text-yellow-600 bg-yellow-50 border-yellow-200"
      case "high":
        return "text-red-600 bg-red-50 border-red-200"
      default:
        return "text-gray-600 bg-gray-50 border-gray-200"
    }
  }

  const SymptomInput = () => (
    <div className="space-y-6">
      {/* Patient Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="w-5 h-5" />
            Patient Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="age">Age</Label>
              <Input
                id="age"
                type="number"
                placeholder="25"
                value={patientInfo.age}
                onChange={(e) => setPatientInfo({ ...patientInfo, age: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="gender">Gender</Label>
              <select
                id="gender"
                className="w-full p-2 border rounded-md"
                value={patientInfo.gender}
                onChange={(e) => setPatientInfo({ ...patientInfo, gender: e.target.value })}
              >
                <option value="">Select</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>
          <div>
            <Label htmlFor="duration">How long have you had these symptoms?</Label>
            <select
              id="duration"
              className="w-full p-2 border rounded-md"
              value={patientInfo.duration}
              onChange={(e) => setPatientInfo({ ...patientInfo, duration: e.target.value })}
            >
              <option value="">Select duration</option>
              <option value="few_hours">A few hours</option>
              <option value="1_day">1 day</option>
              <option value="2_3_days">2-3 days</option>
              <option value="1_week">About a week</option>
              <option value="more_week">More than a week</option>
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Symptom Input Methods */}
      <Tabs defaultValue="text" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="text">Text Input</TabsTrigger>
          <TabsTrigger value="voice">Voice Input</TabsTrigger>
          <TabsTrigger value="visual">Quick Select</TabsTrigger>
        </TabsList>

        <TabsContent value="text" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Describe Your Symptoms</CardTitle>
              <CardDescription>
                Please describe your symptoms in detail. Include when they started, how severe they are, and any other
                relevant information.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="I have been experiencing fever and headache for the past 2 days. The fever comes and goes, and I feel very tired..."
                value={symptoms}
                onChange={(e) => setSymptoms(e.target.value)}
                className="min-h-32"
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="voice" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Voice Input</CardTitle>
              <CardDescription>
                Tap the microphone button and describe your symptoms in your preferred language.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <Button
                size="lg"
                variant={isListening ? "destructive" : "default"}
                onClick={handleVoiceInput}
                className="w-32 h-32 rounded-full"
              >
                {isListening ? <MicOff className="w-12 h-12" /> : <Mic className="w-12 h-12" />}
              </Button>
              <p className="text-sm text-muted-foreground">
                {isListening ? "Listening... Speak now" : "Tap to start voice input"}
              </p>
              {symptoms && (
                <div className="p-4 bg-muted rounded-lg text-left">
                  <p className="text-sm">{symptoms}</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="visual" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Select Your Symptoms</CardTitle>
              <CardDescription>Tap on the symptoms you are experiencing.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3">
                {commonSymptoms.map((symptom) => {
                  const Icon = symptom.icon
                  const isSelected = selectedSymptoms.includes(symptom.id)
                  return (
                    <Button
                      key={symptom.id}
                      variant={isSelected ? "default" : "outline"}
                      className="h-auto p-4 flex-col gap-2"
                      onClick={() => handleSymptomToggle(symptom.id)}
                    >
                      <Icon className="w-6 h-6" />
                      <span className="text-sm">{symptom.name}</span>
                    </Button>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Severity Assessment */}
      <Card>
        <CardHeader>
          <CardTitle>Symptom Severity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-3">
            {["mild", "moderate", "severe"].map((severity) => (
              <Button
                key={severity}
                variant={patientInfo.severity === severity ? "default" : "outline"}
                onClick={() => setPatientInfo({ ...patientInfo, severity })}
                className="capitalize"
              >
                {severity}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Analyze Button */}
      <Button
        onClick={handleAnalyze}
        className="w-full py-6 text-lg"
        disabled={!symptoms && selectedSymptoms.length === 0}
      >
        <Brain className="w-5 h-5 mr-2" />
        Analyze Symptoms
      </Button>
    </div>
  )

  const AnalysisProgress = () => (
    <div className="text-center space-y-6">
      <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
        <Brain className="w-12 h-12 text-primary animate-pulse" />
      </div>
      <div>
        <h3 className="text-xl font-semibold mb-2">Analyzing Your Symptoms</h3>
        <p className="text-muted-foreground mb-4">Our AI is processing your information...</p>
        <Progress value={analysisProgress} className="w-full max-w-md mx-auto" />
        <p className="text-sm text-muted-foreground mt-2">{analysisProgress}% Complete</p>
      </div>
      <div className="text-sm text-muted-foreground space-y-1">
        <p>✓ Processing symptom data</p>
        <p>✓ Analyzing medical patterns</p>
        <p>✓ Generating recommendations</p>
      </div>
    </div>
  )

  const AnalysisResults = () => (
    <div className="space-y-6">
      {/* Medical Disclaimer */}
      <Alert>
        <AlertTriangle className="h-4 w-4" />
        <AlertDescription>
          <strong>Important:</strong> This is a preliminary assessment only. Always consult with a qualified healthcare
          professional for proper diagnosis and treatment.
        </AlertDescription>
      </Alert>

      {/* Primary Assessment */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Primary Assessment</span>
            <Badge variant="secondary">{mockAnalysisResults.confidence}% Confidence</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold text-lg">{mockAnalysisResults.primaryCondition}</h4>
              <div
                className={`inline-flex items-center px-3 py-1 rounded-full text-sm border ${getUrgencyColor(mockAnalysisResults.urgency)}`}
              >
                Risk Level: {mockAnalysisResults.riskLevel}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5" />
            Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {mockAnalysisResults.recommendations.map((rec, index) => (
              <li key={index} className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                <span className="text-sm">{rec}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Red Flags */}
      <Card className="border-red-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-red-600">
            <AlertTriangle className="w-5 h-5" />
            Seek Immediate Medical Attention If:
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {mockAnalysisResults.redFlags.map((flag, index) => (
              <li key={index} className="flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
                <span className="text-sm">{flag}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Next Steps */}
      <Card>
        <CardHeader>
          <CardTitle>Recommended Next Steps</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4">
            <Button variant="outline" className="justify-start h-auto p-4 bg-transparent">
              <div className="flex items-center gap-3">
                <Activity className="w-6 h-6 text-green-600" />
                <div className="text-left">
                  <div className="font-medium">Self Care</div>
                  <div className="text-sm text-muted-foreground">{mockAnalysisResults.nextSteps.selfCare}</div>
                </div>
              </div>
            </Button>

            <Button
              variant="outline"
              className="justify-start h-auto p-4 bg-transparent"
              onClick={() => onBookConsultation?.(mockAnalysisResults.urgency)}
            >
              <div className="flex items-center gap-3">
                <Video className="w-6 h-6 text-blue-600" />
                <div className="text-left">
                  <div className="font-medium">Book Telemedicine Consultation</div>
                  <div className="text-sm text-muted-foreground">{mockAnalysisResults.nextSteps.telemedicine}</div>
                </div>
              </div>
            </Button>

            <Button variant="outline" className="justify-start h-auto p-4 border-red-200 bg-transparent">
              <div className="flex items-center gap-3">
                <Phone className="w-6 h-6 text-red-600" />
                <div className="text-left">
                  <div className="font-medium text-red-600">Emergency Services</div>
                  <div className="text-sm text-muted-foreground">{mockAnalysisResults.nextSteps.emergency}</div>
                </div>
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="grid grid-cols-2 gap-4">
        <Button variant="outline" onClick={() => setCurrentStep("input")}>
          Check Again
        </Button>
        <Button onClick={() => onBookConsultation?.(mockAnalysisResults.urgency)}>Book Consultation</Button>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b sticky top-0 z-50">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={onBack}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div className="flex items-center gap-2">
              <Brain className="w-6 h-6 text-primary" />
              <h1 className="text-xl font-semibold">AI Symptom Checker</h1>
            </div>
          </div>
          <Badge variant="secondary" className="text-xs">
            Beta
          </Badge>
        </div>
      </header>

      {/* Content */}
      <div className="container mx-auto px-4 py-6 max-w-2xl">
        {currentStep === "input" && <SymptomInput />}
        {currentStep === "analysis" && <AnalysisProgress />}
        {currentStep === "results" && <AnalysisResults />}
      </div>
    </div>
  )
}
