import { FacebookFilled, InstagramFilled, TwitterOutlined } from "@ant-design/icons";
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
                        <div className="mt-2 d-flex foot-link">
                            Home
                        </div>
                        <div className="mt-2 d-flex foot-link">
                            Videos
                        </div>
                    </div>
                </div>
                <div className="col-md-3 col-6 d-flex justify-content-center">
                    <div>
                        <div className="mt-2 d-flex foot-link">
                            Reflections
                        </div>
                        <div className="mt-2 d-flex foot-link">
                            About
                        </div>
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
                <span>
                    <FacebookFilled />
                </span>
                <span>
                    <TwitterOutlined />
                </span>
                <span>
                    <InstagramFilled />
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