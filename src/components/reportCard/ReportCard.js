import React from "react";

//Icons
import locationGreenIcon from "../../assets/location.png";
import leftIcon from "../../assets/leftIcon.png";
import { useState } from "react";
import ReportsModal from "../../components/Popups/ReportsModal/ReportsModal";
import moment from "moment";
import JESinstance from "../../api";
import { toast } from "react-toastify";

export default function ReportCard({ filterData, getAllReports }) {
  const [reportModal, setReportModal] = useState(false);
  const [reportCardData, setReportCardData] = useState([]);

  const handleDeleteReport = async (reportData) => {
    const body = {
      id: reportData?.id,
      status: true,
    };
    await JESinstance.post("deleteReport", body);
    toast.success("Report Deleted Successfully", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    getAllReports();
  };

  return (
    <>
      {reportModal && (
        <ReportsModal
          reportCardData={reportCardData}
          setReportModal={setReportModal}
        />
      )}
      {filterData?.map((reportData) => (
        <div
          onClick={() => {
            setReportModal(true);
            setReportCardData(reportData);
          }}
          className="reportCard cursor-pointer dropShadow flex p-[10px] rounded-[10px] gap-[20px]"
        >
          <div className="imgDiv w-[120px]">
            <img
              className="w-[110px] h-[70px] rounded-[5px] object-cover"
              src={reportData.image}
            />
          </div>
          <div className="descDiv w-[300px] flex">
            <div className="ammar w-[60%]">
              <p className="text-[#11B0E4] text-[10px] dateCheck">
                {moment(reportData?.createdAt).format("MMM Do YYYY, h:mm a")}
              </p>
              <p className="text-[#11B0E4] text-[11px] font-semibold leading-3 headingCheck w-[110px] overflow-hidden text-ellipsis whitespace-nowrap">
                {reportData?.childLocation?.title?.toUpperCase()}
              </p>
              <div className="flex justify-between">
                <p className="text-[#1AB650] text-[9px] mt-[15px] font-semibold locationCheck w-[110px] overflow-hidden text-ellipsis whitespace-nowrap">
                  {reportData?.reportTitle?.toUpperCase()}
                </p>
              </div>
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteReport(reportData);
                }}
                className="deleteReport w-[80px] px-[10px] mt-[10px] py-[2px] bg-[#D11A2A] text-white font-semibold rounded-[20px] cursor-pointer"
              >
                DELETE
              </div>
            </div>
            <div className="ammar1 w-[40%] flex flex-col items-end justify-between">
              <div className="flex">
                <img src={locationGreenIcon} className="w-[10px] h-[15px]" />
                <p className="text-[#1AB650] pl-[5px] text-[11px] leading-4 w-[80px] overflow-hidden text-ellipsis whitespace-nowrap">
                  {reportData?.childLocation?.address.split(",")[0]}
                </p>
              </div>
              <div>
                <img className="h-[10px]" src={leftIcon} />
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
