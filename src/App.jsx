import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./scss/style.scss";
import Home from "./components/pages/Home";
import Navbar from "./components/layout/Navbar";
import NotFoundPage from "./components/pages/NotFoundPage";
import Footer from "./components/layout/Footer";
import { Toaster } from "react-hot-toast";
import Dashboard from "./components/pages/Dashboard";
import ProtectedRoute from "./components/fragments/ProtectedRoute";
import { ShowOptionProvider } from "./hooks/ShowOptionProvider";
import GenerateImages from "./components/pages/GenerateImages";
import Editor from "./components/pages/Editor";
import AITools from "./components/pages/AITools";
import Backgrounds from "./components/pages/Backgrounds";

function App() {
  return (
    <ShowOptionProvider>
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
          <Route
            path="/generate"
            element={<ProtectedRoute component={GenerateImages} />}
          />
          <Route
            path="/editor"
            element={<ProtectedRoute component={Editor} />}
          />
          <Route
            path="/ai-tools"
            element={<ProtectedRoute component={AITools} />}
          />
          <Route
            path="/backgrounds"
            element={<ProtectedRoute component={Backgrounds} />}
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </ShowOptionProvider>
  );
}

export default App;
