import React, { useEffect, useState } from "react";
import { Clock, CheckCircle } from "lucide-react";
import {
    checkIn,
    checkOut,
    getDashboard,
} from "../../api/attendanceApi";

const ActionButtons = ({ status }) => {

    const [loading, setLoading] = useState(false);

    const [checkedIn, setCheckedIn] = useState(false);

    const [checkedOut, setCheckedOut] = useState(false);

    const [message, setMessage] = useState("");

    useEffect(() => {

        loadDashboardStatus();

    }, []);

    const loadDashboardStatus = async () => {

        try {

            const dashboard = await getDashboard();

            if (dashboard.checkIn !== "--") {

                setCheckedIn(true);

            }

            if (
                dashboard.workingHours &&
                dashboard.workingHours !== "00:00"
            ) {

                setCheckedOut(true);

            }

        } catch (e) {

            console.log(e);

        }

    };

    const handleCheckIn = async () => {

        setLoading(true);

        try {

            const response = await checkIn();

            setMessage(response);

            setCheckedIn(true);

            window.location.reload();

        } catch (error) {

            setMessage("Check In Failed");

        }

        setLoading(false);

    };

    const handleCheckOut = async () => {

        setLoading(true);

        try {

            const response = await checkOut();

            setMessage(response);

            setCheckedOut(true);

            window.location.reload();

        } catch (error) {

            setMessage("Check Out Failed");

        }

        setLoading(false);

    };

    return (

        <>
            <div className="glass-card p-5">

                <h2 className="text-xl font-bold text-white mb-5">

                    Quick Actions

                </h2>

                <button

                    onClick={handleCheckIn}

                    disabled={checkedIn || loading}

                    className="w-full mb-4 px-4 py-3 rounded-lg bg-yellow-500 text-black font-bold disabled:bg-gray-500"

                >

                    <Clock className="inline mr-2"/>

                    {

                        loading
                            ? "Processing..."
                            : checkedIn
                            ? "Checked In"
                            : "Check In"

                    }

                </button>

                <button

                    onClick={handleCheckOut}

                    disabled={!checkedIn || checkedOut || loading}

                    className="w-full px-4 py-3 rounded-lg bg-green-500 text-white font-bold disabled:bg-gray-500"

                >

                    <CheckCircle className="inline mr-2"/>

                    {

                        checkedOut
                            ? "Checked Out"
                            : "Check Out"

                    }

                </button>

            </div>

            {

                message && (

                    <div className="fixed bottom-5 right-5 bg-black text-white px-5 py-3 rounded-lg">

                        {message}

                    </div>

                )

            }

        </>

    );

};

export default ActionButtons;