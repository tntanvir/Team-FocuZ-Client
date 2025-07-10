
// import React, { useEffect, useState } from "react";
// import { FiDownload, FiUser, FiCalendar, FiEye, FiMessageSquare, FiChevronRight, FiChevronLeft } from "react-icons/fi";


// const FileCard = ({ file }) => {
//     const getTagStyle = (tag) => {
//         switch (tag) {
//             case "video": return "bg-purple-200 text-purple-700";
//             case "print": return "bg-green-200 text-green-700";
//             case "voice": return "bg-orange-200 text-orange-700";
//             default: return "bg-gray-200 text-gray-700";
//         }
//     };

//     return (
//         <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out p-5 space-y-4">
//             {/* Header with Title & Tag */}
//             <div className="flex justify-between items-center">
//                 <h2 className="font-semibold text-xl text-gray-900">{file.title.length > 18 ? `${file.title.slice(0, 18)}...` : file.title}</h2>
//                 {file.tag && (
//                     <span className={`text-xs font-semibold px-3 py-1 rounded-full ${getTagStyle(file.tag)}`}>
//                         {file.tag === "video" ? "ভিডিও" : file.tag}
//                     </span>
//                 )}
//             </div>
//             <div className="flex items-center gap-2 mt-4">
//                 {file.user?.ProfilePicture ? (
//                     <img
//                         src={file.user.ProfilePicture}
//                         alt={file.user.Name}
//                         className="w-10 h-10 rounded-full object-cover"
//                     />
//                 ) : (
//                     <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center">
//                         <FiUser className="text-white" />
//                     </div>
//                 )}
//                 <span className="text-sm font-semibold">{file.user?.Name || "Unknown User"}</span>
//             </div>

//             {/* Description and Info */}
//             <div className="text-gray-500 text-sm">
//                 <p>ফাইল টাইপ: {file.tag || "অন্যান্য"} • {file.size || "15 MB"}</p>
//                 <div className="flex items-center gap-3 mt-2 text-gray-600">
//                     <FiUser className="text-gray-600" />
//                     <span>{file.user ? `ইউজার ${file.user.role}` : "ভিডিও এডিটর"}</span>
//                 </div>
//                 <div className="flex items-center gap-3 mt-1 text-gray-600">
//                     <FiCalendar className="text-gray-600" />
//                     <span>{new Date(file.uploaded_at).toISOString().slice(0, 10)}</span>
//                 </div>
//             </div>

//             {/* Action buttons */}
//             <div className="flex gap-4 mt-4">
//                 <a
//                     href={file.file}
//                     target="_blank"
//                     download={file.title}
//                     rel="noopener noreferrer"
//                     className="flex items-center gap-2 justify-center bg-blue-600 text-white px-5 py-2 rounded-md text-sm hover:bg-blue-700 transition-all"
//                 >
//                     <FiDownload />
//                     ডাউনলোড
//                 </a>
//                 <button className="p-3 border rounded-md text-gray-600 hover:bg-gray-100 hover:text-blue-600 transition-all">
//                     <a target="_blank" href={file.file}>
//                         <FiEye className="text-lg" />
//                     </a>
//                 </button>
//                 <button className="p-3 border rounded-md text-gray-600 hover:bg-gray-100 hover:text-blue-600 transition-all">
//                     <FiMessageSquare className="text-lg" />
//                 </button>
//             </div>

//             {/* Footer with User Profile */}

//         </div>
//     );
// };


// const AllFiles = () => {
//     const [files, setFiles] = useState([]);
//     const [role, setRole] = useState("");
//     const [nextPage, setNextPage] = useState(null);
//     const [previousPage, setPreviousPage] = useState(null);

//     useEffect(() => {
//         const fetchUserRole = async () => {
//             const access = sessionStorage.getItem("access");
//             const response = await fetch('https://team-focu-z-backend.vercel.app/auth/profile/', {
//                 headers: {
//                     Authorization: `Bearer ${access}`,
//                 },
//             });
//             const userData = await response.json();
//             setRole(userData.role); // Update the role state
//         };

//         fetchUserRole();
//     }, []);

//     const fetchFiles = (url) => {
//         fetch(url || "https://team-focu-z-backend.vercel.app/media/data/", {
//             method: "GET",
//             headers: {
//                 "Content-Type": "application/json",
//                 Authorization: `Bearer ${sessionStorage.getItem("access")}`,
//             }
//         })
//             .then((res) => res.json())
//             .then((data) => {
//                 console.log(data);
//                 setFiles(data.results);
//                 setNextPage(data.next);
//                 setPreviousPage(data.previous);
//             })
//             .catch((err) => console.error("Fetch error:", err));
//     };

