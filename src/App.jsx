import { Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";
import Home from "./pages/home/Home";
import ArchivedNotes from "./pages/home/ArchivedNotes";
import SelectedTag from "./pages/home/SelectedTag";
import Settings from "./pages/home/Settings";

function App() {
  return (
    <div>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/archived-notes" element={<ArchivedNotes />} />
        <Route path="/selected-tag/:name" element={<SelectedTag />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/sign-in" element={<Login />} />
        <Route path="/sign-up" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
      </Routes>
    </div>
  );
}

export default App;
