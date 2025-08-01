import { useState } from "react"
import Sidebar from "./sidebar"
import TaskModal from "./task-modal"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Plus} from "lucide-react"
import AccountInfo from "./account-info"
import ChangePassword from "./change-password"
import { useEffect } from "react"
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

export default function Dashboard() {
  const [currentView, setCurrentView] = useState("dashboard")
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false)
  const [selectedTask, setSelectedTask] = useState<any | null>(null)
  const [editingTask, setEditingTask] = useState<any | null>(null)
  const [tasks, setTasks] = useState<any[]>([])
  const [settingsView, setSettingsView] = useState<"main" | "change-password">("main")
  const [todayTasks, setTodayTasks] = useState<any[]>([])
  const [stats, setStatus] = useState<any>({})
  const [completedTasks, setCompletedTasks] = useState<any[]>([])
  const [user] = useState<any>(JSON.parse(localStorage.getItem("user")!))
  const [vitalTasks, setVitalTasks] = useState<any[]>([]);


  useEffect(() => {
    const fetchTasks = async () => {
      const response = await fetch(`${API_BASE_URL}/todos`, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
      })
      if (!response.ok) {
        throw new Error("Failed to fetch tasks")
      }
      const response_payload = await response.json()
      setTasks(response_payload.data)
      console.log("user debugging", response_payload)
      console.log("Response", response_payload.data)
    }
    fetchTasks()
    console.log("Tasks", tasks);
  }, [])

  useEffect(()=>{
    console.log("Debugging created at", tasks);
    console.log("lets see tasks heere", tasks)
    setTodayTasks(tasks.filter((task) => task.created_at.split('T')[0] === new Date().toISOString().split("T")[0]))
    setStatus(getTaskStats)
    setCompletedTasks(tasks.filter((task) => task.status === "completed"))
    setVitalTasks(
      tasks
        .filter(task => task.priority === "high" && task.status !== "completed")
        .sort((a, b) => {
          const dateA = new Date(a.deadline).getTime();
          const dateB = new Date(b.deadline).getTime();
          return dateA - dateB;
        })
    );
  }, [tasks]);

  const handleTaskClick = (task: any) => {
    setSelectedTask(task)
  }

  const handleEditTask = (task: any) => {
    setEditingTask(task)
    setIsTaskModalOpen(true)
  }

  const handleSaveTask = async(taskData: any) => {
    if (editingTask) {
      // Update existing task
      const response:any = await fetch(`${API_BASE_URL}/todos/${editingTask._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify({ todo: taskData })
      })
      if(response.ok){
        const payload = await response.json()
        setSelectedTask(null)
        setTasks([payload.data, ...tasks.filter(task => task._id !== editingTask._id)])
        setIsTaskModalOpen(false)
      }
    } else {
      // Create new task
      const response:any = await fetch(`${API_BASE_URL}/todos`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify({ todo: taskData })
      })
      if(response.ok){
        console.log("--------------------------------------------------------------------")
        const payload = await response.json()
        console.log(payload)
        setTasks([payload.data, ...tasks])
        
        setIsTaskModalOpen(false)
      }
    }
  }

  const handleDeleteTask = async (taskId: string) => {
    const response:any = await fetch(`${API_BASE_URL}/todos/${taskId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      }
    })
    if(response.ok){
      setSelectedTask(null)
      setTasks(prevTasks => {
        const updatedTasks = prevTasks.filter((task) => task._id !== taskId)
        console.log("[DEBUG] After deletion, tasks:", updatedTasks)
        return updatedTasks
      })
      console.log("[DEBUG] Deleted task, selectedTask should be null now")
    }
  }

  const getTaskStats = () => {
    const total = tasks.length
    const completed = tasks.filter((t) => t.status === "completed").length
    const inProgress = tasks.filter((t) => t.status === "ongoing").length
    const notStarted = tasks.filter((t) => t.status === "pending").length

    return {
      completed: total > 0 ? Math.round((completed / total) * 100) : 0,
      inProgress: total > 0 ? Math.round((inProgress / total) * 100) : 0,
      notStarted: total > 0 ? Math.round((notStarted / total) * 100) : 0,
    }
  }

  const getTimeAgo = (previousDate : any) => {
    const now = new Date().getTime();
    const past = new Date(previousDate).getTime();
    const diffMs = now - past;

    const seconds = Math.floor(diffMs / 1000);
    const minutes = Math.floor(diffMs / (1000 * 60));
    const hours = Math.floor(diffMs / (1000 * 60 * 60));
    const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  
    if (seconds < 60) return `${seconds} seconds ago`;
    if (minutes < 60) return `${minutes} minutes ago`;
    if (hours < 24) return `${hours} hours ago`;
    return `${days} days ago`;
  };  


  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  })

  

  const renderDashboardContent = () => {
    console.log("TodayTasks", todayTasks)
    
    return (
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* To-Do Section */} 
        <div className="lg:col-span-2 rounded-3xl p-8 shadow-2xl bg-white">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-3">
              <div className="w-7 h-7 rounded border-2 border-gray-300"></div>
              <h2 className="text-2xl font-bold text-gray-800">Todos</h2>
            </div>
            <div className="flex items-center space-x-6">
              <span className="text-base text-gray-500"> { new Date().toLocaleDateString("en-US", {day: "2-digit", month: "long"}) } </span>
              <Button
                onClick={() => setIsTaskModalOpen(true)}
                variant="ghost"
                size="lg"
                className="text-white bg-[#FF5A5F] hover:bg-[#ff7a7f] rounded-xl px-6 py-2 text-lg font-semibold shadow-md"
              >
                <Plus className="w-5 h-5 mr-2" />
                Add task
              </Button>
            </div>
          </div>
          <div className="space-y-6 overflow-y-auto max-h-[640px]">
            {todayTasks.map((task) => (
              <div
                key={task._id}
                onClick={() => handleTaskClick(task)}
                className="bg-white rounded-2xl p-6 shadow-md border-l-4 border-[#FF5A5F] cursor-pointer hover:shadow-xl transition-shadow flex items-center gap-4"
              >
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-800 mb-2 text-lg">{task.title}</h3>
                  <p className="text-gray-600 text-base mb-3">{task.description}</p>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-4">
                      <span className={`px-3 py-1 rounded-full font-semibold ${task.priority === "high" ? "bg-red-100 text-red-600" : task.priority === "medium" ? "bg-blue-100 text-blue-600" : "bg-green-100 text-green-600"}`}>Priority: {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}</span>
                      <span className={`px-3 py-1 rounded-full font-semibold ${task.status === "completed" ? "bg-green-100 text-green-600" : task.status === "ongoing" ? "bg-blue-100 text-blue-600" : "bg-gray-100 text-gray-600"}`}>Status: {task.status === "pending" ? "Not Started" : task.status === "ongoing" ? "In Progress" : "Completed"}</span>
                    </div>
                    <span className="text-gray-400">Updated: {getTimeAgo(task.updated_at)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Task Status Section */}
        <div className="space-y-8">
          <div className="bg-white rounded-3xl p-8 shadow-2xl">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-7 h-7 rounded border-2 border-gray-300"></div>
              <h2 className="text-2xl font-bold text-gray-800">Task Status</h2>
            </div>
            <div className="grid grid-cols-3 gap-6 mb-8">
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
          <div className="bg-white rounded-3xl p-8 shadow-2xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-7 h-7 rounded border-2 border-gray-300"></div>
              <h2 className="text-2xl font-bold text-gray-800">Completed Task</h2>
            </div>
            <div className="space-y-4">
              {completedTasks
                .slice()
                .sort((a, b) => {
                  const dateA = a.updated_at ? new Date(a.completedAt).getTime() : 0;
                  const dateB = b.updated_at ? new Date(b.completedAt).getTime() : 0;
                  return dateB - dateA;
                })
                .slice(0, 2)
                .map((task) => (
                  <div key={task._id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl shadow-md">
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mt-1">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-800 text-lg">{task.title}</h4>
                    <p className="text-base text-gray-600 mt-1">{task.description}</p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-xs text-green-600 bg-green-100 px-3 py-1 rounded-full font-semibold">Status: Completed</span>
                      <span className="text-xs text-gray-400">{getTimeAgo(task.created_at)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  const renderMyTasksContent = () => {
    // const myTasks = tasks.filter((task) => task.status !== "completed");
    return (
      <div className="w-[90%] grid grid-cols-2 gap-6">
        {/* My Tasks List */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">My Tasks</h2>

          <div className="space-y-4 overflow-y-auto max-h-[640px]">
            {tasks.map((task) => (
              <div
                key={task._id}
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
                            task.priority === "high"
                              ? "bg-red-100 text-red-600"
                              : task.priority === "medium"
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
                          Status: {task.status === "pending" ? "Not Started" : "In Progress"}
                        </span>
                      </div>
                      <span className="text-gray-500">Updated on: {new Date(task.created_at).toLocaleDateString("en-US", {day: "2-digit", month: "long", year: "numeric"})}</span>
                    </div>
                  </div>
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

              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      selectedTask.priority === "high"
                        ? "bg-red-100 text-red-600"
                        : selectedTask.priority === "medium"
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
                    {selectedTask.status === "pending"
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
                    onClick={() => handleDeleteTask(selectedTask._id)}
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

  const renderVitalTaskContent = () => {
    // const myTasks = tasks.filter((task) => task.status !== "completed");
    return (
      <div className="w-[90%] grid grid-cols-2 gap-6">
        {/* My Tasks List */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Vital Tasks</h2>

          <div className="space-y-4 overflow-y-auto max-h-[640px]">
            {vitalTasks.map((task) => (
              <div
                key={task._id}
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
                            task.priority === "high"
                              ? "bg-red-100 text-red-600"
                              : task.priority === "medium"
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
                          Status: {task.status === "pending" ? "Not Started" : "In Progress"}
                        </span>
                      </div>
                      <span className="text-gray-500">Deadline: {new Date(task.deadline).toLocaleDateString("en-US", {day: "2-digit", month: "long", year: "numeric"})}</span>
                    </div>
                  </div>
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

              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      selectedTask.priority === "high"
                        ? "bg-red-100 text-red-600"
                        : selectedTask.priority === "medium"
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
                    {selectedTask.status === "pending"
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
                    onClick={() => handleDeleteTask(selectedTask._id)}
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
    <div className="min-h-screen bg-[#F7F8FA] flex">
      <Sidebar
        currentView={currentView}
        onViewChange={(id: string) => {
          setCurrentView(id)
          setSelectedTask(null)
          if (id === "settings") setSettingsView("main")
        }}
        username={user}
      />

      <div className="flex-1 flex flex-col min-h-screen">
        {/* Header */}
        <header className="w-full bg-white shadow-md px-0 py-0 sticky top-0 z-10">
          <div className="flex items-center justify-between max-w-7xl mx-auto px-10 py-4 relative">
            {/* Left: Logo/Title */}
            <h1 className="text-3xl font-bold">
              <span className="text-[#FF5A5F]">Dash</span>
              <span className="text-gray-800">board</span>
            </h1>
            {/* Center: Search */}
            <div className="flex-1 flex justify-center">
              <div className="relative w-full max-w-lg">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-6 h-6" />
                <Input placeholder="Search feature yet to be added...." className="pl-12 pr-4 py-3 rounded-xl bg-[#F7F8FA] border-none shadow-sm text-lg w-full" />
              </div>
            </div>
            {/* Right: Icons and Date */}
            <div className="flex items-center gap-6 relative">
              <div className="text-right">
                <p className="text-base font-semibold text-gray-800">{currentDate.split(",")[0]}</p>
                <p className="text-sm text-gray-500">{currentDate.split(",")[1]}</p>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 flex flex-col items-center px-4 py-10 bg-[#F7F8FA]">
          <div className="w-full max-w-7xl">
            <h2 className="text-4xl font-extrabold text-gray-900 mb-8 flex items-center gap-3">
              Welcome back, {user} <span className="text-3xl">👋</span>
            </h2>
            {/* The rest of the dashboard content remains unchanged, but you can add more padding/shadow to cards as needed */}
          </div>
          {currentView === "dashboard" && renderDashboardContent()}
          {currentView === "my-task" && renderMyTasksContent()}
          {currentView === "vital-task" && renderVitalTaskContent()}
          {currentView === "settings" && (
            settingsView === "main" ? (
              <AccountInfo
                onChangePassword={() => setSettingsView("change-password")}
                onGoBack={() => setCurrentView("dashboard")}
              />
            ) : (
              <ChangePassword onGoBack={() => setSettingsView("main")} />
            )
          )}
        </main>

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
      </div>
    </div>
  )
}
