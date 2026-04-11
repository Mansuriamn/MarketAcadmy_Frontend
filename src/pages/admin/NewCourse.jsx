import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AdminLayout } from "../../components/AdminLayout";
import { Video, Clock, Link as LinkIcon } from "lucide-react";
import ImageUploader from "../../components/ImageUploader";
import{PageTabs} from '../../data/PageTabs';
import Editor from '../../components/Editor';


const NewCourse =()=> {

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    videoUrl: "",
    thumbnail: null,
    duration: "",
    category: "",
  });

const [publishing, setPublishing] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handlePublish = async (e) => {
    e.preventDefault();

    // Validations
    if (!formData.title.trim()) return alert("Title is required");
    if (!formData.description.trim()) return alert("Description is required");
    if (!formData.videoUrl.trim()) return alert("Video URL is required");
    if (!formData.thumbnail) return alert("Thumbnail is required");
    if (!formData.duration.trim()) return alert("Duration is required");
    if (!formData.category.trim()) return alert("Category is required");

    try {
      setPublishing(true);

      // STEP 1: Upload Image to get the Cloudinary URL
      const imageFormData = new FormData();
      imageFormData.append("image", formData.thumbnail);

      const uploadRes = await fetch(`/server/upload?page=courses`, { 
        method: "POST", 
        credentials: "include",
        body: imageFormData 
      });
      
      const uploadData = await uploadRes.json();
      
      if (!uploadRes.ok) throw new Error(uploadData.error || "Image upload failed");
      const postRes = await fetch(`/server/api/courses`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: formData.title,
          description: formData.description,
          image: uploadData.url, // Use the secure URL from Cloudinary
          url: formData.videoUrl,
          category: formData.category,
          duration: formData.duration,
          
        }),
      });

      if (!postRes.ok) {
        const errData = await postRes.json();
        throw new Error(errData.message || "Failed to publish post");
      }

      alert("Course published successfully!");
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

          {/* MAIN CONTENT */}
          <div className="lg:col-span-2 space-y-6">

            {/* TITLE + META */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              
              {/* Title */}
              <div className="mb-5">
                <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2">
                  COURSE TITLE
                </label>
                <input
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Enter course title..."
                  className="w-full text-2xl font-bold text-gray-900 placeholder-gray-300 focus:outline-none"
                />
              </div>

              {/* Category + Duration */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                <div>
                  <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2">
                    CATEGORY
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                  >
                    {PageTabs.course.map((cat, i) => (
                      <option key={i}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2">
                    DURATION
                  </label>
                  <div className="flex items-center gap-2 px-3 py-2 border border-gray-200 rounded-lg">
                    <Clock className="w-4 h-4 text-gray-400" />
                    <input
                      name="duration"
                      value={formData.duration}
                      onChange={handleChange}
                      placeholder="e.g. 12:30"
                      className="flex-1 text-sm focus:outline-none"
                    />
                  </div>
                </div>

              </div>
            </div>

            {/* DESCRIPTION */}
           <Editor
                         content={formData.description}
                         setContent={(description) => setFormData({ ...formData, description })}
                       />

            {/* VIDEO URL */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2">
                VIDEO SOURCE
              </label>

              <div className="flex items-center gap-2 px-3 py-2 border border-gray-200 rounded-lg">
                <LinkIcon className="w-4 h-4 text-gray-400" />
                <input
                  name="videoUrl"
                  value={formData.videoUrl}
                  onChange={handleChange}
                  placeholder="Paste YouTube / Vimeo URL..."
                  className="flex-1 text-sm focus:outline-none"
                />
              </div>

              <p className="text-xs text-gray-500 mt-2">
                Supports YouTube, Vimeo, or direct video links.
              </p>
            </div>

          </div>

          {/* SIDEBAR */}
          <div className="space-y-6">

            {/* THUMBNAIL */}
           <ImageUploader
                         onImageSelect={(file) => setFormData({ ...formData, thumbnail: file })}
                         onImageRemove={() => setFormData({ ...formData, thumbnail: null })}
             />

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

            {/* PERFORMANCE TIP */}
            <div className="bg-teal-50 rounded-xl border border-teal-200 p-6">
              <h3 className="text-xs font-semibold text-gray-600 uppercase tracking-wider mb-3">
                PERFORMANCE TIP
              </h3>
              <p className="text-sm text-gray-700">
                Courses with engaging thumbnails and shorter durations tend to get higher completion rates.
              </p>
            </div>

          </div>

        </div>
      </div>
    </AdminLayout>
  );
};

export default NewCourse;