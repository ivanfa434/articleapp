import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { FC } from "react";
import { Edit2, Calendar, User } from "lucide-react";
import Link from "next/link";
import { Article } from "@/types/article";

interface ArticleDetailHeaderProps {
  article: Article;
}

const ArticleDetailHeader: FC<ArticleDetailHeaderProps> = ({ article }) => {
  const session = useSession();

  return (
    <div className="mb-8">
      <div className="flex items-center gap-4 mb-4">
        <Badge
          variant="secondary"
          className="bg-green-100 text-green-600 capitalize"
        >
          {article.category.name}
        </Badge>
        <div className="flex items-center text-sm text-muted-foreground">
          <Calendar className="mr-1 h-3 w-3" />
          {format(new Date(article.createdAt), "MMMM dd, yyyy")}
        </div>
        <div className="flex items-center text-sm text-muted-foreground">
          <User className="mr-1 h-3 w-3" />
          <span className="capitalize">{article.user?.username}</span>
        </div>
      </div>

      <div className="flex items-center justify-between mb-4">
        <h1 className="text-3xl md:text-4xl font-bold">{article.title}</h1>
        {session.data?.user?.id === String(article.userId) && (
          <Button size="sm" variant="outline" asChild>
            <Link href={`/articles/${article.id}/edit`}>
              <Edit2 className="mr-2 h-4 w-4" />
              Edit
            </Link>
          </Button>
        )}
      </div>

      {article.imageUrl && (
        <div className="relative aspect-video mb-8 rounded-lg overflow-hidden">
          <Image
            src={article.imageUrl}
            alt={article.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority
          />
        </div>
      )}
    </div>
  );
};

export default ArticleDetailHeader;
