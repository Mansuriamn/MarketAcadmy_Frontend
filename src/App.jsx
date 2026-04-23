import { Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import ProtectedRoute from "./components/ProtectedRoute";
import { ScrollToTop } from "./components/ScrollToTop";
import useRouteChangeProgress from "./hooks/useRouteChangeProgress";
import OfflineNotice from "./components/OfflineNotice";
import MobileBottomNav from "./components/MobileBottomNav";

// Lazy Load Pages (performance boost 🚀)
const Home = lazy(() => import("./pages/Home"));
const BlogDetail = lazy(() => import("./pages/BlogDetail"));
const Account = lazy(() => import("./pages/Account"));
const About = lazy(() => import("./pages/About"));
const News = lazy(() => import("./pages/News"));
const Learn = lazy(() => import("./pages/Learn"));
const VideoPlay = lazy(() => import("./pages/VideoPlay"));
const StockGuide = lazy(() => import("./pages/StockGuide"));


const MyPosts = lazy(() => import("./pages/admin/MyPosts"));
const CreatePost = lazy(() => import("./pages/admin/CreatePost"));
const AdminSettings = lazy(() => import("./pages/admin/Settings"));
const NewsPost = lazy(() => import("./pages/admin/NewsPost"));
const NewCourse = lazy(() => import("./pages/admin/NewCourse"));

const NotFound = lazy(() => import("./pages/NotFound"));

function App() {
  useRouteChangeProgress(); // 🚀 Global UX feedback

  return (
    <>
      <OfflineNotice />
      <ScrollToTop />

      <Suspense fallback={<div className="text-center p-10 font-medium text-gray-500 animate-pulse">Loading experience...</div>}>
        <main className="pb-24 md:pb-0">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/account" element={<Account />} />
            <Route path="/about" element={<About />} />
            <Route path="/news" element={<News />} />
            <Route path="/learn" element={<Learn />} />
            <Route path="/stock-guide" element={<StockGuide />} />


            {/* Safer dynamic routes */}
            <Route path="/:page/:id" element={<BlogDetail />} />
            <Route path="/video/:id" element={<VideoPlay />} />

            {/* Protected Admin Routes */}
            <Route element={<ProtectedRoute />}>
              <Route path="/admin/posts" element={<MyPosts />} />
              <Route path="/admin/blog-post" element={<CreatePost />} />
              <Route path="/admin/settings" element={<AdminSettings />} />
              <Route path="/admin/news-post" element={<NewsPost />} />
              <Route path="/admin/course-post" element={<NewCourse />} />
            </Route>

            {/* 404 Page */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </Suspense>
      <MobileBottomNav />
    </>
  );
}

export default App;