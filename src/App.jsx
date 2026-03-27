import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import { BlogList } from './pages/BlogList';
import { BlogDetail } from './pages/BlogDetail';
import Account from './pages/Account';
import { MyPosts } from './pages/admin/MyPosts';
import { CreatePost } from './pages/admin/CreatePost';
import { AdminSettings } from './pages/admin/Settings';
import {About}  from './pages/About';
import News  from './pages/News';
import Learn from './pages/Learn';
import VideoPlay from './pages/VideoPlay';
function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-bg-base">
       
        <main className="flex-1 w-full">
          <Routes>
            <Route path="/" element={ <Home />} />
             <Route path="/blog/:id" element={<BlogDetail />} />
            <Route path="/account" element={<Account />} />
            <Route path="/about" element={<About />} />
            <Route path="/news" element={<News />} />
            <Route path="/learn" element={<Learn />} />
            <Route path='/video' element={<VideoPlay/>}/>

              {/* <Route path="/admin" element={<AdminDashboard />} /> */}
          <Route path="/admin/posts" element={<MyPosts />} />
          <Route path="/admin/create" element={<CreatePost />} />
          <Route path="/admin/settings" element={<AdminSettings />} />
          </Routes>
        </main>  
      </div>
    </Router>
   
  );
}

export default App;