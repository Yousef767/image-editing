import { BrowserRouter, Route, Routes } from "react-router-dom";
// import "./scss/style.css";
import Home from "./components/pages/Home";
import Navbar from "./components/layout/Navbar";
import NotFoundPage from "./components/pages/NotFoundPage";
import ImageEditor from "./components/pages/Image";

function App() {
  return (
    <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route
          path="/"
          element={
            <Home/>
          }
        />
        <Route
          path="*"
          element={
            <NotFoundPage/>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
