import Markdown from "@/components/Markdown";
import { Separator } from "@/components/ui/separator";
import { Article } from "@/types/article";
import { FC } from "react";
import OtherArticles from "./OtherArticles";

interface ArticleDetailBodyProps {
  article: Article;
}

const ArticleDetailBody: FC<ArticleDetailBodyProps> = ({ article }) => {
  return (
    <div>
      <div className="prose prose-lg max-w-none mb-12">
        <Markdown content={article.content} />
      </div>

      <Separator className="my-12" />

      <OtherArticles currentArticle={article} />
    </div>
  );
};

export default ArticleDetailBody;
