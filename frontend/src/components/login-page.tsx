import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { User, Lock, Facebook, Chrome } from "lucide-react"

interface LoginPageProps {
  onLogin: () => void
}

export default function LoginPage({ onLogin }: LoginPageProps) {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [rememberMe, setRememberMe] = useState(false)

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    // Simulate login
    localStorage.setItem("authToken", "dummy-token")
    localStorage.setItem(
      "user",
      JSON.stringify({
        username: username || "Sundar Gurung",
        email: "sundargurung360@gmail.com",
      }),
    )
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

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="remember"
                  checked={rememberMe}
                  onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                />
                <label htmlFor="remember" className="text-gray-600 font-medium">
                  Remember Me
                </label>
              </div>

              <Button
                type="submit"
                className="w-full bg-red-400 hover:bg-red-500 text-white py-3 text-lg font-semibold rounded-xl"
              >
                Login
              </Button>
            </form>

            <div className="mt-8">
              <p className="text-gray-600 mb-4">Or, Login with</p>
              <div className="flex space-x-4">
                <Button variant="outline" size="icon" className="w-12 h-12 rounded-xl bg-transparent">
                  <Facebook className="w-6 h-6 text-blue-600" />
                </Button>
                <Button variant="outline" size="icon" className="w-12 h-12 rounded-xl bg-transparent">
                  <Chrome className="w-6 h-6 text-red-500" />
                </Button>
                <Button variant="outline" size="icon" className="w-12 h-12 rounded-xl bg-transparent">
                  <div className="w-6 h-6 bg-black rounded-sm"></div>
                </Button>
              </div>
            </div>

            <p className="mt-8 text-gray-600">
              {"Don't have an account? "}
              <button className="text-blue-500 hover:underline font-semibold">Create One</button>
            </p>
          </div>

          {/* Right side - Illustration */}
          <div className="lg:w-1/2 bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center p-8">
            <img
              src="/images/login-illustration.png"
              alt="Login illustration"
              width={400}
              height={400}
              className="max-w-full h-auto"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
