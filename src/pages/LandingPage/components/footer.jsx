import { FacebookFilled, GlobalOutlined, InstagramFilled, TwitterOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
const Footer = () => {
    return (
        <div className="w-100 px-3 text-dark">
            <hr className="m-0" />
            <div className="w-100 row m-0 justify-content-center ">
                <div className="col-md-3  col-6 d-flex justify-content-center">
                    <div>
                        <div className="d-flex">
                            <h2>VA</h2>
                        </div>

                    </div>
                </div>
                <div className="col-md-3 col-6 d-flex justify-content-center">
                    <div>
                        <Link to="/">
                            <div className="mt-2 d-flex foot-link">
                                Home
                            </div>
                        </Link>
                        <Link to="/videos">
                            <div className="mt-2 d-flex foot-link">
                                Videos
                            </div>
                        </Link>
                    </div>
                </div>
                <div className="col-md-3 col-6 d-flex justify-content-center">
                    <div>
                        <Link to="/reflections">
                            <div className="mt-2 d-flex foot-link">
                                Reflections
                            </div>
                        </Link>
                        <Link to="/about">
                            <div className="mt-2 d-flex foot-link">
                                About
                            </div>
                        </Link>
                    </div>
                </div>
                <div className="col-md-3 col-6 d-flex justify-content-center">
                    <div>
                        <div className="mt-2 d-flex foot-link">
                            Terms of service
                        </div>
                        <div className="mt-2 d-flex foot-link">
                            Privacy Policy
                        </div>
                    </div>
                </div>
            </div>
            <hr />
            <div className="w-100 d-flex m-0 justify-content-center">
                <address>
                    © Vincent Akeredolu 2024
                </address>
            </div>
            <div className="w-100 d-flex m-0 justify-content-center gap-3 align-items-center">
                <a href="https://www.facebook.com/akeredolu.vincent" target="_blank" className="text-dark">
                    <FacebookFilled />
                </a>
                <a href="https://x.com/Akeredoluvin?t=ctsZhrnPbKo8NoeVzXRBbg&s=09" target="_blank" className="text-dark">
                    <TwitterOutlined />
                </a>
                <span>
                    <GlobalOutlined />
                </span>
                <span>
                    <strong>
                        <small>Nigeria</small>
                    </strong>
                </span>
            </div>

        </div>
    )
}
export default Footer;