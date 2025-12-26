import Link from "next/link";
import _ from "lodash";
import { Button } from "@/components/ui/button";
import { ICategory } from "@/interfaces";

interface CategoriesProps {
  AllCategories: ICategory[];
}

function Categories({ AllCategories }: CategoriesProps) {
  if (!AllCategories || AllCategories.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-wrap gap-3">
      {_.map(AllCategories, (category: ICategory, index) => (
        <Button 
          key={index} 
          variant="outline" 
          size="default"
          className="h-auto py-2.5 px-4 font-medium hover:bg-primary hover:text-primary-foreground transition-colors"
          asChild
        >
          <Link href={`/insights/categories/${category.slug.current}`}>
            {category.title}
          </Link>
        </Button>
      ))}
    </div>
  );
}

export default Categories;
