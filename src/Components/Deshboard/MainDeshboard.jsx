
import { use, useEffect, useState } from 'react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { FaUsers, FaFileAlt, FaVideo, FaDownload } from 'react-icons/fa';
import { LineChart, Line, CartesianGrid } from 'recharts';
import AdminTeamReportTable from './AdminTeamReportTable';
import ManagerDeshboard from './ManagerDeshboard';


const getBanglaMonth = (monthKey) => {
    const months = [
        'জান', 'ফেব', 'মার', 'এপ্র', 'মে', 'জুন',
        'জুল', 'আগ', 'সেপ', 'অক্ট', 'নভে', 'ডিসে'
    ];
    const [year, month] = monthKey.split('-');
    const index = parseInt(month, 10) - 1;
    return months[index];
};

// Utility to convert English date to Bangla weekday
const getBanglaWeekday = (dateString) => {
    const days = ['রবি', 'সোম', 'মঙ্গল', 'বুধ', 'বৃহ', 'শুক্র', 'শনি'];
    const date = new Date(dateString);
    return days[date.getDay()];
};

export default function MainDeshboard() {
    const [dailyData, setDailyData] = useState([]);
    const [monthlyData, setMonthlyData] = useState([]);
    const [totalTeams, setTotalTeams] = useState(0);
    const [totalFiles, setTotalFiles] = useState(0);
    const [totalVideos, setTotalVideos] = useState(0);
    const [totalScripts, setTotalScripts] = useState(0);
    const [totalVoices, setTotalVoices] = useState(0);

    const [todayNewTeams, setTodayNewTeams] = useState(0);
    const [todayNewFiles, setTodayNewFiles] = useState(0);
    const [todayNewVideos, setTodayNewVideos] = useState(0);
    const [todayNewScripts, setTodayNewScripts] = useState(0);
    const [todayNewVoices, setTodayNewVoices] = useState(0);

    const [videoPercentage, setVideoPercentage] = useState(0);
    const [scriptPercentage, setScriptPercentage] = useState(0);
    const [voicePercentage, setVoicePercentage] = useState(0);

    // Pie Chart Data
    const pieData = [
        { name: 'ভিডিও', value: videoPercentage },
        { name: 'স্ক্রিপ্ট', value: scriptPercentage },
        { name: 'ভয়েস', value: voicePercentage },
    ];

    const COLORS = ['#4285F4', '#00ACC1', '#FB8C00'];

    const [userData, setUserData] = useState(null);


    useEffect(() => {
        fetch('\https://team-focu-z-backend.vercel.app/media/user/report/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${sessionStorage.getItem("access")}`,
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                setUserData(data);
            })

    }, []);

    // Fetch Data
    useEffect(() => {
        fetch('\https://team-focu-z-backend.vercel.app/media/report/')
            .then(response => {
                if (!response.ok) throw new Error('Network response was not ok');
                return response.json();
            })
            .then(data => {
                // Daily processing
                const formattedDaily = Object.entries(data.daily).map(([date, value]) => ({
                    name: getBanglaWeekday(date),
                    value,
                }));
                setDailyData(formattedDaily);

                // Monthly processing
                const formattedMonthly = Object.entries(data.monthly).map(([month, value]) => ({
                    name: getBanglaMonth(month),
                    value,
                }));
                setMonthlyData(formattedMonthly);

                // Total Data
                setTotalTeams(data.total_teams);
                setTotalFiles(data.total_files);
                setTotalVideos(data.total_videos);
                setTotalScripts(data.total_scripts);
                setTotalVoices(data.total_voices);

                // Today's New Data
                setTodayNewTeams(data.today_new_teams);
                setTodayNewFiles(data.today_new_files);
                setTodayNewVideos(data.today_new_videos);
                setTodayNewScripts(data.today_new_scripts);
                setTodayNewVoices(data.today_new_voices);

                // Percentage Data
                setVideoPercentage(data.video_percentage);
                setScriptPercentage(data.script_percentage);
                setVoicePercentage(data.voice_percentage);
            })
            .catch(err => console.error('Failed to fetch report:', err));
    }, []);

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            {userData?.user?.role == 'admin' ?
                <div className="">
                    {/* Stat Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                        <StatCard title="মোট টিম" value={totalTeams} change={`+${todayNewTeams} এই মাসে`} icon={<FaUsers />} color="text-blue-600" />
                        <StatCard title="মোট ফাইল" value={totalFiles} change={`+${todayNewFiles} এই সপ্তাহে`} icon={<FaFileAlt />} color="text-green-600" />
                        <StatCard title="ভিডিও ফাইল" value={totalVideos} change={`+${todayNewVideos} নতুন`} icon={<FaVideo />} color="text-purple-600" />
                        <StatCard title="মোট ডাউনলোড" value={totalFiles} change={`+${todayNewFiles} আজ`} icon={<FaDownload />} color="text-orange-600" />
                    </div>
                    <AdminTeamReportTable />

                    {/* Charts */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Pie Chart */}
                        <div className="bg-white p-4 rounded-lg shadow">
                            <h2 className="text-xl font-semibold mb-4">ফাইল বিতরণ</h2>
                            <ResponsiveContainer width="100%" height={250}>
                                <PieChart>
                                    <Pie data={pieData} dataKey="value" outerRadius={80} label>
                                        {pieData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index]} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>

                        {/* Bar Chart for Daily Report */}
                        <div className="bg-white p-4 rounded-lg shadow">
                            <h2 className="text-xl font-semibold mb-4">সাপ্তাহিক অগ্রগতি</h2>
                            <ResponsiveContainer width="100%" height={250}>
                                <BarChart data={dailyData}>
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Bar dataKey="value" fill="#4285F4" radius={[4, 4, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    <div className="bg-white p-4 rounded-lg shadow mt-6">
                        <h2 className="text-xl font-semibold mb-4">মাসিক ট্রেন্ড</h2>
                        <ResponsiveContainer width="100%" height={300}>
                            <LineChart data={monthlyData}>
                                <XAxis dataKey="name" />
                                <YAxis domain={[0, 60]} />
                                <Tooltip formatter={(value) => [`files : ${value}`]} />
                                <CartesianGrid strokeDasharray="3 3" />
                                <Line type="monotone" dataKey="value" stroke="#00B5AD" strokeWidth={3} dot={{ r: 5 }} activeDot={{ r: 8 }} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>

                </div>

                :
                (<div>
                    {userData ?
                        <>
                            {userData?.user?.role === 'manager' ?
                                <ManagerDeshboard />
                                : <>
                                    <div className='bg-purple-400 my-4 p-4 rounded-lg shadow text-white'>
                                        <h1> {(`${userData?.user?.role}`).toUpperCase()} Dashboard</h1>
                                        <p className="">User Name : <span className='font-semibold'>{userData?.user?.username}</span>!</p>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                                        <StatCard title="Today's file" value={userData?.daily_report?.count} />
                                        <StatCard title="Weekly file" value={userData?.weekly_report?.count} color="text-green-600" />
                                        <StatCard title="Monthly file" value={userData?.monthly_report?.count} color="text-purple-600" />
                                        <StatCard title="Approved" value={userData?.total_approved} color="text-purple-600" />

                                    </div>
                                </>
                            }
                        </>
                        :
                        <div className="flex-col gap-4 w-full flex items-center justify-center">
                            <div
                                className="w-20 h-20 border-4 border-transparent text-blue-400 text-4xl animate-spin flex items-center justify-center border-t-blue-400 rounded-full"
                            >
                                <div
                                    className="w-16 h-16 border-4 border-transparent text-red-400 text-2xl animate-spin flex items-center justify-center border-t-red-400 rounded-full"
                                ></div>
                            </div>
                        </div>



                    }
                </div>)


            }
        </div>
    );
}

function StatCard({ title, value, change, icon, color }) {
    return (
        <div className="bg-white p-4 rounded-lg shadow flex items-center justify-between">
            <div>
                <p className="text-sm text-gray-500">{title}</p>
                <h2 className="text-2xl font-bold">{value}</h2>
                <p className="text-green-600 text-sm mt-1">{change}</p>
            </div>
            <div className={`text-3xl ${color}`}>{icon}</div>
        </div>
    );
}
