import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Error403 = (): JSX.Element => {
    const { pathname } = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (pathname !== "/error/403") {
            navigate("/error/403");
        }
    }, [navigate, pathname]);

    return (
        <div>
            <p>403 Error page</p>
        </div>
    );
};

export default Error403;
