import { useState } from "react";
import {
  Upload,
  FileQuestion,
  CreditCard,
  Home,
  Menu,
  X,
  Settings,
  Power,
} from "lucide-react";
import EditHomepage from "./pages/EditHomepage";
import TransactionPage from "./pages/TransactionPage";
import UploadPDF from "./pages/UploadPDF";
import UploadCBE from "./pages/UploadCBE";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const [activePage, setActivePage] = useState("upload-pdfs");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();

  // Toggle sidebar on mobile
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        className={`${
          sidebarOpen ? "block" : "hidden"
        } md:block bg-gray-900 text-white w-64 flex-shrink-0 transition-all`}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-800">
          <div className="flex items-center space-x-2">
            <Settings className="h-6 w-6" />
            <h1 className="text-xl font-bold">Admin Portal</h1>
          </div>
          <button onClick={toggleSidebar} className="md:hidden">
            <X className="h-6 w-6" />
          </button>
        </div>

        <nav className="p-4">
          <ul className="space-y-2">
            <li>
              <button
                onClick={() => setActivePage("upload-pdfs")}
                className={`w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-800 transition-all ${
                  activePage === "upload-pdfs" ? "bg-gray-800" : ""
                }`}
              >
                <Upload className="h-5 w-5" />
                <span>Upload PDFs</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => setActivePage("upload-cbe")}
                className={`w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-800 transition-all ${
                  activePage === "upload-cbe" ? "bg-gray-800" : ""
                }`}
              >
                <FileQuestion className="h-5 w-5" />
                <span>Upload CBE Questions</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => setActivePage("transactions")}
                className={`w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-800 transition-all ${
                  activePage === "transactions" ? "bg-gray-800" : ""
                }`}
              >
                <CreditCard className="h-5 w-5" />
                <span>Transactions</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => setActivePage("edit-homepage")}
                className={`w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-800 transition-all ${
                  activePage === "edit-homepage" ? "bg-gray-800" : ""
                }`}
              >
                <Home className="h-5 w-5" />
                <span>Edit Homepage</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  navigate("/admin");
                }}
                className={`w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-800 transition-all cursor-pointer`}
              >
                <Power className="h-5 w-5 text-red-400" />
                <span className="text-red-400">Logout</span>
              </button>
            </li>
          </ul>
        </nav>
      </div>

      {/* Main content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Top nav */}
        <header className="bg-white shadow">
          <div className="flex items-center justify-between p-4">
            <button onClick={toggleSidebar} className="md:hidden">
              <Menu className="h-6 w-6" />
            </button>
            <h2 className="text-xl font-bold">
              {activePage === "upload-pdfs" && "Upload PDFs"}
              {activePage === "upload-cbe" && "Upload CBE Questions"}
              {activePage === "transactions" && "View & Manage Transactions"}
              {activePage === "edit-homepage" && "Edit Homepage Content"}
            </h2>
            <div className="bg-gray-200 p-2 rounded-full h-10 w-10 flex items-center justify-center">
              <span className="font-bold text-sm">AD</span>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-6">
          {/* Upload PDFs Page */}
          {activePage === "upload-pdfs" && <UploadPDF />}

          {/* Upload CBE Questions Page */}
          {activePage === "upload-cbe" && <UploadCBE />}

          {/* Transactions Page */}
          {activePage === "transactions" && <TransactionPage />}

          {/* Edit Homepage Content */}
          {activePage === "edit-homepage" && <EditHomepage />}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
