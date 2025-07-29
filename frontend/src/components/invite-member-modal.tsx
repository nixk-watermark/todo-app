import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface Member {
  id: string
  name: string
  email: string
  avatar: string
  role: "Owner" | "Can edit"
}

const mockMembers: Member[] = [
  { id: "1", name: "Upashna Gurung", email: "upapeggy332@gmail.com", avatar: "/placeholder.svg?height=40&width=40", role: "Can edit" },
  { id: "2", name: "Jeremy Lee", email: "jerrylee1996@gmail.com", avatar: "/placeholder.svg?height=40&width=40", role: "Can edit" },
  { id: "3", name: "Thomas Park", email: "parktho123@gmail.com", avatar: "/placeholder.svg?height=40&width=40", role: "Owner" },
  { id: "4", name: "Rachel Takahasi", email: "takahasirea32@gmail.com", avatar: "/placeholder.svg?height=40&width=40", role: "Can edit" },
]

export default function InviteMemberModal({ onClose }: { onClose: () => void }) {
  const [email, setEmail] = useState("")
  const [members, setMembers] = useState<Member[]>(mockMembers)
  const [copied, setCopied] = useState(false)
  const projectLink = "https://sharelinkhereandthere.com/34565sy29"

  const handleInvite = () => {
    if (!email.trim()) return
    setMembers([
      ...members,
      { id: Date.now().toString(), name: email.split("@")[0], email, avatar: "/placeholder.svg?height=40&width=40", role: "Can edit" },
    ])
    setEmail("")
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(projectLink)
    setCopied(true)
    setTimeout(() => setCopied(false), 1200)
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-2xl p-10 w-full max-w-lg relative">
        <button className="absolute top-6 right-6 font-semibold text-black hover:underline" onClick={onClose}>Go Back</button>
        <h2 className="text-2xl font-bold mb-8 text-gray-900">Send an invite to a new member</h2>
        <div className="mb-6">
          <label className="block text-gray-700 font-semibold mb-2">Email</label>
          <div className="flex gap-2">
            <Input value={email} onChange={e => setEmail(e.target.value)} placeholder="neerajgurung99@gmail.com" />
            <Button className="bg-[#FF5A5F] text-white" onClick={handleInvite}>Send Invite</Button>
          </div>
        </div>
        <div className="mb-8">
          <h3 className="text-lg font-bold text-gray-800 mb-2">Members</h3>
          <div className="space-y-3 max-h-40 overflow-y-auto">
            {members.map(m => (
              <div key={m.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50">
                <img src={m.avatar} alt={m.name} className="w-10 h-10 rounded-full" />
                <div className="flex-1">
                  <div className="font-semibold text-gray-800">{m.name}</div>
                  <div className="text-gray-500 text-sm">{m.email}</div>
                </div>
                <div className="text-sm font-semibold text-gray-700 px-3 py-1 rounded-xl bg-gray-100 border">
                  {m.role}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-6">
          <label className="block text-gray-700 font-semibold mb-2">Project Link</label>
          <div className="flex gap-2">
            <Input value={projectLink} readOnly className="bg-gray-100" />
            <Button className="bg-[#FF5A5F] text-white" onClick={handleCopy}>{copied ? "Copied!" : "Copy Link"}</Button>
          </div>
        </div>
      </div>
    </div>
  )
} 