import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { login } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useLogin() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation({
    mutationFn: ({ email, password }) => login({ email, password }),
    onSuccess: (user) => {
      queryClient.setQueriesData(["user"], user.user);
      navigate("/dashboard", { replace: true });
    },
    onError: (err) => {
      console.error("Error", err);
      toast.error("Provided email or password is incorrect");
    },
  });

  return { mutate, isLoading };
}
