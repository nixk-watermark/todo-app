import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import imageProfile from "@/assets/user_profile.jpg"

export default function AccountInfo({ onChangePassword, onGoBack }: { onChangePassword: () => void; onGoBack?: () => void }) {
  const [user, setUser] = useState({
    avatar: "/placeholder.svg?height=80&width=80",
    name: "John Doe",
    email: "johndoe@gmail.com",
    firstName: "John",
    lastName: "Doe",
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
      <h1 className="text-2xl text-center font-bold text-red-800 mb-10 ">
        This feature is yet to be added
      </h1>
      <div className="flex items-center mb-8 gap-6">
        <img src={imageProfile} alt={user.name} className="w-20 h-20 rounded-full border-4 border-white shadow-md" />
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
    <label htmlFor="firstName" className="block text-gray-700 font-semibold mb-1">First Name</label>
    <Input id="firstName" name="firstName" value={form.firstName} onChange={handleChange} disabled={!editing} />
  </div>
  <div>
    <label htmlFor="lastName" className="block text-gray-700 font-semibold mb-1">Last Name</label>
    <Input id="lastName" name="lastName" value={form.lastName} onChange={handleChange} disabled={!editing} />
  </div>
  <div>
    <label htmlFor="email" className="block text-gray-700 font-semibold mb-1">Email Address</label>
    <Input id="email" name="email" value={form.email} onChange={handleChange} disabled={!editing} />
  </div>
  <div>
    <label htmlFor="contact" className="block text-gray-700 font-semibold mb-1">Contact Number</label>
    <Input id="contact" name="contact" value={form.contact} onChange={handleChange} disabled={!editing} />
  </div>
  <div>
    <label htmlFor="position" className="block text-gray-700 font-semibold mb-1">Position</label>
    <Input id="position" name="position" value={form.position} onChange={handleChange} disabled={!editing} />
  </div>

  <div className="flex gap-4 mt-8">
    {editing ? (
      <>
        <Button
          type="submit"
          className="bg-[#CC2E32] text-white px-6 py-2 rounded-lg font-semibold hover:bg-[#b8292d] transition-colors"
        >
          Save Changes
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => setEditing(false)}
          className="border-[#BA1F24] text-[#BA1F24] px-6 py-2 rounded-lg font-semibold hover:bg-[#BA1F24] hover:text-white transition-colors"
        >
          Cancel
        </Button>
      </>
    ) : (
      <>
        <Button
          type="button"
          className="bg-[#CC2E32] text-white px-6 py-2 rounded-lg font-semibold hover:bg-[#b8292d] transition-colors"
          onClick={() => setEditing(true)}
        >
          Update Info
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={onChangePassword}
          className="border-[#BA1F24] text-[#BA1F24] px-6 py-2 rounded-lg font-semibold hover:bg-[#BA1F24] hover:text-white transition-colors"
        >
          Change Password
        </Button>
      </>
    )}
  </div>
</form>


      </div>
    </div>
  )
} 