import AdministrativePanel from "@/layouts/AdministrativePanel";
import { AuthProvider } from "@/context/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";

export const metadata = {
  title: "Samira - Painel Administrativo",
  description: "", // TODO: add a description
};

export default function RootLayout({ children }) {
  return (
    <main className="font-poppins section--no-padding">
      <AuthProvider>
        <ProtectedRoute>
          <AdministrativePanel>{children}</AdministrativePanel>
        </ProtectedRoute>
      </AuthProvider>
    </main>
  );
}
