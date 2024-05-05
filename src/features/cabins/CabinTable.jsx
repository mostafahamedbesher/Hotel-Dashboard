import { useCabins } from "./useCabins";
import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import { useSearchParams } from "react-router-dom";

function CabinTable() {
  const { isLoading, cabins } = useCabins();
  const [searchParams] = useSearchParams();

  if (isLoading) return <Spinner />;

  //filter cabins
  const filterValue = searchParams.get("discount") || "all";
  let filteredCabins;

  if (filterValue === "all") {
    filteredCabins = cabins;
  } else if (filterValue === "no-discount") {
    filteredCabins = cabins.filter((cabin) => cabin.discount === 0);
  } else if (filterValue === "with-discount") {
    filteredCabins = cabins.filter((cabin) => cabin.discount > 0);
  }

  //sort cabins
  const sortValue = searchParams.get("sortBy") || "name-asc";

  const [sortField, direction] = sortValue.split("-");
  const modifier = direction === "asc" ? 1 : -1;
  const sortedCabins = filteredCabins.sort(
    (a, b) => (a[sortField] - b[sortField]) * modifier
  );

  // if (sortValue === "name-asc") {
  //   filteredCabins.sort((a, b) => a.name - b.name);
  // } else if (sortValue === "name-desc") {
  //   filteredCabins.sort((a, b) => b.name - a.name);
  // } else if (sortValue === "regularPrice-asc") {
  //   filteredCabins.sort((a, b) => a.regularPrice - b.regularPrice);
  // } else if (sortValue === "regularPrice-desc") {
  //   filteredCabins.sort((a, b) => b.regularPrice - a.regularPrice);
  // } else if (sortValue === "maxCapacity-asc") {
  //   filteredCabins.sort((a, b) => a.maxCapacity - b.maxCapacity);
  // } else if (sortValue === "maxCapacity-desc") {
  //   filteredCabins.sort((a, b) => b.maxCapacity - a.maxCapacity);
  // }

  return (
    <Menus>
      <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Header>
          <div></div>
          <div>cabin</div>
          <div>capacity</div>
          <div>price</div>
          <div>discount</div>
        </Table.Header>
        <Table.Body
          // list={filteredCabins}
          list={sortedCabins}
          render={(cabin) => <CabinRow cabin={cabin} key={cabin.id} />}
        />
      </Table>
    </Menus>
  );
}

export default CabinTable;
