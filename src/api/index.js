import axios from "axios";

const token = localStorage.getItem("accessToken");

const JESinstance = axios.create({
  // baseURL: "http://192.168.18.79:8080/admin/",
  baseURL: "http://65.0.104.106/admin/",
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export default JESinstance;
