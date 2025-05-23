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
    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6 dark:bg-gray-800">
      <h3 className="text-lg font-semibold mb-4 flex items-center text-gray-900 dark:text-white">
        <Upload className="h-5 w-5 mr-2" /> Upload Study Material (File)
      </h3>

      {message && (
        <div className={`mb-4 p-3 rounded-lg ${
          message.success
            ? 'bg-accent/20 text-accent dark:bg-accent/30 dark:text-accent'
            : 'bg-red-500/20 text-red-600 dark:bg-red-500/30 dark:text-red-400'
        }`}>
          {message.text}
        </div>
      )}

      <div className="space-y-4">
        {/* File Picker */}
        <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-4 text-center">
          <input
            id="file-upload"
            type="file"
            accept=".pdf,.doc,.docx,.txt,.ppt,.pptx"
            className="hidden"
            onChange={e => setFile(e.target.files?.[0] || null)}
          />
          <label htmlFor="file-upload" className="cursor-pointer flex flex-col items-center">
            <Upload className="h-12 w-12 text-gray-400 dark:text-gray-500 mb-2" />
            <span className="text-gray-600 dark:text-gray-300">
              {file ? file.name : 'Click to select a file'}
            </span>
            <span className="text-sm text-gray-400 dark:text-gray-500">PDF, DOCX, TXT, PPTX supported</span>
          </label>
        </div>

        {/* Title */}
        <div>
          <label htmlFor="uploadTitle" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Title <span className="text-red-500">*</span>
          </label>
          <input
            id="uploadTitle"
            type="text"
            value={formData.title}
            onChange={e => setFormData(fd => ({ ...fd, title: e.target.value }))}
            className="block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-accent focus:border-accent sm:text-sm text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-accent dark:focus:border-accent"
          />
        </div>

        {/* Description */}
        <div>
          <label htmlFor="uploadDescription" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description</label>
          <textarea
            id="uploadDescription"
            value={formData.description}
            onChange={e => setFormData(fd => ({ ...fd, description: e.target.value }))}
            className="block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-accent focus:border-accent sm:text-sm text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-accent dark:focus:border-accent"
            rows={3}
          />
        </div>

        {/* Subject & Topic */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="uploadSubject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Subject <span className="text-red-500">*</span>
            </label>
            <input
              id="uploadSubject"
              type="text"
              value={formData.subject}
              onChange={e => setFormData(fd => ({ ...fd, subject: e.target.value }))}
              className="block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-accent focus:border-accent sm:text-sm text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-accent dark:focus:border-accent"
            />
          </div>
          <div>
            <label htmlFor="uploadTopic" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Topic <span className="text-red-500">*</span>
            </label>
            <input
              id="uploadTopic"
              type="text"
              value={formData.topic}
              onChange={e => setFormData(fd => ({ ...fd, topic: e.target.value }))}
              className="block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-accent focus:border-accent sm:text-sm text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-accent dark:focus:border-accent"
            />
          </div>
        </div>

        {/* Submit */}
        <button
          onClick={handleSubmit}
          disabled={loading || !file}
          className="w-full bg-primary text-text-primary-light hover:bg-blue-700 disabled:opacity-50 transition py-3 px-4 rounded-md shadow-sm"
        >
          {loading ? 'Uploading…' : 'Upload Material'}
        </button>
      </div>
    </div>
  )
}
