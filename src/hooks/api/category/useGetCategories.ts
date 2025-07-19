import { axiosInstance } from "@/lib/axios";
import { Category } from "@/types/category";
import { CategoryPageableResponse } from "@/types/pagination";
import { useQuery } from "@tanstack/react-query";

interface GetCategoriesQuery {
  page?: number;
  limit?: number;
  search?: string;
}

const useGetCategories = (queries?: GetCategoriesQuery) => {
  return useQuery({
    queryKey: ["categories", queries],
    queryFn: async () => {
      const { data } = await axiosInstance.get<
        CategoryPageableResponse<Category>
      >("/categories", {
        params: queries,
      });
      return data;
    },
  });
};

export default useGetCategories;