//     useEffect(() => {
//         fetchFiles();
//     }, []);

//     return (
//         <>
//             {role && (
//                 <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//                     {files.map((file) => (
//                         <FileCard key={file.id} file={file} />
//                     ))}
//                 </div>
//             )}

//             {/* Pagination Controls */}
//             {previousPage || nextPage ? (
//                 <div className="flex justify-between mt-6">
//                     {previousPage && (
//                         <button
//                             onClick={() => fetchFiles(previousPage)}
//                             className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center gap-2"
//                         >
//                             <FiChevronLeft />
//                             পূর্ববর্তী
//                         </button>
//                     )}
//                     {nextPage && (
//                         <button
//                             onClick={() => fetchFiles(nextPage)}
//                             className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 flex items-center gap-2"
//                         >
//                             পরবর্তী
//                             <FiChevronRight />
//                         </button>
//                     )}
//                 </div>
//             ) : null}

//         </>
//     );
// };

// export default AllFiles;


// import React, { useEffect, useState } from "react";
// import { FiDownload, FiUser, FiCalendar, FiEye, FiMessageSquare, FiChevronRight, FiChevronLeft, FiLoader } from "react-icons/fi";

// const FileCard = ({ file }) => {
//     const getTagStyle = (tag) => {
//         switch (tag) {
//             case "video": return "bg-purple-200 text-purple-700";
//             case "print": return "bg-green-200 text-green-700";
//             case "voice": return "bg-orange-200 text-orange-700";
//             default: return "bg-gray-200 text-gray-700";
//         }
//     };

//     return (
//         <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out p-5 space-y-4">
//             {/* Header with Title & Tag */}
//             <div className="flex justify-between items-center">
//                 <h2 className="font-semibold text-xl text-gray-900">{file.title.length > 18 ? `${file.title.slice(0, 18)}...` : file.title}</h2>
//                 {file.tag && (
//                     <span className={`text-xs font-semibold px-3 py-1 rounded-full ${getTagStyle(file.tag)}`}>
//                         {file.tag === "video" ? "ভিডিও" : file.tag}
//                     </span>
//                 )}
//             </div>
//             <div className="flex items-center gap-2 mt-4">
//                 {file.user?.ProfilePicture ? (
//                     <img
//                         src={file.user.ProfilePicture}
//                         alt={file.user.Name}
//                         className="w-10 h-10 rounded-full object-cover"
//                     />
//                 ) : (
//                     <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center">
//                         <FiUser className="text-white" />
//                     </div>
//                 )}
//                 <span className="text-sm font-semibold">{file.user?.Name || "Unknown User"}</span>
//             </div>

//             {/* Description and Info */}
//             <div className="text-gray-500 text-sm">
//                 <p>ফাইল টাইপ: {file.tag || "অন্যান্য"} • {file.size || "15 MB"}</p>
//                 <div className="flex items-center gap-3 mt-2 text-gray-600">
//                     <FiUser className="text-gray-600" />
//                     <span>{file.user ? `ইউজার ${file.user.role}` : "ভিডিও এডিটর"}</span>
//                 </div>
//                 <div className="flex items-center gap-3 mt-1 text-gray-600">
//                     <FiCalendar className="text-gray-600" />
//                     <span>{new Date(file.uploaded_at).toISOString().slice(0, 10)}</span>
//                 </div>
//             </div>

//             {/* Action buttons */}
//             <div className="flex gap-4 mt-4">
//                 <a
//                     href={file.file}
//                     target="_blank"
//                     download={file.title}
//                     rel="noopener noreferrer"
//                     className="flex items-center gap-2 justify-center bg-blue-600 text-white px-5 py-2 rounded-md text-sm hover:bg-blue-700 transition-all"
//                 >
//                     <FiDownload />
//                     ডাউনলোড
//                 </a>
//                 <button className="p-3 border rounded-md text-gray-600 hover:bg-gray-100 hover:text-blue-600 transition-all">
//                     <a target="_blank" href={file.file}>
//                         <FiEye className="text-lg" />
//                     </a>
//                 </button>
//                 <button className="p-3 border rounded-md text-gray-600 hover:bg-gray-100 hover:text-blue-600 transition-all">
//                     <FiMessageSquare className="text-lg" />
//                 </button>
//             </div>
//         </div>
//     );
// };

