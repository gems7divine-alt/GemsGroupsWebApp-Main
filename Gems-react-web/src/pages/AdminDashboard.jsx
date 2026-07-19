import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  LogOut,
  Download,
  Users,
  Search
} from 'lucide-react';

import Button from '../components/Button';
import AnimatedBackground from '../components/AnimatedBackground';
import { getAdminAttendance } from '../api/attendanceApi';

const AdminDashboard = () => {

  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAttendance();
  }, []);

  const loadAttendance = async () => {

    try {

      setLoading(true);

      const response = await getAdminAttendance();

      setUsers(response);

      setFilteredUsers(response);

    } catch (error) {

      console.error("Failed to load admin attendance", error);

    } finally {

      setLoading(false);

    }

  };

  const handleLogout = () => {

    localStorage.clear();

    navigate("/employee-portal");

  };

  const handleSearch = (e) => {

    const value = e.target.value;

    setSearch(value);

    const filtered = users.filter((user) =>
      user.name.toLowerCase().includes(value.toLowerCase())
    );

    setFilteredUsers(filtered);

  };

  const handleDownloadExcel = () => {

    if(filteredUsers.length===0){

      alert("No Records Found");

      return;

    }

    const headers = [

      "ID",
      "Name",
      "Date",
      "Check In",
      "Check Out",
      "Working Hours",
      "Status"

    ];

    const csvRows=[];

    csvRows.push(headers.join(","));

    filteredUsers.forEach(user=>{

      csvRows.push([

        user.id,
        user.name,
        user.date,
        user.checkIn,
        user.checkOut,
        user.totalHours,
        user.status

      ].join(","));

    });

    const csvContent =
      "data:text/csv;charset=utf-8," +
      csvRows.join("\n");

    const encodedUri =
      encodeURI(csvContent);

    const link =
      document.createElement("a");

    link.setAttribute("href",encodedUri);

    link.setAttribute(
      "download",
      "Attendance_Report.csv"
    );

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

  };

  return (

    <div className="relative min-h-screen bg-dark-bg text-white overflow-hidden">

      <AnimatedBackground />

      <nav className="relative z-50 glass-nav py-4 px-8 flex justify-between items-center">

        <div className="flex items-center gap-3 text-gold-primary font-bold text-xl tracking-widest">

          GEMS GROUPS

          <span className="text-white">

            ADMIN

          </span>

        </div>

        <Button

          variant="secondary"

          onClick={handleLogout}

          className="!py-2 !px-4 !text-sm flex gap-2"

        >

          <LogOut size={16}/>

          Logout

        </Button>

      </nav>

      <div className="relative z-20 container py-10">

        <motion.div

          initial={{opacity:0,y:20}}

          animate={{opacity:1,y:0}}

          transition={{duration:0.5}}

        >

          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">

            <div>

              <h1 className="text-3xl font-extrabold">

                Admin Dashboard

              </h1>

              <p className="text-gray-400 text-sm">

                Monitor employee attendance.

              </p>

            </div>

            <Button

              variant="primary"

              onClick={handleDownloadExcel}

              className="flex gap-2"

            >

              <Download size={18}/>

              Export CSV

            </Button>

          </div>

          <div className="glass-card overflow-hidden">

            <div className="p-6 border-b border-white/10 flex justify-between items-center bg-white/5">

              <div className="flex items-center gap-2 font-semibold text-lg">

                <Users
                  className="text-gold-primary"
                  size={20}
                />

                Employee Attendance

              </div>

              <div className="relative">

                <Search

                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"

                  size={16}

                />

                <input

                  type="text"

                  value={search}

                  onChange={handleSearch}

                  placeholder="Search employee..."

                  className="bg-dark-bg/50 border border-white/10 rounded-full pl-10 pr-4 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-gold-primary/50"

                />

              </div>

            </div>

            <div className="overflow-x-auto">

              <table className="w-full text-left border-collapse">

                <thead>

                  <tr className="bg-white/5 text-gray-300 text-sm uppercase">

                    <th className="p-4">ID</th>

                    <th className="p-4">Name</th>

                    <th className="p-4">Date</th>

                    <th className="p-4">Check In</th>

                    <th className="p-4">Check Out</th>

                    <th className="p-4">Working Hours</th>

                    <th className="p-4">Status</th>

                  </tr>

                </thead>

                <tbody>

                  {loading ? (

                    <tr>

                      <td
                        colSpan="7"
                        className="text-center p-10"
                      >

                        Loading...

                      </td>

                    </tr>

                  ) : (                    filteredUsers.map((user, index) => (

                      <motion.tr

                        key={user.id}

                        initial={{ opacity: 0, y: 10 }}

                        animate={{ opacity: 1, y: 0 }}

                        transition={{ delay: index * 0.05 }}

                        className="border-b border-white/5 hover:bg-white/5 transition-colors"

                      >

                        <td className="p-4 text-gray-400">
                          #{user.id}
                        </td>

                        <td className="p-4 font-medium text-white">
                          {user.name}
                        </td>

                        <td className="p-4 text-gray-300">
                          {user.date}
                        </td>

                        <td className="p-4 text-gray-300">
                          {user.checkIn}
                        </td>

                        <td className="p-4 text-gray-300">
                          {user.checkOut}
                        </td>

                        <td className="p-4 text-gold-secondary font-medium">
                          {user.totalHours}
                        </td>

                        <td className="p-4">

                          <span
                            className={`px-3 py-1 rounded-full text-xs font-medium border
                            ${
                              user.status === "Completed"
                                ? "bg-green-500/10 text-green-400 border-green-500/20"
                                : user.status === "Active"
                                ? "bg-blue-500/10 text-blue-400 border-blue-500/20"
                                : "bg-red-500/10 text-red-400 border-red-500/20"
                            }`}
                          >
                            {user.status}
                          </span>

                        </td>

                      </motion.tr>

                    ))

                  )}

                </tbody>

              </table>

            </div>

            <div className="p-4 text-xs text-gray-500 text-center border-t border-white/10">

              Showing

              <span className="text-gold-primary font-semibold mx-1">
                {filteredUsers.length}
              </span>

              of

              <span className="text-gold-primary font-semibold mx-1">
                {users.length}
              </span>

              Employees

            </div>

          </div>

        </motion.div>

      </div>

    </div>

  );

};

export default AdminDashboard;