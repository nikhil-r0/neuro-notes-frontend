// src/components/UploadMaterialForm.tsx
import React, { useState } from 'react'
import { Upload } from 'lucide-react'
import { apiService } from '../api/apiService'

interface Props {
  onMaterialUploaded: () => void
}

export const UploadMaterialForm: React.FC<Props> = ({ onMaterialUploaded }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    subject: '',
    topic: ''
  })
  const [file, setFile]       = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<{ text: string; success: boolean } | null>(null)

  const handleSubmit = async () => {
    if (!file) {
      setMessage({ text: 'Please select a file to upload.', success: false })
      return
    }
    for (let key of ['title', 'subject', 'topic']) {
      if (!formData[key as keyof typeof formData]) {
        setMessage({ text: `Please fill in ${key}.`, success: false })
        return
      }
    }

    setLoading(true)
    setMessage(null)

    const fd = new FormData()
    fd.append('file', file)
    fd.append('title', formData.title)
    fd.append('description', formData.description)
    fd.append('subject', formData.subject)
    fd.append('topic', formData.topic)

    try {
      const res = await apiService.uploadMaterial(fd)
      if (res.message) {
        setMessage({ text: res.message, success: true })
        setFormData({ title: '', description: '', subject: '', topic: '' })
        setFile(null)
        onMaterialUploaded()
      } else {
        throw new Error(res.error || 'Unknown error')
      }
    } catch (err: any) {
      setMessage({ text: err.message || 'Upload failed.', success: false })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold mb-4 flex items-center">
        <Upload className="h-5 w-5 mr-2" /> Upload Study Material (File)
      </h3>

      {message && (
        <div className={`mb-4 p-3 rounded-lg ${
          message.success ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}>
          {message.text}
        </div>
      )}

      <div className="space-y-4">
        {/* File Picker */}
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
          <input
            id="file-upload"
            type="file"
            accept=".pdf,.doc,.docx,.txt,.ppt,.pptx"
            className="hidden"
            onChange={e => setFile(e.target.files?.[0] || null)}
          />
          <label htmlFor="file-upload" className="cursor-pointer flex flex-col items-center">
            <Upload className="h-12 w-12 text-gray-400 mb-2" />
            <span className="text-gray-600">
              {file ? file.name : 'Click to select a file'}
            </span>
            <span className="text-sm text-gray-400">PDF, DOCX, TXT, PPTX supported</span>
          </label>
        </div>

        {/* Title */}
        <div>
          <label className="block mb-1 font-medium">
            Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={formData.title}
            onChange={e => setFormData(fd => ({ ...fd, title: e.target.value }))}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block mb-1 font-medium">Description</label>
          <textarea
            value={formData.description}
            onChange={e => setFormData(fd => ({ ...fd, description: e.target.value }))}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500"
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
              onChange={e => setFormData(fd => ({ ...fd, subject: e.target.value }))}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">
              Topic <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.topic}
              onChange={e => setFormData(fd => ({ ...fd, topic: e.target.value }))}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500"
            />
          </div>
        </div>

        {/* Submit */}
        <button
          onClick={handleSubmit}
          disabled={loading || !file}
          className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 disabled:opacity-50 transition"
        >
          {loading ? 'Uploading…' : 'Upload Material'}
        </button>
      </div>
    </div>
  )
}
