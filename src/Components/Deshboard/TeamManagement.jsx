import { useEffect, useState } from "react";
import AddTeamModal from "../AddTeamModal";
import { FaCalendarAlt, FaEdit, FaPlus, FaTrash, FaUser, FaUsers } from "react-icons/fa";
import { Bounce, toast } from "react-toastify";

const TeamManagement = () => {
    const [teams, setTeams] = useState([]);
    const [showModal, setShowModal] = useState(false);

    const fetchTeams = async () => {
        try {
            const accessToken = sessionStorage.getItem("access");
            const res = await fetch("https://team-focu-z-backend.vercel.app/team/teams/", {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            const data = await res.json();
            setTeams(data);

        } catch (error) {
            console.error("Fetching teams failed", error);
        }
    };

    useEffect(() => {
        fetchTeams();
    }, []);

    const handleNewTeam = (newTeam) => {
        setTeams((prev) => [...prev, newTeam]);
    };


    const EditTeam = (id) => {
        console.log(id)
    }
    const DeleteTeam = (id) => {
        const accessToken = sessionStorage.getItem("access");
        fetch(`https://team-focu-z-backend.vercel.app/team/teams/${id}/`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${accessToken}`,
            },
        })
            .then((response) => {
                if (response.ok) {
                    setTeams((prev) => prev.filter((team) => team.id !== id));
                    // alert("টিম সফলভাবে মুছে ফেলা হয়েছে");
                    toast.success('টিম সফলভাবে মুছে ফেলা হয়েছে', {
                        position: "top-right",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: false,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                        transition: Bounce,
                    });
                } else {

                    toast.error('টিম মুছে ফেলার সময় ত্রুটি ঘটেছে', {
                        position: "top-right",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: false,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                        transition: Bounce,
                    });
                }
            })
            .catch((error) => {
                console.error("Error deleting team:", error);
                alert("টিম মুছে ফেলার সময় ত্রুটি ঘটেছে");
            })
    }
    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold text-gray-800">টিম ম্যানেজমেন্ট</h2>
                <button
                    onClick={() => setShowModal(true)}
                    className="bg-gradient-to-r from-blue-500 to-teal-500 text-white px-4 py-2 rounded hover:opacity-90 flex items-center gap-2"
                >
                    <FaPlus /> নতুন টিম যোগ করুন
                </button>
            </div>

            <AddTeamModal isOpen={showModal} onClose={() => setShowModal(false)} onTeamAdded={handleNewTeam} />

            <p className="text-gray-600 mb-4">সব টিম পরিচালনা ও নিয়ন্ত্রণ করুন</p>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {teams.map((team) => (
                    <div key={team.id} className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
                        <div className="flex justify-between items-center mb-3">
                            <h3 className="text-xl font-bold text-gray-800">{team.name}</h3>
                            <div className="flex gap-3 text-gray-500">
                                <FaEdit onClick={() => EditTeam(team.id)} className="cursor-pointer hover:text-blue-500" />
                                <FaTrash onClick={() => DeleteTeam(team.id)} className="cursor-pointer hover:text-red-500" />
                            </div>
                        </div>
                        <p className="text-gray-600 mb-4">{team.description}</p>
                        <div className="text-sm text-gray-700 space-y-1">
                            <p className="flex items-center gap-2">
                                <FaUser /> ম্যানেজার: {team.manager?.Name || 'অজানা'}
                            </p>
                            <p className="flex items-center gap-2">
                                <FaUsers /> সদস্য: {team.users?.length || 0} জন
                            </p>
                            <p className="flex items-center gap-2">
                                <FaCalendarAlt /> তৈরি: {team.created_at?.split('T')[0]}
                            </p>
                        </div>
                        <div className="mt-4">
                            <span className="text-sm px-3 py-1 bg-green-100 text-green-700 rounded-full">টিম স্ট্যাটাস: সক্রিয়</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};




export default TeamManagement;