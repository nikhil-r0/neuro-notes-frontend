import React, { useState, useEffect } from 'react';
import { Header } from '../components/Header';
import { MaterialsList } from '../components/MaterialsList';
import { UploadMaterialForm } from '../components/UploadMaterialForm';
import { AddMaterialForm } from '../components/AddMaterialForm';
import { UsersList } from '../components/UsersList';
import { apiService } from '../api/apiService';
import { Material, User } from '../types';

const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'materials'|'upload'|'add'|'users'>('materials');
  const [users, setUsers] = useState<User[]>([]);
  const [materials, setMaterials] = useState<Material[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const [u, m] = await Promise.all([apiService.getUsers(), apiService.getMaterials()]);
      setUsers(u);
      setMaterials(m);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData() }, []);

  const renderContent = () => {
    if (loading) {
      return <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>;
    }
    switch (activeTab) {
      case 'materials': return <MaterialsList materials={materials} />;
      case 'upload':    return <UploadMaterialForm users={users} onMaterialUploaded={fetchData} />;
      case 'add':       return <AddMaterialForm onMaterialAdded={fetchData} />;
      case 'users':     return <UsersList users={users} onRegisterUser={fetchData} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header activeTab={activeTab} setActiveTab={(setActiveTab)} />
      <main className="container mx-auto px-4 py-8">{renderContent()}</main>
    </div>
  );
};

export default Dashboard;
