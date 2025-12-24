import Link from "next/link";
import _ from "lodash";
import { Button } from "@/components/ui/button";
import { ICategory } from "@/interfaces";

interface CategoriesProps {
  AllCategories: ICategory[];
}

function Categories({ AllCategories }: CategoriesProps) {
  return (
    <>
      {AllCategories && (
        <>
          <div className="flex flex-wrap gap-2">
            {_.map(AllCategories, (category: ICategory, index) => (
              <Button key={index} variant="outline" size="sm" asChild>
                <Link href={`/insights/categories/${category.slug.current}`}>
                  {category.title}
                </Link>
              </Button>
            ))}
          </div>
        </>
      )}
    </>
  );
}

export default Categories;
