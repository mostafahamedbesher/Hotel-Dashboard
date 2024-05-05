import {
  HiOutlineBanknotes,
  HiOutlineBriefcase,
  HiOutlineCalendarDays,
  HiOutlineChartBar,
} from "react-icons/hi2";
import Stat from "./Stat";
import { formatCurrency } from "../../utils/helpers";

function Stats({ bookings, confirmedStays, numDays, cabinsCount }) {
  //1- calculate num of bookings
  const numBookings = bookings.length;

  //2 - calculate sales
  const sales = bookings.reduce((acc, booking) => acc + booking.totalPrice, 0);

  //3 - calculate checkins
  const numCheckIns = confirmedStays.length;

  //4- calculate occupancy rate (num checkedin nights / num all available nights = (num of days * num of cabins) )
  const occupation = confirmedStays.reduce(
    (acc, cur) => acc + cur.numNights,
    0
  );

  const numAllNights = numDays * cabinsCount;

  const occupancyRate = Math.round((occupation / numAllNights) * 100);

  return (
    <>
      <Stat
        icon={<HiOutlineBriefcase />}
        title="Bookings"
        value={numBookings}
        color="blue"
      />

      <Stat
        icon={<HiOutlineBanknotes />}
        color="green"
        title="sales"
        value={formatCurrency(sales)}
      />

      <Stat
        icon={<HiOutlineCalendarDays />}
        color="indigo"
        title="check ins"
        value={numCheckIns}
      />

      <Stat
        icon={<HiOutlineChartBar />}
        color="yellow"
        title="occupancy rate"
        value={`${occupancyRate}%`}
      />
    </>
  );
}

export default Stats;
