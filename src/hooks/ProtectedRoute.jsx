import { Navigate } from "react-router-dom";
import { useAuthListener } from "../hooks/useAuthListener";

export default function ProtectedRoute({ children }) {
  const { user, isLoading } = useAuthListener();

  if (isLoading) return <div>Yükleniyor...</div>;

  // Kullanıcı yoksa login sayfasına yönlendirrir
  if (!user) {
    return <Navigate to="/sign-in" replace />;
  }

  // Varsa erişime izin ver
  return children;
}
