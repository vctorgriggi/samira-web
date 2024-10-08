"use client";

import { useState, useEffect, Fragment } from "react";
import { useRouter } from "next/navigation";

import CircularIndeterminate from "./CircularIndeterminate";
import { validateUserToken } from "@/services/authService";
import { APP_ROUTES } from "@/constants/app-routes";
import { useAuth } from "@/context/AuthContext";

export default function ProtectedRoute({ children }) {
  const { user, setUser } = useAuth();
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await validateUserToken();
        setUser(data);
      } catch (error) {
        console.log("Error fetching user!");
      } finally {
        setLoading(false);
      }
    };

    if (!user) {
      fetchUser();
    } else {
      setLoading(false);
    }
  }, [user]);

  /* redirect to sign-in page if user is not authenticated */
  useEffect(() => {
    if (!loading && !user) {
      router.push(APP_ROUTES.public.inicio);
    }
  }, [loading, user]);

  if (loading) {
    return (
      <CircularIndeterminate
        sx={{
          height: "100vh",
          alignItems: "center",
        }}
      />
    );
  }

  if (!user) {
    return null;
  }

  return children;
}
