import React, { useEffect, useState } from 'react';

const AddTeamModal = ({ isOpen, onClose, onTeamAdded }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [managerId, setManagerId] = useState('');
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const accessToken = sessionStorage.getItem("access");
                const response = await fetch('\https://team-focu-z-backend.vercel.app/auth/users/', {
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

            const response = await fetch('\https://team-focu-z-backend.vercel.app/team/teams/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`
                },
                body: JSON.stringify({
                    name,
                    description,
                    // manager: managerId
                })
            });

            const result = await response.json();
            if (response.ok) {
                onTeamAdded(result);
                onClose();
                form.reset();
            } else {
                alert("Error: " + JSON.stringify(result));
            }
        } catch (error) {
            console.error("Error creating team:", error);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-md">
                <h2 className="text-2xl font-bold mb-4">নতুন টিম যোগ করুন</h2>
                <form onSubmit={handleSubmit}>
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
