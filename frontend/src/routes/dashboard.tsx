import { useState } from "react";
import { Button } from "../components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../components/ui/accordion";
import { SaveIcon, SendIcon } from "lucide-react";
import AddCategoryDialog from "../components/add-category-dialog";
import { useQuery } from "@tanstack/react-query";
import { useAPIProvider } from "../services/api-service";
import { Category, Post } from "../types";
import AddPageDialog from "../components/add-page-dialog";
import Editor from "../components/editor";

export default function Component() {
  const apiProvider = useAPIProvider();

  // Queries
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["categories"],
    queryFn: () => apiProvider.getCategories(),
  });

  const [selectedCategory, setSelectedCategory] = useState("");
  const [content, setContent] = useState("");

  const handleSave = () => {
    console.log("Saving content:", content);
    // Implement save logic here
  };

  const handlePublish = () => {
    console.log("Publishing content:", content);
    // Implement publish logic here
  };

  return (
    <div className="flex h-screen bg-background">
      {/* Left sidebar */}
      <div className="w-64 border-r p-4 overflow-y-auto flex flex-col">
        <h2 className="mb-4 text-lg font-semibold">Categories</h2>
        <Accordion type="multiple" className="w-full mb-4">
          {/* Main Categories */}
          {isLoading && <p>Loading...</p>}
          {isError && <p>Error: {error.message}</p>}
          {data &&
            data.map((category: Category) => (
              <AccordionItem value={category.name} key={category.id}>
                <AccordionTrigger>{category.name}</AccordionTrigger>
                <AccordionContent>
                  <div className="flex flex-col space-y-2">
                    {category.posts.map((post: Post) => (
                      <Button
                        key={post.postId}
                        variant="ghost"
                        className="justify-start pl-4"
                        onClick={() => setSelectedCategory(post.title)}
                      >
                        {post.title}
                      </Button>
                    ))}

                    {/* Add Page */}
                    <AddPageDialog
                      categoryId={category.id}
                      categoryName={category.name}
                    />
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
        </Accordion>

        {/* Add Category Dialog */}
        <AddCategoryDialog />

        {/* Add Page Dialog */}
      </div>

      {/* Right content area */}
      {selectedCategory !== "" && (
        <div className="flex-1 p-4 flex flex-col">
          <div className="mb-4 flex justify-between">
            <h1 className="text-2xl font-bold">Editing: {selectedCategory}</h1>
            <div className="space-x-2">
              <Button onClick={handleSave} variant="outline">
                <SaveIcon className="mr-2 h-4 w-4" />
                Save
              </Button>
              <Button onClick={handlePublish}>
                <SendIcon className="mr-2 h-4 w-4" />
                Publish
              </Button>
            </div>
          </div>
          <Editor onChange={setContent} content={content} />
        </div>
      )}
    </div>
  );
}
