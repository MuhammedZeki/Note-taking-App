import { Navigate } from "react-router-dom";
import { useAuthListener } from "../hooks/useAuthListener";

export default function PublicRoute({ children }) {
  const { user, isLoading } = useAuthListener();

  if (isLoading) return <div>Yükleniyor...</div>;

  // Kullanıcı giriş yaptıysa artık login/register diğer safyalar girmesin
  if (user) {
    return <Navigate to="/" replace />;
  }

  return children;
}
