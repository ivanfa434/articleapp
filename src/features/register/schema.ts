import z from "zod";

export const RegisterSchema = z.object({
  username: z.string().min(1, "Username is required"),
  role: z.enum(["User", "Admin"], {
    message: "Role must be either 'User' or 'Admin'",
  }),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[a-z]/, "Password must contain at least 1 lowercase letter")
    .regex(/[A-Z]/, "Password must contain at least 1 uppercase letter")
    .regex(/[0-9]/, "Password must contain at least 1 number")
    .regex(/[^a-zA-Z0-9]/, "Password must contain at least 1 symbol"),
});
