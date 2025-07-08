// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';

// const Profile = () => {
//     const [userData, setUserData] = useState({
//         name: '',
//         phone: '',
//         address: '',
//         profilePicture: ''
//     });

//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState('');

//     // Fetch user profile when the component mounts
//     useEffect(() => {
//         const fetchUserProfile = async () => {
//             try {
//                 const response = await fetch('https://team-focu-z-backend.vercel.app/auth/profile/', {
//                     method: 'GET',
//                     headers: {
//                         Authorization: `Bearer ${sessionStorage.getItem('access')}`,
//                     },
//                 });
//                 const data = await response.json();

//                 // Ensure that the keys in the API response match the state fields
//                 if (response.ok) {
//                     setUserData({
//                         name: data.Name || '',
//                         phone: data.Phone || '',
//                         address: data.Address || '',
//                         profilePicture: data.ProfilePicture || ''
//                     });
//                 } else {
//                     setError(data.message || 'Error fetching profile data');
//                 }
//             } catch (err) {
//                 setError('Error fetching profile data');
//             }
//         };

//         fetchUserProfile();
//     }, []); // Empty dependency array ensures this runs once when the component mounts

//     // Handle form input changes
//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setUserData((prevData) => ({
//             ...prevData,
//             [name]: value,
//         }));
//     };

//     const handleFileChange = (e) => {
//         setUserData((prevData) => ({
//             ...prevData,
//             profilePicture: e.target.files[0], // Handle file selection
//         }));
//     };

//     // Handle form submission to update profile
//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         const formData = new FormData();
//         formData.append('Name', userData.name);
//         formData.append('Phone', userData.phone);
//         formData.append('Address', userData.address);
//         if (userData.profilePicture) {
//             formData.append('ProfilePicture', userData.profilePicture); // Append file to formData
//         }

//         setLoading(true);

//         try {
//             const response = await fetch('https://team-focu-z-backend.vercel.app/auth/profile/', {
//                 method: 'PATCH',
//                 body: formData, // Send formData directly, without stringifying
//                 headers: {
//                     'Authorization': `Bearer ${sessionStorage.getItem('access')}`, // Pass the Authorization token
//                 },
//             });

//             const data = await response.json();
//             setLoading(false);

//             if (response.ok) {
//                 alert('Profile updated successfully');
//                 setUserData({
//                     name: data.Name,
//                     phone: data.Phone,
//                     address: data.Address,
//                     profilePicture: data.ProfilePicture,
//                 });
//             } else {
//                 setError(data.message || 'Error updating profile');
//             }
//         } catch (err) {
//             setLoading(false);
//             setError('Error updating profile');
//         }
//     };

//     return (
//         <div className="max-w-lg mx-auto p-6 bg-white rounded-xl shadow-md">
//             <h2 className="text-2xl font-semibold text-center mb-6">Update Your Profile</h2>
//             {error && <div className="text-red-500 text-center mb-4">{error}</div>}
//             <form onSubmit={handleSubmit}>
//                 <div className="mb-4">
//                     <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
//                     <input
//                         type="text"
//                         id="name"
//                         name="name"
//                         value={userData.name || ''}
//                         onChange={handleChange}
//                         required
//                         className="mt-1 p-3 w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
//                     />
//                 </div>
//                 <div className="mb-4">
//                     <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone</label>
//                     <input
//                         type="text"
//                         id="phone"
//                         name="phone"
//                         value={userData.phone || ''}
//                         onChange={handleChange}
//                         className="mt-1 p-3 w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
//                     />
//                 </div>
//                 <div className="mb-4">
//                     <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
//                     <input
//                         type="text"
//                         id="address"
//                         name="address"
//                         value={userData.address || ''}
//                         onChange={handleChange}
//                         className="mt-1 p-3 w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
//                     />
//                 </div>
//                 <div className="mb-4">
//                     <label htmlFor="profilePicture" className="block text-sm font-medium text-gray-700">Profile Picture</label>
//                     <input
//                         type="file"
//                         id="profilePicture"
//                         onChange={handleFileChange}
//                         className="mt-1 p-3 w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
//                     />
//                     {userData.profilePicture && (
//                         <div className="mt-2">
//                             <img
//                                 src={URL.createObjectURL(userData.profilePicture)}
//                                 alt="Profile Preview"
//                                 className="w-24 h-24 object-cover rounded-full"
//                             />
//                         </div>
//                     )}
//                 </div>
//                 <button
//                     type="submit"
//                     disabled={loading}
//                     className={`w-full mt-4 py-3 px-6 text-white font-semibold rounded-md ${loading ? 'bg-gray-400' : 'bg-indigo-600 hover:bg-indigo-700'}`}
//                 >
//                     {loading ? 'Updating...' : 'Update Profile'}
//                 </button>
//             </form>
//             <div className='flex justify-center items-center'>
//                 <Link to='/dashboard/change'>
//                     <p className='text-center pt-2 underline cursor-pointer w-fit'>Change password</p>
//                 </Link>
//             </div>
//         </div>
//     );
// };

