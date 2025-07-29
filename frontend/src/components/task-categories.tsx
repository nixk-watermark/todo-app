import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface Category {
  id: string
  name: string
}

export default function TaskCategories() {
  // Mock data
  const [statuses, setStatuses] = useState<Category[]>([
    { id: "1", name: "Completed" },
    { id: "2", name: "In Progress" },
    { id: "3", name: "Not Started" },
  ])
  const [priorities, setPriorities] = useState<Category[]>([
    { id: "1", name: "Extreme" },
    { id: "2", name: "Moderate" },
    { id: "3", name: "Low" },
  ])
  const [modal, setModal] = useState<null | { type: "status" | "priority"; mode: "add" | "edit"; item?: Category }> (null)
  const [input, setInput] = useState("")

  // Modal handlers
  const openAddModal = (type: "status" | "priority") => {
    setInput("")
    setModal({ type, mode: "add" })
  }
  const openEditModal = (type: "status" | "priority", item: Category) => {
    setInput(item.name)
    setModal({ type, mode: "edit", item })
  }
  const closeModal = () => setModal(null)

  // Save handlers
  const handleSave = () => {
    if (!input.trim()) return
    if (!modal) return
    if (modal.mode === "add") {
      const newItem = { id: Date.now().toString(), name: input }
      if (modal.type === "status") setStatuses([...statuses, newItem])
      else setPriorities([...priorities, newItem])
    } else if (modal.mode === "edit" && modal.item) {
      if (modal.type === "status") setStatuses(statuses.map(s => s.id === modal.item!.id ? { ...s, name: input } : s))
      else setPriorities(priorities.map(p => p.id === modal.item!.id ? { ...p, name: input } : p))
    }
    closeModal()
  }
  const handleDelete = (type: "status" | "priority", id: string) => {
    if (type === "status") setStatuses(statuses.filter(s => s.id !== id))
    else setPriorities(priorities.filter(p => p.id !== id))
  }

  return (
    <div className="w-full max-w-4xl mx-auto bg-[#F7F8FA] rounded-2xl shadow-xl p-10 mt-10">
      <h2 className="text-3xl font-bold mb-8 text-gray-900">Task Categories</h2>
      <div className="bg-white rounded-xl p-8 border mb-10">
        {/* Task Status Table */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-gray-800">Task Status</h3>
            <Button className="bg-[#FF5A5F] text-white" onClick={() => openAddModal("status")}>+ Add Task Status</Button>
          </div>
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b">
                <th className="py-2">SN</th>
                <th className="py-2">Task Status</th>
                <th className="py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {statuses.map((s, i) => (
                <tr key={s.id} className="border-b">
                  <td className="py-2">{i + 1}</td>
                  <td className="py-2">{s.name}</td>
                  <td className="py-2">
                    <Button size="sm" className="mr-2 bg-[#FF5A5F] text-white" onClick={() => openEditModal("status", s)}>Edit</Button>
                    <Button size="sm" variant="outline" className="text-[#FF5A5F] border-[#FF5A5F]" onClick={() => handleDelete("status", s.id)}>Delete</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Task Priority Table */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-gray-800">Task Priority</h3>
            <Button className="bg-[#FF5A5F] text-white" onClick={() => openAddModal("priority")}>+ Add New Priority</Button>
          </div>
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b">
                <th className="py-2">SN</th>
                <th className="py-2">Task Priority</th>
                <th className="py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {priorities.map((p, i) => (
                <tr key={p.id} className="border-b">
                  <td className="py-2">{i + 1}</td>
                  <td className="py-2">{p.name}</td>
                  <td className="py-2">
                    <Button size="sm" className="mr-2 bg-[#FF5A5F] text-white" onClick={() => openEditModal("priority", p)}>Edit</Button>
                    <Button size="sm" variant="outline" className="text-[#FF5A5F] border-[#FF5A5F]" onClick={() => handleDelete("priority", p.id)}>Delete</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* Modal */}
      {modal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-2xl p-10 w-full max-w-md">
            <h3 className="text-xl font-bold mb-6 text-gray-800">{modal.mode === "add" ? `Add ${modal.type === "status" ? "Task Status" : "Task Priority"}` : `Edit ${modal.type === "status" ? "Task Status" : "Task Priority"}`}</h3>
            <Input
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder={modal.type === "status" ? "Task Status Name" : "Task Priority Title"}
              className="mb-6"
            />
            <div className="flex gap-4">
              <Button className="bg-[#FF5A5F] text-white" onClick={handleSave}>{modal.mode === "add" ? "Create" : "Update"}</Button>
              <Button variant="outline" onClick={closeModal}>Cancel</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
} 