import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { User, Lock} from "lucide-react"
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL
interface LoginPageProps {
  onLogin: () => void
  showSignup: () => void
}

export default function LoginPage({ onLogin, showSignup }: LoginPageProps) {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    // Simulate login
    const response = await fetch(`${API_BASE_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({user : { username, password }}),
    })
    if (!response.ok) {
      throw new Error("Failed to login")
    }
    const response_payload = await response.json()
    console.log("signin", response_payload)
    localStorage.setItem("token", response_payload.data.token)
    localStorage.setItem("user", JSON.stringify(response_payload.data.user.username))
    onLogin()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-100 to-pink-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl overflow-hidden max-w-4xl w-full">
        <div className="flex flex-col lg:flex-row">
          {/* Left side - Form */}
          <div className="lg:w-1/2 p-8 lg:p-12">
            <h1 className="text-4xl font-bold text-gray-800 mb-8">Sign In</h1>

            <form onSubmit={handleLogin} className="space-y-6">
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  type="text"
                  placeholder="Enter Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="pl-12 py-3 text-lg border-2 border-gray-200 rounded-xl focus:border-red-300"
                />
              </div>

              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  type="password"
                  placeholder="Enter Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-12 py-3 text-lg border-2 border-gray-200 rounded-xl focus:border-red-300"
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-red-600 hover:bg-red-700 text-white py-3 text-lg font-semibold rounded-xl"
              >
                Login
              </Button>
            </form>

            <p className="mt-8 text-gray-600">
              {"Don't have an account? "}
              <a
                href="#signup" 
                onClick={(e) => {
                  e.preventDefault(); 
                  showSignup();
                }}
                className="text-blue-700 hover:underline font-semibold cursor-pointer"
              >
                Create One
              </a>
            </p>

          </div>

          {/* Right side - Illustration */}
          <div className="lg:w-1/2 bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center p-8">
            {/* <img
              src="/images/login-illustration.png"
              alt="Login illustration"
              width={400}
              height={400}
              className="max-w-full h-auto"
            /> */}
          </div>
        </div>
      </div>
    </div>
  )
}
