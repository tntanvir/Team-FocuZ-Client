import React, { useEffect, useState } from 'react';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

const Myteam = () => {
    const [report, setReport] = useState(null);
    const [loading, setLoading] = useState(true);

    const [role, setRole] = useState(null);

    useEffect(() => {
        const userStr = sessionStorage.getItem("user");
        console.log("Raw user string from sessionStorage:", userStr);

        if (userStr) {
            try {
                const parsedUser = JSON.parse(userStr);

                setRole(parsedUser.teams[0].id);

            } catch (err) {
                console.error("Error parsing JSON:", err);
            }
        } else {
            console.warn("No 'user' found in sessionStorage.");
        }
    }, []);

    useEffect(() => {
        if (role) {

            fetch(`\https://team-focu-z-backend.vercel.app/report/report/${role}/`)
                .then((res) => res.json())
                .then((data) => {
                    setReport(data);
                    setLoading(false);
                })
                .catch((err) => {
                    console.error("Failed to load team report:", err);
                    setLoading(false);
                });
        }
    }, [role]);

    if (loading) return <div className="p-4">লোড হচ্ছে...</div>;
    if (!report) return <div className="p-4">কোনো তথ্য পাওয়া যায়নি।</div>;

    // Prepare chart data
    const chartData = report.members.map((member) => ({
        name: member.name,
        ভিডিও: member.video_count,
        স্ক্রিপ্ট: member.script_count,
        ভয়েস: member.voice_count,
    }));

    return (
        <div className="p-6 space-y-6 font-sans">
            <div className="bg-gradient-to-r from-blue-500 to-cyan-600 p-6 rounded-xl text-white shadow-md">
                <h2 className="text-2xl font-bold">{`প্রোডাকশন টিম ${report.team_name}`}</h2>
                <p className="text-sm">{report.description}</p>
                <p className="text-xs mt-2">মোট সদস্য: {report.total_members} | মোট ফাইল: {report.total_files}</p>
            </div>
            {/* Chart Section */}
            <div className="bg-white p-4 rounded-lg shadow">
                <h2 className="text-lg font-semibold mb-4">🧾 সদস্য অনুযায়ী ফাইল অবদান</h2>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis allowDecimals={false} />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="ভিডিও" fill="#4F46E5" />
                        <Bar dataKey="স্ক্রিপ্ট" fill="#10B981" />
                        <Bar dataKey="ভয়েস" fill="#F59E0B" />
                    </BarChart>
                </ResponsiveContainer>
            </div>

            {/* Team Header */}


            {/* Stats */}
            <div className="grid grid-cols-4 gap-4 text-center">
                <div className="bg-white p-4 rounded-lg shadow">
                    <p className="text-2xl">🎥 {report.video_count}</p>
                    <p className="text-gray-600">ভিডিও ফাইল</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow">
                    <p className="text-2xl">📄 {report.script_count}</p>
                    <p className="text-gray-600">স্ক্রিপ্ট ফাইল</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow">
                    <p className="text-2xl">🎤 {report.voice_count}</p>
                    <p className="text-gray-600">ভয়েস ফাইল</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow">
                    <p className="text-2xl">👥 {report.total_members}</p>
                    <p className="text-gray-600">মোট সদস্য</p>
                </div>
            </div>

            {/* Completion Example */}
            <div className="bg-green-100 p-4 rounded-lg">
                <p className="text-xl font-bold text-green-700">85% প্রজেক্ট সম্পূর্ণ</p>
            </div>

            {/* Member Details */}
            <div className="space-y-6">
                {report.members.map((member) => (
                    <div key={member.id} className="bg-white p-4 rounded-lg shadow">
                        <div className="flex justify-between items-center border-b pb-2 mb-2">
                            <div>
                                <h3 className="text-lg font-semibold">{member.name}</h3>
                                <p className="text-sm text-gray-600">@{member.username} | {member.role}</p>
                                <p className="text-sm text-gray-500">মোট ফাইল: {member.total_files}</p>
                            </div>
                        </div>

                        {/* Recent Files */}
                        <div className="space-y-2">
                            {member.videos.map((v) => (
                                <div key={v.id} className="flex items-center text-sm text-gray-800">
                                    🎥 <a href={v.file_url} target="_blank" rel="noreferrer" className="ml-1 underline">{v.title}</a>
                                    <span className="ml-auto text-gray-500">{v.uploaded_at}</span>
                                </div>
                            ))}
                            {member.scripts.map((s) => (
                                <div key={s.id} className="flex items-center text-sm text-gray-800">
                                    📄 <a href={s.file_url} target="_blank" rel="noreferrer" className="ml-1 underline">{s.title}</a>
                                    <span className="ml-auto text-gray-500">{s.uploaded_at}</span>
                                </div>
                            ))}
                            {member.voices.map((v) => (
                                <div key={v.id} className="flex items-center text-sm text-gray-800">
                                    🎤 <a href={v.file_url} target="_blank" rel="noreferrer" className="ml-1 underline">{v.title}</a>
                                    <span className="ml-auto text-gray-500">{v.uploaded_at}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Myteam;
