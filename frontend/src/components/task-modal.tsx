import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { X, Calendar} from "lucide-react"


interface TaskModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (task: any) => void
  task?: any | null
}

export default function TaskModal({ isOpen, onClose, onSave, task }: TaskModalProps) {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [deadline, setDeadline] = useState("")
  const [priority, setPriority] = useState<"low" | "medium" | "high">("low")
  const [status, setStatus] = useState<"pending" | "ongoing" | "completed">("pending")

  useEffect(() => {
    if (task) {
      setTitle(task.title)
      setDescription(task.description)
      setDeadline(task.deadline)
      setPriority(task.priority)
      setStatus(task.status)
    } else {
      setTitle("")
      setDescription("")
      setDeadline("")
      setPriority("low")
      setStatus("pending")
    }
  }, [task, isOpen])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave({
      title,
      description,
      deadline,
      priority,
      status,
    })
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-800">{task ? "Edit Task" : "Add New Task"}</h2>
            <div className="flex items-center space-x-4">
              <Button onClick={onClose} variant="outline" className="text-gray-600 hover:text-gray-800 bg-transparent">
                Go Back
              </Button>
              <Button onClick={onClose} variant="ghost" size="icon" className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column */}
            <div className="space-y-6">
              {/* Title */}
              <div>
                <Label htmlFor="title" className="text-sm font-medium text-gray-700 mb-2 block">
                  Title
                </Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  required
                />
              </div>

              {/* Date */}
              <div>
                <Label htmlFor="deadline" className="text-sm font-medium text-gray-700 mb-2 block">
                  Date
                </Label>
                <div className="relative">
                  <Input
                    id="deadline"
                    type="date"
                    value={deadline}
                    onChange={(e) => setDeadline(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    required
                  />
                  <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
                </div>
              </div>

              {/* Priority */}
              <div>
                <Label className="text-sm font-medium text-gray-700 mb-3 block">Priority</Label>
                <RadioGroup
                  value={priority}
                  onValueChange={(value) => setPriority(value as "low" | "medium" | "high")}
                >
                  <div className="flex items-center space-x-6">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="high" id="high" className="text-red-500" />
                      <Label htmlFor="high" className="text-red-500 font-medium">
                        High
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="medium" id="medium" className="text-blue-500" />
                      <Label htmlFor="medium" className="text-blue-500 font-medium">
                        Medium
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="low" id="low" className="text-green-500" />
                      <Label htmlFor="low" className="text-green-500 font-medium">
                        Low
                      </Label>
                    </div>
                  </div>
                </RadioGroup>
              </div>
              {/* Status */}
              <div>
                <Label className="text-sm font-medium text-gray-700 mb-3 block">Status</Label>
                <RadioGroup
                  value={status}
                  onValueChange={(value) => setStatus(value as "pending" | "ongoing" | "completed")}
                >
                  <div className="flex items-center space-x-6">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="pending" id="pending" className="text-red-500" />
                      <Label htmlFor="pending" className="text-red-500 font-medium">
                        Pending
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="ongoing" id="ongoing" className="text-blue-500" />
                      <Label htmlFor="ongoing" className="text-blue-500 font-medium">
                        Ongoing
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="completed" id="completed" className="text-green-500" />
                      <Label htmlFor="completed" className="text-green-500 font-medium">
                        Completed
                      </Label>
                    </div>
                  </div>
                </RadioGroup>
              </div>
            </div>

            {/* Right Column */}
            <div>
              {/* Task Description */}
              <div>
                <Label htmlFor="description" className="text-sm font-medium text-gray-700 mb-2 block">
                  Task Description
                </Label>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Start writing here..."
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 min-h-[200px] resize-none"
                  required
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="mt-8 flex justify-start">
            <Button type="submit" className="bg-red-500 hover:bg-red-600 text-white px-8 py-3 rounded-lg font-medium">
              Done
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}