import { Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import "./App.css";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";
import Home from "./pages/home/Home";
import ArchivedNotes from "./pages/home/ArchivedNotes";
import SelectedTag from "./pages/home/SelectedTag";
import Settings from "./pages/home/Settings";
import ProtectedRoute from "./hooks/ProtectedRoute";
import PublicRoute from "./hooks/PublicRoute";

function App() {
  useEffect(() => {
    // Uygulama başlangıcında theme'i yükle
    const savedTheme = localStorage.getItem("theme") || "system";
    const body = document.body;
    const html = document.documentElement;

    body.classList.remove("dark", "light");
    html.classList.remove("dark", "light");

    if (savedTheme === "light") {
      body.classList.add("light");
      html.classList.add("light");
    } else if (savedTheme === "dark") {
      body.classList.add("dark");
      html.classList.add("dark");
    } else {
      // System mode
      const systemDark = window.matchMedia("(prefers-color-scheme: dark)");
      const isDark = systemDark.matches;
      if (isDark) {
        body.classList.add("dark");
        html.classList.add("dark");
      } else {
        body.classList.add("light");
        html.classList.add("light");
      }
    }
  }, []);

  return (
    <div>
      <Routes>
        <Route
          exact
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/archived-notes"
          element={
            <ProtectedRoute>
              <ArchivedNotes />
            </ProtectedRoute>
          }
        />
        <Route
          path="/selected-tag/:name"
          element={
            <ProtectedRoute>
              <SelectedTag />
            </ProtectedRoute>
          }
        />
        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <Settings />
            </ProtectedRoute>
          }
        />
        <Route
          path="/sign-in"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/sign-up"
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
        />
        <Route
          path="/forgot-password"
          element={
            <PublicRoute>
              <ForgotPassword />
            </PublicRoute>
          }
        />
        <Route
          path="/reset-password"
          element={
            <PublicRoute>
              <ResetPassword />
            </PublicRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
