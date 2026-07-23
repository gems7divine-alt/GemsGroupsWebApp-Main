// import axios from "axios";

// const api = axios.create({
//     baseURL: "http://82.25.104.27:8080/api",
// });



// const getEmail = () => localStorage.getItem("email");

// export const getAttendance = async () => {

//     const email = getEmail();

//     const response = await api.get(`/attendance/${email}`);

//     return response.data;

// };

// export const checkIn = async () => {

//     const email = getEmail();

//     const response = await api.post(`/attendance/checkin/${email}`);

//     return response.data;

// };

// export const checkOut = async () => {

//     const email = getEmail();

//     const response = await api.post(`/attendance/checkout/${email}`);

//     return response.data;

// };

// export const getDashboard = async () => {

//     const email = getEmail();

//     const response = await api.get(`/attendance/dashboard/${email}`);


//     return response.data;

// };

// export const getAdminAttendance = async () => {

//     const response = await api.get("/attendance/admin");

//     return response.data;

// };

// const loadDashboardStatus = async () => {

//     try {

//         const dashboard = await getDashboard();

//         setCheckedIn(dashboard.checkIn !== "--");

//         setCheckedOut(dashboard.checkedOut);

//     } catch (error) {

//         console.error(error);

//     }

// };

import axios from "axios";

const api = axios.create({
  baseURL: "/api",
  headers: {
    "Content-Type": "application/json",
  },
});

const getEmail = () => localStorage.getItem("email");

// Get Attendance
export const getAttendance = async () => {
  const email = getEmail();

  const response = await api.get(`/attendance/${email}`);

  return response.data;
};

// Check In
export const checkIn = async () => {
  const email = getEmail();

  const response = await api.post(`/attendance/checkin/${email}`);

  return response.data;
};

// Check Out
export const checkOut = async () => {
  const email = getEmail();

  const response = await api.post(`/attendance/checkout/${email}`);

  return response.data;
};

// Dashboard
export const getDashboard = async () => {
  const email = getEmail();

  const response = await api.get(`/attendance/dashboard/${email}`);

  return response.data;
};

// Admin Attendance
export const getAdminAttendance = async () => {
  const response = await api.get("/attendance/admin");

  return response.data;
};