// const AllFiles = () => {
//     const [files, setFiles] = useState([]);
//     const [role, setRole] = useState("");
//     const [nextPage, setNextPage] = useState(null);
//     const [previousPage, setPreviousPage] = useState(null);
//     const [loading, setLoading] = useState(false); // Track loading state
//     const [error, setError] = useState(''); // Track error state
//     const [teamFilter, setTeamFilter] = useState("All Teams"); // Track team filter
//     const [categoryFilter, setCategoryFilter] = useState("All"); // Track category filter

//     useEffect(() => {
//         const fetchUserRole = async () => {
//             const access = sessionStorage.getItem("access");
//             const response = await fetch('https://team-focu-z-backend.vercel.app/auth/profile/', {
//                 headers: {
//                     Authorization: `Bearer ${access}`,
//                 },
//             });
//             const userData = await response.json();
//             setRole(userData.role); // Update the role state
//         };

//         fetchUserRole();
//     }, []);

//     const fetchFiles = (url) => {
//         setLoading(true); // Set loading to true when fetching data
//         fetch(url || "https://team-focu-z-backend.vercel.app/media/data/", {
//             method: "GET",
//             headers: {
//                 "Content-Type": "application/json",
//                 Authorization: `Bearer ${sessionStorage.getItem("access")}`,
//             }
//         })
//             .then((res) => {
//                 if (!res.ok) {
//                     throw new Error(`Request failed with status ${res.status}`);
//                 }
//                 return res.json();
//             })
//             .then((data) => {
//                 setFiles(data.results);
//                 setNextPage(data.next);
//                 setPreviousPage(data.previous);
//                 setLoading(false); // Set loading to false after the data is fetched
//             })
//             .catch((err) => {
//                 console.error("Fetch error:", err);  // Log detailed error
//                 setError(`Failed to fetch data. Error: ${err.message}`); // Show detailed error message
//                 setLoading(false); // Set loading to false even if there is an error
//             });
//     };

//     useEffect(() => {
//         let url = "https://team-focu-z-backend.vercel.app/media/data/?";
//         if (teamFilter !== "All Teams") {
//             url += `team=${teamFilter}&`;
//         }
//         if (categoryFilter !== "All") {
//             url += `category=${categoryFilter}&`;
//         }
//         fetchFiles(url);
//     }, [teamFilter, categoryFilter]); // Trigger fetch on filter change

//     return (
//         <>
//             <div className="flex gap-4 mb-6">
//                 <button
//                     onClick={() => setTeamFilter("All Teams")}
//                     className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
//                 >
//                     All Teams
//                 </button>
//             </div>

//             <div className="flex gap-4 mb-6">
//                 <button
//                     onClick={() => setCategoryFilter("All")}
//                     className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
//                 >
//                     All Categories
//                 </button>
//                 <button
//                     onClick={() => setCategoryFilter("video")}
//                     className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
//                 >
//                     Video
//                 </button>
//                 <button
//                     onClick={() => setCategoryFilter("voice")}
//                     className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
//                 >
//                     Audio
//                 </button>
//                 <button
//                     onClick={() => setCategoryFilter("script")}
//                     className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
//                 >
//                     Script
//                 </button>
//             </div>

//             {role && (
//                 <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//                     {files.map((file) => (
//                         <FileCard key={file.id} file={file} />
//                     ))}
//                 </div>
//             )}

//             {/* Show loading spinner */}
//             {loading && (
//                 <div className="flex justify-center items-center mt-6">
//                     <FiLoader className="animate-spin text-blue-600 text-3xl" />
//                     <span className="ml-2 text-gray-600">Loading...</span>
//                 </div>
//             )}

//             {/* Show error message */}
//             {error && (
//                 <div className="flex justify-center mt-6 text-red-600">
//                     <span>{error}</span>
//                 </div>
//             )}

//             {/* Pagination Controls */}
//             {previousPage || nextPage ? (
//                 <div className="flex justify-between mt-6">
//                     {previousPage && (
//                         <button
//                             onClick={() => fetchFiles(previousPage)}
//                             className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center gap-2"
//                         >
//                             <FiChevronLeft />
//                             পূর্ববর্তী
//                         </button>
//                     )}
//                     {nextPage && (
//                         <button
//                             onClick={() => fetchFiles(nextPage)}
//                             className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 flex items-center gap-2"
//                         >
//                             পরবর্তী
//                             <FiChevronRight />
//                         </button>
//                     )}
//                 </div>
//             ) : null}
//         </>
//     );
// };

// export default AllFiles;



// import React, { useEffect, useState } from "react";
// import { FiDownload, FiUser, FiCalendar, FiEye, FiMessageSquare, FiChevronRight, FiChevronLeft, FiLoader } from "react-icons/fi";

