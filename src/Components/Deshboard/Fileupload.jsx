
import { useEffect, useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import { Bounce, toast } from "react-toastify";

export default function Fileupload() {
    const [file, setFile] = useState(null);
    const [title, setTitle] = useState("");
    const [tag, setTag] = useState("");
    const [role, setRole] = useState(""); // Add state for role
    const [teams, setTeams] = useState(null);
    // State to store the teams data
    const [selectedTeam, setSelectedTeam] = useState(""); // State to store selected team
    const baseURL = import.meta.env.VITE_BACKEND_URL;
    useEffect(() => {
        const fetchUserRole = async () => {
            const access = sessionStorage.getItem("access");
            const response = await fetch(`${baseURL}/auth/profile/`, {
                headers: {
                    Authorization: `Bearer ${access}`,
                },
            });
            const userData = await response.json();
            setRole(userData.role);
            // console.log(userData?.teams[0]?.name)
            setSelectedTeam(userData?.teams[0]?.name)
        };

        fetchUserRole();
    }, []);

    useEffect(() => {
        fetch(`${baseURL}/team/teams/`)
            .then((res) => res.json())
            .then((data) => {
                setTeams(data);
                console.log(data);
            });
    }, []);

    useEffect(() => {
        if (role === "script writer") {
            setTag("script");
        } else if (role === "voice artist") {
            setTag("voice");
        } else if (role === "video editor") {
            setTag("video");
        }
    }, [role]);

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];

        // Check file type based on role
        if (role === "script writer" && !selectedFile.name.endsWith('.txt')) {
            // alert("Script Writers can only upload text files!");
            toast.warning('Script Writers can only upload text files!', {
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
            return;
        }

        if (role === "voice artist" &&
            !(
                selectedFile.name.endsWith('.mp3') ||
                selectedFile.name.endsWith('.wav') ||
                selectedFile.name.endsWith('.aac')
            )
        ) {
            // alert("Voice Artists can only upload audio files!");
            toast.warning('Voice Artists can only upload audio files!', {
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
            return;
        }

        if (role === "video editor" && !selectedFile.name.endsWith('.mp4')) {
            // alert("Video Editors can only upload mp4 files!");
            toast.warning('Video Editors can only upload mp4 files!', {
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
            return;
        }

        setFile(selectedFile);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        const droppedFile = e.dataTransfer.files[0];

        // Check file type based on role
        if (role === "script writer" && !droppedFile.name.endsWith('.txt')) {
            toast.warning('Script Writers can only upload text files!', {
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
            return;
        }

        if (role === "voice artist" && !droppedFile.name.endsWith(('.mp3', '.wav', '.aac'))) {
            // alert("");
            toast.warning('Voice Artists can only upload audio files!', {
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
            return;
        }

        if (role === "video editor" && !droppedFile.name.endsWith('.mp4')) {
            // alert("Video Editors can only upload mp4 files!");
            toast.warning('Video Editors can only upload mp4 files!', {
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
            return;
        }

        setFile(droppedFile);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Ensure file is selected
        if (!file) return alert("ফাইল নির্বাচন করুন");

        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "DreamFocuZ"); // Ensure this matches with your Cloudinary preset
        formData.append("cloud_name", "dcebkf2od"); // Ensure this is your correct Cloudinary cloud name

        try {
            let uploadUrl = "https://api.cloudinary.com/v1_1/dcebkf2od/upload";  // General upload URL

            if (file.name.endsWith(".mp4") || file.name.endsWith(".mov")) {
                uploadUrl = "https://api.cloudinary.com/v1_1/dcebkf2od/video/upload";
            }

            const res = await fetch(uploadUrl, {
                method: "POST",
                body: formData,
            });

            const data = await res.json();

            if (res.ok && data.secure_url) {
                // alert("✅ আপলোড সফল হয়েছে!");
                // console.log("Uploaded URL:", data.secure_url);

                const access = sessionStorage.getItem("access");
                const mediaPayload = {
                    title,
                    tag,
                    file: data.secure_url,  // Cloudinary URL of the uploaded file
                    team: selectedTeam, // Send selected team along with other data
                };

                const backendRes = await fetch(`${baseURL}/media/data/`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${access}`,
                    },
                    body: JSON.stringify(mediaPayload),
                });

                if (backendRes.ok) {
                    // alert("✅ ডাটাবেজে সংরক্ষণ সফল হয়েছে");

                    setFile(null); // Clear the file input
                    setTitle(""); // Clear the title input
                    setTag(""); // Clear the tag input
                    setSelectedTeam(""); // Clear the selected team


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
                    formData.reset(); // Reset form data after successful upload
                } else {
                    const errorResult = await backendRes.json();
                    // console.error("Backend error:", errorResult);
                    // alert("❌ ব্যাকেন্ডে আপলোড ব্যর্থ হয়েছে");
                    toast.error('❌ ব্যাকেন্ডে আপলোড ব্যর্থ হয়েছে', {
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
            } else {
                console.error("Cloudinary upload failed:", data);
                // alert("❌ ক্লাউডিনারিতে আপলোড ব্যর্থ হয়েছে");
                toast.error('❌ ক্লাউডিনারিতে আপলোড ব্যর্থ হয়েছে', {
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
        } catch (error) {
            // console.error("Upload error:", error);
            // alert("❌ Cloudinary আপলোডে সমস্যা");
            toast.error('❌ ক্লাউডিনারিতে আপলোড ব্যর্থ হয়েছে', {
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
    };

    const getAcceptedFileTypes = () => {
        if (role === "script writer") {
            return ".txt";
        } else if (role === "voice artist") {
            return ".mp3, .wav, .aac";
        } else if (role === "video editor") {
            return ".mp4";
        }
        return "";
    };


    const getRoleSpecificText = () => {
        if (role === "script writer") {
            return "আপনি শুধুমাত্র টেক্সট ফাইল (.txt) আপলোড করতে পারেন";
        } else if (role === "voice artist") {
            return "আপনি শুধুমাত্র অডিও ফাইল (.mp3, .wav, .aac) আপলোড করতে পারেন";
        } else if (role === "video editor") {
            return "আপনি শুধুমাত্র ভিডিও ফাইল (.mp4) আপলোড করতে পারেন";
        }
        return "";
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl shadow-lg p-8 max-w-lg w-full">
                <div className="flex flex-col items-center mb-6 text-center">
                    <FaCloudUploadAlt className="text-blue-500 text-4xl mb-2" />
                    <h2 className="text-2xl font-bold text-gray-800">ফাইল আপলোড করুন</h2>
                    <p className="text-gray-600">আপনার ফাইল নির্বাচন করুন</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div
                        className="bg-gray-200 border-2 border-dashed border-gray-400 p-6 rounded-lg mb-4 transition-all hover:bg-gray-300 cursor-pointer"
                        onDrop={handleDrop}
                        onDragOver={(e) => e.preventDefault()}
                    >
                        <input
                            type="file"
                            accept={getAcceptedFileTypes()}
                            onChange={handleFileChange}
                            className="hidden"
                            id="file-upload"
                        />
                        <label
                            htmlFor="file-upload"
                            className="cursor-pointer block text-center font-medium text-blue-500 hover:text-blue-700"
                        >
                            {file ? (
                                <div className="text-sm text-gray-700">{file.name}</div>
                            ) : (
                                <div className="flex items-center justify-center gap-2">
                                    <FaCloudUploadAlt className="text-2xl" />
                                    <span>ফাইল নির্বাচন করুন বা এখানে ড্র্যাগ করুন</span>
                                </div>
                            )}
                        </label>
                    </div>

                    {/* Show role-specific instructions */}
                    <div className="text-sm text-gray-500 mb-4">
                        {getRoleSpecificText()}
                    </div>

                    <div className="space-y-4">
                        <div>
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="ফাইলের শিরোনাম"
                                className="w-full p-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
                            />
                        </div>


                        {
                            role === 'admin' ? (
                                <div>
                                    <select
                                        value={tag}
                                        onChange={(e) => setTag(e.target.value)}
                                        className="w-full p-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
                                    >
                                        <option value="video">ভিডিও</option>
                                        <option value="script">স্ক্রিপ্ট</option>
                                        <option value="voice">ভয়েস</option>
                                    </select>
                                </div>
                            ) : (
                                <div>
                                    <input
                                        type="text"
                                        value={tag}
                                        onChange={(e) => setTag(e.target.value)}
                                        placeholder="ট্যাগ (যেমন: ভিডিও, স্ক্রিপ্ট, ভয়েস)"
                                        className="w-full p-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
                                    />
                                </div>
                            )
                        }

                        {/* Team Select Option */}
                        {role === 'admin' && teams && (
                            <div>
                                <select
                                    value={selectedTeam}
                                    onChange={(e) => setSelectedTeam(e.target.value)}
                                    className="w-full p-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
                                >
                                    <option value="">Select a Team</option>
                                    {teams.map((team) => (
                                        <option key={team.id} value={team.name}>
                                            {team.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        )}
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white p-4 rounded-lg text-lg font-semibold hover:bg-blue-600 transition-all"
                    >
                        আপলোড করুন
                    </button>
                </form>
            </div>
        </div>
    );
}
