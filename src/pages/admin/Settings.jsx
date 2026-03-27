import React, { useState } from 'react';
import { AdminLayout } from '../../components/AdminLayout';
import { User, Bell, Lock, Globe, Palette, Database } from 'lucide-react';

export const AdminSettings = () => {
  const [settings, setSettings] = useState({
    siteName: 'MarketPulse Elite',
    siteDescription: 'High-fidelity financial intelligence for the modern investor',
    emailNotifications: true,
    postNotifications: false,
    weeklyDigest: true,
  });

  const handleSave = () => {
    console.log('Saving settings:', settings);
    // Add save logic here
  };

  const settingsSections = [
    {
      icon: User,
      title: 'Profile Settings',
      description: 'Manage your account information',
      fields: [
        { label: 'Full Name', type: 'text', value: 'Admin User' },
        { label: 'Email', type: 'email', value: 'admin@marketpulse.com' },
        { label: 'Role', type: 'text', value: 'Super Admin', disabled: true },
      ],
    },
    {
      icon: Globe,
      title: 'Site Settings',
      description: 'Configure your site information',
      fields: [
        { label: 'Site Name', type: 'text', value: settings.siteName, key: 'siteName' },
        { label: 'Site Description', type: 'textarea', value: settings.siteDescription, key: 'siteDescription' },
      ],
    },
  ];

  return (
    <AdminLayout>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2" data-testid="settings-title">Settings</h1>
          <p className="text-gray-600">Manage your account and site preferences</p>
        </div>

        <div className="space-y-6">
          {/* Profile & Site Settings */}
          {settingsSections.map((section, idx) => {
            const Icon = section.icon;
            return (
              <div key={idx} className="bg-white rounded-xl border border-gray-200 p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center">
                    <Icon className="w-5 h-5 text-teal-600" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-gray-900">{section.title}</h2>
                    <p className="text-sm text-gray-600">{section.description}</p>
                  </div>
                </div>
                <div className="space-y-4">
                  {section.fields.map((field, fieldIdx) => (
                    <div key={fieldIdx}>
                      <label className="block text-sm font-medium text-gray-700 mb-2">{field.label}</label>
                      {field.type === 'textarea' ? (
                        <textarea
                          value={field.value}
                          onChange={(e) => field.key && setSettings({ ...settings, [field.key]: e.target.value })}
                          disabled={field.disabled}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 disabled:bg-gray-100"
                          rows={3}
                          data-testid={`input-${field.label.toLowerCase().replace(/\s+/g, '-')}`}
                        />
                      ) : (
                        <input
                          type={field.type}
                          value={field.value}
                          onChange={(e) => field.key && setSettings({ ...settings, [field.key]: e.target.value })}
                          disabled={field.disabled}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 disabled:bg-gray-100"
                          data-testid={`input-${field.label.toLowerCase().replace(/\s+/g, '-')}`}
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}

          {/* Notification Settings */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center">
                <Bell className="w-5 h-5 text-teal-600" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-gray-900">Notifications</h2>
                <p className="text-sm text-gray-600">Manage your notification preferences</p>
              </div>
            </div>
            <div className="space-y-4">
              {[
                { label: 'Email Notifications', key: 'emailNotifications', description: 'Receive updates via email' },
                { label: 'Post Notifications', key: 'postNotifications', description: 'Get notified when posts are published' },
                { label: 'Weekly Digest', key: 'weeklyDigest', description: 'Receive weekly performance summary' },
              ].map((item) => (
                <div key={item.key} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{item.label}</p>
                    <p className="text-xs text-gray-500">{item.description}</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings[item.key]}
                      onChange={(e) => setSettings({ ...settings, [item.key]: e.target.checked })}
                      className="sr-only peer"
                      data-testid={`toggle-${item.key}`}
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-teal-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-500"></div>
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Security */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center">
                <Lock className="w-5 h-5 text-teal-600" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-gray-900">Security</h2>
                <p className="text-sm text-gray-600">Manage your security settings</p>
              </div>
            </div>
            <div className="space-y-3">
              <button className="w-full px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 text-left font-medium text-gray-700" data-testid="change-password-button">
                Change Password
              </button>
              <button className="w-full px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 text-left font-medium text-gray-700" data-testid="two-factor-button">
                Enable Two-Factor Authentication
              </button>
            </div>
          </div>

          {/* Save Button */}
          <div className="flex justify-end gap-3">
            <button className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium" data-testid="cancel-button">
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 font-medium"
              data-testid="save-settings-button"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};