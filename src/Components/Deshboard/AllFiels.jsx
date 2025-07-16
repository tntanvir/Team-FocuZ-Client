
import React, { useEffect, useState } from "react";
import { FiDownload, FiUser, FiCalendar, FiEye, FiMessageSquare, FiChevronRight, FiChevronLeft, FiLoader } from "react-icons/fi";
import { Bounce, toast } from "react-toastify";





const FileCard = ({ file }) => {
    const getTagStyle = (tag) => {
        switch (tag) {
            case "video": return "bg-purple-200 text-purple-700";
            case "print": return "bg-green-200 text-green-700";
            case "voice": return "bg-orange-200 text-orange-700";
            case "script": return "bg-blue-200 text-blue-700";
            default: return "bg-gray-200 text-gray-700";
        }
    };

    const formatDate = (dateStr) => new Date(dateStr).toISOString().split("T")[0];

    const baseURL = import.meta.env.VITE_BACKEND_URL;
    const handleApprove = (id, currentStatus) => {

        const access = sessionStorage.getItem("access");
        const newStatus = !currentStatus; // Toggle approved status


        fetch(`${baseURL}/media/data/${id}/`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${access}`,
            },
            body: JSON.stringify({ approved: newStatus }),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data); // Handle the updated response if needed
                toast.success('✅ ডাটাবেজে সংরক্ষণ সফল হয়েছে', {
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
            })
            .catch((err) => {
                // console.error("Error updating approval status:", err);
                toast.error('❌ ডাটাবেজে সংরক্ষণ ব্যর্থ হয়েছে', {
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
            });
    };

    const handleDownload = (id, currentDownloadCount, fileUrl) => {
        const access = sessionStorage.getItem("access");

        // Increment the download count
        const newDownloadCount = currentDownloadCount + 1;

        // First, make the PATCH request to update the download count
        fetch(`${baseURL}/media/data/${id}/`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${access}`,
            },
            body: JSON.stringify({ download_count: newDownloadCount }),
        })
            .then((response) => response.json())
            .then(() => {
                // After updating the count, trigger the file download
                const downloadLink = document.createElement('a');
                downloadLink.href = fileUrl;
                downloadLink.download = fileUrl.split('/').pop(); // Assuming file name is the last part of the URL
                document.body.appendChild(downloadLink);
                downloadLink.click(); // Trigger download
                document.body.removeChild(downloadLink);
            })
            .catch((err) => {
                console.error("Error updating download count:", err);
            });
    };


    return (
        <div className="bg-white rounded-xl shadow-md p-5 space-y-3 border">
            <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">{file.title || "Untitled File"}</h2>

                {/* Tag shown beside the title */}
                {file.tag && (
                    <span
                        className={`text-xs font-semibold px-3 py-1 rounded-full ml-2 ${getTagStyle(file.tag)}`}
                    >
                        {file.tag === "video"
                            ? "ভিডিও"
                            : file.tag === "script"
                                ? "স্ক্রিপ্ট"
                                : file.tag === "voice"
                                    ? "অডিও"
                                    : file.tag}
                    </span>
                )}
            </div>

            <p className="text-blue-600 font-medium text-sm">
                Team: {file.team_name || file.team || "Unknown"}
            </p>

            <p className="text-sm text-gray-700">
                Uploader: {file.user?.Name || file.user?.username || "Unknown"} ({file.user?.role || "Uploader"})
            </p>

            <p className="text-sm text-gray-700">Date: {formatDate(file.uploaded_at)}</p>
            {/* <p className="text-sm text-gray-700">File Size: {file.size || "15 MB"}</p> */}
            <p className="text-sm text-gray-700">File Download: {file?.download_count}</p>

            {/* Buttons */}
            <div className="flex flex-wrap gap-3 pt-2">
                <a
                    href={file.file}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 bg-purple-700 text-white px-4 py-2 text-sm rounded hover:bg-purple-800"
                >
                    <FiEye /> Preview
                </a>

                <a
                    href={file.file}
                    download={file.title}
                    onClick={() => handleDownload(file.id, file.download_count, file.file)}
                    className="flex items-center gap-1 bg-blue-600 text-white px-4 py-2 text-sm rounded hover:bg-blue-700"
                >
                    <FiDownload /> ডাউনলোড
                </a>

                {/* Toggle Approve Button */}
                <button
                    onClick={() => handleApprove(file.id, file.approved)}
                    className={`flex items-center gap-1 px-4 py-2 text-sm rounded ${file.approved
                        ? "bg-green-600 hover:bg-green-700 text-white"
                        : "bg-orange-600 hover:bg-orange-700 text-white"
                        }`}
                >
                    {file.approved ? "Approved" : "Pending"}
                </button>
            </div>
        </div>
    );
};



