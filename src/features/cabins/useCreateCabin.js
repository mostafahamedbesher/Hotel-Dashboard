import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createEditCabin } from "../../services/apiCabins";

export function useCreateCabin() {
  const quertClient = useQueryClient();
  //use for creating cabin
  const { isLoading: isCreating, mutate: createCabin } = useMutation({
    mutationFn: (newCabinData) => createEditCabin(newCabinData),
    onSuccess: () => {
      toast.success("New cabin has been successfully Added");
      quertClient.invalidateQueries({
        queryKey: ["cabin"],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isCreating, createCabin };
}
