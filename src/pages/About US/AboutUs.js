import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import siteLogo from "../../assets/JES-Admin-Portal-Assets-02.png";
import GlobalButton from "../../components/globalButton/GlobalButton";
import { toast } from "react-toastify";
import JESinstance from "../../api";

export default function AboutUs() {
  const [aboutUsData, setAboutUsData] = useState("");
  const [getAboutData, setGetAboutData] = useState([]);

  const handleSaveAbout = async () => {
    try {
      const body = {
        description: aboutUsData,
      };
      await JESinstance.post("addAboutUs", body);
      toast.success("Request Updated Successfully", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  const getAboutUs = async () => {
    const body = {
      id: "d9e58387-c0f3-4928-820a-9c83b35dfbe9",
    };
    const res = await JESinstance.post("getAboutUs", body);
    setGetAboutData(res?.data?.data?.description);
  };

  const handleUpdateAbout = async () => {
    try {
      const body = {
        id: "d9e58387-c0f3-4928-820a-9c83b35dfbe9",
        description: aboutUsData,
      };
      await JESinstance.post("updateAboutUs", body);
      toast.success("Request Updated Successfully", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      getAboutUs();
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getAboutUs();
  }, []);

  return (
    <div>
      <Sidebar index={8} />
      <div className="heading text-[#1AB650] text-[25px] mt-[10px] pt-[30px] pl-[100px] font-semibold">
        <p>About us</p>
      </div>

      <div className="flex justify-center items-center flex-col">
        <div className="m-[30px]">
          <img className="w-[200px]" src={siteLogo} />
        </div>

        <div className="w-[86%] ml-[30px]">
          <textarea
            className="focus:outline-none text-[#666] focus:ring focus:border-green-500 mt-[10px] w-[100%] rounded-[20px] dropShadowForAboutPage h-[400px] p-[20px] overflow-y-scroll scroll-smooth locationScroll"
            placeholder="Enter Your Details Here ..."
            onChange={(e) => setAboutUsData(e.target.value)}
            defaultValue={getAboutData}
          />
        </div>
        {getAboutData.length > 1 ? (
          <div onClick={handleUpdateAbout} className="mt-[40px]">
            <GlobalButton btnTitle={"Update"} />
          </div>
        ) : (
          <div onClick={handleSaveAbout} className="mt-[40px]">
            <GlobalButton btnTitle={"Save"} />
          </div>
        )}
      </div>
    </div>
  );
}
