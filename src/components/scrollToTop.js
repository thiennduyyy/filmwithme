import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop({ children }) {
    const {pathname, search} = useLocation();
    
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname, search]);
    
    return children;
}