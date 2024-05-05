import styled from "styled-components";
import CreateCabinForm from "./CreateCabinForm";
import { formatCurrency } from "../../utils/helpers";
import { useDeleteCabin } from "./useDeleteCabin";
import { HiTrash } from "react-icons/hi2";
import { HiSquare2Stack } from "react-icons/hi2";
import { HiPencil } from "react-icons/hi2";
import { useCreateCabin } from "./useCreateCabin";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;

function CabinRow({ cabin }) {
  const { isLoading, mutate } = useDeleteCabin();

  const { createCabin, isCreating } = useCreateCabin();

  const {
    id: cabinId,
    name,
    maxCapacity,
    description,
    regularPrice,
    discount,
    image,
  } = cabin;

  function onDuplicateCabin() {
    createCabin({
      name: `copy of ${name}`,
      maxCapacity: maxCapacity,
      description: description,
      regularPrice: regularPrice,
      discount: discount,
      image: image,
    });
  }

  return (
    <Table.Row>
      <Img src={image} alt="cabin image" />
      <Cabin>{name}</Cabin>
      {/* <Cabin>{`Fits up to ${cabin.maxCapacity} guests`}</Cabin> */}
      <p>{`Fits up to ${maxCapacity} guests`}</p>
      <Price>{`${formatCurrency(regularPrice)}$`}</Price>
      {discount ? (
        <Discount>{`${formatCurrency(discount)}$`}</Discount>
      ) : (
        <span>&mdash;</span>
      )}
      <div>
        <Modal>
          <Menus.Menu>
            <Menus.Toggle id={cabinId} />

            <Menus.List id={cabinId}>
              <Menus.Button
                icon={<HiSquare2Stack />}
                onClick={onDuplicateCabin}
                disabled={isCreating}
              >
                Duplicate
              </Menus.Button>

              <Modal.Open openWindowName="edit">
                <Menus.Button icon={<HiPencil />}>Edit</Menus.Button>
              </Modal.Open>

              <Modal.Open openWindowName="delete">
                <Menus.Button icon={<HiTrash />}>Delete</Menus.Button>
              </Modal.Open>
            </Menus.List>

            <Modal.Window opens="edit">
              <CreateCabinForm cabinToEdit={cabin} />
            </Modal.Window>

            <Modal.Window opens="delete">
              <ConfirmDelete
                resourceName="Cabin"
                onConfirm={() => mutate(cabinId)}
                disabled={isLoading}
              />
            </Modal.Window>
          </Menus.Menu>
        </Modal>
      </div>
    </Table.Row>
  );
}

export default CabinRow;
