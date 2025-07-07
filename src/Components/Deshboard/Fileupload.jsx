

import { useEffect, useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";

export default function Fileupload() {
    const [file, setFile] = useState(null);
    const [title, setTitle] = useState("");
    const [tag, setTag] = useState("");
    const [role, setRole] = useState(""); // Add state for role

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


    useEffect(() => {

        if (role === "script writer") {

            setTag("script");
        } else if (role === "voice artist") {

            setTag("voice");
        } else if (role === "video editor") {
            s
            setTag("video");
        }
    }, [role]);

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];

        // Check file type based on role
        if (role === "script writer" && !selectedFile.name.endsWith('.txt')) {
            alert("Script Writers can only upload text files!");
            return;
        }

        if (role === "voice artist" &&
            !(
                selectedFile.name.endsWith('.mp3') ||
                selectedFile.name.endsWith('.wav') ||
                selectedFile.name.endsWith('.aac')
            )
        ) {
            alert("Voice Artists can only upload audio files!");
            return;
        }

        if (role === "video editor" && !selectedFile.name.endsWith('.mp4')) {
            alert("Video Editors can only upload mp4 files!");
            return;
        }

        // If the file passes the validation, set it
        setFile(selectedFile);
    };



    const handleDrop = (e) => {
        e.preventDefault();
        const droppedFile = e.dataTransfer.files[0];

        // Check file type based on role
        if (role === "script writer" && !droppedFile.name.endsWith('.txt')) {
            alert("Script Writers can only upload text files!");
            return;
        }

        if (role === "voice artist" && !droppedFile.name.endsWith(('.mp3', '.wav', '.aac'))) {
            alert("Voice Artists can only upload audio files!");
            return;
        }

        if (role === "video editor" && !droppedFile.name.endsWith('.mp4')) {
            alert("Video Editors can only upload mp4 files!");
            return;
        }

        setFile(droppedFile);
    };


    // const handleSubmit = async (e) => {
    //     e.preventDefault();

    //     // Ensure file is selected
    //     if (!file) return alert("ফাইল নির্বাচন করুন");

    //     const formData = new FormData();
    //     formData.append("file", file);
    //     formData.append("upload_preset", "TeamFocuZ"); // Ensure this matches with your Cloudinary preset
    //     formData.append("cloud_name", "do0pqsf4a"); // Ensure this is your correct Cloudinary cloud name

    //     try {
    //         // Upload file to Cloudinary
    //         const res = await fetch("https://api.cloudinary.com/v1_1/do0pqsf4a/video/upload", {
    //             method: "POST",
    //             body: formData,
    //         });

    //         const data = await res.json();

    //         if (res.ok && data.secure_url) {
    //             // Successfully uploaded to Cloudinary
    //             alert("✅ আপলোড সফল হয়েছে!");
    //             console.log("Uploaded URL:", data.secure_url);

    //             // Now send file details to the backend
    //             const access = sessionStorage.getItem("access");
    //             const mediaPayload = {
    //                 title,
    //                 tag,
    //                 file: data.secure_url,  // Cloudinary URL of the uploaded file
    //             };

    //             // Sending the uploaded file URL to your backend
    //             const backendRes = await fetch("https://team-focu-z-backend.vercel.app/media/data/", {
    //                 method: "POST",
    //                 headers: {
    //                     "Content-Type": "application/json",
    //                     "Authorization": `Bearer ${access}`,
    //                 },
    //                 body: JSON.stringify(mediaPayload),
    //             });

    //             if (backendRes.ok) {
    //                 alert("✅ ডাটাবেজে সংরক্ষণ সফল হয়েছে");
    //             } else {
    //                 const errorResult = await backendRes.json();
    //                 console.error("Backend error:", errorResult);
    //                 alert("❌ ব্যাকেন্ডে আপলোড ব্যর্থ হয়েছে");
    //             }
    //         } else {
    //             // Handle Cloudinary upload failure
    //             console.error("Cloudinary upload failed:", data);  // Log full response from Cloudinary
    //             alert("❌ ক্লাউডিনারিতে আপলোড ব্যর্থ হয়েছে");
    //         }
    //     } catch (error) {
    //         // Handle fetch or network error
    //         console.error("Upload error:", error);
    //         alert("❌ Cloudinary আপলোডে সমস্যা");
    //     }
    // };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Ensure file is selected
        if (!file) return alert("ফাইল নির্বাচন করুন");

        // Prepare FormData for Cloudinary
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "TeamFocuZ"); // Ensure this matches with your Cloudinary preset
        formData.append("cloud_name", "do0pqsf4a"); // Ensure this is your correct Cloudinary cloud name

        try {
            let uploadUrl = "https://api.cloudinary.com/v1_1/do0pqsf4a/upload";  // General upload URL

            // If file is video, use video upload endpoint
            if (file.name.endsWith(".mp4") || file.name.endsWith(".mov")) {
                uploadUrl = "https://api.cloudinary.com/v1_1/do0pqsf4a/video/upload";
            }

            // Upload the file
            const res = await fetch(uploadUrl, {
                method: "POST",
                body: formData,
            });

            const data = await res.json();

            if (res.ok && data.secure_url) {
                // Successfully uploaded to Cloudinary
                alert("✅ আপলোড সফল হয়েছে!");
                console.log("Uploaded URL:", data.secure_url);

                // Now send file details to the backend
                const access = sessionStorage.getItem("access");
                const mediaPayload = {
                    title,
                    tag,
                    file: data.secure_url,  // Cloudinary URL of the uploaded file
                };

                // Send the uploaded file URL to your backend
                const backendRes = await fetch("https://team-focu-z-backend.vercel.app/media/data/", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${access}`,
                    },
                    body: JSON.stringify(mediaPayload),
                });

                if (backendRes.ok) {
                    alert("✅ ডাটাবেজে সংরক্ষণ সফল হয়েছে");
                } else {
                    const errorResult = await backendRes.json();
                    console.error("Backend error:", errorResult);
                    alert("❌ ব্যাকেন্ডে আপলোড ব্যর্থ হয়েছে");
                }
            } else {
                // Handle Cloudinary upload failure
                console.error("Cloudinary upload failed:", data);  // Log full response from Cloudinary
                alert("❌ ক্লাউডিনারিতে আপলোড ব্যর্থ হয়েছে");
            }
        } catch (error) {
            // Handle fetch or network error
            console.error("Upload error:", error);
            alert("❌ Cloudinary আপলোডে সমস্যা");
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

                    {/* File Name displayed in the input field */}
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

                        <div>
                            <input
                                type="text"
                                value={tag}
                                // onChange={(e) => setTag(e.target.value)}
                                placeholder="ট্যাগ (যেমন: ভিডিও, স্ক্রিপ্ট, ভয়েস)"
                                className="w-full p-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
                            />
                        </div>
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
