import { Button } from "../components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../components/ui/accordion";
import AddCategoryDialog from "../components/add-category-dialog";
import { useQuery } from "@tanstack/react-query";
import { useAPIProvider } from "../services/api-service";
import { Category, Post } from "../types";
import AddPageDialog from "../components/add-page-dialog";
import { useDispatch } from "react-redux";
import { updatePost } from "../store/post/postSlice";
import PostEditor from "../components/post-editor";

export default function Component() {
  const apiProvider = useAPIProvider();

  // Queries
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["categories"],
    queryFn: () => apiProvider.getCategories(),
  });

  const dispatch = useDispatch();

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
            data.map((category: Category) => {
              // Goes through the list of posts and returns the posts with the highest version number and unique blob
              // Iterate over the posts adding them to the reducer, then return the updated list of posts
              const posts = category.posts.reduce((acc: Post[], post: Post) => {
                const existingPost = acc.find((p) => p.blob === post.blob);
                if (existingPost) {
                  if (existingPost.version < post.version) {
                    return acc.map((p) =>
                      p.blob === post.blob ? { ...post, title: post.title } : p
                    );
                  }
                  return acc;
                }
                return [...acc, post];
              }, []);
              return (
                <AccordionItem value={category.name} key={category.id}>
                  <AccordionTrigger>{category.name}</AccordionTrigger>
                  <AccordionContent>
                    <div className="flex flex-col space-y-2">
                      {posts.map((post: Post) => (
                        <Button
                          key={post.postId}
                          variant="ghost"
                          className="justify-start pl-4"
                          onClick={() => dispatch(updatePost(post))}
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
              );
            })}
        </Accordion>

        {/* Add Category Dialog */}
        <AddCategoryDialog />
      </div>

      {/* Right content area */}
      <PostEditor />
    </div>
  );
}
