import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:8081/api",
});



const getEmail = () => localStorage.getItem("email");

export const getAttendance = async () => {

    const email = getEmail();

    const response = await api.get(`/attendance/${email}`);

    return response.data;

};

export const checkIn = async () => {

    const email = getEmail();

    const response = await api.post(`/attendance/checkin/${email}`);

    return response.data;

};

export const checkOut = async () => {

    const email = getEmail();

    const response = await api.post(`/attendance/checkout/${email}`);

    return response.data;

};

export const getDashboard = async () => {

    const email = getEmail();

    const response = await api.get(`/attendance/dashboard/${email}`);


    return response.data;

};

export const getAdminAttendance = async () => {

    const response = await api.get("/attendance/admin");

    return response.data;

};

const loadDashboardStatus = async () => {

    try {

        const dashboard = await getDashboard();

        setCheckedIn(dashboard.checkIn !== "--");

        setCheckedOut(dashboard.checkedOut);

    } catch (error) {

        console.error(error);

    }

};