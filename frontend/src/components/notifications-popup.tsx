import { Button } from "@/components/ui/button"

const notifications = [
  {
    id: 1,
    title: "Complete the UI design of Landing Page for FoodVentures.",
    priority: "High",
    image: "/placeholder.svg?height=40&width=40",
    time: "2h",
  },
  {
    id: 2,
    title: "Complete the UI design of Landing Page for Travel Days.",
    priority: "High",
    image: "/placeholder.svg?height=40&width=40",
    time: "2h",
  },
  {
    id: 3,
    title: "Complete the Mobile app design for Pet Warden.",
    priority: "Extremely High",
    image: "/placeholder.svg?height=40&width=40",
    time: "2h",
  },
  {
    id: 4,
    title: "Complete the entire design for Juice Slider.",
    priority: "High",
    image: "/placeholder.svg?height=40&width=40",
    time: "2h",
  },
]

export default function NotificationsPopup({ onClose }: { onClose: () => void }) {
  return (
    <div className="absolute right-0 mt-2 w-96 bg-white rounded-2xl shadow-2xl z-50 border p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-blue-600">Notifications</h3>
        <Button variant="ghost" size="sm" onClick={onClose} className="text-blue-600">&larr;</Button>
      </div>
      <div className="space-y-4 max-h-80 overflow-y-auto">
        {notifications.map(n => (
          <div key={n.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50">
            <img src={n.image} alt="notif" className="w-10 h-10 rounded-lg object-cover" />
            <div className="flex-1">
              <div className="font-semibold text-gray-800 text-sm">{n.title}</div>
              <div className="text-xs text-gray-500 mt-1">Priority: <span className={n.priority === 'Extremely High' ? 'text-red-600 font-bold' : 'text-orange-500'}>{n.priority}</span> • {n.time} ago</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
} 