// const FileCard = ({ file }) => {
//     const getTagStyle = (tag) => {
//         switch (tag) {
//             case "video": return "bg-purple-200 text-purple-700";
//             case "print": return "bg-green-200 text-green-700";
//             case "voice": return "bg-orange-200 text-orange-700";
//             default: return "bg-gray-200 text-gray-700";
//         }
//     };

//     return (
//         <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out p-5 space-y-4">
//             {/* Header with Title & Tag */}
//             <div className="flex justify-between items-center">
//                 <h2 className="font-semibold text-xl text-gray-900">{file.title.length > 18 ? `${file.title.slice(0, 18)}...` : file.title}</h2>
//                 {file.tag && (
//                     <span className={`text-xs font-semibold px-3 py-1 rounded-full ${getTagStyle(file.tag)}`}>
//                         {file.tag === "video" ? "ভিডিও" : file.tag}
//                     </span>
//                 )}
//             </div>
//             <div className="flex items-center gap-2 mt-4">
//                 {file.user?.ProfilePicture ? (
//                     <img
//                         src={file.user.ProfilePicture}
//                         alt={file.user.Name}
//                         className="w-10 h-10 rounded-full object-cover"
//                     />
//                 ) : (
//                     <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center">
//                         <FiUser className="text-white" />
//                     </div>
//                 )}
//                 <span className="text-sm font-semibold">{file.user?.Name || "Unknown User"}</span>
//             </div>

//             {/* Description and Info */}
//             <div className="text-gray-500 text-sm">
//                 <p>ফাইল টাইপ: {file.tag || "অন্যান্য"} • {file.size || "15 MB"}</p>
//                 <div className="flex items-center gap-3 mt-2 text-gray-600">
//                     <FiUser className="text-gray-600" />
//                     <span>{file.user ? `ইউজার ${file.user.role}` : "ভিডিও এডিটর"}</span>
//                 </div>
//                 <div className="flex items-center gap-3 mt-1 text-gray-600">
//                     <FiCalendar className="text-gray-600" />
//                     <span>{new Date(file.uploaded_at).toISOString().slice(0, 10)}</span>
//                 </div>
//             </div>

//             {/* Action buttons */}
//             <div className="flex gap-4 mt-4">
//                 <a
//                     href={file.file}
//                     target="_blank"
//                     download={file.title}
//                     rel="noopener noreferrer"
//                     className="flex items-center gap-2 justify-center bg-blue-600 text-white px-5 py-2 rounded-md text-sm hover:bg-blue-700 transition-all"
//                 >
//                     <FiDownload />
//                     ডাউনলোড
//                 </a>
//                 <button className="p-3 border rounded-md text-gray-600 hover:bg-gray-100 hover:text-blue-600 transition-all">
//                     <a target="_blank" href={file.file}>
//                         <FiEye className="text-lg" />
//                     </a>
//                 </button>
//                 <button className="p-3 border rounded-md text-gray-600 hover:bg-gray-100 hover:text-blue-600 transition-all">
//                     <FiMessageSquare className="text-lg" />
//                 </button>
//             </div>
//         </div>
//     );
// };

// const AllFiles = () => {
//     const [files, setFiles] = useState([]);
//     const [role, setRole] = useState("");
//     const [nextPage, setNextPage] = useState(null);
//     const [previousPage, setPreviousPage] = useState(null);
//     const [loading, setLoading] = useState(false); // Track loading state
//     const [error, setError] = useState(''); // Track error state
//     const [teamFilter, setTeamFilter] = useState("All Teams"); // Track team filter
//     const [categoryFilter, setCategoryFilter] = useState("All"); // Track category filter
//     const [teams, setTeams] = useState([]); // Track available teams

//     // Fetch available teams
//     useEffect(() => {
//         fetch('https://team-focu-z-backend.vercel.app/team/teams/')
//             .then(res => res.json())
//             .then(data => setTeams(data))  // Store teams data
//             .catch(err => console.error("Error fetching teams:", err));
//     }, []);

//     useEffect(() => {
//         const fetchUserRole = async () => {
//             const access = sessionStorage.getItem("access");
//             const response = await fetch('https://team-focu-z-backend.vercel.app/auth/profile/', {
//                 headers: {
//                     Authorization: `Bearer ${access}`,
//                 },
//             });
//             const userData = await response.json();
//             setRole(userData.role); // Update the role state
//         };

//         fetchUserRole();
//     }, []);

