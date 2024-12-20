import { useState, useEffect } from "react";
import style from "./style.module.css";
import Table from "../../components/Table";
import apis from "../../../assets/apis";
import LoadingCenter from "../../../components/LoadingCenter";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilePdf } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import { errorMessae, successMessae } from "../../../assets/messages";
export default ({ extraData, enterWithData }) => {
    const ValidData = () => {
        const [isLoading, updateLoading] = useState(false);
        const [message, changeMessage] = useState("");
        const orderId = extraData.orderId;
        const [pageLoaded, updatePage] = useState(true);
        const [result,updateResult] = useState({
            note: "Add note here ...",
            pdf:null,
            fileName:null
        });
        function handleChange(e) {
            updateResult({
                ...result,
                [e.target.name]: e.target.value
            })
        }
        function selectPDFFile(callback) {
            // Create an input element of type 'file'
            var input = document.createElement('input');
            input.type = 'file';
            input.accept = 'application/pdf'; // Limit to only PDF files
    
            // Add change event listener to handle file selection
            input.addEventListener('change', function (event) {
                var file = event.target.files[0]; // Get the selected file
    
                // Check if a file is selected
                if (file) {
                    // Check if the selected file is a PDF
                    if (file.type === 'application/pdf') {
                        // Use FileReader to read the file
                        var reader = new FileReader();
                        reader.onload = function (event) {
                            // Pass the selected file content to the callback function
                            callback(null, {
                                name: file.name,
                                content: event.target.result,
                                pdf: file
                            });
                        };
                        reader.onerror = function (event) {
                            // Handle FileReader errors
                            callback('Error reading file');
                        };
                        reader.readAsDataURL(file); // Read file as Data URL
                    } else {
                        // Notify user if the selected file is not a PDF
                        callback('Please select a PDF file');
                    }
                } else {
                    // Notify user if no file is selected
                    callback('No file selected');
                }
            });
    
            // Trigger click event to open file dialog
            input.click();
        }
    
        // Example usage:
        function SelectPDf() {
            selectPDFFile(function (error, file) {
                if (error) {
                    console.error(error);
                } else {
                    updateResult({
                        ...result,
                        fileName: file.name,
                        pdf: file.pdf
                    })
                    // console.log('Selected file:', file);
                    // Here, you can use the selected file data as needed
                }
            });
        }
        const attachResult = ()=>{
            Swal.fire({
                icon:"question",
                text:"Are you sure you want to attach the result to this order this will automatically complete this order ?",
                confirmButtonText:"yes",
                denyButtonText:"No",
                showDenyButton:true
            }).then(
                (x)=>{
                    if(x.isConfirmed){
                        updateLoading(true);
                        const fd = new FormData();
                        fd.append("orderId",orderId);
                        for(var i in result){
                            fd.append(i,result[i]);
                        }
                        fetch(apis.uploadResult,{
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
                                    <div className="col-8 col-md-5">
                                        <div className="w-100 py-2">
                                            <textarea style={{height:"100px"}} className="w-100" onChange={handleChange} name="note" value={result.note}></textarea>
                                        </div>
                                        <div className="w-75 mt-2 m-auto">
                                            <div className="w-100 p-2 bg-white" style={{height:"30px"}}>
                                                {
                                                    result.fileName != null ? <>
                                                    <FontAwesomeIcon icon={faFilePdf}/> {result.fileName}
                                                    </>:<></>
                                                }
                                            </div>
                                        </div>
                                        <div className="w-100 py-2 d-flex justify-content-center">
                                            <div className="btn btn-danger py-1" onClick={SelectPDf}>Attach Result pdf</div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                            <div className="py-1 d-flex justify-content-center">
                                <div>
                                    <div onClick={attachResult} className="btn  btn bg-project-deep text-white mx-3 bg">Upload Result</div>
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