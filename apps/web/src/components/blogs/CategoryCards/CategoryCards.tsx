import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ICategory } from "@/interfaces";

interface CategoryCardsProps {
  categories: ICategory[];
}

export function CategoryCards({ categories }: CategoryCardsProps) {
  if (!categories || categories.length === 0) {
    return null;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {categories.map((category: ICategory) => (
        <Card key={category._id} className="group hover:shadow-md transition-shadow overflow-hidden">
          <div className="flex flex-col">
            <div className="relative w-full aspect-video overflow-hidden bg-gradient-to-br from-primary/20 to-primary/5">
              <Image
                src="https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60"
                alt={category.title}
                fill
                className="object-cover opacity-50 group-hover:opacity-60 transition-opacity"
              />
            </div>
            <div className="flex flex-col flex-1 p-6 space-y-4">
              <div className="space-y-2">
                <CardTitle className="text-lg font-semibold group-hover:text-primary transition-colors">
                  {category.title}
                </CardTitle>
                {category.description && (
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {category.description}
                  </p>
                )}
              </div>
              <CardFooter className="p-0 pt-2">
                <Button variant="outline" size="sm" asChild className="w-full">
                  <Link href={`/insights/categories/${category.slug.current}`}>
                    View Category
                  </Link>
                </Button>
              </CardFooter>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
