import Markdown from "@/components/Markdown";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Article } from "@/types/article";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";
import { format } from "date-fns";

interface ArticleCardProps {
  article: Article;
}

const ArticleCard: FC<ArticleCardProps> = ({ article }) => {
  const PLACEHOLDER_IMAGE = "/noimage.svg";

  const getImageUrl = (imageUrl: string | null | undefined): string => {
    if (!imageUrl || imageUrl === "/test" || imageUrl === "test") {
      return PLACEHOLDER_IMAGE;
    }

    try {
      new URL(imageUrl);
      return imageUrl;
    } catch {
      const imageExtensions = [
        ".jpg",
        ".jpeg",
        ".png",
        ".gif",
        ".webp",
        ".svg",
      ];
      const hasValidExtension = imageExtensions.some((ext) =>
        imageUrl.toLowerCase().endsWith(ext)
      );

      return hasValidExtension
        ? imageUrl.startsWith("/")
          ? imageUrl
          : `/${imageUrl}`
        : PLACEHOLDER_IMAGE;
    }
  };

  const safeImageUrl = getImageUrl(article.imageUrl);
  const formattedDate = format(new Date(article.createdAt), "MMMM dd, yyyy");

  return (
    <Link href={`/article/${article.id}`} className="block h-full">
      <Card className="h-full flex flex-col hover:shadow-lg transition-all duration-200 overflow-hidden border border-gray-200 shadow-sm bg-white rounded-2xl p-0 m-0">
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-t-2xl">
          <Image
            src={safeImageUrl}
            alt={article.title || "Article thumbnail"}
            fill
            className="object-cover hover:scale-105 transition-transform duration-200"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            onError={(e) => {
              const target = e.currentTarget;
              target.src = PLACEHOLDER_IMAGE;
            }}
          />
        </div>

        <CardContent className="p-6 flex flex-col flex-grow">
          <p className="text-sm text-gray-500 font-medium mb-2">
            {formattedDate}
          </p>

          <h2 className="text-xl font-bold leading-tight text-gray-900 line-clamp-2 hover:text-blue-600 transition-colors mb-3">
            {article.title}
          </h2>

          <div
            className="text-gray-600 text-sm leading-relaxed relative overflow-hidden mb-4"
            style={{ minHeight: "4.5em" }}
          >
            <div className="line-clamp-3">
              <Markdown content={article.content} />
            </div>
            <div className="absolute bottom-0 left-0 right-0 h-5 bg-gradient-to-t from-white to-transparent pointer-events-none" />
          </div>

          <div className="mt-auto flex flex-wrap gap-2">
            <Badge
              variant="outline"
              style={{
                backgroundColor: "#dbeafe",
                color: "#1d4ed8",
                borderColor: "#93c5fd",
              }}
              className="rounded-md capitalize text-sm font-medium px-3 py-1.5 border"
            >
              {article.category.name}
            </Badge>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default ArticleCard;
