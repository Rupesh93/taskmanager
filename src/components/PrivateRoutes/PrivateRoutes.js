import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoutes = ({ Component }) => {

    const checkACookieExists = () => {
        return document.cookie.split(";").some((item) => item.trim().startsWith("userData="))
    }

    return (
        <>
            {
                checkACookieExists() ? <Component /> : <Navigate to="/" />
            }
        </>
    );
};
export default PrivateRoutes;