import React, { useEffect, useState } from "react";

const AdminTeamReportTable = () => {
    const [reportData, setReportData] = useState([]);

    useEffect(() => {
        fetch("https://team-focu-z-backend.vercel.app/report/admin/report/", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${sessionStorage.getItem("access")}`,
            }
        })
            .then((res) => res.json())
            .then((data) => {
                setReportData(data)

            })
            .catch((err) => console.error("Failed to fetch team report:", err));
    }, []);

    const renderRow = (team) => (
        <tr key={team.team_name} className="text-center">
            {/* Team Name */}
            <td className="font-semibold py-2">{`Team ${team.team_name}`}</td>

            {/* Video Editor */}
            <td>{team.video_editor.daily}</td>
            <td>{team.video_editor.weekly}</td>
            <td>{team.video_editor.monthly}</td>

            {/* Script Writer */}
            <td>{team.script_writer.daily}</td>
            <td>{team.script_writer.weekly}</td>
            <td>{team.script_writer.monthly}</td>

            {/* Voice Artist */}
            <td>{team.voice_artist.daily}</td>
            <td>{team.voice_artist.weekly}</td>
            <td>{team.voice_artist.monthly}</td>

            {/* Total Approved */}
            <td className="font-bold">{team.total_approved}</td>
        </tr>
    );

    return (
        <div className="py-4 overflow-x-auto">
            <table className="min-w-full border-collapse rounded-xl shadow-md overflow-hidden">
                <thead>
                    <tr className="bg-indigo-700 text-white text-sm text-center">
                        <th rowSpan="2" className="px-3 py-2 bg-indigo-600">TEAM</th>
                        <th colSpan="3" className="bg-blue-600">VIDEO EDITOR</th>
                        <th colSpan="3" className="bg-green-600">SCRIPT WRITER</th>
                        <th colSpan="3" className="bg-pink-600">VOICE ARTIST</th>
                    </tr>
                    <tr className="bg-blue-50 text-sm font-semibold text-black">
                        <th className="py-1">Daily</th>
                        <th>Weekly</th>
                        <th>Monthly</th>
                        <th>Daily</th>
                        <th>Weekly</th>
                        <th>Monthly</th>
                        <th>Daily</th>
                        <th>Weekly</th>
                        <th>Monthly</th>
                    </tr>
                </thead>
                <tbody className="bg-white">
                    {reportData.map(renderRow)}
                </tbody>
            </table>
        </div>
    );
};

export default AdminTeamReportTable;
