import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/home'

// Keyinchalik shu yerga qo'shib borasiz:
// import About from './pages/About'
// import Courses from './pages/Courses'
// import CourseDetail from './pages/CourseDetail'
// import Videos from './pages/Videos'
// import Contact from './pages/Contact'

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Bosh sahifa */}
        <Route path="/" element={<Home />} />

        {/* Keyinchalik shu yerga qo'shib borasiz: */}
        {/* <Route path="/about"          element={<About />} /> */}
        {/* <Route path="/courses"        element={<Courses />} /> */}
        {/* <Route path="/courses/:id"    element={<CourseDetail />} /> */}
        {/* <Route path="/videos"         element={<Videos />} /> */}
        {/* <Route path="/contact"        element={<Contact />} /> */}

        {/* Noto'g'ri URL → Bosh sahifaga yo'naltiradi */}
        <Route path="*" element={<Navigate to="/" replace />} />

      </Routes>
    </BrowserRouter>
  )
}

export default App