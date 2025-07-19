import ArticleDetailPage from "@/features/article/ArticleDetailPage";
import { auth } from "@/lib/auth";
import RequireAuth from "@/components/RequireAuth";

export default async function ArticleDetail({
  params,
}: {
  params: { slug: string };
}) {
  const session = await auth();
  const slug = params.slug;

  return (
    <RequireAuth
      isAuthenticated={!!session}
      role={session?.user.role}
      allowedRoles={["User"]}
    >
      <ArticleDetailPage slug={slug} />
    </RequireAuth>
  );
}