const AllFiles = () => {
    const [files, setFiles] = useState([]);
    const [role, setRole] = useState("");
    const [nextPage, setNextPage] = useState(null);
    const [previousPage, setPreviousPage] = useState(null);
    const [loading, setLoading] = useState(false); // Track loading state
    const [error, setError] = useState(''); // Track error state
    const [teamFilter, setTeamFilter] = useState("All Teams"); // Track team filter
    const [categoryFilter, setCategoryFilter] = useState("All"); // Track category filter
    const [teams, setTeams] = useState([]); // Track available teams
    const baseURL = import.meta.env.VITE_BACKEND_URL;
    // Fetch available teams
    useEffect(() => {
        fetch(`${baseURL}/team/teams/`)
            .then(res => res.json())
            .then(data => setTeams(data))  // Store teams data
            .catch(err => console.error("Error fetching teams:", err));
    }, []);

    useEffect(() => {
        const fetchUserRole = async () => {
            const access = sessionStorage.getItem("access");
            const response = await fetch(`${baseURL}/auth/profile/`, {
                headers: {
                    Authorization: `Bearer ${access}`,
                },
            });
            const userData = await response.json();
            setRole(userData.role); // Update the role state
        };

        fetchUserRole();
    }, []);

    const fetchFiles = (url) => {
        setLoading(true); // Set loading to true when fetching data
        fetch(url || `${baseURL}/media/data/`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${sessionStorage.getItem("access")}`,
            }
        })
            .then((res) => {
                if (!res.ok) {
                    throw new Error(`Request failed with status ${res.status}`);
                }
                return res.json();
            })
            .then((data) => {
                setFiles(data.results);
                console.log(data)
                setNextPage(data.next);
                setPreviousPage(data.previous);
                setLoading(false); // Set loading to false after the data is fetched
            })
            .catch((err) => {
                console.error("Fetch error:", err);  // Log detailed error
                setError(`Failed to fetch data. Error: ${err.message}`); // Show detailed error message
                setLoading(false); // Set loading to false even if there is an error
            });
    };

    useEffect(() => {
        let url = `${baseURL}/media/data/?`;
        if (teamFilter !== "All Teams") {
            url += `team=${teamFilter}&`;
        }
        if (categoryFilter !== "All") {
            url += `category=${categoryFilter}&`;
        }
        fetchFiles(url);
    }, [teamFilter, categoryFilter]); // Trigger fetch on filter change

    return (
        <>
            {/* Team Filter */}
            {role == 'admin' && <>
                <div className="flex gap-4 mb-6 ">
                    <select
                        onChange={(e) => setTeamFilter(e.target.value)}
                        className="px-4 py-2 rounded-md hover:bg-gray-300 w-full"
                    >
                        <option value="All Teams">All Teams</option>
                        {teams.map((team) => (
                            <option key={team.id} value={team.name}>
                                {team.name}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Category Filter */}
                <div className="flex gap-4 mb-6">
                    <button
                        onClick={() => setCategoryFilter("All")}
                        className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
                    >
                        All Categories
                    </button>
                    <button
                        onClick={() => setCategoryFilter("video")}
                        className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
                    >
                        Video
                    </button>
                    <button
                        onClick={() => setCategoryFilter("voice")}
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                    >
                        Audio
                    </button>
                    <button
                        onClick={() => setCategoryFilter("script")}
                        className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                    >
                        Script
                    </button>
                </div>
            </>}

            {/* Display Files */}
            {role && (
                <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {files.map((file) => (
                        <FileCard key={file.id} file={file} />
                    ))}
                </div>
            )}

            {/* Show loading spinner */}
            {loading && (
                <div className="flex justify-center items-center mt-6">
                    <FiLoader className="animate-spin text-blue-600 text-3xl" />
                    <span className="ml-2 text-gray-600">Loading...</span>
                </div>
            )}

            {/* Show error message */}
            {error && (
                <div className="flex justify-center mt-6 text-red-600">
                    <span>{error}</span>
                </div>
            )}

            {/* Pagination Controls */}
            {previousPage || nextPage ? (
                <div className="flex justify-between mt-6">
                    {previousPage && (
                        <button
                            onClick={() => fetchFiles(previousPage)}
                            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center gap-2"
                        >
                            <FiChevronLeft />
                            পূর্ববর্তী
                        </button>
                    )}
                    {nextPage && (
                        <button
                            onClick={() => fetchFiles(nextPage)}
                            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 flex items-center gap-2"
                        >
                            পরবর্তী
                            <FiChevronRight />
                        </button>
                    )}
                </div>
            ) : null}
        </>
    );
};

export default AllFiles;

