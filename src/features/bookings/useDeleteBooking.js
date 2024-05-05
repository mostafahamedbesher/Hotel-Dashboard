import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";

export function useDeleteBooking() {
  const queryClient = useQueryClient();

  const { mutate, isLoading: isDeletingBooking } = useMutation({
    mutationFn: (bookingId) => deleteBooking(bookingId),
    onSuccess: () => {
      toast.success("Booking successfully Deleted");
      queryClient.invalidateQueries({
        queryKey: ["Bookings"],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { mutate, isDeletingBooking };
}
