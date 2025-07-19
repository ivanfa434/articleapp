import { FC } from "react";
import { FileText, Search } from "lucide-react";

const NoDataOtherArticles: FC = () => {
  return (
    <section className="mt-12">
      <h2 className="text-2xl font-bold mb-6 text-gray-900">Other Articles</h2>
      <div className="flex flex-col items-center justify-center py-12 px-4 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200">
        <div className="flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
          <FileText className="w-8 h-8 text-gray-400" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          No Related Articles
        </h3>
        <p className="text-gray-500 text-center max-w-md">
          There are no other articles available in this category at the moment.
        </p>
        <div className="flex items-center mt-4 text-sm text-gray-400">
          <Search className="w-4 h-4 mr-1" />
          <span>Check back later for more content</span>
        </div>
      </div>
    </section>
  );
};

export default NoDataOtherArticles;
