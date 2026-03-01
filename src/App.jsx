import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout   from './ui/Layout';
import Home     from './pages/Home';
import Services from './pages/Services';
import Pricing  from './pages/Pricing';
import About    from './pages/About';
import Contact  from './pages/Contact';
import FAQ      from './pages/FAQ';
import Blog     from './pages/Blog';
import BlogPost from './pages/BlogPost';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index             element={<Home />}     />
          <Route path="usluge"     element={<Services />} />
          <Route path="cjenik"     element={<Pricing />}  />
          <Route path="o-nama"     element={<About />}    />
          <Route path="kontakt"    element={<Contact />}  />
          <Route path="faq"        element={<FAQ />}      />
          <Route path="blog"       element={<Blog />}     />
          <Route path="blog/:slug" element={<BlogPost />} />
          <Route path="*"          element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
