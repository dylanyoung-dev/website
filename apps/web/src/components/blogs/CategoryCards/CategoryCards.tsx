import Link from "next/link";
import Image from "next/image";
import { FC } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ICategory } from "@/interfaces";

interface CategoryCardsProps {
  categories: ICategory[];
}

export const CategoryCards: FC<CategoryCardsProps> = ({ categories }) => {
  return (
    <>
      {categories && categories.length > 0 ? (
        <>
          <section className="bg-background">
            <div className="container mx-auto px-4 py-8">
              <div className="space-y-8">
                <div className="flex justify-between">
                  <div className="space-y-5">
                    <div className="space-y-3">
                      <h2 className="text-2xl md:text-3xl font-semibold">Categories</h2>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 lg:gap-12">
                  {categories.map((category: ICategory) => (
                    <Card key={category._id} className="overflow-hidden">
                      <div className="flex flex-col sm:flex-row">
                        <Image
                          src="https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60"
                          alt="Category image"
                          width={200}
                          height={200}
                          className="w-full sm:w-[200px] h-[200px] object-cover"
                        />
                        <div className="flex flex-col flex-1">
                          <CardHeader>
                            <CardTitle className="text-sm font-semibold">
                              {category.title}
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <p className="text-sm py-2">{category.description}</p>
                          </CardContent>
                          <CardFooter>
                            <Button variant="outline" asChild>
                              <Link href={`/insights/categories/${category.slug.current}`}>
                                View
                              </Link>
                            </Button>
                          </CardFooter>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </>
      ) : (
        <>No Categories</>
      )}
    </>
  );
};
