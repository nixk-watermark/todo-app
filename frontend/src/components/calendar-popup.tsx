import { useState } from "react"
import { Button } from "@/components/ui/button"

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate()
}

const months = [
  "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
]

export default function CalendarPopup({ onClose }: { onClose: () => void }) {
  const today = new Date()
  const [selected, setSelected] = useState(today)
  const [month, setMonth] = useState(today.getMonth())
  const [year, setYear] = useState(today.getFullYear())

  const daysInMonth = getDaysInMonth(year, month)
  const firstDay = new Date(year, month, 1).getDay()

  const handlePrev = () => {
    if (month === 0) {
      setMonth(11)
      setYear(year - 1)
    } else {
      setMonth(month - 1)
    }
  }
  const handleNext = () => {
    if (month === 11) {
      setMonth(0)
      setYear(year + 1)
    } else {
      setMonth(month + 1)
    }
  }

  return (
    <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-2xl z-50 border p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-blue-600">Calendar</h3>
        <Button variant="ghost" size="sm" onClick={onClose} className="text-blue-600">&larr;</Button>
      </div>
      <div className="mb-4 flex items-center justify-between">
        <Button variant="outline" size="sm" onClick={handlePrev}>&lt;</Button>
        <span className="font-semibold text-gray-700">{months[month]} {year}</span>
        <Button variant="outline" size="sm" onClick={handleNext}>&gt;</Button>
      </div>
      <div className="grid grid-cols-7 gap-1 text-center text-xs text-gray-500 mb-1">
        <div>Mon</div><div>Tue</div><div>Wed</div><div>Thu</div><div>Fri</div><div>Sat</div><div>Sun</div>
      </div>
      <div className="grid grid-cols-7 gap-1 text-center">
        {Array(firstDay === 0 ? 6 : firstDay - 1).fill(null).map((_, i) => <div key={i}></div>)}
        {Array.from({ length: daysInMonth }, (_, i) => i + 1).map(day => {
          const isSelected = selected.getDate() === day && selected.getMonth() === month && selected.getFullYear() === year
          return (
            <Button
              key={day}
              size="sm"
              variant={isSelected ? "default" : "outline"}
              className={isSelected ? "bg-blue-600 text-white" : ""}
              onClick={() => setSelected(new Date(year, month, day))}
            >
              {day}
            </Button>
          )
        })}
      </div>
    </div>
  )
} 