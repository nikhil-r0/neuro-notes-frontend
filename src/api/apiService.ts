// src/api/apiService.ts
export const API_BASE = 'http://192.168.29.225:5000';

export const apiService = {
  registerUser: async (userData: any) => {
    const res = await fetch(`${API_BASE}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });
    return res.json();
  },

  login: async (creds: { email: string; password: string }) => {
    const res = await fetch(`${API_BASE}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(creds),
    });
    return res.json();
  },

  getUsers: async () => {
    const res = await fetch(`${API_BASE}/users`);
    return res.json();
  },

  getMaterials: async () => {
    const res = await fetch(`${API_BASE}/materials`);
    return res.json();
  },

  searchMaterials: async (q?: string, subject?: string, topic?: string) => {
    const params = new URLSearchParams();
    if (q) params.set('q', q);
    if (subject) params.set('subject', subject);
    if (topic) params.set('topic', topic);
    const res = await fetch(`${API_BASE}/search-materials?${params}`);
    return res.json();
  },

  addMaterial: async (data: any) => {
    const res = await fetch(`${API_BASE}/add-material`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return res.json();
  },

  uploadMaterial: async (formData: FormData) => {
    const res = await fetch(`${API_BASE}/upload-material`, {
      method: 'POST',
      body: formData,        // browser will set multipart headers
    });
    return res.json();
  },
};
