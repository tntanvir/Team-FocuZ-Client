import { useEffect, useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";

export default function Fileupload() {
    const [file, setFile] = useState(null);
    const [title, setTitle] = useState("");
    const [tag, setTag] = useState("");

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setFile(e.dataTransfer.files[0]);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };



    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!file) return alert("ফাইল নির্বাচন করুন");

        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "TeamFocuZ");
        formData.append("cloud_name", "do0pqsf4a");

        try {
            const res = await fetch("https://api.cloudinary.com/v1_1/do0pqsf4a/video/upload", {
                method: "POST",
                body: formData,
            });

            const data = await res.json();
            if (data.secure_url) {
                alert("✅ আপলোড সফল হয়েছে!");
                console.log("Uploaded URL:", data.secure_url);

                const access = sessionStorage.getItem("access");
                const mediaPayload = {
                    title,
                    tag,
                    file: data.secure_url,
                };

                const backendRes = await fetch("https://team-focu-z-backend.vercel.app/media/data/", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${access}`,
                    },
                    body: JSON.stringify(mediaPayload),
                });

                if (backendRes.ok) {
                    alert("✅ ডাটাবেজে সংরক্ষণ সফল হয়েছে");
                } else {
                    alert("❌ ব্যাকেন্ডে আপলোড ব্যর্থ হয়েছে");
                }
            } else {
                console.error("Upload failed:", data);
                alert("❌ ক্লাউডিনারিতে আপলোড ব্যর্থ হয়েছে");
            }
        } catch (error) {
            console.error("Upload error:", error);
            alert("❌ Cloudinary আপলোড中 সমস্যা");
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl shadow-md p-8 max-w-lg w-full">
                <div className="flex flex-col items-center mb-6 text-center">
                    <FaCloudUploadAlt className="text-blue-500 text-4xl mb-2" />
                    <h2 className="text-2xl font-bold">ভিডিও আপলোড করুন</h2>
                    <p className="text-sm text-gray-500">
                        আপনার ভিডিও ফাইল আপলোড করুন এবং টিমের সাথে শেয়ার করুন
                    </p>
                </div>

                <form onSubmit={handleSubmit}>
                    <div
                        className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer mb-4"
                        onDrop={handleDrop}
                        onDragOver={handleDragOver}
                    >
                        {file ? (
                            <p className="text-sm text-green-600">{file.name}</p>
                        ) : (
                            <>
                                <p className="text-sm font-medium mb-2">ফাইল নির্বাচন করুন</p>
                                <label className="text-blue-600 cursor-pointer">
                                    ফাইল আপলোড করুন অথবা ড্র্যাগ করে ছেড়ে দিন
                                    <br />
                                    <span className="text-xs text-gray-400">.mp4, .mov, .avi ফাইল সাপোর্টেড</span>
                                    <input type="file" accept="video/*" onChange={handleFileChange} className="hidden" />
                                </label>
                            </>
                        )}
                    </div>

                    <input
                        type="text"
                        className="w-full border border-gray-300 rounded px-4 py-2 mb-4"
                        placeholder="একটি বর্ণনামূলক টাইটেল দিন"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />

                    <input
                        type="text"
                        className="w-full border border-gray-300 rounded px-4 py-2 mb-6"
                        placeholder="ট্যাগ দিন (যেমন: প্রোমো, ভিডিও, মার্কেটিং)"
                        value={tag}
                        onChange={(e) => setTag(e.target.value)}
                    />

                    <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-blue-500 to-teal-500 text-white py-2 rounded hover:opacity-90 transition"
                    >
                        আপলোড করুন
                    </button>
                </form>
            </div>
        </div>
    );
}
