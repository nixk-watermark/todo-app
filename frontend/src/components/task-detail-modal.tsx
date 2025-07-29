import { Button } from "@/components/ui/button"
import { X, Edit, Trash2, AlertTriangle } from "lucide-react"

interface Task {
  id: string
  title: string
  description: string
  status: "ongoing" | "completed" | "not_started"
  deadline: string
  priority: "low" | "moderate" | "extreme"
  image?: string
  createdAt: string
}

interface TaskDetailModalProps {
  isOpen: boolean
  onClose: () => void
  task: Task | null
  onEdit: (task: Task) => void
  onDelete: (taskId: string) => void
}

export default function TaskDetailModal({ isOpen, onClose, task, onEdit, onDelete }: TaskDetailModalProps) {
  if (!isOpen || !task) return null

  const getTaskDetails = () => {
    // Sample detailed content based on task title
    if (task.title.includes("Birthday Party")) {
      return {
        subtitle: "Buy gifts on the way and pick up cake from the bakery. (6 PM | Fresh Elements)",
        items: [
          "A cake, with candles to blow out. (Layer cake, cupcake, flat sheet cake)",
          "The birthday song.",
          "A place to collect gifts.",
        ],
        optional: [
          "Paper cone-shaped party hats, paper whistles that unroll.",
          "Games, activities (carry an object with your knees, then drop it into a milk bottle.)",
          "Lunch: sandwich halves, or pizza slices, juice, pretzels, potato chips...THEN cake & candles and the song.",
        ],
      }
    }

    return {
      subtitle: task.description,
      items: [],
      optional: [],
    }
  }

  const details = getTaskDetails()

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-800">Task Details</h2>
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

        <div className="p-6">
          <div className="flex items-start space-x-6">
            {/* Task Image */}
            {task.image && (
              <div className="flex-shrink-0">
                <img
                  src={task.image || "/placeholder.svg"}
                  alt={task.title}
                  className="w-32 h-32 rounded-lg object-cover"
                />
              </div>
            )}

            {/* Task Info */}
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-800 mb-4">{task.title}</h1>

              <div className="flex items-center space-x-4 mb-6">
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    task.priority === "extreme"
                      ? "bg-red-100 text-red-600"
                      : task.priority === "moderate"
                        ? "bg-blue-100 text-blue-600"
                        : "bg-green-100 text-green-600"
                  }`}
                >
                  Priority: {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                </span>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    task.status === "completed"
                      ? "bg-green-100 text-green-600"
                      : task.status === "ongoing"
                        ? "bg-blue-100 text-blue-600"
                        : "bg-gray-100 text-gray-600"
                  }`}
                >
                  Status:{" "}
                  {task.status === "not_started"
                    ? "Not Started"
                    : task.status === "ongoing"
                      ? "In Progress"
                      : "Completed"}
                </span>
                <span className="text-sm text-gray-500">Created on: {task.createdAt}</span>
              </div>
            </div>
          </div>

          {/* Task Description */}
          <div className="mt-8">
            <p className="text-gray-700 text-lg leading-relaxed mb-6">{details.subtitle}</p>

            {/* Task Items */}
            {details.items.length > 0 && (
              <div className="mb-6">
                <ol className="list-decimal list-inside space-y-2 text-gray-700">
                  {details.items.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ol>
              </div>
            )}

            {/* Optional Items */}
            {details.optional.length > 0 && (
              <div className="mb-8">
                <h3 className="font-semibold text-gray-800 mb-3">Optional:</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  {details.optional.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Deadline */}
            <div className="mb-8">
              <h3 className="font-semibold text-gray-800 mb-2">Deadline for Submission:</h3>
              <p className="text-gray-700">{task.deadline}</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
            <Button
              onClick={() => onDelete(task.id)}
              variant="outline"
              className="text-red-500 border-red-500 hover:bg-red-50"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Delete
            </Button>
            <Button onClick={() => onEdit(task)} className="bg-red-500 hover:bg-red-600 text-white">
              <Edit className="w-4 h-4 mr-2" />
              Edit
            </Button>
            <Button className="bg-orange-500 hover:bg-orange-600 text-white">
              <AlertTriangle className="w-4 h-4 mr-2" />
              Mark Important
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}