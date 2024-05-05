import { useQuery } from "@tanstack/react-query";
import { getBookingsAfterDate } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
import { subDays } from "date-fns";

export function useRecentBookings() {
  const [searchParams] = useSearchParams();
  const numDays = !searchParams.get("last")
    ? 7
    : Number(searchParams.get("last"));

  const queryDate = subDays(Date.now(), numDays).toDateString();

  const { data: recentBookings, isLoading } = useQuery({
    queryKey: ["Bookings", `last-${numDays}`],
    queryFn: () => getBookingsAfterDate(queryDate),
  });

  return { recentBookings, isLoading };
}
