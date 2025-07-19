"use client";

import { FileQuestion, Home } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

interface NotFoundProps {
  userRole?: string;
}

export default function NotFound({ userRole }: NotFoundProps = {}) {
  const [homeUrl, setHomeUrl] = useState("/");

  useEffect(() => {
    let role = userRole;
    if (!role && typeof window !== "undefined") {
      role = localStorage.getItem("userRole") || "";
    }

    if (role === "Admin") {
      setHomeUrl("/admin");
    } else {
      setHomeUrl("/");
    }
  }, [userRole]);

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gray-50">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <h1 className="text-8xl font-bold text-gray-300 mb-4">404</h1>
          <FileQuestion className="h-12 w-12 text-gray-400 mx-auto" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Page Not Found
        </h2>
        <p className="text-gray-600 mb-8">
          The page you're looking for doesn't exist.
        </p>
        <Link
          href={homeUrl}
          className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
        >
          <Home className="h-4 w-4" />
          Go Home
        </Link>
      </div>
    </div>
  );
}
