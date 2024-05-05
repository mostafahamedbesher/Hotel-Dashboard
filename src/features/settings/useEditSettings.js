import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateSetting } from "../../services/apiSettings";

export function useEditSettings() {
  const quertClient = useQueryClient();
  const { isLoading: isEditing, mutate: editSettings } = useMutation({
    mutationFn: updateSetting,
    onSuccess: () => {
      toast.success("Settings has been successfully Edited");
      quertClient.invalidateQueries({
        queryKey: ["settings"],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isEditing, editSettings };
}
