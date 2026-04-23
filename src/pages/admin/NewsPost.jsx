import React, { useState } from 'react';
import { apiCall } from '../../api/config';
import { AdminLayout } from '../../components/AdminLayout';
import { useNavigate } from 'react-router-dom';
import Editor from '../../components/Editor';
import ImageUploader from '../../components/ImageUploader';
import { PageTabs } from '../../data/PageTabs';

const NewsPost = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    content: '',
    featuredImageFile: null,
  });

  const [publishing, setPublishing] = useState(false);

  const handlePublish = async (e) => {
    e.preventDefault();

    // Validations
    if (!formData.title.trim()) return alert("Title is required");
    if (!formData.content.trim()) return alert("Content is required");
    if (!formData.featuredImageFile) return alert("Please select a featured image.");

    try {
      setPublishing(true);

      // STEP 1: Upload Image to Cloudinary via backend proxy
      const imageFormData = new FormData();
      imageFormData.append("image", formData.featuredImageFile);

      const uploadData = await apiCall("/upload?page=news", {
        method: "POST",
        body: imageFormData
      });

      // STEP 2: Create the news post
      await apiCall("/api/news/create", {
        method: "POST",
        body: JSON.stringify({
          title: formData.title,
          description: formData.content,
          image: uploadData.url,
          category: formData.category,
        }),
      });

      alert("News published successfully! 🎉");
      navigate("/admin/my-posts"); // Redirect to dashboard/list

    } catch (err) {
      alert(err.message);
    } finally {
      setPublishing(false);
    }
  };

  return (
    <AdminLayout>
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="mb-4">
                <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2">
                  NEWS TITLE
                </label>
                <input
                  type="text"
                  placeholder="Enter news title..."
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full text-2xl font-bold text-gray-900 placeholder-gray-300 focus:outline-none"
                />
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-widest mb-2">
                Post Category
              </label>

              <div className="relative">
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full appearance-none bg-gray-50 border border-gray-200 text-gray-700 text-sm rounded-lg px-4 py-3 pr-10 focus:outline-none focus:ring-1 focus:ring-teal-500"
                >
                  {PageTabs.news.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-400">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>

            <Editor
              content={formData.content}
              setContent={(content) => setFormData({ ...formData, content })}
            />
          </div>

          <div className="space-y-6">
            <ImageUploader
              onImageSelect={(file) => setFormData({ ...formData, featuredImageFile: file })}
              onImageRemove={() => setFormData({ ...formData, featuredImageFile: null })}
            />

            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-xs font-semibold text-gray-600 uppercase tracking-wider mb-4">
                PUBLISH
              </h3>
              <button
                onClick={handlePublish}
                disabled={publishing}
                className="w-full px-4 py-3 bg-gray-900 hover:bg-gray-800 text-white rounded-lg text-sm font-medium transition-colors disabled:opacity-50"
              >
                {publishing ? "Publishing..." : "Publish News"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

export default NewsPost;