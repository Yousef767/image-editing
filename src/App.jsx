import { BrowserRouter, Route, Routes } from "react-router-dom";
// import "./scss/style.css";
import Home from "./components/pages/Home";
import Navbar from "./components/layout/Navbar";
import NotFoundPage from "./components/pages/NotFoundPage";
import Footer from "./components/layout/Footer";
import { Toaster } from "react-hot-toast";
import Dashboard from "./components/pages/Dashboard";
import ProtectedRoute from "./components/fragments/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Toaster position="bottom-center" />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} /> */}
        <Route
          path="/dashboard"
          element={<ProtectedRoute component={Dashboard} />}
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
