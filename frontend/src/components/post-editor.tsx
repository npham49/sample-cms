import Component from "./editor";
import { CastIcon, ExternalLink, SaveIcon, SendIcon } from "lucide-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Post } from "../types";
import { Button } from "./ui/button";
import { useAPIProvider } from "../services/api-service";
import { useMutation } from "@tanstack/react-query";
import { updatePost } from "../store/post/postSlice";
import { Link } from "react-router-dom";

const PostEditor = () => {
  const apiProvider = useAPIProvider();
  const dispatch = useDispatch();

  const selectedPost = useSelector(
    (state: { post: { value: Post } }) => state.post.value
  );
  const [content, setContent] = useState(selectedPost.content || "");
  const savePostMutation = useMutation({
    mutationFn: () => apiProvider.savePost(content, selectedPost.id),
    onSuccess: () => {
      dispatch(updatePost({ ...selectedPost, content }));
    },
  });

  const publishPostMutation = useMutation({
    mutationFn: () => apiProvider.publishPost(selectedPost.id, content),
    onSuccess: (data) => {
      dispatch(updatePost(data));
    },
  });

  const handleSave = () => {
    console.log("Saving content:", content);
    // Implement save logic here
    savePostMutation.mutate();
  };

  const handlePublish = () => {
    console.log("Publishing content:", content);
    // Implement publish logic here
    publishPostMutation.mutate();
  };
  return (
    <div>
      {" "}
      {/* Right content area */}
      {selectedPost && (
        <div className="flex-1 p-4 flex flex-col">
          <div className="mb-4 flex justify-between">
            <h1 className="text-2xl font-bold">
              Editing: {selectedPost.title} - Version {selectedPost.version}
            </h1>
            <div className="space-x-2">
              <Link
                to={`http://localhost:8080/content/view/${selectedPost.blob}`}
                target="_blank"
              >
                <Button variant="outline">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Live
                </Button>
              </Link>
              <Link
                to={`http://localhost:8080/content/preview/${selectedPost.id}`}
                target="_blank"
              >
                <Button variant="outline">
                  <CastIcon className="mr-2 h-4 w-4" />
                  Preview
                </Button>
              </Link>
              <Button
                onClick={handleSave}
                variant="outline"
                disabled={selectedPost?.content === content}
              >
                <SaveIcon className="mr-2 h-4 w-4" />
                Save
              </Button>
              <Button onClick={handlePublish}>
                <SendIcon className="mr-2 h-4 w-4" />
                {selectedPost?.content !== content && "Save and "}Publish
              </Button>
            </div>
          </div>
          <Component onChange={setContent} content={content} />
        </div>
      )}
    </div>
  );
};

export default PostEditor;
