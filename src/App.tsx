import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Admin from "./pages/admin/index";
import Dashboard from "./pages/admin/dashboard/index";
import CBE from "./pages/cbe/index";
import CBEExamination from "./pages/cbe/examination/index";
import Library from "./pages/library/index";

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/cbe" element={<CBE />} />
        <Route path="/cbe/examination" element={<CBEExamination />} />
        <Route path="/library" element={<Library />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
