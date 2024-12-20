import { useEffect, useState } from "react";
import Table from "../../components/Table"
import apis from "../../../assets/apis";
import TableContainer from "../../components/TableContainer";
import LoadingCenter from "../../../components/LoadingCenter";
export default ({ enterWithData }) => {
    const [orders, updateOrder] = useState([]);
    const [isLoading,updateLoading] = useState(false);
    const Thead = [
        "S/N",
        "Pay Status",
        "Order ID",
        "Action 1",
        "Action 2",
        "Action 3",

    ];
    const viewOrder = (id, action ,payS = 0) => {
        switch (action) {
            case 1:
                //console.log(payS,"yy");
                enterWithData("viewOrder", { orderId: id , payS: payS});
                break;
            case 2:
                enterWithData("editStatus", { orderId: id });
                break;
            case 3:
                enterWithData("addResault", { orderId: id });
                break;
            default:
                enterWithData("viewOrder", { orderId: id });
                break;
        }
    }
    const tableRow = [
        {
            userName: "415425131",
            orderId: "STA508090",
            date: "18/02/2024",
        }
    ]
    const redo = true;
    useEffect(
        () => {
            updateLoading(true);
            fetch(apis.allOrders, {
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
    const RowComponent = ({ payS, orderId, date, sn , refId}) => {
        return (
            <tr className="p-0 m-0 bg-danger">
                <td className="p-0">{sn}</td>
                <td className="p-0">{payS ? <><span className="text-success">Paid</span></>:<><span className="text-danger">Not Paid</span></>}</td>
                <td className="p-0"><span className="px-2">{refId}</span></td>
                {/* <td className="p-1">{date}</td> */}
                <td className="p-1">
                    <div onClick={() => { viewOrder(orderId, 1,payS) }} className="m-0 d-flex mycenter h-100 text-white bg-secondary py-2" style={{ cursor: "pointer" }}>View</div>
                </td>
                <td className="p-1">
                    <div onClick={() => { viewOrder(orderId, 2) }} className="m-0 px-1 d-flex mycenter h-100 text-white bg-secondary py-2 nobreak" style={{ cursor: "pointer" }}>Edit Status</div>
                </td>
                <td className="p-1">
                    <div onClick={() => { viewOrder(orderId, 3) }} className="m-0 px-1 d-flex mycenter h-100 text-white bg-secondary py-2 nobreak" style={{ cursor: "pointer" }}>Upload Result</div>
                </td>
            </tr>
        )
    }
    return (
       <>
        {
            isLoading && <LoadingCenter />
        }
        <div className="w-100 h-100 p-2">
            <h4>
                Orders
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