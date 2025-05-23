// src/components/AddMaterialForm.tsx
import React, { useState } from 'react'
import { Plus } from 'lucide-react'
import { apiService } from '../api/apiService'

interface Props {
  onMaterialAdded: () => void
}

export const AddMaterialForm: React.FC<Props> = ({ onMaterialAdded }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    subject: '',
    topic: '',
    url_or_path: '',
  })
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<{ text: string; success: boolean } | null>(null)

  const handleSubmit = async () => {
    // basic validation
    for (let key of ['title', 'subject', 'topic', 'url_or_path'] as (keyof typeof formData)[]) {
      if (!formData[key].trim()) {
        setMessage({ text: `Please fill in ${key.replace('_', ' ')}.`, success: false })
        return
      }
    }

    setLoading(true)
    setMessage(null)

    try {
      const res = await apiService.addMaterial(formData)
      if (res.message) {
        setMessage({ text: res.message, success: true })
        setFormData({ title: '', description: '', subject: '', topic: '', url_or_path: '' })
        onMaterialAdded()
      } else {
        throw new Error(res.error || 'Unknown error')
      }
    } catch (err: any) {
      setMessage({ text: err.message || 'Failed to add material.', success: false })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold mb-4 flex items-center">
        <Plus className="h-5 w-5 mr-2" /> Add Study Material (Link/URL)
      </h3>

      {message && (
        <div
          className={`mb-4 p-3 rounded-lg ${
            message.success ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          }`}
        >
          {message.text}
        </div>
      )}

      <div className="space-y-4">
        {/* Title */}
        <div>
          <label className="block mb-1 font-medium">
            Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={formData.title}
            onChange={e => setFormData({ ...formData, title: e.target.value })}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block mb-1 font-medium">Description</label>
          <textarea
            value={formData.description}
            onChange={e => setFormData({ ...formData, description: e.target.value })}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500"
            rows={3}
          />
        </div>

        {/* Subject & Topic */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 font-medium">
              Subject <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.subject}
              onChange={e => setFormData({ ...formData, subject: e.target.value })}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">
              Topic <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.topic}
              onChange={e => setFormData({ ...formData, topic: e.target.value })}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500"
            />
          </div>
        </div>

        {/* URL / Path */}
        <div>
          <label className="block mb-1 font-medium">
            URL or Path <span className="text-red-500">*</span>
          </label>
          <input
            type="url"
            value={formData.url_or_path}
            onChange={e => setFormData({ ...formData, url_or_path: e.target.value })}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500"
          />
        </div>

        {/* Submit */}
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 disabled:opacity-50 transition"
        >
          {loading ? 'Adding…' : 'Add Material'}
        </button>
      </div>
    </div>
  )
}
