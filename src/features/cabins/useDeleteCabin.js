import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";

export function useDeleteCabin() {
  const queryClient = useQueryClient();
  const { isLoading, mutate } = useMutation({
    mutationFn: (id) => deleteCabin(id),
    onSuccess: () => {
      toast.success("Cabin successfully Deleted");
      queryClient.invalidateQueries({
        queryKey: ["cabin"],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isLoading, mutate };
}
