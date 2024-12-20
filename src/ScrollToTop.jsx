import { useLoaderData, useLocation } from "react-router-dom";
import { useEffect } from "react";
const ScrollToTop = ()=>{
    const mLocation = useLocation();
    const pathName = mLocation.pathname;
    useEffect(
        ()=>{
            window.scrollTo(0,0);
        },[pathName]
    )
    return(
        <></>
    )
}
export default ScrollToTop;