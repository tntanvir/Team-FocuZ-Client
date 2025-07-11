import React, { useState } from 'react';

const ChangePassword = () => {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    // Authorization: `Bearer ${sessionStorage.getItem("access")}`,

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError('');
        setMessage('');

        if (newPassword !== confirmPassword) {
            setError('New passwords do not match.');
            return;
        }

        const data = {
            old_password: oldPassword,
            new_password: newPassword,
            confirm_password: confirmPassword,
        };

        try {
            const response = await fetch('https://team-focu-z-backend.vercel.app/auth/change-password/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${sessionStorage.getItem("access")}`,
                },
                body: JSON.stringify(data),
            });

            const result = await response.json();

            if (response.ok) {
                setMessage(result.message);
            } else {
                setError(result.detail || 'Something went wrong. Please try again.');
            }
        } catch (err) {
            console.error('Error during fetch:', err);  // Add this line to log errors
            setError('Network error. Please try again later.');
        }
    };


    return (
        <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-center text-gray-800 mb-4">Change Password</h2>

            {message && <div className="bg-green-100 text-green-700 p-2 mb-4 rounded">{message}</div>}
            {error && <div className="bg-red-100 text-red-700 p-2 mb-4 rounded">{error}</div>}

            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="oldPassword" className="block text-gray-700">Old Password</label>
                    <input
                        type="password"
                        id="oldPassword"
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)}
                        className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="newPassword" className="block text-gray-700">New Password</label>
                    <input
                        type="password"
                        id="newPassword"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="confirmPassword" className="block text-gray-700">Confirm New Password</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="w-full py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition duration-200"
                >
                    Change Password
                </button>
            </form>
        </div>
    );
};

export default ChangePassword;
