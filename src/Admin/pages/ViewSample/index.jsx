import style from "./style.module.css";
import { useEffect, useRef, useState } from "react";
import LoadingCenter from "../../../components/LoadingCenter";
import apis from "../../../assets/apis";

export default ({ extraData , enterWithData}) => {
    const ValidData = () => {
        const [isLoading, updateLoading] = useState(false);
        const [message,changeMessage] = useState("");
        const sampleId = extraData.sampleId;
        const orderId = extraData.orderId;
        const sampleN = extraData.sample;
        const [pageLoaded, updatePage] = useState(false);
        const [formParams, updateForm] = useState(
            {
                // substance:"",
                substance:"",
                city:"",
                Form:"",
                color:"",
                consumptionMethod:"",
                effect:"",
                
                purchaseDate:""
            }
        );
        const getSampleData = 1;
        useEffect(() => {
            updateLoading(true);
            const fd = new FormData();
            fd.append("sampleId", sampleId);
            fetch(apis.getSampleDetail, {
                method: "POST",
                body: fd,
                credentials:apis.credentials
            }).then(
                async (x) => {
                    updateLoading(false);
                    var resu = await x.json();
                    if(resu.substance != undefined){
                        updatePage(true);
                        updateForm(
                            {
                                ...formParams,
                                ...resu,
                            }
                        )
                    }else{
                        changeMessage("Internal server error");
                    }
                }
            ).catch(
                (err) => {
                    updateLoading(false);
                    changeMessage("Error Occured while loading page");
                }
            )
        }, [getSampleData])
        return (
            <>
                {
                    isLoading && <LoadingCenter />
                }
                {
                    pageLoaded ? <>

                        <div className="w-100 h-100 p-3 row m-0 justify-content-center">
                            <div className="col-md-9 col-11 h-100 overflow-auto">
                                <div className="py-3 ">
                                    <svg onClick={()=>{enterWithData("viewOrder",{orderId:orderId})}} xmlns="http://www.w3.org/2000/svg" width="55" height="16" viewBox="0 0 55 16" fill="none">
                                        <path d="M0.292889 7.29289C-0.0976334 7.68342 -0.0976334 8.31658 0.292889 8.70711L6.65685 15.0711C7.04737 15.4616 7.68054 15.4616 8.07106 15.0711C8.46159 14.6805 8.46159 14.0474 8.07106 13.6569L2.41421 8L8.07106 2.34315C8.46159 1.95262 8.46159 1.31946 8.07106 0.928932C7.68054 0.538408 7.04737 0.538408 6.65685 0.928932L0.292889 7.29289ZM55 7L0.999996 7V9L55 9V7Z" fill="black" />
                                    </svg>
                                    <div className="mt-1 text-secondary">
                                        <h5>SAMPLE ID: {orderId}</h5>
                                        <div>
                                            Details
                                        </div>
                                    </div>
                                </div>
                                <div  className="w-100 row m-0 mt-3">
                                    <div className="col-md-6">
                                        <div className="w-100">
                                            <label className={style.label}>
                                              Substance
                                            </label>
                                            <div className="mt-1  w-100">
                                                <input readOnly value={formParams.substance} name="alias" type="text" className={style.inputMy} />
                                            </div>
                                        </div>
                                        <div className="w-100">
                                            <label className={style.label}>
                                                City of accquisition
                                            </label>
                                            <div className="mt-1  w-100">
                                                <input readOnly value={formParams.city} required placeholder="Origin for your sample" name="country" type="text" className={style.inputMy} />
                                            </div>
                                        </div>
                                        <div className="w-100">
                                            <label className={style.label}>
                                                Color
                                            </label>
                                            <div className="mt-1  w-100">
                                                <input  readOnly value={formParams.color} placeholder="Substance to analyze" name="sampleName" required type="text" className={style.inputMy} />
                                            </div>
                                        </div>
                                        <div className="w-100">
                                            <label className={style.label}>
                                                Substance Form
                                            </label>
                                            <div className="mt-1  w-100">
                                                <input readOnly value={formParams.Form} placeholder="Presentation" required name="shape" type="text" className={style.inputMy} />
                                            </div>
                                        </div>
                                        <div className="w-100">
                                            <label className={style.label}>
                                                Consumption Method 
                                            </label>
                                            <div className="mt-1  w-100">
                                                <input readOnly value={formParams.consumptionMethod} placeholder="Administration" name="admin" type="text" className={style.inputMy} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="w-100">
                                            <label className={style.label}>
                                            Reported Effects
                                            </label>
                                            <div className="mt-1  w-100">
                                                <input readOnly value={formParams.effect} placeholder="Context" name="purchaseLocation" required type="text" className={style.inputMy} />
                                            </div>
                                        </div>
                                        <div className="w-100">
                                            <label className={style.label}>
                                                When?
                                            </label>
                                            <div className="mt-1  w-100">
                                                <input readOnly value={formParams.purchaseDate} name="purchaseDate"  required type="date" className={style.inputMy} />
                                            </div>
                                        </div>
                                    </div>
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
            <div className="px-3 py-2 h4 text-danger">Sample Id not Found</div>
        )
    }
    return (
        <>
            {
                (extraData != undefined && extraData.sampleId != undefined) ? <ValidData /> : <Invalid />
            }
        </>
    )
}