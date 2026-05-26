import { useState, useEffect } from 'react';
import axios from 'axios';
import userData from '../data/db.json';

const Admin = () => {
    const [data, setData] = useState(userData);
    const [loading, setLoading] = useState(false);

    const handleInputChange = (e, index, section, field) => {
        const { value } = e.target;
        const newData = { ...data };
        newData[section][index][field] = value;
        setData(newData);
    };

    const handleFieldChange = (e) => {
        const { name, value } = e.target;
        const keys = name.split('.');
        const newData = { ...data };
        let current = newData;
        for (let i = 0; i < keys.length - 1; i++) {
            current = current[keys[i]];
        }
        current[keys[keys.length - 1]] = value;
        setData(newData);
    };

    const addItem = (section) => {
        const newData = { ...data };
        const newItem = section === 'projects' 
            ? { title: "", description: "", github: "", demo: "" }
            : section === 'certifications'
            ? { title: "", issuer: "", date: "", learned: "", applied: "", image: "" }
            : { name: "", color: "" };
        
        if (section.startsWith('skills.')) {
            const skillCat = section.split('.')[1];
            newData.skills[skillCat].push(newItem);
        } else {
            newData[section].push(newItem);
        }
        setData(newData);
    };

    const removeItem = (section, index) => {
        const newData = { ...data };
        if (section.startsWith('skills.')) {
            const skillCat = section.split('.')[1];
            newData.skills[skillCat].splice(index, 1);
        } else {
            newData[section].splice(index, 1);
        }
        setData(newData);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        axios.post('/api', data)
            .then(response => {
                alert('Data updated successfully!');
                setLoading(false);
            })
            .catch(error => {
                console.error("Error updating data:", error);
                alert('Error updating data.');
                setLoading(false);
            });
    };

    return (
        <div className="p-5 sm:p-10 bg-gray-900 text-white min-h-screen">
            <h1 className="text-3xl font-bold mb-10 text-center">Admin Portal</h1>
            <form onSubmit={handleSubmit} className="space-y-8 max-w-4xl mx-auto">
                
                {/* Profile Section */}
                <div className="p-6 bg-gray-800 rounded-lg">
                    <h2 className="text-2xl font-semibold mb-4 border-b border-gray-700 pb-2">Profile</h2>
                    <div className="space-y-4">
                        <div>
                            <label className="block mb-1">Name</label>
                            <input type="text" name="name" value={data.name || ''} onChange={handleFieldChange} className="w-full p-2 rounded bg-gray-700 border border-gray-600" />
                        </div>
                        <div>
                            <label className="block mb-1">Bio</label>
                            <input type="text" name="bio" value={data.bio || ''} onChange={handleFieldChange} className="w-full p-2 rounded bg-gray-700 border border-gray-600" />
                        </div>
                        <div>
                            <label className="block mb-1">About</label>
                            <textarea name="about" value={data.about || ''} onChange={handleFieldChange} rows="5" className="w-full p-2 rounded bg-gray-700 border border-gray-600"></textarea>
                        </div>
                    </div>
                </div>

                {/* Projects Section */}
                <div className="p-6 bg-gray-800 rounded-lg">
                    <h2 className="text-2xl font-semibold mb-4 border-b border-gray-700 pb-2">Projects</h2>
                    {data.projects.map((project, index) => (
                        <div key={index} className="space-y-3 p-4 border border-gray-700 rounded-md mb-4">
                            <input type="text" placeholder="Title" value={project.title} onChange={(e) => handleInputChange(e, index, 'projects', 'title')} className="w-full p-2 rounded bg-gray-700 border border-gray-600" />
                            <textarea placeholder="Description" value={project.description} onChange={(e) => handleInputChange(e, index, 'projects', 'description')} className="w-full p-2 rounded bg-gray-700 border border-gray-600"></textarea>
                            <input type="text" placeholder="GitHub URL" value={project.github} onChange={(e) => handleInputChange(e, index, 'projects', 'github')} className="w-full p-2 rounded bg-gray-700 border border-gray-600" />
                            <input type="text" placeholder="Demo URL" value={project.demo} onChange={(e) => handleInputChange(e, index, 'projects', 'demo')} className="w-full p-2 rounded bg-gray-700 border border-gray-600" />
                            <button type="button" onClick={() => removeItem('projects', index)} className="px-3 py-1 bg-red-600 rounded hover:bg-red-700 text-sm">Remove</button>
                        </div>
                    ))}
                    <button type="button" onClick={() => addItem('projects')} className="mt-4 px-4 py-2 bg-green-600 rounded hover:bg-green-700">Add Project</button>
                </div>

                {/* Certifications Section */}
                <div className="p-6 bg-gray-800 rounded-lg">
                    <h2 className="text-2xl font-semibold mb-4 border-b border-gray-700 pb-2">Certifications</h2>
                    {data.certifications.map((cert, index) => (
                        <div key={index} className="space-y-3 p-4 border border-gray-700 rounded-md mb-4">
                            <input type="text" placeholder="Title" value={cert.title} onChange={(e) => handleInputChange(e, index, 'certifications', 'title')} className="w-full p-2 rounded bg-gray-700 border border-gray-600" />
                            <input type="text" placeholder="Issuer" value={cert.issuer} onChange={(e) => handleInputChange(e, index, 'certifications', 'issuer')} className="w-full p-2 rounded bg-gray-700 border border-gray-600" />
                            <input type="text" placeholder="Date" value={cert.date} onChange={(e) => handleInputChange(e, index, 'certifications', 'date')} className="w-full p-2 rounded bg-gray-700 border border-gray-600" />
                            <input type="text" placeholder="Image Path" value={cert.image} onChange={(e) => handleInputChange(e, index, 'certifications', 'image')} className="w-full p-2 rounded bg-gray-700 border border-gray-600" />
                            <button type="button" onClick={() => removeItem('certifications', index)} className="px-3 py-1 bg-red-600 rounded hover:bg-red-700 text-sm">Remove</button>
                        </div>
                    ))}
                    <button type="button" onClick={() => addItem('certifications')} className="mt-4 px-4 py-2 bg-green-600 rounded hover:bg-green-700">Add Certification</button>
                </div>

                <button type="submit" disabled={loading} className="w-full px-4 py-3 bg-blue-600 rounded hover:bg-blue-700 font-bold text-lg disabled:bg-gray-500">
                    {loading ? 'Saving...' : 'Save All Changes'}
                </button>
            </form>
        </div>
    );
};

export default Admin;
