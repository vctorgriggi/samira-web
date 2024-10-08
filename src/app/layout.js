import "./globals.css";

import { AuthProvider } from "@/context/AuthContext";

export const metadata = {
  title: "Samira - Autenticação",
  description: "", // TODO: add a description
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
