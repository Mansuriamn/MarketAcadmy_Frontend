import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AdminLayout } from '../../components/AdminLayout';
import { Calendar } from 'lucide-react';
import Editor from '../../components/Editor';
import ImageUploader from '../../components/ImageUploader';
import{PageTabs} from '../../data/PageTabs';


 const CreatePost = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    content: '',
    featuredImage: null,
    visibility: 'public',

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

      // STEP 1: Upload Image to get the Cloudinary URL
      const imageFormData = new FormData();
      imageFormData.append("image", formData.featuredImageFile);

      const uploadRes = await fetch(`/server/upload?page=blogs`, {
        method: "POST",
        credentials: "include",
        body: imageFormData
      });

      const uploadData = await uploadRes.json();

      if (!uploadRes.ok) throw new Error(uploadData.error || "Image upload failed");
      const postRes = await fetch(`/server/api/blogs/create`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: formData.title,
          description: formData.content,
          image: uploadData.url, // Use the secure URL from Cloudinary
          category: formData.category

        }),
      });

      if (!postRes.ok) {
        const errData = await postRes.json();
        throw new Error(errData.message || "Failed to publish post");
      }

      alert("Blog published successfully!");
      window.location.reload();

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



            </div>
            <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition duration-200">

              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-widest mb-2">
                Post Category
              </label>

              <div className="relative">
                <select
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                  className="w-full appearance-none bg-gray-50 border border-gray-200 text-gray-700 text-sm rounded-lg px-4 py-3 pr-10 
      focus:outline-none focus:ring-1 focus:ring-teal-500 focus:border-teal-500 
      hover:border-teal-500 transition duration-150 cursor-pointer"
                  data-testid="post-category-input"
                >
                  {PageTabs.blog.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>

                {/* Custom Dropdown Icon */}
                <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-400">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>

            </div>

            {/* Editor */}
            <Editor
              content={formData.content}
              setContent={(content) => setFormData({ ...formData, content })}
              data-testid="editor"
            />

            {/* Action Buttons */}

          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Featured Image */}
            <ImageUploader
              onImageSelect={(file) => setFormData({ ...formData, featuredImageFile: file })}
              onImageRemove={() => setFormData({ ...formData, featuredImageFile: null })}
            />

            {/* Publishing Settings */}


            {/* ACTION BOX */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">

              <h3 className="text-xs font-semibold text-gray-600 uppercase tracking-wider mb-4">
                PUBLISH
              </h3>

              <button
                onClick={handlePublish}
                disabled={publishing}
                className="w-full px-4 py-3 bg-gray-900 hover:bg-gray-800 text-white rounded-lg text-sm font-medium transition-colors disabled:opacity-50"
              >
                {publishing ? "Publishing..." : "Publish Course"}
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


export default CreatePost;