import { PlusIcon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAPIProvider } from "../services/api-service";
import { Label } from "./ui/label";

const AddPageDialog = ({
  categoryId,
  categoryName,
}: {
  categoryId: string;
  categoryName: string;
}) => {
  const [open, setOpen] = useState(false);
  const [newPageName, setNewPageName] = useState("");
  const apiProvider = useAPIProvider();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: () =>
      apiProvider.createPost({
        title: newPageName,
        categoryId,
        published: false,
        content: null,
      }),
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      setOpen(false);
      setNewPageName("");
    },
    onError: (error) => {
      console.error(error);
    },
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <PlusIcon className="mr-2 h-4 w-4" />
          Add Page
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Page</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col space-y-4">
          <Label className="text-lg">Category: {categoryName}</Label>
          <Input
            placeholder="Page name"
            value={newPageName}
            onChange={(e) => setNewPageName(e.target.value)}
          />
          <Button onClick={() => mutation.mutate()}>Add</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddPageDialog;
