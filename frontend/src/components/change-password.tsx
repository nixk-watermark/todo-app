import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import imageProfile from "@/assets/user_profile.jpg"
export default function ChangePassword({ onGoBack }: { onGoBack: () => void }) {
  const [form, setForm] = useState({
    current: "",
    new: "",
    confirm: "",
  })
  const [error, setError] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    setError("")
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (form.new !== form.confirm) {
      setError("Passwords do not match")
      return
    }
    // Simulate password update
    onGoBack()
  }

  return (
    <div className="w-full max-w-2xl mx-auto bg-[#F7F8FA] rounded-2xl shadow-xl p-10 mt-10">
      <div className="flex items-center mb-8 gap-6">
        <img src={imageProfile} alt="User" className="w-20 h-20 rounded-full border-4 border-white shadow-md" />
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Change Password</h2>
          <p className="text-gray-600">johndoe@gmail.com</p>
        </div>
        <div className="flex-1 text-right">
          <button className="font-semibold text-black hover:underline" onClick={onGoBack}>
            Go Back
          </button>
        </div>
      </div>
      <div className="bg-white rounded-xl p-8 border">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block text-gray-700 font-semibold mb-1">Current Password</label>
            <Input name="current" type="password" value={form.current} onChange={handleChange} required />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-1">New Password</label>
            <Input name="new" type="password" value={form.new} onChange={handleChange} required />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-1">Confirm Password</label>
            <Input name="confirm" type="password" value={form.confirm} onChange={handleChange} required />
          </div>
          {error && <div className="text-red-500 font-semibold">{error}</div>}
          <div className="flex gap-4 mt-8">
            <Button type="submit" className="bg-[#FF5A5F] text-white">Update Password</Button>
            <Button type="button" variant="outline" onClick={onGoBack}>Cancel</Button>
          </div>
        </form>
      </div>
    </div>
  )
} 