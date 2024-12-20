import style from "./style.module.css";
import apis from "../assets/apis";
import { useState } from "react";
import LoadingCenter from "../components/LoadingCenter";
import ErrorPage from "../pages/ErrorPage";
import Swal from "sweetalert2";
import logo from "../assets/cemlablogo.png";
import MyLink from "./components/MyLink";
import Orders from "./pages/Orders";
import Completed from "./pages/Completed";
import AllUsers from "./pages/AllUsers";
import UploadSample from "./pages/UploadSample";
import Samples from "./pages/Samples";
import EditSample from "./pages/EditSample";
import ViewOrder from "./pages/ViewOrder";
import AddResault from "./pages/AddResault";
import EditStatus from "./pages/EditStatus";
import ViewSample from "./pages/ViewSample";
import { useNavigate } from "react-router-dom";
const AdminPage = () => {
    const nav = useNavigate();
    const [showPage, updateShowPage] = useState("loading");
    //const [isLoading, updateLoading] = useState(false);
    fetch(apis.activeAdmin, {
        method: "GET",
    }).then(
        async (x) => {
            let resu = await x.json();
            if (resu) {
                updateShowPage("allowed");
            } else {
                Swal.fire({
                    icon: "error",
                    text: "Please Login to admin account and try again"
                }).then(
                    (x) => {
                        if (x.value || x.dismiss != undefined) {
                            console.log("dissmissed");
                            location.replace("/signin");
                        }
                    }
                )
            }
        }
    ).catch(
        (err) => {
            updateShowPage("error");
        }
    )
    const MainAdmin = () => {
        const [isLoading, updateLoading] = useState(false);
        const logoutFunction = () => {
            Swal.fire({
                icon: "question",
                text: "Are you sure you want to logout ?",
                confirmButtonText: "Yes",
                showDenyButton: true,
                denyButtonText: "No"
            }).then(
                (x) => {
                    if (x.isConfirmed) {
                        updateLoading(true);
                        fetch(apis.logout, { credentials: apis.credentials }).then(
                            (x) => {
                                updateLoading(false);
                                if (x.status == 200) {
                                    nav("/");
                                } else {
                                    Swal.fire({ icon: "error", text: "error" });
                                }
                            }
                        ).catch(
                            (err) => {
                                updateLoading(false);
                                Swal.fire({ icon: "error" })
                            }
                        )
                    }
                }
            )
        }
        const [curPg, updatePage] = useState("myOrders");
        const [extraData, updateExtraData] = useState();
        const pages = [
            {
                link: "My Orders",
                page: "myOrders"
            },
            {
                link: "Completed Orders",
                page: "complete"
            },
            {
                link: "Upload Sample Analysis",
                page: "uploadSample"
            },
            {
                link: "Sample Analysis",
                page: "sample"
            },
            {
                link: "All Users",
                page: "users"
            },
        ]
        const enterWithData = (page, data) => {
            updateExtraData(data);
            updatePage(page);
        }
        const [sideBar, toggleSide] = useState(false);
        return (
            <div className={style.main}>
                {
                    isLoading && <LoadingCenter />
                }
                <div className="w-100 h-100 d-flex">
                    <div className={sideBar ? style.leftSide : style.leftSideHide}>
                        <div className="w-100 h-100">
                            <div className="w-100 bg-project-deep py-2 px-1" onClick={() => { nav("/") }}>
                                <img className="w-100" src={logo} />
                            </div>
                            {
                                pages.map(
                                    (elm, ind) => {
                                        return (<MyLink key={ind} link={elm.link} active={curPg == elm.page} clicked={() => { updatePage(elm.page) }} />)
                                    }
                                )
                            }
                            <MyLink link={"Logout"} active={curPg == "logout"} clicked={logoutFunction} />
                        </div>
                    </div>
                    <div className={style.rightSide}>
                        <div className={style.top}>
                            <div className="w-100 h-100 d-flex justify-content-between align-items-center px-2">
                                <div class="d-none d-md-block">
                                    <strong className="text-secondary">
                                        Welcome back Admin
                                    </strong>
                                </div>
                                <div style={{width:"140px"}} className="bg-project-deep p-0 d-block d-md-none" onClick={() => { nav("/") }}>
                                    <img className="w-100" src={logo} />
                                </div>
                                <div>
                                    <div className="d-none d-md-flex">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="33" height="33" viewBox="0 0 33 33" fill="none">
                                            <g clipPath="url(#clip0_335_365)">
                                                <path d="M20.6252 26.125C20.6254 26.8188 20.3633 27.487 19.8916 27.9958C19.4199 28.5045 18.7732 28.8161 18.0814 28.8681L17.8752 28.875H15.1252C14.4314 28.8752 13.7631 28.6132 13.2544 28.1414C12.7457 27.6697 12.4341 27.0231 12.382 26.3312L12.3752 26.125H20.6252ZM16.5002 2.75C18.9958 2.74996 21.3938 3.71923 23.1885 5.45335C24.9831 7.18748 26.0341 9.55087 26.1197 12.045L26.1252 12.375V17.5505L28.6304 22.561C28.7397 22.7796 28.7945 23.0215 28.7899 23.2659C28.7853 23.5103 28.7215 23.7499 28.6041 23.9643C28.4866 24.1787 28.319 24.3614 28.1154 24.4968C27.9119 24.6322 27.6786 24.7162 27.4355 24.7417L27.2774 24.75H5.72291C5.47838 24.7501 5.23749 24.6909 5.02086 24.5774C4.80424 24.464 4.61834 24.2997 4.47911 24.0987C4.33987 23.8977 4.25145 23.666 4.22141 23.4233C4.19138 23.1806 4.22063 22.9343 4.30666 22.7054L4.36991 22.561L6.87516 17.5505V12.375C6.87516 9.82229 7.88922 7.37413 9.69426 5.5691C11.4993 3.76406 13.9474 2.75 16.5002 2.75Z" fill="black" />
                                            </g>
                                            <defs>
                                                <clipPath id="clip0_335_365">
                                                    <rect width="33" height="33" fill="white" />
                                                </clipPath>
                                            </defs>
                                        </svg>
                                    </div>
                                    <div className="d-md-none" onClick={() => { toggleSide(!sideBar) }}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="34" height="22" viewBox="0 0 34 22" fill="none">
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M0 1.96875C0 1.54606 0.167912 1.14068 0.466799 0.841798C0.765685 0.542912 1.17106 0.375 1.59375 0.375H32.4062C32.8289 0.375 33.2343 0.542912 33.5332 0.841798C33.8321 1.14068 34 1.54606 34 1.96875C34 2.39144 33.8321 2.79682 33.5332 3.0957C33.2343 3.39459 32.8289 3.5625 32.4062 3.5625H1.59375C1.17106 3.5625 0.765685 3.39459 0.466799 3.0957C0.167912 2.79682 0 2.39144 0 1.96875ZM0 11C0 10.5773 0.167912 10.1719 0.466799 9.87305C0.765685 9.57416 1.17106 9.40625 1.59375 9.40625H32.4062C32.8289 9.40625 33.2343 9.57416 33.5332 9.87305C33.8321 10.1719 34 10.5773 34 11C34 11.4227 33.8321 11.8281 33.5332 12.127C33.2343 12.4258 32.8289 12.5938 32.4062 12.5938H1.59375C1.17106 12.5938 0.765685 12.4258 0.466799 12.127C0.167912 11.8281 0 11.4227 0 11ZM1.59375 18.4375C1.17106 18.4375 0.765685 18.6054 0.466799 18.9043C0.167912 19.2032 0 19.6086 0 20.0312C0 20.4539 0.167912 20.8593 0.466799 21.1582C0.765685 21.4571 1.17106 21.625 1.59375 21.625H32.4062C32.8289 21.625 33.2343 21.4571 33.5332 21.1582C33.8321 20.8593 34 20.4539 34 20.0312C34 19.6086 33.8321 19.2032 33.5332 18.9043C33.2343 18.6054 32.8289 18.4375 32.4062 18.4375H1.59375Z" fill="#222" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={style.body}>
                            {
                                curPg == "myOrders" && <Orders enterWithData={enterWithData} />
                            }
                            {
                                curPg == "complete" && <Completed />
                            }
                            {
                                curPg == "users" && <AllUsers />
                            }
                            {
                                curPg == "uploadSample" && <UploadSample />
                            }
                            {
                                curPg == "sample" && <Samples enterWithData={enterWithData} />
                            }
                            {
                                curPg == "editSample" && <EditSample extraData={extraData} enterWithData={enterWithData} />
                            }
                            {
                                curPg == "viewOrder" && <ViewOrder extraData={extraData} enterWithData={enterWithData} />
                            }
                            {
                                curPg == "editStatus" && <EditStatus extraData={extraData} enterWithData={enterWithData} />
                            }
                            {
                                curPg == "addResault" && <AddResault extraData={extraData} enterWithData={enterWithData} />
                            }
                            {
                                curPg == "viewOrderSample" && <ViewSample extraData={extraData} enterWithData={enterWithData} />
                            }

                        </div>
                    </div>
                </div>
            </div>
        )
    }
    return (
        <>
            {
                showPage == "loading" && <LoadingCenter />
            }
            {
                showPage == "error" && <ErrorPage />
            }
            {
                showPage == "allowed" && <MainAdmin />
            }
        </>
    )
}
export default AdminPage;