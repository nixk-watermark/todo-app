import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function AccountInfo({ onChangePassword, onGoBack }: { onChangePassword: () => void; onGoBack?: () => void }) {
  const [user, setUser] = useState({
    avatar: "/placeholder.svg?height=80&width=80",
    name: "Sundar Gurung",
    email: "sundargurung360@gmail.com",
    firstName: "Sundar",
    lastName: "Gurung",
    contact: "",
    position: "",
  })
  const [editing, setEditing] = useState(false)
  const [form, setForm] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    contact: user.contact,
    position: user.position,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSave = () => {
    setUser({ ...user, ...form })
    setEditing(false)
  }

  return (
    <div className="w-full max-w-3xl mx-auto bg-[#F7F8FA] rounded-2xl shadow-xl p-10 mt-10">
      <div className="flex items-center mb-8 gap-6">
        <img src={user.avatar} alt={user.name} className="w-20 h-20 rounded-full border-4 border-white shadow-md" />
        <div>
          <h2 className="text-2xl font-bold text-gray-800">{user.name}</h2>
          <p className="text-gray-600">{user.email}</p>
        </div>
        <div className="flex-1 text-right">
          {onGoBack && (
            <button className="font-semibold text-black hover:underline" onClick={onGoBack}>
              Go Back
            </button>
          )}
        </div>
      </div>
      <div className="bg-white rounded-xl p-8 border">
        <form className="space-y-6" onSubmit={e => { e.preventDefault(); handleSave() }}>
          <div>
            <label className="block text-gray-700 font-semibold mb-1">First Name</label>
            <Input name="firstName" value={form.firstName} onChange={handleChange} disabled={!editing} />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-1">Last Name</label>
            <Input name="lastName" value={form.lastName} onChange={handleChange} disabled={!editing} />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-1">Email Address</label>
            <Input name="email" value={form.email} onChange={handleChange} disabled={!editing} />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-1">Contact Number</label>
            <Input name="contact" value={form.contact} onChange={handleChange} disabled={!editing} />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-1">Position</label>
            <Input name="position" value={form.position} onChange={handleChange} disabled={!editing} />
          </div>
          <div className="flex gap-4 mt-8">
            {editing ? (
              <>
                <Button type="submit" className="bg-[#FF5A5F] text-white">Save Changes</Button>
                <Button type="button" variant="outline" onClick={() => setEditing(false)}>Cancel</Button>
              </>
            ) : (
              <>
                <Button type="button" className="bg-[#FF5A5F] text-white" onClick={() => setEditing(true)}>Update Info</Button>
                <Button type="button" variant="outline" onClick={onChangePassword}>Change Password</Button>
              </>
            )}
          </div>
        </form>
      </div>
    </div>
  )
} 