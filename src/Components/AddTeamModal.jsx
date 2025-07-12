

import React, { useEffect, useState, useRef } from 'react';
import { Bounce, toast } from 'react-toastify';

const AddTeamModal = ({ isOpen, onClose, onTeamAdded }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    // const [managerId, setManagerId] = useState('');
    const [users, setUsers] = useState([]);
    const formRef = useRef(null);  // Reference to the form to reset it
    const baseURL = import.meta.env.VITE_BACKEND_URL;
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const accessToken = sessionStorage.getItem("access");
                const response = await fetch(`${baseURL}/auth/users/`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                });
                const data = await response.json();
                setUsers(data);
            } catch (error) {
                console.error('Failed to load users:', error);
            }
        };

        if (isOpen) fetchUsers();
    }, [isOpen]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const accessToken = sessionStorage.getItem("access");

            const response = await fetch(`${baseURL}/team/teams/`, {  // Correct URL
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                },
                body: JSON.stringify({
                    name,
                    description,
                }),
            });

            const result = await response.json();

            console.log('Response:', result);
            console.log('Status:', response.status);

            if (response.ok) {
                onTeamAdded(result);
                onClose();
                formRef.current.reset();  // Reset the form via ref

                toast.success('Team Created Successfully', {
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
                toast.error(result.message || 'Team Create Failed', {
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
            console.error('Error:', error);

            toast.error('Error creating team', {
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

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-md">
                <h2 className="text-2xl font-bold mb-4">নতুন টিম যোগ করুন</h2>
                <form onSubmit={handleSubmit} ref={formRef}> {/* Added ref here */}
                    <label className="block mb-2">টিমের নাম</label>
                    <input
                        type="text"
                        className="w-full p-2 border rounded mb-4"
                        placeholder="টিমের নাম লিখুন"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />

                    <label className="block mb-2">বিবরণ</label>
                    <textarea
                        className="w-full p-2 border rounded mb-4"
                        placeholder="টিমের বিবরণ লিখুন"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />



                    <div className="flex justify-end gap-4">
                        <button
                            type="submit"
                            className="px-6 py-2 bg-gradient-to-r from-blue-500 to-teal-500 text-white rounded hover:opacity-90"
                        >
                            যোগ করুন
                        </button>
                        <button
                            type="button"
                            className="px-6 py-2 bg-gray-300 rounded hover:bg-gray-400"
                            onClick={onClose}
                        >
                            বাতিল
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddTeamModal;
