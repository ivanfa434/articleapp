"use client";

import { axiosInstance } from "@/lib/axios";
import type { User } from "@/types/user";
import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { signIn } from "next-auth/react";

interface UserQuery extends User {
  password: string;
}

const useLogin = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: async (payload: Pick<UserQuery, "username" | "password">) => {
      const { data } = await axiosInstance.post("/auth/login", payload);
      return data;
    },
    onSuccess: async (data) => {
      const profileResponse = await axiosInstance.get("/auth/profile", {
        headers: { Authorization: `Bearer ${data.token}` },
      });

      const userData = {
        ...profileResponse.data,
        token: data.token,
      };

      await signIn("credentials", { ...userData, redirect: false });
      toast.success("Login success");
      
      if (userData.role === "Admin") {
        router.push("/admin");
      } else {
        router.push("/");
      }
    },
    onError: (error: AxiosError<any>) => {
      toast.error(error.response?.data.message || "Login failed");
    },
  });
};

export default useLogin;
