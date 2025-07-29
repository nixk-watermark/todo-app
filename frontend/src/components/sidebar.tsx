import { useState } from "react"
import { Button } from "@/components/ui/button"
import { LayoutDashboard, AlertTriangle, CheckSquare, List, Settings, HelpCircle, LogOut } from "lucide-react"

interface SidebarProps {
  currentView: string
  onViewChange: (view: string) => void
}

export default function Sidebar({ currentView, onViewChange }: SidebarProps) {
  const [user] = useState({
    name: "Sundar Gurung",
    email: "sundargurung360@gmail.com",
    avatar: "/placeholder.svg?height=80&width=80",
  })

  const handleLogout = () => {
    localStorage.removeItem("authToken")
    localStorage.removeItem("user")
    window.location.reload()
  }

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "vital-task", label: "Vital Task", icon: AlertTriangle },
    { id: "my-task", label: "My Task", icon: CheckSquare },
    { id: "task-categories", label: "Task Categories", icon: List },
    { id: "settings", label: "Settings", icon: Settings },
    { id: "help", label: "Help", icon: HelpCircle },
  ]

  return (
    <div className="w-80 sidebar-gradient text-white flex flex-col">
      {/* User Profile */}
      <div className="p-6 border-b border-red-400">
        <div className="flex items-center space-x-4">
          <img
            src={user.avatar || "/placeholder.svg"}
            alt={user.name}
            className="w-16 h-16 rounded-full border-3 border-white"
          />
          <div>
            <h3 className="font-semibold text-lg">{user.name}</h3>
            <p className="text-red-100 text-sm">{user.email}</p>
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 py-6">
        <div className="space-y-2 px-4">
          {menuItems.map((item) => {
            const Icon = item.icon
            const isActive = currentView === item.id

            return (
              <Button
                key={item.id}
                onClick={() => onViewChange(item.id)}
                variant="ghost"
                className={`w-full justify-start text-left py-3 px-4 rounded-xl transition-all ${
                  isActive ? "bg-white text-red-500 shadow-lg" : "text-white hover:bg-red-400 hover:bg-opacity-50"
                }`}
              >
                <Icon className="w-5 h-5 mr-3" />
                {item.label}
              </Button>
            )
          })}
        </div>
      </nav>

      {/* Logout Button */}
      <div className="p-4 border-t border-red-400">
        <Button
          onClick={handleLogout}
          variant="ghost"
          className="w-full justify-start text-left py-3 px-4 rounded-xl text-white hover:bg-red-400 hover:bg-opacity-50"
        >
          <LogOut className="w-5 h-5 mr-3" />
          Logout
        </Button>
      </div>
    </div>
  )
}