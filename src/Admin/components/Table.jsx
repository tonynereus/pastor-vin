import style from "./style.module.css";
import colors from "../../assets/colors";
export default ({tableHead,children})=>{
    const tAry = [];
    if(Array.isArray(tableHead)){
        tableHead.forEach(
            (x)=>{
               tAry.push(x);
            }
        )
    }
    return(
        <div className="w-100 h-100 overflow-auto">
            <table className="table w-100 ">
                <thead className={style.thead} >
                   <tr className="sticky-top">
                       {
                        tAry.map(
                            (elm,ind)=>{
                                return(
                                    <th className={style.tname} style={{background:"#01063D",color:"#fff"}} key={ind} >{elm}</th>
                                )
                            }
                        )
                       }
                   </tr>
                </thead>
                <tbody className={style.tbody}>
                    {
                        children
                    }
                </tbody>
            </table>
        </div>
    )
}