"use client";

import { axiosInstance } from "@/lib/axios";
import type { User } from "@/types/user";
import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export interface RegisterPayload {
  username: string;
  role: "User" | "Admin";
  password: string;
}
const useRegister = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: async (payload: RegisterPayload) => {
      const { data } = await axiosInstance.post("/auth/register", payload);
      return data;
    },
    onSuccess: async (data) => {
      await signIn("credentials", { ...data, redirect: false });
      toast.success("Register success");
      router.push("/");
    },
    onError: (error: AxiosError<any>) => {
      toast.error(error.response?.data.message || "Registration failed");
    },
  });
};

export default useRegister;
