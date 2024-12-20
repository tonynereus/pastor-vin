import Table from "../../components/Table";
import { useState, useEffect } from "react";
import apis from "../../../assets/apis";
import TableContainer from "../../components/TableContainer";
import LoadingCenter from "../../../components/LoadingCenter";
import { errorMessae , successMessae} from "../../../assets/messages";
import Swal from "sweetalert2";
export default () => {
    const [orders, updateOrder] = useState([]);
    const [isLoading,updateLoading] = useState(false);
    const Thead = [
        "S/N",
        "Order ID",
        "Sample ID",
        // "date",
        "edate",
        "price",
        "user",
        "Action",
    ];
    //completed
    const redo = true;
    useEffect(
        () => {
            updateLoading(true);
            fetch(apis.allOrders+"?completed=1", {
                method: "GET",
                credentials: apis.credentials
            }).then(
                async (x) => {
                    updateLoading(false);
                    var resu = await x.json();
                    if (Array.isArray(resu)) {
                        updateOrder(resu);
                    } else {
                        updateOrder(resu.message);
                    }
                }
            ).catch(
                (err) => {
                    updateLoading(false);
                    updateOrder("Error while loading data");
                }
            )
        }, [redo]
    )
    const publishResult = (orderId)=>{
        Swal.fire({
            icon:"question",
            text:`Are you sure you want to publish this sample  : \b${orderId}\b `,
            confirmButtonText:"yes",
            denyButtonText:"No",
            showDenyButton:true
        }).then(
            (x)=>{
                if(x.isConfirmed){
                    updateLoading(true);
                    const fd = new FormData();
                    fd.append("orderId",orderId);
                    fetch(apis.publishSample,{
                        method:"POST",
                        body:fd,
                        credentials:"include"
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
                            errorMessae("Invalid server info");
                        }
                    )
                }
            }
        )
    }
    const RowComponent = ({sn, orderId, date, edate, price, user , refId }) => {
        return (
            <tr className="p-0 m-0 bg-danger">
                <td className="p-0">{sn}</td>
                <td className="p-0 px-2 nobreak">{refId}</td>
                <td className="p-0 px-2 nobreak">{orderId}</td>
                {/* <td className="p-0">{date}</td> */}
                <td className="p-1 px-2 nobreak">{edate}</td>
                <td className="p-1">{price}</td>
                <td className="p-1 px-2 nobreak">{user}</td>
                <td className="p-1">
                    <div onClick={() => {publishResult(orderId) }} className="m-0 px-1 d-flex mycenter h-100 text-white bg-secondary py-2 nobreak" style={{ cursor: "pointer" }}>Publish</div>
                </td>
            </tr>
        )
    }
    return (
        <>
        {
            isLoading && <LoadingCenter />
        }
        <div className="w-100 h-100 p-2 ">
            <h4>
                Completed Orders
            </h4>
            <div className="w-100 py-2">
            <TableContainer>
                    <Table tableHead={Thead}>
                        {
                            (Array.isArray(orders)) ?
                                orders.map(
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
                </TableContainer>
            </div>
        </div>
        </>
    )
}