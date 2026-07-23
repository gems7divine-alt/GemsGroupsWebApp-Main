// import React, { useEffect, useState } from "react";
// import { Clock, CheckCircle } from "lucide-react";
// import {
//     checkIn,
//     checkOut,
//     getDashboard,
// } from "../../api/attendanceApi";

// const ActionButtons = ({ status }) => {

//     const [loading, setLoading] = useState(false);

//     const [checkedIn, setCheckedIn] = useState(false);

//     const [checkedOut, setCheckedOut] = useState(false);

//     const [message, setMessage] = useState("");

//     useEffect(() => {

//         loadDashboardStatus();

//     }, []);

//     const loadDashboardStatus = async () => {

//         try {

//             const dashboard = await getDashboard();

//             if (dashboard.checkIn !== "--") {

//                 setCheckedIn(true);

//             }

//             if (
//                 dashboard.workingHours &&
//                 dashboard.workingHours !== "00:00"
//             ) {

//                 setCheckedOut(true);

//             }

//         } catch (e) {

//             console.log(e);

//         }

//     };

//     const handleCheckIn = async () => {

//         setLoading(true);

//         try {

//             const response = await checkIn();

//             setMessage(response);

//             setCheckedIn(true);

//             window.location.reload();

//         } catch (error) {

//             setMessage("Check In Failed");

//         }

//         setLoading(false);

//     };

//     const handleCheckOut = async () => {

//         setLoading(true);

//         try {

//             const response = await checkOut();

//             setMessage(response);

//             setCheckedOut(true);

//             window.location.reload();

//         } catch (error) {

//             setMessage("Check Out Failed");

//         }

//         setLoading(false);

//     };

//     return (
//     <>
//         <div className="glass-card p-6 rounded-xl shadow-lg">

//             <h2 className="text-xl font-bold text-white mb-6 text-center">
//                 Quick Actions
//             </h2>

//             {/* Check In Button */}

//             <button
//                 onClick={handleCheckIn}
//                 disabled={checkedIn || loading}
//                 className={`
//                     w-full mb-4 px-4 py-3 rounded-xl
//                     flex items-center justify-center gap-2
//                     font-semibold text-lg
//                     transition-all duration-300

//                     ${
//                         checkedIn
//                             ? "bg-blue-600 text-white cursor-not-allowed"
//                             : "bg-yellow-500 hover:bg-yellow-400 text-black hover:scale-[1.02]"
//                     }

//                     ${loading ? "opacity-70 cursor-wait" : ""}
//                 `}
//             >
//                 <Clock size={20} />

//                 {loading
//                     ? "Processing..."
//                     : checkedIn
//                     ? "Checked In ✓"
//                     : "Check In"}
//             </button>

//             {/* Check Out Button */}

//             <button
//                 onClick={handleCheckOut}
//                 disabled={!checkedIn || checkedOut || loading}
//                 className={`
//                     w-full px-4 py-3 rounded-xl
//                     flex items-center justify-center gap-2
//                     font-semibold text-lg
//                     transition-all duration-300

//                     ${
//                         checkedOut
//                             ? "bg-red-600 text-white cursor-not-allowed"
//                             : checkedIn
//                             ? "bg-green-500 hover:bg-green-400 text-white hover:scale-[1.02]"
//                             : "bg-gray-500 text-gray-300 cursor-not-allowed"
//                     }

//                     ${loading ? "opacity-70 cursor-wait" : ""}
//                 `}
//             >
//                 <CheckCircle size={20} />

//                 {checkedOut
//                     ? "Checked Out ✓"
//                     : "Check Out"}
//             </button>

//         </div>

//         {message && (
//             <div className="fixed bottom-6 right-6 bg-black/90 text-white px-6 py-3 rounded-xl shadow-xl animate-bounce">
//                 {message}
//             </div>
//         )}
//     </>
// );

// };

// export default ActionButtons;

import React, { useEffect, useState } from "react";
import { Clock, CheckCircle } from "lucide-react";
import {
  checkIn,
  checkOut,
  getDashboard,
} from "../../api/attendanceApi";

const ActionButtons = () => {

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


      setCheckedIn(dashboard.checkIn !== "--");
      setCheckedOut(dashboard.checkedOut);

    } catch (error) {
      console.log(error);
    }

  };

  const handleCheckIn = async () => {

    setLoading(true);

    try {

      const response = await checkIn();

      setMessage(response);

      setCheckedIn(true);

      setTimeout(() => {
        window.location.reload();
      }, 1000);

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

      setTimeout(() => {
        window.location.reload();
      }, 1000);

    } catch (error) {

      setMessage("Check Out Failed");

    }

    setLoading(false);

  };

  return (
    <>
      <div className="glass-card p-6 rounded-xl">

        <h2 className="text-xl font-bold text-white mb-6">
          Quick Actions
        </h2>

        {/* CHECK IN */}

        <button
          onClick={handleCheckIn}
          disabled={checkedIn || loading}
          className={`w-full mb-4 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2
          ${loading
              ? "bg-blue-500 text-white"
              : checkedIn
                ? "bg-green-600 text-white cursor-not-allowed"
                : "bg-yellow-500 hover:bg-yellow-400 text-black"
            }`}
        >

          <Clock size={20} />

          {loading
            ? "Checking In..."
            : checkedIn
              ? "✓ Checked In"
              : "Check In"}

        </button>

        {/* CHECK OUT */}

        <button
          onClick={handleCheckOut}
          disabled={!checkedIn || checkedOut || loading}
          className={`w-full py-3 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2
          ${!checkedIn
              ? "bg-gray-500 text-gray-300 cursor-not-allowed"
              : loading
                ? "bg-blue-500 text-white"
                : checkedOut
                  ? "bg-green-600 text-white cursor-not-allowed"
                  : "bg-yellow-500 hover:bg-yellow-400 text-black"
            }`}
        >

          <CheckCircle size={20} />

          {!checkedIn
            ? "Check Out"
            : loading
              ? "Checking Out..."
              : checkedOut
                ? "✓ Checked Out"
                : "Check Out"}

        </button>

      </div>

      {message && (
        <div className="fixed bottom-6 right-6 bg-black text-white px-6 py-3 rounded-lg shadow-lg border border-yellow-500">
          {message}
        </div>
      )}
    </>
  );
};

export default ActionButtons;