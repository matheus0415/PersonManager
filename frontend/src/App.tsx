import ManageHome from "./pages/manage-home";
import Toaster from "@/components/ui/toaster";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ManageHome />} />
      </Routes>
      <Toaster />
    </Router>
  );
}

export default App;
