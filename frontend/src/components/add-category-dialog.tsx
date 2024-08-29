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

const AddCategoryDialog = () => {
  const [open, setOpen] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");
  const apiProvider = useAPIProvider();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: () => apiProvider.createCategory(newCategoryName),
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      setOpen(false);
      setNewCategoryName("");
    },
    onError: (error) => {
      console.error(error);
    },
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="mb-2">
          <PlusIcon className="mr-2 h-4 w-4" />
          Add Category
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Category</DialogTitle>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <Input
            placeholder="Category name"
            value={newCategoryName}
            onChange={(e) => setNewCategoryName(e.target.value)}
          />
          <Button onClick={() => mutation.mutate()}>Add</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddCategoryDialog;
