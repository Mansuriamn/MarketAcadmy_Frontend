import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import { Clock } from 'lucide-react';

const categoryColors = {
  teal: 'bg-teal-100 text-teal-700',
  orange: 'bg-orange-100 text-orange-700',
  green: 'bg-green-100 text-green-700',
  blue: 'bg-blue-100 text-blue-700',
  purple: 'bg-purple-100 text-purple-700',
  amber: 'bg-amber-100 text-amber-700',
  navy: 'bg-slate-100 text-slate-700'
};

const getCategoryColor = (color) => {
  return categoryColors[color] || categoryColors.teal;
};

// ✅ reusable truncate function
const truncateText = (text = "", maxLength) => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + "...";
};

const BlogCardComponent = ({ post }) => {

  if (!post) return null;

  const {
    id,
    image,
    title,
    excerpt,
    category,
    categoryColor
  } = post;

  const categoryStyle = getCategoryColor(categoryColor);

  // ✅ controlled truncation
 const shortTitle = title.length > 70 
  ? title.slice(0, 70) + "..." 
  : title;

const shortExcerpt = excerpt && excerpt.length > 100
  ? excerpt.slice(0, 100) + "..."
  : excerpt;

  return (
    <Link to={`/blog/${id}`} className="group" data-testid={`blog-card-${id}`}>
      <div className="bg-white rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 h-full flex flex-col">

        {/* Image */}
        <div className="relative h-48 overflow-hidden">
          <img
            src={image}
            alt={title}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <span className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold ${categoryStyle}`}>
            {category}
          </span>
        </div>

        {/* Content */}
        <div className="p-5 flex-1 flex flex-col">
          <h3 className="text-xl font-bold text-gray-900 mb-3 leading-snug group-hover:text-text-muted transition-colors">
            {shortTitle}   {/* ✅ truncated */}
          </h3>
          <p className="text-gray-600 text-sm mb-4 flex-1 line-clamp-2">
            {shortExcerpt}  {/* ✅ truncated */}
          </p>
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