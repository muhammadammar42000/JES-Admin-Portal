import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import locationGreenIcon from "../../assets/location.png";
import Sky from "../../assets/sky.png";
import leftIcon from "../../assets/leftIcon.png";
import Events from "../../components/events/Events";
import SummaryBox from "../../components/summaryBox/SummaryBox";
import HomeLocation from "../../components/homeLocation/HomeLocation";
import ReportCard from "../../components/reportCard/ReportCard";
import ReportsModal from "../../components/Popups/ReportsModal/ReportsModal";
import JESinstance from "../../api";

export default function Home() {
  const [modal, setModal] = useState(false);

  const [allReportsData, setAllReportsData] = useState([]);
  const [allCategories, setAllCategories] = useState([]);
  const [allLocation, setAllLocation] = useState([]);
  const [eventArray, setEventArray] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [reportSearch, setReportSearch] = useState("");

  const getAllReports = async () => {
    const res = await JESinstance.post("getReportLoc");
    setAllReportsData(res?.data?.data);
  };
  const getAllCategory = async () => {
    const res = await JESinstance.post("getAllCategory");
    setAllCategories(res.data.data);
  };

  const getAllLocation = async () => {
    const res = await JESinstance.post("getAllLocations");
    setAllLocation(res.data.data);
  };

  const getAllEvent = async () => {
    const res = await JESinstance.post("getDashboardEvents");
    setEventArray(res.data.data);
  };
  console.log(eventArray);

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

  useEffect(() => {
    getAllReports();
    getAllCategory();
    getAllLocation();
    getAllEvent();
  }, []);
  return (
    <div>
      <Sidebar index={1} />
      {modal && <ReportsModal setModal={setModal} />}
      <div className="homeContent">
        <div className="heading text-[#1AB650] text-[25px] mt-[10px] pt-[30px] pl-[100px] font-semibold">
          <p>Dashboard</p>
        </div>

        <SummaryBox />

        <div className="location-report pl-[100px] pr-[60px] mt-[40px] gap-5">
          <div className="location w-[70%]">
            <div className="heading flex justify-between">
              <p className="heading text-[#1AB650] text-[25px] font-semibold">
                Location
              </p>
              <div className="circle w-[40px] h-[40px] flex justify-center items-center rounded-full text-[#fff] mr-[50px] bg-gradient-to-r from-[#b4cd32] to-[#1cb550]">
                {allLocation?.length}
              </div>
            </div>

            <HomeLocation
              getAllCategory={getAllCategory}
              allCategories={allCategories}
              allLocation={allLocation}
              getAllLocation={getAllLocation}
            />
          </div>
          <div className="report w-[30%]">
            <div className="heading flex justify-between">
              <p className="heading text-[#1AB650] text-[25px] font-semibold">
                Report
              </p>
              <div className="circle w-[40px] h-[40px] flex justify-center items-center rounded-full text-[#fff] mr-[50px] bg-gradient-to-r from-[#b4cd32] to-[#1cb550]">
                {allReportsData?.length}
              </div>
            </div>
            <div className="reportContent overflow-y-scroll scroll-smooth pt-[20px] px-[15px]  mt-[20px] rounded-[20px]">
              <ReportCard
                getAllReports={getAllReports}
                filterData={filterData}
                allReportsData={allReportsData}
              />
            </div>
          </div>
        </div>

        <div className="event">
          <div className="heading text-[#1AB650] text-[25px] mt-[10px] pt-[30px] pl-[100px] font-semibold">
            <p>Event</p>
          </div>
          <div className="eventContent ml-[100px] mr-[60px] mt-[10px] rounded-[20px] p-[30px] mb-[30px] h-[500px] overflow-y-scroll scroll-smooth locationScroll">
            <Events filterData={eventArray} getAllEvent={getAllEvent} />
          </div>
        </div>
      </div>
    </div>
  );
}
