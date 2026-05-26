import { useState, useEffect } from 'react';
import axios from 'axios';

const Admin = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get('/api')
            .then(response => {
                setData(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error("Error fetching data:", error);
                setLoading(false);
            });
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        const keys = name.split('.');
        
        setData(prevData => {
            const newData = { ...prevData };
            let current = newData;
            for (let i = 0; i < keys.length - 1; i++) {
                current = current[keys[i]];
            }
            current[keys[keys.length - 1]] = value;
            return newData;
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('/api', data)
            .then(response => {
                alert('Data updated successfully!');
            })
            .catch(error => {
                console.error("Error updating data:", error);
                alert('Error updating data.');
            });
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!data) {
        return <div>Error loading data. Please check the server.</div>
    }

    return (
        <div className="p-10 bg-gray-900 text-white min-h-screen">
            <h1 className="text-3xl font-bold mb-5">Admin Portal</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block mb-1">Name</label>
                    <input
                        type="text"
                        name="name"
                        value={data.name || ''}
                        onChange={handleChange}
                        className="w-full p-2 rounded bg-gray-800 border border-gray-700"
                    />
                </div>
                <div>
                    <label className="block mb-1">Bio</label>
                    <input
                        type="text"
                        name="bio"
                        value={data.bio || ''}
                        onChange={handleChange}
                        className="w-full p-2 rounded bg-gray-800 border border-gray-700"
                    />
                </div>
                <div>
                    <label className="block mb-1">About</label>
                    <textarea
                        name="about"
                        value={data.about || ''}
                        onChange={handleChange}
                        rows="5"
                        className="w-full p-2 rounded bg-gray-800 border border-gray-700"
                    ></textarea>
                </div>
                <button type="submit" className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-700">
                    Save Changes
                </button>
            </form>
        </div>
    );
};

export default Admin;
