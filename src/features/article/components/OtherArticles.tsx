"use client";

import Loading from "@/components/Loading";
import NoDataOtherArticles from "@/components/NodataOtherArticles";
import ArticleCard from "@/features/home/components/ArticlesCard";
import useGetRelatedArticles from "@/hooks/api/article/useGetRelatedArticles";
import { Article } from "@/types/article";
import { FC } from "react";

interface OtherArticlesProps {
  currentArticle: Article;
}

const OtherArticles: FC<OtherArticlesProps> = ({ currentArticle }) => {
  const { data: relatedArticles, isPending } = useGetRelatedArticles({
    categoryId: currentArticle.categoryId,
    currentArticleId: currentArticle.id,
    limit: 3,
  });

  if (isPending) {
    return (
      <div className="py-8">
        <h2 className="text-2xl font-bold mb-6">Other Articles</h2>
        <div className="flex justify-center items-center h-32">
          <Loading />
        </div>
      </div>
    );
  }

  if (!relatedArticles?.data || relatedArticles.data.length === 0) {
    return <NoDataOtherArticles />;
  }

  return (
    <div className="py-8">
      <h2 className="text-2xl font-bold mb-6 text-gray-900">
        Other Articles in "{currentArticle.category.name}"
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {relatedArticles.data.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>
    </div>
  );
};

export default OtherArticles;
