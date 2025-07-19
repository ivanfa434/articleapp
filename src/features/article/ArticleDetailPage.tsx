"use client";

import Loading from "@/components/Loading";
import NoData from "@/components/Nodata";
import { Button } from "@/components/ui/button";
import useGetArticleBySlug from "@/hooks/api/article/useGetArticleBySlug";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { FC } from "react";
import ArticleDetailBody from "./components/ArticleDetailBody";
import ArticleDetailHeader from "./components/ArticleDetailHeader";

interface ArticleDetailPageProps {
  slug: string;
}

const ArticleDetailPage: FC<ArticleDetailPageProps> = ({ slug }) => {
  const router = useRouter();
  const { data: article, isPending } = useGetArticleBySlug(slug);

  if (isPending) {
    return <Loading />;
  }

  if (!article) {
    return <NoData />; 
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Button variant="ghost" onClick={() => router.back()} className="mb-6">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back
      </Button>

      <article className="max-w-4xl mx-auto">
        <ArticleDetailHeader article={article} />
        <ArticleDetailBody article={article} />
      </article>
    </div>
  );
};

export default ArticleDetailPage;
