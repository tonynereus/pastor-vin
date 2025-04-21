import logo from "../../../assets/plogo.png";
import Mylinks from "../../../components/Mylinks";
import ScrollToTop from "../../../ScrollToTop";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
const Header = () => {
    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
    const { pathname } = useLocation();

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <div className="mb-4 top-nav">
            <ScrollToTop />
            <div className="d-flex justify-content-between align-items-center py-2 px-2" style={{ overflowY: "visible" }}>
                <div className="col-4 px-1">
                    <Link to="/">
                        <img src={logo} alt="logo" width={"50px"} />
                    </Link>
                </div>
                <div className="col-8 d-flex justify-content-end ">
                    <div className="d-md-flex d-none gap-3 px-3">
                        <div >
                            <Link to="/">
                                <Mylinks active={pathname == "/"}>Home</Mylinks>
                            </Link>
                        </div>
                        <div >
                            <Link to="/videos">
                                <Mylinks active={pathname == "/videos"}>Videos</Mylinks>
                            </Link>
                        </div>
                        <div >
                            <Link to="/reflections">
                                <Mylinks active={pathname == "/reflections"}>Articles</Mylinks>
                            </Link>
                        </div>
                        <div>
                            <Link to="/about">
                                <div>
                                    <Mylinks active={pathname == "/about"}>About</Mylinks>
                                </div>
                            </Link>
                        </div>
                    </div>
                    <div className="d-md-none mx-2" onClick={toggleMobileMenu}>
                        <FontAwesomeIcon icon={faBars} />
                    </div>
                    {isMobileMenuOpen && (
                        <div className="mobile-menu bg-light p-3">
                            <div className="mb-2">
                                <Link to="/" onClick={toggleMobileMenu}>
                                    <Mylinks active={pathname === "/"}>Home</Mylinks>
                                </Link>
                            </div>
                            <div className="mb-2">
                                <Link to="/videos" onClick={toggleMobileMenu}>
                                    <Mylinks active={pathname === "/videos"}>Videos</Mylinks>
                                </Link>
                            </div>
                            <div className="mb-2">
                                <Link to="/reflections" onClick={toggleMobileMenu}>
                                    <Mylinks active={pathname === "/reflections"}>Articles</Mylinks>
                                </Link>
                            </div>
                            <div className="mb-2">
                                <Link to="/about" onClick={toggleMobileMenu}>
                                    <Mylinks active={pathname === "/about"}>About</Mylinks>
                                </Link>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Header;