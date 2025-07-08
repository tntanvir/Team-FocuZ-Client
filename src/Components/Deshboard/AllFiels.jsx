
import React, { useEffect, useState } from "react";
import { FiDownload, FiUser, FiCalendar, FiEye, FiMessageSquare, FiChevronRight, FiChevronLeft } from "react-icons/fi";


const FileCard = ({ file }) => {
    const getTagStyle = (tag) => {
        switch (tag) {
            case "video": return "bg-purple-200 text-purple-700";
            case "print": return "bg-green-200 text-green-700";
            case "voice": return "bg-orange-200 text-orange-700";
            default: return "bg-gray-200 text-gray-700";
        }
    };

    return (
        <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out p-5 space-y-4">
            {/* Header with Title & Tag */}
            <div className="flex justify-between items-center">
                <h2 className="font-semibold text-xl text-gray-900">{file.title.length > 18 ? `${file.title.slice(0, 18)}...` : file.title}</h2>
                {file.tag && (
                    <span className={`text-xs font-semibold px-3 py-1 rounded-full ${getTagStyle(file.tag)}`}>
                        {file.tag === "video" ? "ভিডিও" : file.tag}
                    </span>
                )}
            </div>
            <div className="flex items-center gap-2 mt-4">
                {file.user?.ProfilePicture ? (
                    <img
                        src={file.user.ProfilePicture}
                        alt={file.user.Name}
                        className="w-10 h-10 rounded-full object-cover"
                    />
                ) : (
                    <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center">
                        <FiUser className="text-white" />
                    </div>
                )}
                <span className="text-sm font-semibold">{file.user?.Name || "Unknown User"}</span>
            </div>

            {/* Description and Info */}
            <div className="text-gray-500 text-sm">
                <p>ফাইল টাইপ: {file.tag || "অন্যান্য"} • {file.size || "15 MB"}</p>
                <div className="flex items-center gap-3 mt-2 text-gray-600">
                    <FiUser className="text-gray-600" />
                    <span>{file.user ? `ইউজার ${file.user.role}` : "ভিডিও এডিটর"}</span>
                </div>
                <div className="flex items-center gap-3 mt-1 text-gray-600">
                    <FiCalendar className="text-gray-600" />
                    <span>{new Date(file.uploaded_at).toISOString().slice(0, 10)}</span>
                </div>
            </div>

            {/* Action buttons */}
            <div className="flex gap-4 mt-4">
                <a
                    href={file.file}
                    target="_blank"
                    download={file.title}
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 justify-center bg-blue-600 text-white px-5 py-2 rounded-md text-sm hover:bg-blue-700 transition-all"
                >
                    <FiDownload />
                    ডাউনলোড
                </a>
                <button className="p-3 border rounded-md text-gray-600 hover:bg-gray-100 hover:text-blue-600 transition-all">
                    <a target="_blank" href={file.file}>
                        <FiEye className="text-lg" />
                    </a>
                </button>
                <button className="p-3 border rounded-md text-gray-600 hover:bg-gray-100 hover:text-blue-600 transition-all">
                    <FiMessageSquare className="text-lg" />
                </button>
            </div>

            {/* Footer with User Profile */}

        </div>
    );
};


const AllFiles = () => {
    const [files, setFiles] = useState([]);
    const [role, setRole] = useState("");
    const [nextPage, setNextPage] = useState(null);
    const [previousPage, setPreviousPage] = useState(null);

    useEffect(() => {
        const fetchUserRole = async () => {
            const access = sessionStorage.getItem("access");
            const response = await fetch('https://team-focu-z-backend.vercel.app/auth/profile/', {
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
        fetch(url || "https://team-focu-z-backend.vercel.app/media/data/", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${sessionStorage.getItem("access")}`,
            }
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                setFiles(data.results);
                setNextPage(data.next);
                setPreviousPage(data.previous);
            })
            .catch((err) => console.error("Fetch error:", err));
    };

    useEffect(() => {
        fetchFiles();
    }, []);

    return (
        <>
            {role && (
                <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {files.map((file) => (
                        <FileCard key={file.id} file={file} />
                    ))}
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
