import { axiosInstance } from "@/lib/axios";
import { Article } from "@/types/article";
import { PageableResponse, PaginationQueries } from "@/types/pagination";
import { useQuery } from "@tanstack/react-query";

const useGetArticles = (queries?: PaginationQueries) => {
  return useQuery({
    queryKey: ["articles", queries],
    queryFn: async () => {
      const { data } = await axiosInstance.get<PageableResponse<Article>>(
        "/articles",
        {
          params: queries,
        }
      );
      return data;
    },
  });
};

export default useGetArticles;
