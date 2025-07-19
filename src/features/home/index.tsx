"use client";

import { useState, useEffect, useMemo } from "react";
import ArticleList from "./components/ArticlesList";
import Jumbotron from "./components/Jumbotron";
import useGetCategories from "@/hooks/api/category/useGetCategories";

const ARTICLES_PER_PAGE = 9;
const DEBOUNCE_DELAY = 500;

const HomePage = () => {
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchQuery !== debouncedSearchQuery) {
        setDebouncedSearchQuery(searchQuery);
        setPage(1);
      }
    }, DEBOUNCE_DELAY);

    return () => clearTimeout(timer);
  }, [searchQuery, debouncedSearchQuery]);

  useEffect(() => {
    setPage(1);
  }, [selectedCategoryId]);

  const { data: categoriesData, isPending: isLoadingCategories } =
    useGetCategories();

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handleCategoryChange = (value: string) => {
    setSelectedCategoryId(value === "all" ? "" : value);
  };

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategoryId("");
    setPage(1);
  };

  const selectedCategoryName = useMemo(() => {
    return (
      categoriesData?.data?.find((cat) => cat.id === selectedCategoryId)
        ?.name || ""
    );
  }, [categoriesData, selectedCategoryId]);

  const hasActiveFilters = Boolean(searchQuery || selectedCategoryId);

  return (
    <div className="min-h-screen bg-gray-50">
      <Jumbotron
        searchQuery={searchQuery}
        selectedCategoryId={selectedCategoryId}
        categoriesData={categoriesData}
        isLoadingCategories={isLoadingCategories}
        onSearchChange={handleSearchInputChange}
        onCategoryChange={handleCategoryChange}
        onClearFilters={clearFilters}
        hasActiveFilters={hasActiveFilters}
      />

      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <ArticleList
          page={page}
          debouncedSearchQuery={debouncedSearchQuery}
          selectedCategoryId={selectedCategoryId}
          selectedCategoryName={selectedCategoryName}
          onPageChange={handlePageChange}
          articlesPerPage={ARTICLES_PER_PAGE}
        />
      </div>
    </div>
  );
};

export default HomePage;
