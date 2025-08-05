import './App.css'
import { useEffect, useState } from "react"
import LoginPage from "@/components/login-page"
import Dashboard from "@/components/dashboard"
import SignupPage from './components/signup-page'

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [showSignup, setShowSignup] = useState(false)

  useEffect(() => {
    // Check if user is authenticated
    const token = localStorage.getItem("token")
    setIsAuthenticated(!!token)
    setIsLoading(false)
  }, [])

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>
  }

  // return isAuthenticated ? <Dashboard /> : <LoginPage onLogin={() => setIsAuthenticated(true)} />
  if(isAuthenticated){
    return <Dashboard />
  }
  else{
    return showSignup ? <SignupPage showLogin={() => setShowSignup(false)} onSignup={() => setIsAuthenticated(true)} /> : <LoginPage showSignup={() => setShowSignup(true)} onLogin={() => setIsAuthenticated(true)} />
  }
}
