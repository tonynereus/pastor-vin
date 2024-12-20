import { useEffect, useRef, useState } from "react";
import apis from "../../../assets/apis";
import Table from "../../components/Table";
import LoadingCenter from "../../../components/LoadingCenter";
import TableContainer from "../../components/TableContainer";
export default ({ enterWithData }) => {
    const [samples, updateSamples] = useState([
        {
            id: "415425131",
            sampleName: "STA508090",
            date: "18/02/2024",
        }
    ]);
    function viewSample(id) {
        enterWithData("editSample", id);
    }
    const [isLoading, updateLoading] = useState(false);
    const Thead = [
        "S/N",
        "Sample ID",
        "Sample Name",
        "Date",
        "Action ",
    ];
    const tableRow = [
        {
            id: "415425131",
            sampleName: "STA508091",
            date: "18/02/2024",
        }
    ]
    const RowComponent = ({ id, sampleName, date, sn }) => {
        return (
            <tr className="p-0 m-0 bg-danger">
                <td className="p-0">{sn}</td>
                <td className="p-0">{id}</td>
                <td className="p-0">{sampleName}</td>
                <td className="p-1">{date}</td>
                <td className="p-1">
                    <div className="m-0 d-flex mycenter h-100 text-white bg-secondary py-2" onClick={() => { viewSample({ sampleId: id }) }}>Edit</div>
                </td>
            </tr>
        )
    }
    const reload = useRef(0)
    useEffect(
        () => {
            updateLoading(true);
            fetch(apis.uploadedSampleAdmin, {
                method: "GET",
                credentials:apis.credentials
            }).then(
                async (x) => {
                    updateLoading(false);
                    var anthonia = await x.json();
                    if (Array.isArray(anthonia)) {
                        var summary = [];
                        anthonia.forEach(
                            (y) => {
                                if (y.id != undefined && y.sampleName != undefined) {
                                    summary.push(y);
                                }
                            }
                        )
                        if (summary.length > 0) {
                            updateSamples(summary);
                        } else {
                            updateSamples("No Uploaded Samples yet");
                        }
                    } else {
                        updateSamples("Internal server error");
                    }
                }
            ).catch((err) => {
                updateLoading(false);
                updateSamples("Error fetching data ");
            })
        }, []
    );
    return (
        <div className="w-100 h-100 p-2 ">
            {
                isLoading && <LoadingCenter />
            }
            <h4>
                Uploaded Samples
            </h4>
            <div className="w-100 py-2">
                <TableContainer>
                    <Table tableHead={Thead}>
                        {
                            Array.isArray(samples) ?
                                samples.map(
                                    (itm, ind) => {
                                        return (<RowComponent sn={++ind} {...itm} key={ind} />)
                                    }
                                ) : <tr>
                                    <td colSpan={Thead.length}><h5>{samples}</h5></td>
                                </tr>
                        }
                    </Table>
                </TableContainer>
            </div>
        </div>
    )
}