import { axiosInstance } from "@/lib/axios";
import { Article } from "@/types/article";
import { PageableResponse } from "@/types/pagination";
import { useQuery } from "@tanstack/react-query";

interface GetRelatedArticlesParams {
  categoryId: string;
  currentArticleId: string;
  limit?: number;
}

const useGetRelatedArticles = ({
  categoryId,
  currentArticleId,
  limit = 3,
}: GetRelatedArticlesParams) => {
  return useQuery({
    queryKey: ["related-articles", categoryId, currentArticleId, limit],
    queryFn: async () => {
      const { data } = await axiosInstance.get<PageableResponse<Article>>(
        "/articles",
        {
          params: {
            category: categoryId,
            limit: limit + 1,
          },
        }
      );

      const filteredArticles =
        data.data
          ?.filter((article) => article.id !== currentArticleId)
          .slice(0, limit) || [];

      return {
        ...data,
        data: filteredArticles,
      };
    },
    enabled: !!categoryId && !!currentArticleId,
  });
};

export default useGetRelatedArticles;
