import { createContext, useContext, useState } from "react";
import { createPortal } from "react-dom";
import { HiEllipsisVertical } from "react-icons/hi2";
import styled from "styled-components";
import { useOutsideClick } from "../hooks/useOutsideClick";

const Menu = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const StyledToggle = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-700);
  }
`;

const StyledList = styled.ul`
  position: fixed;

  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-md);
  border-radius: var(--border-radius-md);

  right: ${(props) => props.position.x}px;
  top: ${(props) => props.position.y}px;
`;

const StyledButton = styled.button`
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  padding: 1.2rem 2.4rem;
  font-size: 1.4rem;
  transition: all 0.2s;

  display: flex;
  align-items: center;
  gap: 1.6rem;

  &:hover {
    background-color: var(--color-grey-50);
  }

  & svg {
    width: 1.6rem;
    height: 1.6rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }
`;

//create context
const MenusContext = createContext();

//parent component
function Menus({ children }) {
  const [openId, setOpenId] = useState("");
  const [position, setPosition] = useState(null);

  const closeMenu = () => setOpenId("");
  const openMenu = setOpenId;

  // const [posX, setPosX] = useState(0);
  // const [posY, setPosY] = useState(0);

  // value={{ openId, closeMenu, openMenu, posX, setPosX, posY, setPosY }}

  return (
    <MenusContext.Provider
      value={{ openId, closeMenu, openMenu, position, setPosition }}
    >
      {children}
    </MenusContext.Provider>
  );
}

//create child components
function List({ id, children }) {
  const { openId, position, closeMenu } = useContext(MenusContext);

  const Listref = useOutsideClick(closeMenu, false);

  if (openId !== id) return null;

  return createPortal(
    <StyledList ref={Listref} position={position}>
      {children}
    </StyledList>,
    document.body
  );
}

function Toggle({ id }) {
  const { openId, closeMenu, openMenu, setPosition } = useContext(MenusContext);

  function handleClick(e) {
    e.stopPropagation();

    const { right, bottom } = e.target
      .closest("button")
      .getBoundingClientRect();

    const viewportWidth = window.innerWidth;

    // set list position
    // setPosX(viewportWidth - right);
    // setPosY(bottom + 10);

    setPosition({ x: viewportWidth - right, y: bottom + 10 });

    openId === "" || openId !== id ? openMenu(id) : closeMenu();
  }

  return (
    <StyledToggle onClick={handleClick}>
      <HiEllipsisVertical />
    </StyledToggle>
  );
}

function Button({ children, icon, onClick }) {
  const { closeMenu } = useContext(MenusContext);

  function handleClick() {
    onClick?.();
    closeMenu();
  }

  return (
    <li>
      <StyledButton onClick={handleClick}>
        {icon} <span>{children}</span>
      </StyledButton>
    </li>
  );
}

//add child components as proprties to parent components
Menus.Menu = Menu;
Menus.List = List;
Menus.Toggle = Toggle;
Menus.Button = Button;

export default Menus;
