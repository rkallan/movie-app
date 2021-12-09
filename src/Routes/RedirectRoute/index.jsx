import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

const RedirectRoute = ({ redirect }) => {
    const navigate = useNavigate();

    useEffect(() => {
        navigate(redirect);
    }, [navigate, redirect]);

    return null;
};

RedirectRoute.propTypes = {
    redirect: PropTypes.string.isRequired,
};

export default RedirectRoute;
