import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../utils/constants";
// import { useEffect } from "react";

export function useBookings() {
  const [searchParams] = useSearchParams();
  const queryClient = useQueryClient();
  //FILTER
  const filterValue = searchParams.get("status");
  const filter =
    !filterValue || filterValue === "all"
      ? null
      : { field: "status", value: filterValue };

  //SORT
  const sortByRow = searchParams.get("sortBy") || "startDate-desc";
  const [field, direction] = sortByRow.split("-");
  const sortBy = { field, direction };

  //pagination
  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));

  // const page = !searchParams.get("page") || filterValue ? 1 : Number(searchParams.get("page"));

  //fix pages bug
  // useEffect(
  //   function () {
  //     searchParams.set("page", 1);
  //     setSearchParams(searchParams);
  //   },
  //   [filterValue]
  // );

  const {
    isLoading,
    data: { data: bookings, count } = {},
    error,
  } = useQuery({
    queryKey: ["Bookings", filter, sortBy, page],
    queryFn: () => getBookings({ filter, sortBy, page }),
  });

  // console.log(count);

  // PRE-FETCHING(prefetch next page data)
  const pageCount = Math.ceil(count / PAGE_SIZE);

  if (page < pageCount) {
    queryClient.prefetchQuery({
      queryKey: ["Bookings", filter, sortBy, page + 1],
      queryFn: () => getBookings({ filter, sortBy, page: page + 1 }),
    });
  }

  return { isLoading, bookings, error, count };
}
