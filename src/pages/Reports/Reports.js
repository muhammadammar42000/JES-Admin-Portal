import React, { useState } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import ReportCard from "../../components/reportCard/ReportCard";
import JESinstance from "../../api";
import { useEffect } from "react";

export default function Reports() {
  const [allReportsData, setAllReportsData] = useState([]);
  const [reportSearch, setReportSearch] = useState("");
  const [filterData, setFilterData] = useState([]);

  const getAllReports = async () => {
    const res = await JESinstance.post("getReportLoc");
    setAllReportsData(res?.data?.data);
  };
  console.log(allReportsData);

  useEffect(() => {
    getAllReports();
  }, []);

  useEffect(() => {
    const searchReportData = reportSearch
      ? allReportsData?.filter((item) =>
          item?.childLocation?.title
            ?.toLowerCase()
            .includes(reportSearch.toLowerCase())
        )
      : allReportsData;
    setFilterData(searchReportData);
  }, [reportSearch, getAllReports]);

  return (
    <div>
      <div>
        <Sidebar index={5} />
        <div className="heading flex justify-between mt-[10px] pt-[30px] pl-[100px] pr-[60px] mb-[30px]">
          <div className="text-[#1AB650] text-[25px] flex font-semibold">
            <p>Reports / Suggestions</p>

            <div className="circle w-[40px] h-[40px] flex ml-[20px] justify-center items-center rounded-full text-[#fff] mr-[50px] bg-gradient-to-r from-[#b4cd32] to-[#1cb550]">
              <p className="text-[20px]">{allReportsData.length}</p>
            </div>
          </div>
          <div className="text-[15px] text-normal ">
            <input
              className="h-[40px] p-[10px] border-[1px] border-solid focus:outline-none border-[#1cb750] rounded-[10px] dropShadow"
              placeholder="Search by Location Title"
              type="search"
              onChange={(e) => setReportSearch(e.target.value)}
            />
          </div>
        </div>

        <div className="reportAndSuggestion pl-[100px]">
          <ReportCard
            filterData={filterData}
            getAllReports={getAllReports}
            allReportsData={allReportsData}
          />
        </div>
      </div>
    </div>
  );
}
