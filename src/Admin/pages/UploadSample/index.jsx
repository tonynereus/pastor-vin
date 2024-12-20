import style from "./style.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilePdf } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import LoadingCenter from "../../../components/LoadingCenter";
import apis from "../../../assets/apis";
import Swal from "sweetalert2";
import { errorMessae } from "../../../assets/messages";
export default () => {
    const [isLoading, updateLoading] = useState(false);
    const [formParams, updateForm] = useState(
        {
            city: "",
            purchaseIntent: "",
            effect: "",
            sampleColor: "",
            sampleForm: "",
            consumptionMethod: "",
            notes: "",
            pdf: undefined,
            fileName: ""
        }
    )
    function handleChange(evt) {
        updateForm({
            ...formParams,
            [evt.target.name]: evt.target.value
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
                updateForm((prev) => {
                    return {
                        ...prev,
                        fileName: file.name,
                        pdf: file.pdf
                    }
                })
                // console.log('Selected file:', file);
                // Here, you can use the selected file data as needed
            }
        });
    }
    const handleSubmit = () => {
        if (!isLoading) {
            updateLoading(true);
            var fd = new FormData();
            for (var value in formParams) {
                fd.append(value, formParams[value]);
            }
            fetch(apis.uploadSampleAdmin, {
                method: "POST",
                body: fd,
                credentials:apis.credentials
                // headers:{
                //     "Content-Type":"multipart/form-data"
                // }
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
                    console.log("Unknown error occured", err);
                }
            )
        }
    }
    return (
        <>
            {
                isLoading && <LoadingCenter />
            }
            <div className="w-100 h-100 p-3 row m-0 justify-content-center  overflow-auto">
                <div className="col-md-9 col-11">
                    <div className="py-3 ">
                        <svg xmlns="http://www.w3.org/2000/svg" width="55" height="16" viewBox="0 0 55 16" fill="none">
                            <path d="M0.292889 7.29289C-0.0976334 7.68342 -0.0976334 8.31658 0.292889 8.70711L6.65685 15.0711C7.04737 15.4616 7.68054 15.4616 8.07106 15.0711C8.46159 14.6805 8.46159 14.0474 8.07106 13.6569L2.41421 8L8.07106 2.34315C8.46159 1.95262 8.46159 1.31946 8.07106 0.928932C7.68054 0.538408 7.04737 0.538408 6.65685 0.928932L0.292889 7.29289ZM55 7L0.999996 7V9L55 9V7Z" fill="black" />
                        </svg>
                        <div className="mt-1 text-secondary">
                            <h5>SAMPLE ID: XXXXXXXXBF</h5>
                            <div>
                                Sample Information
                            </div>
                        </div>
                    </div>
                    <div className="w-100 row m-0">
                        <div className="col-md-6 p-0 m-0">
                            <div className="w-100">
                                <label htmlFor="" className="text-secondary" style={{ fontSize: 16, fontWeight: 500 }}>Substance Name</label>
                                <input onChange={handleChange} name="substanceName" className="form-control" placeholder="Substance Name" />
                            </div>
                            <div className="w-100">
                                <label htmlFor="" className="text-secondary" style={{ fontSize: 16, fontWeight: 500 }}>City</label>
                                <input onChange={handleChange} name="city" className="form-control" placeholder="City" />
                            </div>
                            <div className="w-100 mt-1">
                                <label>Purchase Intent</label>
                                <input onChange={handleChange} name="purchaseIntent" className="form-control" placeholder="Purchase Intent" />
                            </div>
                            <div className="w-100 mt-1">
                                <label htmlFor="">Reported Effects</label>
                                <input onChange={handleChange} name="effect" className="form-control" placeholder="Reported Effects" />
                            </div>
                            <div className="w-100 mt-1">
                                <label htmlFor="">Sample Colour</label>
                                <input onChange={handleChange} name="sampleColor" className="form-control" placeholder="Sample Colour" />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="w-100 mt-1">
                                <label htmlFor="">Sample Form</label>
                                <input onChange={handleChange} name="sampleForm" className="form-control" placeholder="Sample Form" />
                            </div>
                            <div className="w-100 mt-1">
                                <label htmlFor="">Consumption Method</label>
                                <input onChange={handleChange} name="consumptionMethod" className="form-control" placeholder="Consumption Method" />
                            </div>
                            <div className="w-100 mt-1">
                                <label htmlFor="">Notes</label>
                                <input onChange={handleChange} name="notes" className="form-control" placeholder="Add any notes" />
                            </div>
                            <div className="w-100 mt-3">
                                <div className="w-100 bg-white text-dark" style={{ height: "50px" }}>
                                    {
                                        formParams.pdf != undefined && <><div className="d-flex">
                                            <div className="px-2">
                                                <FontAwesomeIcon icon={faFilePdf} color="#222" />
                                            </div>
                                            {formParams.fileName}
                                        </div></>
                                    }
                                </div>
                            </div>
                            <div className="w-100 d-flex mt-2">
                                <div className="w-50 p-3 d-flex px-2">
                                    <div className="btn btn-danger w-100 py-2" onClick={SelectPDf}>Attach PDF</div>
                                </div>
                                <div className="w-50 p-3 d-flex px-2">
                                    <div className="btn bg-project-deep text-white w-100 py-2" onClick={handleSubmit}>Publish</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}