// export default Profile;

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Profile = () => {
    const [userData, setUserData] = useState({
        name: '',
        phone: '',
        address: '',
        profilePicture: ''
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // Fetch user profile when the component mounts
    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const response = await fetch('https://team-focu-z-backend.vercel.app/auth/profile/', {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${sessionStorage.getItem('access')}`,
                    },
                });
                const data = await response.json();

                if (response.ok) {
                    setUserData({
                        name: data.Name || '',
                        phone: data.Phone || '',
                        address: data.Address || '',
                        profilePicture: data.ProfilePicture || ''
                    });
                } else {
                    setError(data.message || 'Error fetching profile data');
                }
            } catch (err) {
                setError('Error fetching profile data');
            }
        };

        fetchUserProfile();
    }, []);

    // Handle form input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // Handle file input change and upload to Cloudinary
    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            // Upload image to Cloudinary
            const formData = new FormData();
            formData.append("file", file);
            formData.append("upload_preset", "TeamFocuZ"); // Your Cloudinary upload preset
            formData.append("cloud_name", "do0pqsf4a"); // Your Cloudinary cloud name

            try {
                const res = await fetch("https://api.cloudinary.com/v1_1/do0pqsf4a/image/upload", {
                    method: "POST",
                    body: formData,
                });

                const data = await res.json();
                setUserData((prevData) => ({
                    ...prevData,
                    profilePicture: data.secure_url, // Set the returned Cloudinary URL
                }));
                console.log(data.secure_url)
            } catch (error) {
                setError('Error uploading profile picture');
            }
        }
    };

    // Handle form submission to update profile
    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('Name', userData.name);
        formData.append('Phone', userData.phone);
        formData.append('Address', userData.address);
        if (userData.profilePicture) {
            formData.append('ProfilePicture', userData.profilePicture); // Send Cloudinary URL
        }

        setLoading(true);

        try {
            const response = await fetch('https://team-focu-z-backend.vercel.app/auth/profile/', {
                method: 'PATCH',
                body: formData,
                headers: {
                    'Authorization': `Bearer ${sessionStorage.getItem('access')}`,
                },
            });

            const data = await response.json();
            setLoading(false);

            if (response.ok) {
                alert('Profile updated successfully');
                setUserData({
                    name: data.Name,
                    phone: data.Phone,
                    address: data.Address,
                    profilePicture: data.ProfilePicture,
                });
            } else {
                setError(data.message || 'Error updating profile');
            }
        } catch (err) {
            setLoading(false);
            setError('Error updating profile');
        }
    };

    return (
        <div className="max-w-lg mx-auto p-6 bg-white rounded-xl shadow-md">
            <h2 className="text-2xl font-semibold text-center mb-6">Update Your Profile</h2>
            <div className='flex justify-center items-center'>
                {userData.profilePicture && (
                    <div className="mt-2">
                        <img
                            src={userData.profilePicture}
                            alt="Profile Preview"
                            className="w-24 h-24 object-cover rounded-full"
                        />
                    </div>
                )}
            </div>
            {error && <div className="text-red-500 text-center mb-4">{error}</div>}
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={userData.name || ''}
                        onChange={handleChange}
                        required
                        className="mt-1 p-3 w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone</label>
                    <input
                        type="text"
                        id="phone"
                        name="phone"
                        value={userData.phone || ''}
                        onChange={handleChange}
                        className="mt-1 p-3 w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
                    <input
                        type="text"
                        id="address"
                        name="address"
                        value={userData.address || ''}
                        onChange={handleChange}
                        className="mt-1 p-3 w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="profilePicture" className="block text-sm font-medium text-gray-700">Profile Picture</label>
                    <input
                        type="file"
                        id="profilePicture"
                        onChange={handleFileChange}
                        className="mt-1 p-3 w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    />

                </div>
                <button
                    type="submit"
                    disabled={loading}
                    className={`w-full mt-4 py-3 px-6 text-white font-semibold rounded-md ${loading ? 'bg-gray-400' : 'bg-indigo-600 hover:bg-indigo-700'}`}
                >
                    {loading ? 'Updating...' : 'Update Profile'}
                </button>
            </form>
            <div className='flex justify-center items-center'>
                <Link to='/dashboard/change'>
                    <p className='text-center pt-2 underline cursor-pointer w-fit'>Change password</p>
                </Link>
            </div>
        </div>
    );
};

export default Profile;
