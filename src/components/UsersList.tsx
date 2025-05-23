import React from 'react';
import { User as UserIcon } from 'lucide-react';
import { User } from '../types';
import { RegisterForm } from './RegisterForm';

interface Props {
  users: User[];
  onRegisterUser: () => void;
}

export const UsersList: React.FC<Props> = ({ users, onRegisterUser }) => (
  <div className="space-y-6">
    <RegisterForm onUserRegistered={onRegisterUser} /> {/* Assuming RegisterForm is styled appropriately */}
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Registered Users</h3>
      {users.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400">No users registered yet.</p>
      ) : (
        <div className="grid gap-4">
          {users.map(u => (
            <div key={u.user_id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 flex items-center space-x-4">
              <div className="bg-primary/20 p-2 rounded-full">
                <UserIcon className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white">{u.name}</h4>
                <p className="text-gray-500 dark:text-gray-400 text-sm">{u.email}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  </div>
);
