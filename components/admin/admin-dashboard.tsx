"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import {
  Users,
  Activity,
  Video,
  Brain,
  TrendingUp,
  Clock,
  MapPin,
  Settings,
  Download,
  Search,
  Filter,
  MoreVertical,
  Eye,
  Edit,
  Plus,
  Bell,
  Shield,
  Database,
  Wifi,
  Server,
  Phone,
} from "lucide-react"

interface AdminDashboardProps {
  onLogout: () => void
}

export function AdminDashboard({ onLogout }: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState("overview")
  const [searchQuery, setSearchQuery] = useState("")

  // Mock data for charts and statistics
  const consultationData = [
    { month: "Jan", consultations: 245, revenue: 12250 },
    { month: "Feb", consultations: 312, revenue: 15600 },
    { month: "Mar", consultations: 389, revenue: 19450 },
    { month: "Apr", consultations: 456, revenue: 22800 },
    { month: "May", consultations: 523, revenue: 26150 },
    { month: "Jun", consultations: 601, revenue: 30050 },
  ]

  const userDistribution = [
    { name: "Patients", value: 1247, color: "#0ea5e9" },
    { name: "Doctors", value: 89, color: "#10b981" },
    { name: "Pharmacists", value: 34, color: "#f59e0b" },
    { name: "Admins", value: 12, color: "#ef4444" },
  ]

  const villageStats = [
    { village: "Nabha", patients: 234, consultations: 89, status: "active" },
    { village: "Rajpura", patients: 189, consultations: 67, status: "active" },
    { village: "Samana", patients: 156, consultations: 45, status: "active" },
    { village: "Ghanaur", patients: 123, consultations: 34, status: "maintenance" },
    { village: "Bhadson", patients: 98, consultations: 28, status: "active" },
  ]

  const recentConsultations = [
    {
      id: "C001",
      patient: "Ram Kumar",
      doctor: "Dr. Simran Kaur",
      type: "Video",
      status: "completed",
      duration: "25 min",
      village: "Nabha",
      timestamp: "2 hours ago",
    },
    {
      id: "C002",
      patient: "Sunita Devi",
      doctor: "Dr. Rajesh Sharma",
      type: "Audio",
      status: "in-progress",
      duration: "12 min",
      village: "Rajpura",
      timestamp: "1 hour ago",
    },
    {
      id: "C003",
      patient: "Harpreet Singh",
      doctor: "Dr. Kavita Patel",
      type: "Video",
      status: "completed",
      duration: "18 min",
      village: "Samana",
      timestamp: "3 hours ago",
    },
  ]

  const systemHealth = {
    uptime: 99.8,
    activeConnections: 156,
    serverLoad: 67,
    databaseHealth: 98,
    apiResponseTime: 245,
  }

  const OverviewTab = () => (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Patients</p>
                <p className="text-3xl font-bold">1,247</p>
                <p className="text-sm text-green-600 flex items-center gap-1">
                  <TrendingUp className="w-4 h-4" />
                  +12% from last month
                </p>
              </div>
              <Users className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Doctors</p>
                <p className="text-3xl font-bold">89</p>
                <p className="text-sm text-green-600 flex items-center gap-1">
                  <TrendingUp className="w-4 h-4" />
                  +5% from last month
                </p>
              </div>
              <Activity className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Consultations Today</p>
                <p className="text-3xl font-bold">156</p>
                <p className="text-sm text-blue-600 flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  23 in progress
                </p>
              </div>
              <Video className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">AI Diagnoses</p>
                <p className="text-3xl font-bold">342</p>
                <p className="text-sm text-purple-600 flex items-center gap-1">
                  <Brain className="w-4 h-4" />
                  87% accuracy
                </p>
              </div>
              <Brain className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Monthly Consultations</CardTitle>
            <CardDescription>Consultation trends over the past 6 months</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={consultationData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="consultations" fill="#0ea5e9" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>User Distribution</CardTitle>
            <CardDescription>Platform user breakdown by role</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={userDistribution}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}`}
                >
                  {userDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Village Statistics */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              Village Statistics
            </span>
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {villageStats.map((village) => (
              <div key={village.village} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  <div>
                    <h4 className="font-semibold">{village.village}</h4>
                    <p className="text-sm text-muted-foreground">
                      {village.patients} patients • {village.consultations} consultations this month
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={village.status === "active" ? "default" : "secondary"}>{village.status}</Badge>
                  <Button variant="ghost" size="sm">
                    <Eye className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* System Health */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Server className="w-5 h-5" />
            System Health
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{systemHealth.uptime}%</div>
              <div className="text-sm text-muted-foreground">Uptime</div>
              <Progress value={systemHealth.uptime} className="mt-2" />
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{systemHealth.activeConnections}</div>
              <div className="text-sm text-muted-foreground">Active Connections</div>
              <Wifi className="w-6 h-6 mx-auto mt-2 text-blue-600" />
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-600">{systemHealth.serverLoad}%</div>
              <div className="text-sm text-muted-foreground">Server Load</div>
              <Progress value={systemHealth.serverLoad} className="mt-2" />
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{systemHealth.databaseHealth}%</div>
              <div className="text-sm text-muted-foreground">Database Health</div>
              <Database className="w-6 h-6 mx-auto mt-2 text-green-600" />
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{systemHealth.apiResponseTime}ms</div>
              <div className="text-sm text-muted-foreground">API Response</div>
              <Activity className="w-6 h-6 mx-auto mt-2 text-purple-600" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const ConsultationsTab = () => (
    <div className="space-y-6">
      {/* Search and Filters */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search consultations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 w-80"
            />
          </div>
          <Button variant="outline" size="sm">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Schedule Consultation
        </Button>
      </div>

      {/* Recent Consultations */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Consultations</CardTitle>
          <CardDescription>Latest consultation activities across all villages</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentConsultations.map((consultation) => (
              <div key={consultation.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    {consultation.type === "Video" ? (
                      <Video className="w-5 h-5 text-blue-600" />
                    ) : (
                      <Phone className="w-5 h-5 text-green-600" />
                    )}
                    <Badge
                      variant={consultation.status === "completed" ? "default" : "secondary"}
                      className={
                        consultation.status === "in-progress"
                          ? "bg-yellow-100 text-yellow-800"
                          : consultation.status === "completed"
                            ? "bg-green-100 text-green-800"
                            : ""
                      }
                    >
                      {consultation.status}
                    </Badge>
                  </div>
                  <div>
                    <h4 className="font-semibold">
                      {consultation.patient} → {consultation.doctor}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {consultation.village} • {consultation.duration} • {consultation.timestamp}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm">
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <MoreVertical className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Consultation Analytics */}
      <Card>
        <CardHeader>
          <CardTitle>Consultation Analytics</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={consultationData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="consultations" stroke="#0ea5e9" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )

  const UsersTab = () => (
    <div className="space-y-6">
      {/* User Management Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-semibold">User Management</h3>
          <p className="text-muted-foreground">Manage patients, doctors, and administrators</p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Add User
        </Button>
      </div>

      {/* User Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {userDistribution.map((userType) => (
          <Card key={userType.name}>
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold" style={{ color: userType.color }}>
                {userType.value}
              </div>
              <div className="text-sm text-muted-foreground">{userType.name}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* User List */}
      <Card>
        <CardHeader>
          <CardTitle>All Users</CardTitle>
          <CardDescription>Complete list of platform users</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center gap-4">
                <Avatar>
                  <AvatarImage src="/rural-patient-avatar.jpg" />
                  <AvatarFallback>RK</AvatarFallback>
                </Avatar>
                <div>
                  <h4 className="font-semibold">Ram Kumar</h4>
                  <p className="text-sm text-muted-foreground">Patient • Nabha • +91 98765 43210</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="default">Active</Badge>
                <Button variant="ghost" size="sm">
                  <Edit className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <MoreVertical className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center gap-4">
                <Avatar>
                  <AvatarImage src="/indian-female-doctor.png" />
                  <AvatarFallback>SK</AvatarFallback>
                </Avatar>
                <div>
                  <h4 className="font-semibold">Dr. Simran Kaur</h4>
                  <p className="text-sm text-muted-foreground">Doctor • General Medicine • +91 98765 12345</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="default">Online</Badge>
                <Button variant="ghost" size="sm">
                  <Edit className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <MoreVertical className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const SettingsTab = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-2xl font-semibold">System Settings</h3>
        <p className="text-muted-foreground">Configure platform settings and preferences</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="w-5 h-5" />
              General Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium">Platform Name</label>
              <Input defaultValue="Rural Health Connect" />
            </div>
            <div>
              <label className="text-sm font-medium">Support Email</label>
              <Input defaultValue="support@ruralhealthconnect.in" />
            </div>
            <div>
              <label className="text-sm font-medium">Emergency Contact</label>
              <Input defaultValue="+91 108" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5" />
              Security Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Two-Factor Authentication</p>
                <p className="text-sm text-muted-foreground">Require 2FA for admin accounts</p>
              </div>
              <Button variant="outline" size="sm">
                Enable
              </Button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Session Timeout</p>
                <p className="text-sm text-muted-foreground">Auto-logout after inactivity</p>
              </div>
              <select className="border rounded px-3 py-1">
                <option>30 minutes</option>
                <option>1 hour</option>
                <option>2 hours</option>
              </select>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="w-5 h-5" />
            Notification Settings
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Emergency Alerts</p>
                <p className="text-sm text-muted-foreground">Critical system alerts and emergencies</p>
              </div>
              <Button variant="outline" size="sm">
                Enabled
              </Button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Daily Reports</p>
                <p className="text-sm text-muted-foreground">Daily platform usage reports</p>
              </div>
              <Button variant="outline" size="sm">
                Enabled
              </Button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">System Maintenance</p>
                <p className="text-sm text-muted-foreground">Scheduled maintenance notifications</p>
              </div>
              <Button variant="outline" size="sm">
                Enabled
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  return (
    <div className="min-h-screen bg-background">
      {/* Admin Header */}
      <header className="bg-card border-b sticky top-0 z-50">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <Shield className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-semibold">Admin Dashboard</h1>
              <p className="text-sm text-muted-foreground">Rural Health Connect</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon">
              <Bell className="w-5 h-5" />
            </Button>
            <Avatar>
              <AvatarFallback>AD</AvatarFallback>
            </Avatar>
            <Button variant="outline" onClick={onLogout}>
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="consultations">Consultations</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <OverviewTab />
          </TabsContent>

          <TabsContent value="consultations">
            <ConsultationsTab />
          </TabsContent>

          <TabsContent value="users">
            <UsersTab />
          </TabsContent>

          <TabsContent value="settings">
            <SettingsTab />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
