import { useState, useEffect } from "react";
import style from "./style.module.css";
import Table from "../../components/Table";
import apis from "../../../assets/apis";
import LoadingCenter from "../../../components/LoadingCenter";
import Swal from "sweetalert2";
import { errorMessae, successMessae } from "../../../assets/messages";
export default ({ extraData, enterWithData }) => {
    const ValidData = () => {
        const [isLoading, updateLoading] = useState(false);
        const [message, changeMessage] = useState("");
        const orderId = extraData.orderId;
        const [pageLoaded, updatePage] = useState(false);
        const [orderInfo, updateOrder] = useState({
            num1: "",
            num2: "",
            num3: "",
            num4: ""
        });
        function handleChange(e) {
            updateOrder({
                ...orderInfo,
                [e.target.name]: e.target.value
            })
        }
        const getSampleData = 1;
        useEffect(() => {
            updateLoading(true);
            const fd = new FormData();
            fd.append("orderId", orderId);
            fetch(apis.orderInfo, {
                method: "POST",
                body: fd,
                credentials:apis.credentials
            }).then(
                async (x) => {
                    updateLoading(false);
                    var resu = await x.json();
                    if (resu.num1 != undefined) {
                        updatePage(true);
                        updateOrder({
                            ...orderInfo,
                            ...resu
                        })
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
            "Status summary",
            "Description",
            "Fields",
        ];
        const makeEdits = ()=>{
            Swal.fire({
                icon:"question",
                text:"Are you sure you want to make the following status updates ?",
                confirmButtonText:"yes",
                denyButtonText:"No",
                showDenyButton:true
            }).then(
                (x)=>{
                    if(x.isConfirmed){
                        updateLoading(true);
                        const fd = new FormData();
                        fd.append("orderId",orderId);
                        for(var i in orderInfo){
                            fd.append(i,orderInfo[i]);
                        }
                        fetch(apis.makeEdit,{
                            method:"POST",
                            body:fd,
                            credentials:apis.credentials
                        }).then(
                            async (x)=>{
                                updateLoading(false);
                                var resu = await x.json();
                                if(resu.status){
                                    successMessae(resu.message);
                                }else{
                                    errorMessae(resu.message);
                                }
                            }
                        ).catch(
                            (err)=>{
                                updateLoading(false);
                                errorMessae("Invalid data from server");
                            }
                        )
                    }
                }
            )
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
                                <h5>ORDER ID: {orderId}</h5>
                            </div>
                            <div className="w-100 py-2">
                                <div className="row m-0 justify-content-center">
                                    <div className="col-11 col-md-10">
                                        <Table tableHead={Thead}>
                                            <tr>
                                                <td>1</td>
                                                <td>
                                                    <div className="btn bg-secondary text-white w-100 h-100">Created At</div>
                                                </td>
                                                <td>
                                                    Date order was Order was made
                                                </td>
                                                <td style={{whiteSpace:"nowrap"}}>
                                                    {orderInfo.num1}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>2</td>
                                                <td>
                                                    <div className="btn bg-secondary text-white w-100 h-100">Confirmed At</div>
                                                </td>
                                                <td>
                                                    Date payment was confirmed
                                                </td>
                                                <td>
                                                    <textarea onChange={handleChange} name="num2" value={orderInfo.num2} className="w-100 h-100"></textarea>

                                                </td>
                                            </tr>
                                            <tr>
                                                <td>3</td>
                                                <td>
                                                    <div className="btn bg-secondary text-white w-100 h-100">ANALYZING</div>
                                                </td>
                                                <td>
                                                    Date or short note on analysis
                                                </td>
                                                <td>
                                                    <textarea onChange={handleChange} name="num3" value={orderInfo.num3} className="w-100 h-100"></textarea>

                                                </td>
                                            </tr>
                                            <tr>
                                                <td>4</td>
                                                <td>
                                                    <div className="btn bg-secondary text-white w-100 h-100">TO BE DELIVERED</div>
                                                </td>
                                                <td>
                                                    Estimated date of completion
                                                </td>
                                                <td>
                                                    <textarea onChange={handleChange} name="num4" value={orderInfo.num4} className="w-100 h-100"></textarea>

                                                </td>
                                            </tr>
                                        </Table>
                                    </div>

                                </div>
                            </div>
                            <div className="py-1 d-flex justify-content-end">
                                <div>
                                    <div onClick={makeEdits} className="btn  btn bg-project-deep text-white mx-3 bg">Update Status</div>
                                    {/* <div onClick={() => { enterWithData("addResault", { orderId: orderId }); }} className="btn  btn bg-project-deep text-white">Update Status</div> */}
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