//     const fetchFiles = (url) => {
//         setLoading(true); // Set loading to true when fetching data
//         fetch(url || "https://team-focu-z-backend.vercel.app/media/data/", {
//             method: "GET",
//             headers: {
//                 "Content-Type": "application/json",
//                 Authorization: `Bearer ${sessionStorage.getItem("access")}`,
//             }
//         })
//             .then((res) => {
//                 if (!res.ok) {
//                     throw new Error(`Request failed with status ${res.status}`);
//                 }
//                 return res.json();
//             })
//             .then((data) => {
//                 setFiles(data.results);
//                 setNextPage(data.next);
//                 setPreviousPage(data.previous);
//                 setLoading(false); // Set loading to false after the data is fetched
//             })
//             .catch((err) => {
//                 console.error("Fetch error:", err);  // Log detailed error
//                 setError(`Failed to fetch data. Error: ${err.message}`); // Show detailed error message
//                 setLoading(false); // Set loading to false even if there is an error
//             });
//     };

//     useEffect(() => {
//         let url = "https://team-focu-z-backend.vercel.app/media/data/?";
//         if (teamFilter !== "All Teams") {
//             url += `team=${teamFilter}&`;
//         }
//         if (categoryFilter !== "All") {
//             url += `category=${categoryFilter}&`;
//         }
//         fetchFiles(url);
//     }, [teamFilter, categoryFilter]); // Trigger fetch on filter change

//     return (
//         <>
//             {/* Team Filter */}
//             <div className="flex gap-4 mb-6">
//                 <select
//                     onChange={(e) => setTeamFilter(e.target.value)}
//                     className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
//                 >
//                     <option value="All Teams">All Teams</option>
//                     {teams.map((team) => (
//                         <option key={team.id} value={team.name}>
//                             {team.name}
//                         </option>
//                     ))}
//                 </select>
//             </div>

//             {/* Category Filter */}
//             <div className="flex gap-4 mb-6">
//                 <button
//                     onClick={() => setCategoryFilter("All")}
//                     className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
//                 >
//                     All Categories
//                 </button>
//                 <button
//                     onClick={() => setCategoryFilter("video")}
//                     className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
//                 >
//                     Video
//                 </button>
//                 <button
//                     onClick={() => setCategoryFilter("voice")}
//                     className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
//                 >
//                     Audio
//                 </button>
//                 <button
//                     onClick={() => setCategoryFilter("script")}
//                     className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
//                 >
//                     Script
//                 </button>
//             </div>

//             {/* Display Files */}
//             {role && (
//                 <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//                     {files.map((file) => (
//                         <FileCard key={file.id} file={file} />
//                     ))}
//                 </div>
//             )}

//             {/* Show loading spinner */}
//             {loading && (
//                 <div className="flex justify-center items-center mt-6">
//                     <FiLoader className="animate-spin text-blue-600 text-3xl" />
//                     <span className="ml-2 text-gray-600">Loading...</span>
//                 </div>
//             )}

//             {/* Show error message */}
//             {error && (
//                 <div className="flex justify-center mt-6 text-red-600">
//                     <span>{error}</span>
//                 </div>
//             )}

//             {/* Pagination Controls */}
//             {previousPage || nextPage ? (
//                 <div className="flex justify-between mt-6">
//                     {previousPage && (
//                         <button
//                             onClick={() => fetchFiles(previousPage)}
//                             className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center gap-2"
//                         >
//                             <FiChevronLeft />
//                             পূর্ববর্তী
//                         </button>
//                     )}
//                     {nextPage && (
//                         <button
//                             onClick={() => fetchFiles(nextPage)}
//                             className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 flex items-center gap-2"
//                         >
//                             পরবর্তী
//                             <FiChevronRight />
//                         </button>
//                     )}
//                 </div>
//             ) : null}
//         </>
//     );
// };

// export default AllFiles;


import React, { useEffect, useState } from "react";
import { FiDownload, FiUser, FiCalendar, FiEye, FiMessageSquare, FiChevronRight, FiChevronLeft, FiLoader } from "react-icons/fi";

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

    // Fetch available teams
    useEffect(() => {
        fetch('https://team-focu-z-backend.vercel.app/team/teams/')
            .then(res => res.json())
            .then(data => setTeams(data))  // Store teams data
            .catch(err => console.error("Error fetching teams:", err));
    }, []);

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
        setLoading(true); // Set loading to true when fetching data
        fetch(url || "https://team-focu-z-backend.vercel.app/media/data/", {
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
        let url = "https://team-focu-z-backend.vercel.app/media/data/?";
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
                <div className="flex gap-4 mb-6">
                    <select
                        onChange={(e) => setTeamFilter(e.target.value)}
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
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
