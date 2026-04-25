import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CreateShop from "./pages/CreateShop";
import Profile from "./pages/Profile"; // Import your new page

function App() {
  return (
    <Router>
      <div>
        {/* This area stays the same on every page (like a Navbar) */}
        <Routes>
          {/* Default page (Home) can be your Profile */}
          <Route path="/" element={<Profile />} />
          
          {/* Profile Page route */}
          <Route path="/profile" element={<Profile />} />

          {/* Create Shop route */}
          <Route path="/create-shop" element={<CreateShop />} />
          
          {/* You can add Create Request here later when it's ready */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
