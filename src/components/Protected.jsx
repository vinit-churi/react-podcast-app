import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import { selectUser } from "@app/features/authSlice";
import { Navigate } from "react-router-dom";
const Protected = ({ children }) => {
  const user = useSelector(selectUser);
  return <>{user ? <>{children}</> : <Navigate to="/" replace="true" />}</>;
};

// propType validation
Protected.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Protected;
