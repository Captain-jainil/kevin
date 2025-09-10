"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Video,
  VideoOff,
  Mic,
  MicOff,
  PhoneOff,
  MessageCircle,
  Volume2,
  VolumeX,
  CameraOff,
  Monitor,
  Wifi,
  WifiOff,
  Clock,
  User,
  Send,
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"

interface VideoCallProps {
  doctorName: string
  doctorSpecialization: string
  doctorImage: string
  patientName: string
  onEndCall: () => void
  callType: "video" | "audio"
}

export function VideoCall({
  doctorName,
  doctorSpecialization,
  doctorImage,
  patientName,
  onEndCall,
  callType,
}: VideoCallProps) {
  const [isVideoEnabled, setIsVideoEnabled] = useState(callType === "video")
  const [isAudioEnabled, setIsAudioEnabled] = useState(true)
  const [isSpeakerEnabled, setIsSpeakerEnabled] = useState(true)
  const [connectionQuality, setConnectionQuality] = useState<"good" | "fair" | "poor">("good")
  const [callDuration, setCallDuration] = useState(0)
  const [showChat, setShowChat] = useState(false)
  const [chatMessage, setChatMessage] = useState("")
  const [chatMessages, setChatMessages] = useState([
    { sender: "doctor", message: "Hello! How are you feeling today?", time: "10:30 AM" },
    { sender: "patient", message: "I have been having headaches for 3 days", time: "10:31 AM" },
  ])

  const localVideoRef = useRef<HTMLVideoElement>(null)
  const remoteVideoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const timer = setInterval(() => {
      setCallDuration((prev) => prev + 1)
    }, 1000)

    // Simulate connection quality changes
    const qualityTimer = setInterval(() => {
      const qualities: ("good" | "fair" | "poor")[] = ["good", "fair", "poor"]
      setConnectionQuality(qualities[Math.floor(Math.random() * qualities.length)])
    }, 10000)

    return () => {
      clearInterval(timer)
      clearInterval(qualityTimer)
    }
  }, [])

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const sendMessage = () => {
    if (chatMessage.trim()) {
      setChatMessages((prev) => [
        ...prev,
        {
          sender: "patient",
          message: chatMessage,
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ])
      setChatMessage("")
    }
  }

  return (
    <div className="min-h-screen bg-black relative">
      {/* Main Video Area */}
      <div className="relative h-screen">
        {/* Remote Video (Doctor) */}
        <div className="absolute inset-0">
          {isVideoEnabled ? (
            <div className="w-full h-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
              <div className="text-center text-white">
                <Avatar className="w-32 h-32 mx-auto mb-4 border-4 border-white/20">
                  <AvatarImage src={doctorImage || "/placeholder.svg"} />
                  <AvatarFallback className="text-2xl">
                    {doctorName
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <h3 className="text-2xl font-semibold">{doctorName}</h3>
                <p className="text-white/80">{doctorSpecialization}</p>
              </div>
            </div>
          ) : (
            <div className="w-full h-full bg-gray-900 flex items-center justify-center">
              <div className="text-center text-white">
                <CameraOff className="w-16 h-16 mx-auto mb-4 text-white/60" />
                <p className="text-lg">Camera is off</p>
              </div>
            </div>
          )}
        </div>

        {/* Local Video (Patient) - Picture in Picture */}
        <div className="absolute top-4 right-4 w-32 h-24 bg-gray-800 rounded-lg overflow-hidden border-2 border-white/20">
          {isVideoEnabled ? (
            <div className="w-full h-full bg-gradient-to-br from-secondary/30 to-primary/30 flex items-center justify-center">
              <User className="w-8 h-8 text-white" />
            </div>
          ) : (
            <div className="w-full h-full bg-gray-700 flex items-center justify-center">
              <CameraOff className="w-6 h-6 text-white/60" />
            </div>
          )}
        </div>

        {/* Call Info Header */}
        <div className="absolute top-4 left-4 right-40">
          <Card className="bg-black/50 backdrop-blur-sm border-white/20 text-white">
            <CardContent className="p-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span className="text-sm font-mono">{formatDuration(callDuration)}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    {connectionQuality === "good" && <Wifi className="w-4 h-4 text-green-400" />}
                    {connectionQuality === "fair" && <Wifi className="w-4 h-4 text-yellow-400" />}
                    {connectionQuality === "poor" && <WifiOff className="w-4 h-4 text-red-400" />}
                    <span className="text-xs capitalize">{connectionQuality}</span>
                  </div>
                </div>
                <Badge variant={callType === "video" ? "default" : "secondary"} className="text-xs">
                  {callType === "video" ? "Video Call" : "Audio Call"}
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Chat Sidebar */}
        {showChat && (
          <div className="absolute right-0 top-0 bottom-0 w-80 bg-card border-l">
            <div className="flex flex-col h-full">
              <div className="p-4 border-b">
                <h3 className="font-semibold flex items-center gap-2">
                  <MessageCircle className="w-5 h-5" />
                  Chat with {doctorName}
                </h3>
              </div>

              <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                  {chatMessages.map((msg, index) => (
                    <div key={index} className={`flex ${msg.sender === "patient" ? "justify-end" : "justify-start"}`}>
                      <div
                        className={`max-w-[80%] p-3 rounded-lg ${
                          msg.sender === "patient" ? "bg-primary text-primary-foreground" : "bg-muted"
                        }`}
                      >
                        <p className="text-sm">{msg.message}</p>
                        <p className="text-xs opacity-70 mt-1">{msg.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>

              <div className="p-4 border-t">
                <div className="flex gap-2">
                  <Input
                    value={chatMessage}
                    onChange={(e) => setChatMessage(e.target.value)}
                    placeholder="Type a message..."
                    onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                    className="flex-1"
                  />
                  <Button size="icon" onClick={sendMessage}>
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Control Bar */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <Card className="bg-black/70 backdrop-blur-sm border-white/20">
            <CardContent className="p-4">
              <div className="flex items-center gap-4">
                {/* Audio Toggle */}
                <Button
                  variant={isAudioEnabled ? "secondary" : "destructive"}
                  size="icon"
                  className="rounded-full w-12 h-12"
                  onClick={() => setIsAudioEnabled(!isAudioEnabled)}
                >
                  {isAudioEnabled ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
                </Button>

                {/* Video Toggle */}
                <Button
                  variant={isVideoEnabled ? "secondary" : "destructive"}
                  size="icon"
                  className="rounded-full w-12 h-12"
                  onClick={() => setIsVideoEnabled(!isVideoEnabled)}
                >
                  {isVideoEnabled ? <Video className="w-5 h-5" /> : <VideoOff className="w-5 h-5" />}
                </Button>

                {/* Speaker Toggle */}
                <Button
                  variant={isSpeakerEnabled ? "secondary" : "outline"}
                  size="icon"
                  className="rounded-full w-12 h-12"
                  onClick={() => setIsSpeakerEnabled(!isSpeakerEnabled)}
                >
                  {isSpeakerEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
                </Button>

                {/* Chat Toggle */}
                <Button
                  variant={showChat ? "default" : "outline"}
                  size="icon"
                  className="rounded-full w-12 h-12"
                  onClick={() => setShowChat(!showChat)}
                >
                  <MessageCircle className="w-5 h-5" />
                </Button>

                {/* Screen Share */}
                <Button variant="outline" size="icon" className="rounded-full w-12 h-12 bg-transparent">
                  <Monitor className="w-5 h-5" />
                </Button>

                {/* End Call */}
                <Button
                  variant="destructive"
                  size="icon"
                  className="rounded-full w-12 h-12 bg-red-600 hover:bg-red-700"
                  onClick={onEndCall}
                >
                  <PhoneOff className="w-5 h-5" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Low Bandwidth Warning */}
        {connectionQuality === "poor" && (
          <div className="absolute top-20 left-4 right-4">
            <Card className="bg-yellow-500/90 backdrop-blur-sm border-yellow-400 text-yellow-900">
              <CardContent className="p-3">
                <div className="flex items-center gap-2">
                  <WifiOff className="w-4 h-4" />
                  <span className="text-sm font-medium">
                    Poor connection detected. Switching to audio-only mode for better quality.
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
