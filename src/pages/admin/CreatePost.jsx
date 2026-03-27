import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AdminLayout } from '../../components/AdminLayout';
import { ArrowLeft, Bold, Italic, Underline, List, ListOrdered, Link as LinkIcon, Image as ImageIcon, Code, Upload, Calendar } from 'lucide-react';
import Editor from '../../components/Editor';
import  ImageUploader from '../../components/ImageUploader';
export const CreatePost = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    category: 'Market Analysis',
    content: '',
    featuredImage: null,
    visibility: 'public',
    publishDate: '',
  });

  const handlePublish = () => {
    console.log('Publishing post:', formData);
    // Add publish logic here
  };

//   const handleSaveDraft = () => {
//     console.log('Saving draft:', formData);
//     // Add save draft logic here
//   };


//   Image

  const [uploading, setUploading] = useState(false);

  const handleImageUpload = async (file) => {
    if (!file) return;

    // Validation
    if (file.size > 2 * 1024 * 1024) {
      alert("Image must be less than 2MB");
      return;
    }

    try {
      setUploading(true);

      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", "your_upload_preset"); // Cloudinary preset

    

      // Save URL in state
      setFormData({
        ...formData,
        featuredImage: res.data.secure_url,
      });

    } catch (error) {
      console.error(error);
      alert("Upload failed");
    } finally {
      setUploading(false);
    }
  };


  return (
    <AdminLayout>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/admin/posts')}
              className="p-2 hover:bg-gray-100 rounded-lg"
              data-testid="back-button"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
                <span>MarketPulse Elite</span>
                <span>/</span>
                <span>Create New Post</span>
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            {/* <button
              onClick={handleSaveDraft}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium"
              data-testid="save-draft-button"
            >
              Save as Draft
            </button> */}
            <button
              onClick={handlePublish}
              className="px-6 py-2.5 bg-[#0f2a4a] text-white text-[0.95rem] font-semibold rounded-lg 
hover:bg-[#0d213f] hover:shadow-[0_8px_16px_-6px_rgba(13,33,63,0.4)] hover:-translate-y-[2px] hover:scale-[1.02]
active:translate-y-0 active:shadow-none active:scale-[0.98]
focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0d213f]
transition-all duration-300 ease-in-out"
              data-testid="publish-button"
            >
              Publish
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Title and Meta */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="mb-4">
                <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2">
                  POST TITLE
                </label>
                <input
                  type="text"
                  placeholder="Enter post title..."
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full text-2xl font-bold text-gray-900 placeholder-gray-300 focus:outline-none"
                  data-testid="post-title-input"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2">
                    SLUG
                  </label>
                  <div className="flex items-center gap-2">
                    {/* <span className="text-sm text-gray-500">marketpulse.com/news/</span> */}
                    <input
                      type="text"
                      placeholder="url-slug-here"
                      value={formData.slug}
                      onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                      className="flex-1 px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                      data-testid="slug-input"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2">
                    CATEGORY
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                    data-testid="category-select"
                  >
                    <option>Market Analysis</option>
                    <option>IPO Watch</option>
                    <option>Options</option>
                    <option>Macro</option>
                    <option>Dividends</option>
                    <option>Crypto</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Editor */}
            <Editor
              content={formData.content}
              setContent={(content) => setFormData({ ...formData, content })}
              data-testid="editor"
            />
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Featured Image */}
           
            <ImageUploader
  formData={formData}
  setFormData={setFormData}
/>
            {/* Publishing Settings */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-xs font-semibold text-gray-600 uppercase tracking-wider mb-4">
                PUBLISHING SETTINGS
              </h3>

              {/* Visibility */}
              {/* <div className="mb-6">
                <label className="block text-sm font-medium text-gray-900 mb-2">Visibility</label>
                <p className="text-xs text-gray-500 mb-2">Who can see this post</p>
                <div className="flex gap-2">
                  <button
                    onClick={() => setFormData({ ...formData, visibility: 'public' })}
                    className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      formData.visibility === 'public'
                        ? 'bg-gray-900 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                    data-testid="visibility-public"
                  >
                    Public
                  </button>
                  <button
                    onClick={() => setFormData({ ...formData, visibility: 'private' })}
                    className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      formData.visibility === 'private'
                        ? 'bg-gray-900 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                    data-testid="visibility-private"
                  >
                    Private
                  </button>
                </div>
              </div> */}

              {/* Schedule Publication */}
              <div className="mb-6">
                {/* <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-medium text-gray-900">Schedule Publication</label>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.scheduleEnabled}
                      onChange={(e) => setFormData({ ...formData, scheduleEnabled: e.target.checked })}
                      className="sr-only peer"
                      data-testid="schedule-toggle"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-teal-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-500"></div>
                  </label>
                </div> */}
                {/* {formData.scheduleEnabled && ( */}
                  <div className="mt-3">
                    <label className="block text-xs text-gray-600 mb-2">Publish On</label>
                    <div className="flex items-center gap-2 px-3 py-2 border border-gray-200 rounded-lg">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <input
                        type="datetime-local"
                        value={formData.publishDate}
                        onChange={(e) => setFormData({ ...formData, publishDate: e.target.value })}
                        className="flex-1 text-sm focus:outline-none"
                        data-testid="publish-date-input"
                      />
                    </div>
                  </div>
                {/* )} */}
              </div>

              {/* SEO Settings */}
              <button className="w-full flex items-center justify-between px-4 py-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors mb-3" data-testid="seo-settings-button">
                <span className="text-sm font-medium text-gray-700">SEO Settings</span>
                <span className="text-gray-400">›</span>
              </button>

              {/* Tags & Labels */}
              <button className="w-full flex items-center justify-between px-4 py-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors" data-testid="tags-labels-button">
                <span className="text-sm font-medium text-gray-700">Tags & Labels</span>
                <span className="text-gray-400">›</span>
              </button>
            </div>

            {/* Performance Hint */}
            <div className="bg-teal-50 rounded-xl border border-teal-200 p-6">
              <h3 className="text-xs font-semibold text-gray-600 uppercase tracking-wider mb-3">
                POST PERFORMANCE HINT
              </h3>
              <p className="text-sm text-gray-700 mb-3">
                Posts with at least one chart and high-resolution featured images tend to see 40% more engagement in the Elite feed.
              </p>
              <a href="#" className="text-sm text-teal-600 hover:text-teal-700 font-medium">
                View Editorial Guide →
              </a>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};