import React, { useEffect, useState } from "react";
import { FaVideo, FaMicrophone, FaPenFancy, FaRocket } from "react-icons/fa";

const ManagerDeshboard = () => {
    const [report, setReport] = useState([]);

    useEffect(() => {
        fetch("https://team-focu-z-backend.vercel.app/report/manager/report/", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${sessionStorage.getItem("access")}`,
            }
        })
            .then((res) => res.json())
            .then((data) => setReport(data))
            .catch((err) => console.error("Error fetching report:", err));
    }, []);


    const getTeamName = (id) => `টিম ${String.fromCharCode(64 + parseInt(id))}`;

    const RoleCard = ({ title, icon, data, color }) => (
        <div className={`rounded-lg p-4 ${color} w-full`}>
            <h4 className="flex items-center gap-2 text-lg font-bold mb-1">
                {icon} {title}
            </h4>
            <p>দৈনিক আপলোড: {data.daily}</p>
            <p>সাপ্তাহিক আপলোড: {data.weekly}</p>
            <p>মাসিক আপলোড: {data.monthly}</p>
        </div>
    );

    return (
        <div className="p-6 space-y-6">
            {report.map((team, index) => (
                <div key={index} className="bg-white rounded-xl shadow-md p-4 border border-indigo-100">
                    <h2 className="text-xl font-bold text-indigo-800 flex items-center gap-2 mb-3">
                        <FaRocket className="text-indigo-600" /> {getTeamName(team.team_name)}
                    </h2>
                    <div className="grid md:grid-cols-3 gap-4">
                        <RoleCard
                            title="ভিডিও এডিটর"
                            icon={<FaVideo />}
                            data={team.video_editor}
                            color="bg-blue-100"
                        />
                        <RoleCard
                            title="স্ক্রিপ্ট রাইটার"
                            icon={<FaPenFancy />}
                            data={team.script_writer}
                            color="bg-green-100"
                        />
                        <RoleCard
                            title="ভয়েস আর্টিস্ট"
                            icon={<FaMicrophone />}
                            data={team.voice_artist}
                            color="bg-yellow-100"
                        />
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ManagerDeshboard;
