import { useState } from 'react'
import { FaEnvelope, FaLock, FaEye, FaEyeSlash, FaUser } from 'react-icons/fa'
import { Link, useNavigate } from "react-router-dom";
import { toast, Bounce } from 'react-toastify';

export default function Login() {
    const [showPassword, setShowPassword] = useState(false)
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault()
        const form = e.target;
        const username = form.username.value;
        const password = form.password.value;
        // console.log(username, password);
        // form.reset();

        fetch('https://team-focu-z-backend.vercel.app/auth/login/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),

        }).then(res => res.json())
            .then(data => {
                sessionStorage.setItem('access', data.access);
                sessionStorage.setItem('refresh', data.refresh);
                sessionStorage.setItem('user', JSON.stringify(data.user));

                if (data.access) {
                    toast.success('Login Successfull', {
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
                    navigate('/dashboard/main');
                }
                else {
                    toast.error('Login Failed', {
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
            .catch(err => {
                toast.error('Login Failed', {
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
    }

    return (
        <div className="flex min-h-screen bg-gradient-to-r from-blue-900 to-blue-600 items-center justify-center px-4">
            <div className="grid md:grid-cols-2 w-full max-w-6xl bg-transparent   overflow-hidden  ">
                {/* Left Section */}
                <div className="text-white p-8 space-y-4  flex flex-col justify-center items-start">
                    <h1 className="text-4xl font-bold">Dream FocuZ</h1>
                    <h2 className="text-xl font-semibold">মাল্টি-টিম মিডিয়া প্রজেক্ট ম্যানেজমেন্ট প্ল্যাটফর্ম</h2>
                    <ul className="list-disc list-inside space-y-2 mt-4">
                        <li>ভিডিও এডিটার, স্ক্রিপ্ট রাইটার ও ভয়েস আর্টিস্ট</li>
                        <li>টিম ভিত্তিক ফাইল ম্যানেজমেন্ট</li>
                        <li>রিপোর্ট ও বিশ্লেষণ</li>
                    </ul>
                </div>

                {/* Right Section - Login Form */}
                <div className="bg-white p-8 rounded-lg">
                    <div className="flex justify-center mb-4">
                        <div className="bg-gradient-to-r from-blue-500 to-green-500 rounded-full p-3">
                            <span className="text-white text-2xl">➜</span>
                        </div>
                    </div>
                    <h2 className="text-center text-2xl font-bold mb-2">স্বাগতম</h2>
                    <p className="text-center mb-6 text-gray-600">আপনার অ্যাকাউন্ট লগইন করুন</p>

                    <form className="space-y-4" onSubmit={handleLogin}>
                        <div>
                            <label className="block mb-1 text-gray-700">ইউজার নাম</label>
                            <div className="flex items-center border rounded px-3 py-2">
                                <FaUser className="text-gray-400 mr-2" />
                                <input
                                    type="text"
                                    name="username"
                                    placeholder="আপনার ইউজার নাম লিখুন"
                                    className="w-full outline-none"
                                />
                            </div>
                        </div>

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
                            লগইন করুন
                        </button>
                        <p className='text-center hover:underline'><Link to='/signup' >অ্যাকাউন্ট তৈরি করুন</Link></p>
                    </form>

                    {/* Demo Info */}

                </div>
            </div>
        </div>
    )
}
