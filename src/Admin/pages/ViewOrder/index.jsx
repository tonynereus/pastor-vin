import { useState, useEffect } from "react";
import style from "./style.module.css";
import Table from "../../components/Table";
import apis from "../../../assets/apis";
import LoadingCenter from "../../../components/LoadingCenter";
import TableContainer from "../../components/TableContainer";
import { errorMessae } from "../../../assets/messages";
import Swal from "sweetalert2";
export default ({ extraData, enterWithData }) => {
    const ValidData = () => {
        const [isLoading, updateLoading] = useState(false);
        const [message, changeMessage] = useState("");
        const orderId = extraData.orderId;
        const payS = extraData.payS;
        //console.log(payS);
        const [pageLoaded, updatePage] = useState(false);
        const [samples, updateSamples] = useState([]);
        const getSampleData = 1;
        useEffect(() => {
            updateLoading(true);
            const fd = new FormData();
            fd.append("orderId", orderId);
            fetch(apis.getOrderSamples, {
                method: "POST",
                body: fd,
                credentials: apis.credentials
            }).then(
                async (x) => {
                    updateLoading(false);
                    var resu = await x.json();
                    if (Array.isArray(resu)) {
                        updatePage(true);
                        updateSamples(resu);
                    } else {
                        changeMessage(resu.message);
                    }
                }
            ).catch(
                (err) => {
                    updateLoading(false);
                    changeMessage("Error Occured while loading page");
                }
            )
        }, [getSampleData])
        function viewSample(id, sam) {
            enterWithData("viewOrderSample", { sampleId: id, orderId: orderId, sample: sam })
        }
        const Thead = [
            "S/N",
            "Sample ID",
            "Substance Name",
            "Date Created",
            "Action 1",
        ];
        const RowComponent = ({ sampleId, sampleName, date, sn, id }) => {
            return (
                <tr className="p-0 m-0 bg-danger">
                    <td className="p-0">{sn}</td>
                    <td className="p-0">{orderId}</td>
                    <td className="p-0">{sampleName}</td>
                    <td className="p-1">{date}</td>
                    <td className="p-1">
                        <div onClick={() => { viewSample(id, sampleId) }} className="m-0 d-flex mycenter h-100 text-white bg-secondary py-2" style={{ cursor: "pointer" }}>View</div>
                    </td>
                </tr>
            )
        }
        function confimPay() {
            var con = confirm("Are you sure you want to confim payment for this sample");
            if (con) {
                updateLoading(true);
                const fd = new FormData();
                fd.append("confirmId", orderId);
                fetch(apis.confimPay, {
                    method: "POST",
                    body: fd,
                    credentials: "include"
                }).then(
                    async (x) => {
                        updateLoading(false);
                        var resu = await x.json();
                        if (resu.status) {
                            Swal.fire({
                                icon: "success",
                                text: resu.message
                            })
                        } else {
                            var message = "Error occured please try again";
                            if (resu.message != undefined) {
                                message = resu.message;
                            }
                            errorMessae(message);
                        }
                    }
                ).catch(
                    (err) => {
                        updateLoading(false);
                        errorMessae("Unknown error occured");
                    }
                )
            }
        }
        return (
            <>
                {
                    isLoading && <LoadingCenter />
                }
                {
                    pageLoaded ? <>
                        <div className="w-100 h-100 p-2">
                            <svg onClick={() => { enterWithData("myOrders", {}) }} xmlns="http://www.w3.org/2000/svg" width="55" height="16" viewBox="0 0 55 16" fill="none">
                                <path d="M0.292889 7.29289C-0.0976334 7.68342 -0.0976334 8.31658 0.292889 8.70711L6.65685 15.0711C7.04737 15.4616 7.68054 15.4616 8.07106 15.0711C8.46159 14.6805 8.46159 14.0474 8.07106 13.6569L2.41421 8L8.07106 2.34315C8.46159 1.95262 8.46159 1.31946 8.07106 0.928932C7.68054 0.538408 7.04737 0.538408 6.65685 0.928932L0.292889 7.29289ZM55 7L0.999996 7V9L55 9V7Z" fill="black" />
                            </svg>
                            <div className="mt-1 text-secondary">
                                <h5>Sample ID: {orderId}</h5>
                            </div>
                            <div className="w-100 py-2">
                                <div className="row m-0 justify-content-center">
                                    <div className="col-11 col-md-10">
                                        <Table tableHead={Thead}>
                                            {
                                                (Array.isArray(samples)) ?
                                                    samples.map(
                                                        (itm, ind) => {
                                                            return (<RowComponent sn={++ind} {...itm} key={ind} />)
                                                        }
                                                    ) :
                                                    <>
                                                        <tr>
                                                            <td colSpan={Thead.length}><h5>{orders}</h5></td>
                                                        </tr>
                                                    </>
                                            }
                                        </Table>
                                    </div>

                                </div>
                            </div>
                            <div className="py-1 d-flex justify-content-end">
                                <div>
                                    <div onClick={() => { enterWithData("editStatus", { orderId: orderId }) }} className="btn mb-2 btn-danger mx-3 bg">Edit Status</div>
                                    <div onClick={() => { enterWithData("addResault", { orderId: orderId }); }} className="btn mb-2 btn bg-project-deep text-white">Attach Result</div>
                                    {
                                        payS ?
                                            <></> :
                                            <>
                                                <div onClick={confimPay} className="btn mb-2 btn bg-project-deep text-white mx-3">Confirm Payment</div>
                                            </>
                                    }
                                </div>
                            </div>
                        </div>
                    </>
                        :
                        <>
                            <div className="w-100 p-2 h5">{message}</div>
                        </>
                }
            </>
        )
    }
    const Invalid = () => {
        return (
            <div className="px-3 py-2 h4 text-danger">Order Id not Found</div>
        )
    }
    return (
        <>
            {
                (extraData != undefined && extraData.orderId != undefined) ? <ValidData /> : <Invalid />
            }
        </>
    )
}