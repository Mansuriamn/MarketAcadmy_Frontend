import React, { memo } from "react";
import { Link } from "react-router-dom";
import { Clock, Eye } from "lucide-react";

// 🧠 reusable truncate
const truncateText = (text = "", maxLength) =>
  text.length <= maxLength
    ? text
    : text.slice(0, maxLength).trim() + "...";

// 🕒 format date
const formatDate = (date) => {
  if (!date) return "";
  return new Date(date).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

import { stripHtml } from "../../utils/stripHtml";

const BlogCardComponent = ({ post, page }) => {
  if (!post) return null;

  const {
    _id,
    title,
    category,
    description,
    image,
    // categoryColor,
    publishedAt,
    // views,
  } = post;

  const imageUrl =
    image ||
    "https://images.unsplash.com/photo-1611974717482-98287e074b35?auto=format&fit=crop&q=80&w=800";

  // const categoryStyle = getCategoryColor(categoryColor);

  const shortTitle = truncateText(title, 65);
  const shortExcerpt = truncateText(stripHtml(description), 110);

  return (
    <Link
      to={`/${page}/${_id}`}
      className="group block"
      data-testid={`blog-card-${_id}`}
    >
      <div className="bg-white rounded-2xl overflow-hidden border border-slate-200 hover:shadow-xl transition-all duration-300 h-full flex flex-col">

        {/* 📸 Image */}
        <div className="relative h-52 overflow-hidden">
          <img
            src={imageUrl}
            loading="lazy"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "https://images.unsplash.com/photo-1611974717482-98287e074b35?auto=format&fit=crop&q=80&w=800";
            }}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />

          {/* subtle overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />

          {/* category badge */}
          <span
            className="bg-teal-500 backdrop-blur-md px-4 py-1.5 text-[10px] rounded-full text-white font-bold uppercase tracking-widest shadow-lg"
          >
            {category}
          </span>
        </div>

        {/* 📝 Content */}
        <div className="p-5 flex flex-col flex-1">
          <h3 className="text-[17px] font-semibold text-slate-900 leading-snug mb-2 group-hover:text-slate-400 transition">
            {shortTitle}
          </h3>

          <p className="text-sm text-slate-500 leading-relaxed flex-1 line-clamp-3">
            {shortExcerpt}
          </p>
        </div>

        {/* 📊 Footer */}
        <div className="px-5 pb-5 flex items-center justify-between text-xs text-slate-400">

          {/* date */}
          <div className="flex items-center gap-1.5">
            <Clock className="w-4 h-4" />
            <span>{formatDate(publishedAt)}</span>
          </div>

          {/* views */}
          {/* <div className="flex items-center gap-1.5">
            <Eye className="w-4 h-4" />
            <span>{views || 0} views</span>
          </div> */}

        </div>
      </div>
    </Link>
  );
};

export const BlogCard = memo(BlogCardComponent);
// ✅ memo optimization




//  if (featured) {
//     return (
//       <Link to={`/blog/${id}`} className="group" data-testid="featured-blog-card">
//         <div className="relative h-[400px] md:h-[500px] rounded-2xl overflow-hidden">

//           {/* Image */}
//           <div className="absolute inset-0">
//             <img
//               src={image}
//               alt={title}
//               loading="lazy"   // ✅ performance boost
//               className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
//             />
//             <div className="absolute inset-0 bg-gradient-to-t from-slate-900/95 via-slate-900/60 to-transparent" />
//           </div>

//           {/* Content */}
//           <div className="relative h-full flex flex-col justify-end p-6 md:p-10">
//             <span className={`inline-block self-start px-3 py-1 rounded-full text-xs font-semibold mb-4 ${categoryStyle}`}>
//               {category}
//             </span>

//             <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight group-hover:text-teal-400 transition-colors">
//               {title}
//             </h2>

//             <p className="text-gray-200 text-base md:text-lg mb-6 max-w-3xl">
//               {excerpt}
//             </p>

//             <div className="flex items-center space-x-4">
//               <img
//                 src={avatar}
//                 alt={name}
//                 loading="lazy"
//                 className="w-12 h-12 rounded-full border-2 border-white/20"
//               />
//               <div>
//                 <p className="text-white font-semibold">{name}</p>
//                 <p className="text-gray-300 text-sm">
//                   {authorTitle} {post.readTime && `• ${post.readTime}`}
//                 </p>
//               </div>
//             </div>
//           </div>

//         </div>
//       </Link>
//     );
//   }