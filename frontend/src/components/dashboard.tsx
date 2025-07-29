"use client"

import { useState } from "react"
import Sidebar from "./sidebar"
import TaskModal from "./task-modal"
import TaskDetailModal from "./task-detail-modal"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Bell, Calendar, Plus, Users } from "lucide-react"

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

export default function Dashboard() {
  const [currentView, setCurrentView] = useState("dashboard")
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false)
  const [isTaskDetailOpen, setIsTaskDetailOpen] = useState(false)
  const [selectedTask, setSelectedTask] = useState<Task | null>(null)
  const [editingTask, setEditingTask] = useState<Task | null>(null)
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: "1",
      title: "Attend Nischal's Birthday Party",
      description: "Buy gifts on the way and pick up cake from the bakery. (6 PM | Fresh Elements)",
      status: "not_started",
      deadline: "2023-06-20",
      priority: "moderate",
      image: "/placeholder.svg?height=100&width=100",
      createdAt: "2023-06-20",
    },
    {
      id: "2",
      title: "Landing Page Design for TravelDays",
      description: "Get the work done by EOD and discuss with client before leaving. (4 PM | Meeting Room)",
      status: "ongoing",
      deadline: "2023-06-20",
      priority: "moderate",
      image: "/placeholder.svg?height=100&width=100",
      createdAt: "2023-06-20",
    },
    {
      id: "3",
      title: "Presentation on Final Product",
      description:
        "Make sure everything is functioning and all the necessities are properly met. Prepare the team and get the documents ready for...",
      status: "ongoing",
      deadline: "2023-06-19",
      priority: "moderate",
      image: "/placeholder.svg?height=100&width=100",
      createdAt: "2023-06-19",
    },
    {
      id: "4",
      title: "Walk the dog",
      description: "Take the dog to the park and bring treats as well.",
      status: "completed",
      deadline: "2023-06-18",
      priority: "low",
      image: "/placeholder.svg?height=100&width=100",
      createdAt: "2023-06-18",
    },
    {
      id: "5",
      title: "Conduct meeting",
      description: "Meet with the client and finalize requirements.",
      status: "completed",
      deadline: "2023-06-18",
      priority: "moderate",
      image: "/placeholder.svg?height=100&width=100",
      createdAt: "2023-06-18",
    },
  ])

  const handleTaskClick = (task: Task) => {
    setSelectedTask(task)
    setIsTaskDetailOpen(true)
  }

  const handleEditTask = (task: Task) => {
    setEditingTask(task)
    setIsTaskModalOpen(true)
  }

  const handleSaveTask = (taskData: Partial<Task>) => {
    if (editingTask) {
      // Update existing task
      setTasks(tasks.map((task) => (task.id === editingTask.id ? { ...task, ...taskData } : task)))
      setEditingTask(null)
    } else {
      // Create new task
      const newTask: Task = {
        id: Date.now().toString(),
        title: taskData.title || "",
        description: taskData.description || "",
        status: "not_started",
        deadline: taskData.deadline || new Date().toISOString().split("T")[0],
        priority: taskData.priority || "low",
        image: taskData.image,
        createdAt: new Date().toISOString().split("T")[0],
      }
      setTasks([...tasks, newTask])
    }
    setIsTaskModalOpen(false)
  }

  const handleDeleteTask = (taskId: string) => {
    setTasks(tasks.filter((task) => task.id !== taskId))
    setIsTaskDetailOpen(false)
  }

  const getTaskStats = () => {
    const total = tasks.length
    const completed = tasks.filter((t) => t.status === "completed").length
    const inProgress = tasks.filter((t) => t.status === "ongoing").length
    const notStarted = tasks.filter((t) => t.status === "not_started").length

    return {
      completed: total > 0 ? Math.round((completed / total) * 100) : 0,
      inProgress: total > 0 ? Math.round((inProgress / total) * 100) : 0,
      notStarted: total > 0 ? Math.round((notStarted / total) * 100) : 0,
    }
  }

  const stats = getTaskStats()
  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  })

  const renderDashboardContent = () => {
    const todayTasks = tasks.filter((task) => task.createdAt === new Date().toISOString().split("T")[0])
    const completedTasks = tasks.filter((task) => task.status === "completed")

    return (
      <div className="space-y-6">
        {/* Welcome Section */}
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-800">Welcome back, Sundar 👋</h1>
          <div className="flex items-center space-x-4">
            <div className="flex -space-x-2">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="w-8 h-8 rounded-full bg-gray-300 border-2 border-white">
                  <img
                    src={`/placeholder.svg?height=32&width=32&query=user ${i}`}
                    alt={`User ${i}`}
                    className="w-full h-full rounded-full"
                  />
                </div>
              ))}
            </div>
            <Button variant="outline" className="text-red-500 border-red-500 hover:bg-red-50 bg-transparent">
              <Users className="w-4 h-4 mr-2" />
              Invite
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* To-Do Section */}
          <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm border">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 rounded border-2 border-gray-300"></div>
                <h2 className="text-xl font-semibold text-gray-800">To-Do</h2>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-500">20 June • Today</span>
                <Button
                  onClick={() => setIsTaskModalOpen(true)}
                  variant="ghost"
                  size="sm"
                  className="text-red-500 hover:bg-red-50"
                >
                  <Plus className="w-4 h-4 mr-1" />
                  Add task
                </Button>
              </div>
            </div>

            <div className="space-y-4">
              {todayTasks.map((task) => (
                <div
                  key={task.id}
                  onClick={() => handleTaskClick(task)}
                  className="bg-gray-50 rounded-xl p-4 cursor-pointer hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start space-x-4">
                    <div className="w-6 h-6 rounded-full border-2 border-gray-300 mt-1"></div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800 mb-2">{task.title}</h3>
                      <p className="text-gray-600 text-sm mb-3">{task.description}</p>
                      <div className="flex items-center justify-between text-xs">
                        <div className="flex items-center space-x-4">
                          <span
                            className={`px-2 py-1 rounded ${
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
                            className={`px-2 py-1 rounded ${
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
                        </div>
                        <span className="text-gray-500">Created on: {task.createdAt}</span>
                      </div>
                    </div>
                    {task.image && (
                      <img
                        src={task.image || "/placeholder.svg"}
                        alt={task.title}
                        className="w-16 h-16 rounded-lg object-cover"
                      />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Task Status Section */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-sm border">
              <div className="flex items-center space-x-2 mb-6">
                <div className="w-6 h-6 rounded border-2 border-gray-300"></div>
                <h2 className="text-xl font-semibold text-gray-800">Task Status</h2>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="text-center">
                  <div className="relative w-16 h-16 mx-auto mb-2">
                    <svg className="w-16 h-16 transform -rotate-90">
                      <circle cx="32" cy="32" r="28" stroke="#e5e7eb" strokeWidth="8" fill="none" />
                      <circle
                        cx="32"
                        cy="32"
                        r="28"
                        stroke="#10b981"
                        strokeWidth="8"
                        fill="none"
                        strokeDasharray={`${stats.completed * 1.76} 176`}
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-lg font-bold">{stats.completed}%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-center space-x-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-gray-600">Completed</span>
                  </div>
                </div>

                <div className="text-center">
                  <div className="relative w-16 h-16 mx-auto mb-2">
                    <svg className="w-16 h-16 transform -rotate-90">
                      <circle cx="32" cy="32" r="28" stroke="#e5e7eb" strokeWidth="8" fill="none" />
                      <circle
                        cx="32"
                        cy="32"
                        r="28"
                        stroke="#3b82f6"
                        strokeWidth="8"
                        fill="none"
                        strokeDasharray={`${stats.inProgress * 1.76} 176`}
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-lg font-bold">{stats.inProgress}%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-center space-x-1">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-sm text-gray-600">In Progress</span>
                  </div>
                </div>

                <div className="text-center">
                  <div className="relative w-16 h-16 mx-auto mb-2">
                    <svg className="w-16 h-16 transform -rotate-90">
                      <circle cx="32" cy="32" r="28" stroke="#e5e7eb" strokeWidth="8" fill="none" />
                      <circle
                        cx="32"
                        cy="32"
                        r="28"
                        stroke="#ef4444"
                        strokeWidth="8"
                        fill="none"
                        strokeDasharray={`${stats.notStarted * 1.76} 176`}
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-lg font-bold">{stats.notStarted}%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-center space-x-1">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    <span className="text-sm text-gray-600">Not Started</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Completed Tasks */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-6 h-6 rounded border-2 border-gray-300"></div>
                <h2 className="text-xl font-semibold text-gray-800">Completed Task</h2>
              </div>

              <div className="space-y-3">
                {completedTasks.slice(0, 2).map((task) => (
                  <div key={task.id} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center mt-1">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-800">{task.title}</h4>
                      <p className="text-sm text-gray-600 mt-1">{task.description}</p>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-xs text-green-600 bg-green-100 px-2 py-1 rounded">Status: Completed</span>
                        <span className="text-xs text-gray-500">Completed 2 days ago</span>
                      </div>
                    </div>
                    {task.image && (
                      <img
                        src={task.image || "/placeholder.svg"}
                        alt={task.title}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const renderMyTasksContent = () => {
    const myTasks = tasks.filter((task) => task.status !== "completed")

    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* My Tasks List */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">My Tasks</h2>

          <div className="space-y-4">
            {myTasks.map((task) => (
              <div
                key={task.id}
                onClick={() => handleTaskClick(task)}
                className="bg-gray-50 rounded-xl p-4 cursor-pointer hover:shadow-md transition-shadow"
              >
                <div className="flex items-start space-x-4">
                  <div className="w-6 h-6 rounded-full border-2 border-gray-300 mt-1"></div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800 mb-2">{task.title}</h3>
                    <p className="text-gray-600 text-sm mb-3">{task.description}</p>
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center space-x-4">
                        <span
                          className={`px-2 py-1 rounded ${
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
                          className={`px-2 py-1 rounded ${
                            task.status === "ongoing" ? "bg-blue-100 text-blue-600" : "bg-gray-100 text-gray-600"
                          }`}
                        >
                          Status: {task.status === "not_started" ? "Not Started" : "In Progress"}
                        </span>
                      </div>
                      <span className="text-gray-500">Created on: {task.createdAt}</span>
                    </div>
                  </div>
                  {task.image && (
                    <img
                      src={task.image || "/placeholder.svg"}
                      alt={task.title}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Task Detail Preview */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border">
          {selectedTask ? (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800">{selectedTask.title}</h2>
                <Button onClick={() => setSelectedTask(null)} variant="outline" size="sm">
                  Close
                </Button>
              </div>

              {selectedTask.image && (
                <img
                  src={selectedTask.image || "/placeholder.svg"}
                  alt={selectedTask.title}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
              )}

              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      selectedTask.priority === "extreme"
                        ? "bg-red-100 text-red-600"
                        : selectedTask.priority === "moderate"
                          ? "bg-blue-100 text-blue-600"
                          : "bg-green-100 text-green-600"
                    }`}
                  >
                    Priority: {selectedTask.priority.charAt(0).toUpperCase() + selectedTask.priority.slice(1)}
                  </span>
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      selectedTask.status === "completed"
                        ? "bg-green-100 text-green-600"
                        : selectedTask.status === "ongoing"
                          ? "bg-blue-100 text-blue-600"
                          : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    Status:{" "}
                    {selectedTask.status === "not_started"
                      ? "Not Started"
                      : selectedTask.status === "ongoing"
                        ? "In Progress"
                        : "Completed"}
                  </span>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">Task Description:</h3>
                  <p className="text-gray-600">{selectedTask.description}</p>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">Deadline:</h3>
                  <p className="text-gray-600">{selectedTask.deadline}</p>
                </div>

                <div className="flex space-x-2 pt-4">
                  <Button
                    onClick={() => handleEditTask(selectedTask)}
                    className="bg-red-500 hover:bg-red-600 text-white"
                  >
                    Edit
                  </Button>
                  <Button
                    onClick={() => handleDeleteTask(selectedTask.id)}
                    variant="outline"
                    className="text-red-500 border-red-500 hover:bg-red-50"
                  >
                    Delete
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center text-gray-500 py-12">
              <p>Select a task to view details</p>
            </div>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar currentView={currentView} onViewChange={setCurrentView} />

      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold">
                <span className="text-red-500">
                  {currentView === "dashboard" ? "Dash" : currentView === "my-task" ? "To-" : "Task"}
                </span>
                <span className="text-gray-800">
                  {currentView === "dashboard" ? "board" : currentView === "my-task" ? "Do" : "Categories"}
                </span>
              </h1>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input placeholder="Search your task here..." className="pl-10 w-80 bg-gray-50 border-gray-200" />
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon" className="text-gray-500">
                <Search className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-gray-500">
                <Bell className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-gray-500">
                <Calendar className="w-5 h-5" />
              </Button>
              <div className="text-right">
                <p className="text-sm font-medium text-gray-800">Tuesday</p>
                <p className="text-xs text-gray-500">20/06/2023</p>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {currentView === "dashboard" && renderDashboardContent()}
          {currentView === "my-task" && renderMyTasksContent()}
          {currentView === "vital-task" && (
            <div className="text-center py-12">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Vital Tasks</h2>
              <p className="text-gray-600">High priority tasks will appear here</p>
            </div>
          )}
          {currentView === "task-categories" && (
            <div className="text-center py-12">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Task Categories</h2>
              <p className="text-gray-600">Organize your tasks by categories</p>
            </div>
          )}
          {currentView === "settings" && (
            <div className="text-center py-12">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Settings</h2>
              <p className="text-gray-600">Manage your account settings</p>
            </div>
          )}
          {currentView === "help" && (
            <div className="text-center py-12">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Help</h2>
              <p className="text-gray-600">Get help and support</p>
            </div>
          )}
        </main>
      </div>

      {/* Modals */}
      <TaskModal
        isOpen={isTaskModalOpen}
        onClose={() => {
          setIsTaskModalOpen(false)
          setEditingTask(null)
        }}
        onSave={handleSaveTask}
        task={editingTask}
      />

      <TaskDetailModal
        isOpen={isTaskDetailOpen}
        onClose={() => {
          setIsTaskDetailOpen(false)
          setSelectedTask(null)
        }}
        task={selectedTask}
        onEdit={handleEditTask}
        onDelete={handleDeleteTask}
      />
    </div>
  )
}
