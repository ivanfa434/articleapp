import { axiosInstance } from "@/lib/axios";
import { Article } from "@/types/article";
import { useQuery } from "@tanstack/react-query";

const useGetArticleBySlug = (slug: string) => {
  return useQuery({
    queryKey: ["article", slug],
    queryFn: async () => {
      const { data } = await axiosInstance.get<Article>(`/articles/${slug}`);
      return data;
    },
    enabled: !!slug,
  });
};

export default useGetArticleBySlug;
