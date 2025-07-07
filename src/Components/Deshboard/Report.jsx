


import React, { useEffect, useState } from "react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";

export default function Report() {
    const [reportData, setReportData] = useState([]);

    useEffect(() => {
        fetch("http://127.0.0.1:8000/report/report/")
            .then((res) => res.json())
            .then((data) => setReportData(data));
    }, []);

    // Format for chart
    const chartData = reportData.map((team) => ({
        name: `টিম ${team.team_name}`,
        ভিডিও: team.video_count,
        স্ক্রিপ্ট: team.script_count,
        ভয়েস: team.voice_count,
    }));

    return (
        <div className="space-y-8 mt-10">
            {/* Team Chart Section */}
            <div className="w-full h-96 bg-white shadow-md p-4 rounded-lg">
                <h2 className="text-xl font-bold mb-4 text-gray-700">টিম পারফর্মেন্স</h2>
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis allowDecimals={false} />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="ভিডিও" fill="#34D399" />
                        <Bar dataKey="স্ক্রিপ্ট" fill="#60A5FA" />
                        <Bar dataKey="ভয়েস" fill="#C084FC" />
                    </BarChart>
                </ResponsiveContainer>
            </div>

            {/* Team Table Section */}
            <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                    বিস্তারিত টিম রিপোর্ট
                </h2>
                <div className="overflow-x-auto rounded-xl shadow-md">
                    <table className="w-full table-auto text-sm text-center bg-white">
                        <thead className="bg-gray-100 text-gray-700 font-semibold">
                            <tr>
                                <th className="px-4 py-2">টিম নাম</th>
                                <th className="px-4 py-2">মোট সদস্য</th>
                                <th className="px-4 py-2">মোট ফাইল</th>
                                <th className="px-4 py-2 text-green-600">ভিডিও</th>
                                <th className="px-4 py-2 text-blue-600">স্ক্রিপ্ট</th>
                                <th className="px-4 py-2 text-purple-600">ভয়েস</th>
                            </tr>
                        </thead>
                        <tbody>
                            {reportData.map((team, index) => (
                                <tr key={index} className="border-t hover:bg-gray-50">
                                    <td className="px-4 py-2 font-medium">টিম {team.team_name}</td>
                                    <td className="px-4 py-2">{team.total_members}</td>
                                    <td className="px-4 py-2">{team.total_files}</td>
                                    <td className="px-4 py-2 text-green-600">{team.video_count}</td>
                                    <td className="px-4 py-2 text-blue-600">{team.script_count}</td>
                                    <td className="px-4 py-2 text-purple-600">{team.voice_count}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
