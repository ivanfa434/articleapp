"use client";

import Loading from "@/components/Loading";
import NoData from "@/components/Nodata";
import PaginationSection from "@/components/PaginationSection";
import useGetArticles from "@/hooks/api/article/useGetArticles";
import ArticleCard from "./ArticlesCard";

interface ArticleListProps {
  page: number;
  debouncedSearchQuery: string;
  selectedCategoryId: string;
  selectedCategoryName: string;
  onPageChange: (newPage: number) => void;
  articlesPerPage: number;
}

const ArticleList: React.FC<ArticleListProps> = ({
  page,
  debouncedSearchQuery,
  selectedCategoryId,
  selectedCategoryName,
  onPageChange,
  articlesPerPage,
}) => {
  const {
    data: articlesData,
    isPending: isLoadingArticles,
    error: articlesError,
  } = useGetArticles({
    title: debouncedSearchQuery,
    category: selectedCategoryId || undefined,
    page,
    limit: articlesPerPage,
  });

  const totalArticles = articlesData?.total || 0;
  const articlesCount = articlesData?.data?.length || 0;
  const totalPages = Math.ceil(totalArticles / articlesPerPage);

  return (
    <>
      {isLoadingArticles ? (
        <div className="flex h-[30vh] items-center justify-center">
          <Loading />
        </div>
      ) : articlesError ? (
        <div className="flex h-[30vh] items-center justify-center">
          <div className="text-red-500 text-center">
            <p>Error loading articles:</p>
            <p className="text-sm">{articlesError.message}</p>
          </div>
        </div>
      ) : articlesCount === 0 ? (
        <div className="flex h-[30vh] items-center justify-center">
          <NoData />
        </div>
      ) : (
        <div className="space-y-8 mt-8">
          <div className="flex justify-between items-center mb-6 px-4 sm:px-0">
            <p className="text-gray-600">
              Showing : {articlesCount} of {totalArticles} articles
              {debouncedSearchQuery && (
                <span>
                  {" "}
                  for "
                  <span className="font-medium">{debouncedSearchQuery}</span>"
                </span>
              )}
              {selectedCategoryName && (
                <span>
                  {" "}
                  in "
                  <span className="font-medium">{selectedCategoryName}</span>"
                </span>
              )}
            </p>
          </div>

          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
            {articlesData?.data?.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </section>

          <PaginationSection
            page={articlesData.page}
            limit={articlesData.limit}
            total={articlesData.total}
            onChangePage={onPageChange}
          />
        </div>
      )}
    </>
  );
};

export default ArticleList;
