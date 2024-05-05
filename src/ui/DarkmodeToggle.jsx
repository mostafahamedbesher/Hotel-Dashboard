import { HiOutlineMoon, HiOutlineSun } from "react-icons/hi2";
import ButtonIcon from "./ButtonIcon";
import { useDarkMode } from "../context/DarkModeContext";
import { useEffect } from "react";

function DarkmodeToggle() {
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  function handleDarkmode() {
    toggleDarkMode();
  }

  useEffect(
    function () {
      const rootElement = document.documentElement;

      if (isDarkMode) {
        rootElement.classList.add("dark-mode");
        rootElement.classList.remove("light-mode");
      } else {
        rootElement.classList.add("light-mode");
        rootElement.classList.remove("dark-mode");
      }
    },
    [isDarkMode]
  );

  return (
    <ButtonIcon onClick={handleDarkmode}>
      {isDarkMode ? <HiOutlineSun /> : <HiOutlineMoon />}
    </ButtonIcon>
  );
}

export default DarkmodeToggle;
