import { useState } from "react"
import { Button } from "@/components/ui/button"
import { LayoutDashboard, AlertTriangle, CheckSquare, List, Settings, HelpCircle, LogOut } from "lucide-react"
import profilePic from "../assets/user_profile.jpg"
interface SidebarProps {
  currentView: string
  onViewChange: (view: string) => void
}

const userData = {name: JSON.parse(localStorage.getItem("user")!)}

export default function Sidebar({ currentView, onViewChange }: SidebarProps) {
  const [user] = useState(userData)

  const handleLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    window.location.reload()
  }

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "vital-task", label: "Vital Task", icon: AlertTriangle },
    { id: "my-task", label: "My Task", icon: CheckSquare },
    { id: "settings", label: "Settings", icon: Settings },
    { id: "help", label: "Help", icon: HelpCircle },
  ]

  return (
    <aside className="w-80 min-h-screen bg-[#FF5A5F] flex flex-col items-center py-10 shadow-lg">
      {/* User Profile */}
      <div className="flex flex-col items-center mb-10">
        <img
          src={profilePic}
          alt={user.name}
          className="w-24 h-24 rounded-full border-4 border-white shadow-md mb-4"
        />
        <h3 className="font-bold text-xl text-white mb-1">{user.name.charAt(0).toUpperCase() + user.name.slice(1)}</h3>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 w-full">
        <div className="flex flex-col gap-3 px-6">
          {menuItems.map((item) => {
            const Icon = item.icon
            const isActive = currentView === item.id
            return (
              <Button
                key={item.id}
                onClick={() => {
                  console.log("Switching to", item.id);
                  onViewChange(item.id);
                }}
                variant="ghost"
                className={`flex items-center gap-4 w-full py-4 px-5 rounded-2xl text-lg font-semibold transition-all ${
                  isActive
                    ? "bg-white text-[#FF5A5F] shadow-xl border-2 border-[#FF5A5F]"
                    : "text-white hover:bg-[#ff7a7f] hover:bg-opacity-80"
                }`}
              >
                <Icon className="w-7 h-7" />
                {item.label}
              </Button>
            )
          })}
        </div>
      </nav>

      {/* Logout Button */}
      <div className="w-full px-6 mt-10 mb-2">
        <Button
          onClick={handleLogout}
          variant="ghost"
          className="flex items-center gap-4 w-full py-4 px-5 rounded-2xl text-lg font-semibold text-white hover:bg-[#ff7a7f] hover:bg-opacity-80"
        >
          <LogOut className="w-7 h-7" />
          Logout
        </Button>
      </div>
    </aside>
  )
}