import { useState } from 'react'
import { FaEnvelope, FaLock, FaEye, FaEyeSlash, FaUser, FaPhone, FaHome, FaImage } from 'react-icons/fa'
import { Link, useNavigate } from "react-router-dom";

export default function Signup() {
    const [showPassword, setShowPassword] = useState(false)
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();
        const form = e.target;

        const userData = {
            username: form.username.value,
            email: form.email.value,
            Name: form.name.value,
            Phone: form.phone.value,
            Address: form.address.value,
            ProfilePicture: form.profilePicture.value,
            password: form.password.value
        };

        try {
            const res = await fetch('https://team-focu-z-backend.vercel.app/auth/register/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData)
            });

            const data = await res.json();
            if (res.ok) {
                alert('Signup successful! Please login.');
                navigate('/login');
            } else {
                alert('Signup failed! ' + (data.detail || JSON.stringify(data)));
            }
        } catch (error) {
            console.error(error);
            alert("Something went wrong!");
        }
    };

    return (
        <div className="flex min-h-screen bg-gradient-to-r from-blue-900 to-blue-600 items-center justify-center px-4">
            <div className="grid md:grid-cols-2 w-full max-w-6xl overflow-hidden">
                {/* Left Section */}
                <div className="text-white p-8 space-y-4 flex flex-col justify-center items-start">
                    <h1 className="text-4xl font-bold">Team FocuZ</h1>
                    <h2 className="text-xl font-semibold">মাল্টি-টিম মিডিয়া প্রজেক্ট ম্যানেজমেন্ট প্ল্যাটফর্ম</h2>
                    <ul className="list-disc list-inside space-y-2 mt-4">
                        <li>ভিডিও এডিটার, স্ক্রিপ্ট রাইটার ও ভয়েস আর্টিস্ট</li>
                        <li>টিম ভিত্তিক ফাইল ম্যানেজমেন্ট</li>
                        <li>রিপোর্ট ও বিশ্লেষণ</li>
                    </ul>
                </div>

                {/* Signup Form */}
                <div className="bg-white p-8 rounded-lg">
                    <div className="flex justify-center mb-4">
                        <div className="bg-gradient-to-r from-blue-500 to-green-500 rounded-full p-3">
                            <span className="text-white text-2xl">+</span>
                        </div>
                    </div>
                    <h2 className="text-center text-2xl font-bold mb-2">নিবন্ধন করুন</h2>
                    <p className="text-center mb-6 text-gray-600">নতুন অ্যাকাউন্ট তৈরি করুন</p>

                    <form className="space-y-4" onSubmit={handleSignup}>
                        <InputField icon={<FaUser />} name="username" label="ইউজার নাম" placeholder="আপনার ইউজার নাম লিখুন" />
                        <InputField icon={<FaEnvelope />} name="email" label="ইমেইল" placeholder="আপনার ইমেইল লিখুন" type="email" />
                        <InputField icon={<FaUser />} name="name" label="সম্পূর্ণ নাম" placeholder="আপনার নাম লিখুন" />
                        <InputField icon={<FaPhone />} name="phone" label="ফোন" placeholder="আপনার ফোন নম্বর লিখুন" />
                        <InputField icon={<FaHome />} name="address" label="ঠিকানা" placeholder="আপনার ঠিকানা লিখুন" />
                        <InputField icon={<FaImage />} name="profilePicture" label="প্রোফাইল পিকচার URL" placeholder="ছবির লিংক দিন" />

                        <div>
                            <label className="block mb-1 text-gray-700">পাসওয়ার্ড</label>
                            <div className="flex items-center border rounded px-3 py-2">
                                <FaLock className="text-gray-400 mr-2" />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="আপনার পাসওয়ার্ড লিখুন"
                                    className="w-full outline-none"
                                    name="password"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="text-gray-400 ml-2"
                                >
                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </button>
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full py-2 rounded text-white font-semibold bg-gradient-to-r from-blue-600 to-green-500 hover:opacity-90"
                        >
                            নিবন্ধন করুন
                        </button>
                        <p className='text-center hover:underline'><Link to='/signin' >অ্যাকাউন্ট আছে?</Link></p>
                    </form>
                </div>
            </div>
        </div>
    )
}

function InputField({ icon, name, label, placeholder, type = "text" }) {
    return (
        <div>
            <label className="block mb-1 text-gray-700">{label}</label>
            <div className="flex items-center border rounded px-3 py-2">
                {icon}
                <input
                    type={type}
                    name={name}
                    placeholder={placeholder}
                    className="w-full outline-none ml-2"
                />
            </div>
        </div>
    )
}
