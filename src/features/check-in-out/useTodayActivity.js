import { useQuery } from "@tanstack/react-query";
import { getStaysTodayActivity } from "../../services/apiBookings";

export function useTodayActivity() {
  const { data, isLoading } = useQuery({
    queryKey: ["todayActivity"],
    queryFn: getStaysTodayActivity,
  });

  return { data, isLoading };
}
