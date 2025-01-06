
import Navbar from "./components/Navbar";
import Card from "./components/Card";
import Details from "./components/Details";
import Signup from "./components/signup";
import Login from "./components/login";
import TemplateSelection from "./components/TemplateSelection";
import DisplayImage from "./components/DisplayImage";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navbar />}> {/* Navbar as the parent route */}
          <Route index element={<Card />} /> {/* Card as the index route */}
          <Route path="Details" element={<Details />} /> {/* Details route */}
          <Route path="Login" element={<Login />} /> {/* Login route */}
          <Route path="Signup" element={<Signup />} /> {/* Signup route */}
          <Route path="TemplateSelection" element={<TemplateSelection />} />
          <Route path="/display" element={<DisplayImage />} />
          
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;