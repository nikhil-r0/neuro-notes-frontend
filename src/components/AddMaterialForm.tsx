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
    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6 dark:bg-gray-800">
      <h3 className="text-lg font-semibold mb-4 flex items-center text-gray-900 dark:text-white">
        <Plus className="h-5 w-5 mr-2" /> Add Study Material (Link/URL)
      </h3>

      {message && (
        <div
          className={`mb-4 p-3 rounded-lg ${
            message.success
              ? 'bg-accent/20 text-accent dark:bg-accent/30 dark:text-accent'
              : 'bg-red-500/20 text-red-600 dark:bg-red-500/30 dark:text-red-400'
          }`}
        >
          {message.text}
        </div>
      )}

      <div className="space-y-4">
        {/* Title */}
        <div>
          <label htmlFor="addTitle" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Title <span className="text-red-500">*</span>
          </label>
          <input
            id="addTitle"
            type="text"
            value={formData.title}
            onChange={e => setFormData({ ...formData, title: e.target.value })}
            className="block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-accent focus:border-accent sm:text-sm text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-accent dark:focus:border-accent"
          />
        </div>

        {/* Description */}
        <div>
          <label htmlFor="addDescription" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description</label>
          <textarea
            id="addDescription"
            value={formData.description}
            onChange={e => setFormData({ ...formData, description: e.target.value })}
            className="block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-accent focus:border-accent sm:text-sm text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-accent dark:focus:border-accent"
            rows={3}
          />
        </div>

        {/* Subject & Topic */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="addSubject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Subject <span className="text-red-500">*</span>
            </label>
            <input
              id="addSubject"
              type="text"
              value={formData.subject}
              onChange={e => setFormData({ ...formData, subject: e.target.value })}
              className="block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-accent focus:border-accent sm:text-sm text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-accent dark:focus:border-accent"
            />
          </div>
          <div>
            <label htmlFor="addTopic" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Topic <span className="text-red-500">*</span>
            </label>
            <input
              id="addTopic"
              type="text"
              value={formData.topic}
              onChange={e => setFormData({ ...formData, topic: e.target.value })}
              className="block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-accent focus:border-accent sm:text-sm text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-accent dark:focus:border-accent"
            />
          </div>
        </div>

        {/* URL / Path */}
        <div>
          <label htmlFor="addUrlOrPath" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            URL or Path <span className="text-red-500">*</span>
          </label>
          <input
            id="addUrlOrPath"
            type="url"
            value={formData.url_or_path}
            onChange={e => setFormData({ ...formData, url_or_path: e.target.value })}
            className="block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-accent focus:border-accent sm:text-sm text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-accent dark:focus:border-accent"
          />
        </div>

        {/* Submit */}
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full bg-primary text-text-primary-light hover:bg-blue-700 disabled:opacity-50 transition py-3 px-4 rounded-md shadow-sm"
        >
          {loading ? 'Adding…' : 'Add Material'}
        </button>
      </div>
    </div>
  )
}
