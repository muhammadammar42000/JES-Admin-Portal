import React from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import GlobalButton from "../../components/globalButton/GlobalButton";
import PrivacyPageIcon from "../../assets/JES-Admin-Portal-Assets-01.png";
import { toast } from "react-toastify";
import JESinstance from "../../api/index";
import { useState } from "react";
import { useEffect } from "react";

export default function PrivacyPolicy() {
  const [privacyPolicyData, setPrivacyPolicyData] = useState("");
  const [getPolicyData, setGetPolicyData] = useState([]);

  const getPolicy = async () => {
    const body = {
      id: "cacf1a0a-5964-47c0-83e2-c1a72bd11e66",
    };
    const res = await JESinstance.post("getPolicy", body);
    setGetPolicyData(res?.data?.data?.description);
  };
  const handleSavePrivacy = async () => {
    try {
      const body = {
        description: privacyPolicyData,
      };
      await JESinstance.post("addPolicy", body);
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

  const handleUpdatePrivacy = async () => {
    try {
      const body = {
        id: "cacf1a0a-5964-47c0-83e2-c1a72bd11e66",
        description: privacyPolicyData,
      };
      await JESinstance.post("updatePolicy", body);
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
      getPolicy();
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getPolicy();
  }, []);

  return (
    <div>
      <Sidebar index={9} />
      <div className="heading text-[#1AB650] text-[25px] mt-[10px] pt-[30px] pl-[100px] font-semibold">
        <p>Privacy Policy</p>
      </div>

      <div className="flex justify-center items-center flex-col">
        <div className="m-[30px]">
          <img className="w-[215px]" src={PrivacyPageIcon} />
        </div>

        <div className="w-[86%] ml-[30px]">
          <textarea
            className="focus:outline-none text-[#666] focus:ring focus:border-green-500 mt-[10px] w-[100%] rounded-[20px] dropShadowForAboutPage h-[400px] p-[20px] overflow-y-scroll scroll-smooth locationScroll"
            placeholder="Enter Your Details Here ..."
            onChange={(e) => setPrivacyPolicyData(e.target.value)}
            defaultValue={getPolicyData}
          />
        </div>

        {getPolicyData.length > 1 ? (
          <div onClick={handleUpdatePrivacy} className="mt-[40px]">
            <GlobalButton btnTitle={"Update"} />
          </div>
        ) : (
          <div onClick={handleSavePrivacy} className="mt-[40px]">
            <GlobalButton btnTitle={"Save"} />
          </div>
        )}
      </div>
    </div>
  );
}
