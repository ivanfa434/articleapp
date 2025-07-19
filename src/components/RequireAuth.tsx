"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { toast } from "sonner";

interface RequireAuthProps {
  isAuthenticated: boolean;
  role?: string;
  allowedRoles: string[];
  warningMessage?: string;
  deniedMessage?: string;
  children: React.ReactNode;
}

export default function RequireAuth({
  isAuthenticated,
  role,
  allowedRoles,
  warningMessage = "Silakan login terlebih dahulu untuk mengakses halaman ini.",
  deniedMessage = "Anda tidak memiliki izin untuk mengakses halaman ini.",
  children,
}: RequireAuthProps) {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!isAuthenticated) {
      toast.warning(warningMessage);
      router.replace("/login");
      return;
    }

    if (role && !allowedRoles.includes(role)) {
      toast.error(deniedMessage);

      let redirectPath = "/";

      if (role === "Admin") {
        redirectPath = "/admin";
      } else if (role === "User") {
        redirectPath = "/";
      }

      if (pathname !== redirectPath) {
        router.replace(redirectPath);
      }
    }
  }, [
    isAuthenticated,
    role,
    allowedRoles,
    warningMessage,
    deniedMessage,
    router,
    pathname,
  ]);

  if (!isAuthenticated || (role && !allowedRoles.includes(role))) {
    return null;
  }

  return <>{children}</>;
}
