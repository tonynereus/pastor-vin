import { useEffect, useState } from "react";
import Table from "../../components/Table"
import TableContainer from "../../components/TableContainer";
import apis from "../../../assets/apis";
import LoadingCenter from "../../../components/LoadingCenter";
export default () => {
    const Thead = [
        "S/N",
        "username",
        "email",
        "Date",
        "Opened Orders",
    ];
    const [users, updateUsers] = useState([
        {
            username: "",
            email: "example@gmail.com",
            date: "12/02/2024",
            openOrders: 2
        }
    ]);
    const [isLoading, updateLoading] = useState(false);

    useEffect(
        () => {
            updateLoading(true);
            fetch(apis.getUsers, {
                method: "POST"
            }).then(
                async (x) => {
                    updateLoading(false);
                    var resu = await x.json();
                    if (Array.isArray(resu)) {
                        var ary = [];
                        resu.forEach(res => {
                            if (res.uname !== undefined && res.email !== undefined) {
                                ary.push(res);
                            }
                        });
                        if (ary.length > 0) {
                            updateUsers(ary);
                        } else {
                            updateUsers("No registered user yet");
                        }
                    } else {
                        updateUsers("Internal server error");
                    }
                }
            ).catch(
                (er)=>{
                    updateLoading(false);
                }
            )
        }, []
    )
    const tableRow = [
        {
            username: "chemtester02",
            email: "example@gmail.com",
            date: "12/02/2024",
            openOrders: 2
        },
        {
            username: "chemtester02",
            email: "example@gmail.com",
            date: "12/02/2024",
            openOrders: 2
        },
        {
            username: "chemtester02",
            email: "example@gmail.com",
            date: "12/02/2024",
            openOrders: 2
        },
        {
            username: "chemtester02",
            email: "example@gmail.com",
            date: "12/02/2024",
            openOrders: 2
        },
        {
            username: "chemtester02",
            email: "example@gmail.com",
            date: "12/02/2024",
            openOrders: 2
        },
        {
            username: "chemtester02",
            email: "example@gmail.com",
            date: "12/02/2024",
            openOrders: 2
        },
        {
            username: "chemtester02",
            email: "example@gmail.com",
            date: "12/02/2024",
            openOrders: 2
        },
        {
            username: "chemtester02",
            email: "example@gmail.com",
            date: "12/02/2024",
            openOrders: 2
        },
        {
            username: "chemtester02",
            email: "example@gmail.com",
            date: "12/02/2024",
            openOrders: 2
        },
        {
            username: "chemtester02",
            email: "example@gmail.com",
            date: "12/02/2024",
            openOrders: 2
        },
        {
            username: "chemtester02",
            email: "example@gmail.com",
            date: "12/02/2024",
            openOrders: 2
        },
        {
            username: "chemtester02",
            email: "example@gmail.com",
            date: "12/02/2024",
            openOrders: 2
        },
        {
            username: "chemtester02",
            email: "example@gmail.com",
            date: "12/02/2024",
            openOrders: 2
        },
        {
            username: "chemtester02",
            email: "example@gmail.com",
            date: "12/02/2024",
            openOrders: 2
        },
        {
            username: "chemtester02",
            email: "example@gmail.com",
            date: "12/02/2024",
            openOrders: 2
        },
        {
            username: "chemtester02",
            email: "example@gmail.com",
            date: "12/02/2024",
            openOrders: 2
        },
        {
            username: "chemtester02",
            email: "example@gmail.com",
            date: "12/02/2024",
            openOrders: 2
        },
        {
            username: "chemtester02",
            email: "example@gmail.com",
            date: "12/02/2024",
            openOrders: 2
        },
        {
            username: "chemtester02",
            email: "example@gmail.com",
            date: "12/02/2024",
            openOrders: 2
        },
        {
            username: "chemtester02",
            email: "example@gmail.com",
            date: "12/02/2024",
            openOrders: 2
        },
        {
            username: "chemtester02",
            email: "example@gmail.com",
            date: "12/02/2024",
            openOrders: 2
        },
        {
            username: "chemtester02",
            email: "example@gmail.com",
            date: "12/02/2024",
            openOrders: 2
        },
        {
            username: "chemtester02",
            email: "example@gmail.com",
            date: "12/02/2024",
            openOrders: 2
        },
        {
            username: "chemtester02",
            email: "example@gmail.com",
            date: "12/02/2024",
            openOrders: 2
        },
        {
            username: "chemtester02",
            email: "example@gmail.com",
            date: "12/02/2024",
            openOrders: 2
        },
    ]
    const RowComponent = ({ uname, email, date, openOrders = 0, sn }) => {
        return (
            <tr className="p-0 m-0 bg-danger">
                <td className="">{sn}</td>
                <td className="p-0">{uname}</td>
                <td className="p-0">{email}</td>
                <td className="p-1">{date}</td>
                <td className="p-1">{openOrders}</td>
            </tr>
        )
    }
    return (
        <>
        {
            isLoading && <LoadingCenter/>
        }
        <div className="w-100 h-100 p-2 ">
            <h4>
                All Users
            </h4>
            <div className="w-100 py-2">
                <TableContainer>
                    <Table tableHead={Thead}>
                        {
                            Array.isArray(users) ?
                                users.map(
                                    (itm, ind) => {
                                        return (<RowComponent sn={++ind} {...itm} key={ind} />)
                                    }
                                ) :
                                <tr>
                                    <td colSpan={Thead.length}><h5>{samples}</h5></td>
                                </tr>
                        }
                    </Table>
                </TableContainer>
            </div>
        </div>
        </>
    )
}