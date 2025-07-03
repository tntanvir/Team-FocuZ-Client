import { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { FaUsers, FaFileAlt, FaVideo, FaDownload } from 'react-icons/fa';
import { LineChart, Line, CartesianGrid } from 'recharts';

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

    // useEffect(() => {
    //     fetch('https://team-focu-z-backend.vercel.app/media/report/')
    //         .then(response => {
    //             if (!response.ok) {
    //                 throw new Error('Network response was not ok');
    //             }
    //             return response.json();
    //         })
    //         .then(data => {
    //             const formatted = Object.entries(data.daily).map(([date, value]) => ({
    //                 name: getBanglaWeekday(date),
    //                 value,
    //             }));
    //             setDailyData(formatted);
    //         })
    //         .catch(err => {
    //             console.error('Failed to fetch report:', err);
    //         });
    // }, []);

    const [monthlyData, setMonthlyData] = useState([]);

    useEffect(() => {
        fetch('https://team-focu-z-backend.vercel.app/media/report/')
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
            })
            .catch(err => console.error('Failed to fetch report:', err));
    }, []);


    const pieData = [
        { name: 'ভিডিও', value: 33 },
        { name: 'স্ক্রিপ্ট', value: 33 },
        { name: 'ভয়েস', value: 33 },
    ];

    const COLORS = ['#4285F4', '#00ACC1', '#FB8C00'];

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            {/* Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <StatCard title="মোট টিম" value="2" change="+2 এই মাসে" icon={<FaUsers />} color="text-blue-600" />
                <StatCard title="মোট ফাইল" value="3" change="+15 এই সপ্তাহে" icon={<FaFileAlt />} color="text-green-600" />
                <StatCard title="ভিডিও ফাইল" value="1" change="+4 নতুন" icon={<FaVideo />} color="text-purple-600" />
                <StatCard title="মোট ডাউনলোড" value="18" change="+45 আজ" icon={<FaDownload />} color="text-orange-600" />
            </div>

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
