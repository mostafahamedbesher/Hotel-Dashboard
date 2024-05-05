import { useNavigate } from "react-router-dom";
import { useUser } from "../features/authentication/useUser";
import Spinner from "./Spinner";
import styled from "styled-components";
import { useEffect } from "react";

const Fullpage = styled.div`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
`;

function ProtectedRoute({ children }) {
  // 1- load the authenticated user
  const { isLoading, isAuthenticated } = useUser();
  const navigate = useNavigate();

  // 2- if no user authenticated, redirect to "/login"
  useEffect(
    function () {
      if (!isAuthenticated && !isLoading) {
        navigate("/login");
      }
    },
    [isAuthenticated, isLoading, navigate]
  );

  // 3- while loading, show a spinner
  if (isLoading)
    return (
      <Fullpage>
        <Spinner />
      </Fullpage>
    );

  // 4- if the user authenticated, render the app
  if (isAuthenticated) return children;
}

export default ProtectedRoute;
