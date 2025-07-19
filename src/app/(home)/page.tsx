import HomePage from "@/features/home";
import { auth } from "@/lib/auth";
import RequireAuth from "@/components/RequireAuth";

export default async function Home() {
  const session = await auth();

  return (
    <RequireAuth
      isAuthenticated={!!session}
      role={session?.user.role}
      allowedRoles={["User"]}
    >
      <HomePage />
    </RequireAuth>
  );
}
