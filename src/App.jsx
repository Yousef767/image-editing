import { BrowserRouter, Route, Routes } from "react-router-dom";
// import "./scss/style.css";
import Home from "./components/pages/Home";
import Navbar from "./components/layout/Navbar";
import NotFoundPage from "./components/pages/NotFoundPage";
import Footer from "./components/layout/Footer";
import Login from "./components/pages/Login";
import { Toaster } from "react-hot-toast";
import Signup from "./components/pages/Signup";

function App() {
  return (
    <BrowserRouter>
      <Toaster position="bottom-center" />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
