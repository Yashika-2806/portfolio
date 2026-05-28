import { useState } from 'react';
import axios from 'axios';
import userData from '../data/db.json';
import { safeArray } from '../utils/safeUtils';

const Admin = () => {
    const [data, setData] = useState(userData);
    const [loading, setLoading] = useState(false);

    const handleInputChange = (e, section, index, field) => {
        const { value } = e.target;
        const newData = { ...data };
        if (section.startsWith('skills.')) {
            const skillCat = section.split('.')[1];
            newData.skills[skillCat][index][field] = value;
        } else {
            newData[section][index][field] = value;
        }
        setData(newData);
    };
    
    const handleSimpleListChange = (e, index, section) => {
        const { value } = e.target;
        const newData = { ...data };
        newData[section][index] = value;
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
        let newItem;

        if (section === 'projects') newItem = { title: "", description: "", github: "", demo: "" };
        else if (section === 'certifications') newItem = { title: "", issuer: "", date: "", image: "" };
        else if (section === 'education') newItem = { degree: "", institution: "", year: "", details: "" };
        else if (section === 'workshops') newItem = { title: "", date: "", description: "", image: "" };
        else if (section === 'stats') newItem = { label: "", value: "" };
        else if (section === 'typewriter') newItem = "";
        else if (section.startsWith('skills.')) {
            const skillCat = section.split('.')[1];
            newData.skills[skillCat].push({ name: "", icon: "", color: "" });
            setData(newData);
            return;
        }
        
        newData[section].push(newItem);
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
        axios.post('/api', data, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                alert('Data updated successfully!');
                setLoading(false);
            })
            .catch(error => {
                console.error("Error updating data:", error.response ? error.response.data : error.message);
                alert(`Error updating data: ${error.response ? error.response.data.message : error.message}`);
                setLoading(false);
            });
    };

    return (
        <div className="p-5 sm:p-10 bg-gray-900 text-white min-h-screen">
            <h1 className="text-3xl font-bold mb-10 text-center">Full Portfolio CMS</h1>
            <form onSubmit={handleSubmit} className="space-y-8 max-w-4xl mx-auto">
                
                {/* General Info */}
                <Section title="General Info">
                    <InputField label="Name" name="name" value={data.name} onChange={handleFieldChange} />
                    <InputField label="Bio" name="bio" value={data.bio} onChange={handleFieldChange} />
                    <TextareaField label="About" name="about" value={data.about} onChange={handleFieldChange} />
                </Section>

                {/* Typewriter */}
                <Section title="Hero Typewriter Text">
                    {safeArray(data.typewriter).map((text, index) => (
                        <div key={index} className="flex items-center gap-2 mb-2">
                            <input type="text" value={text} onChange={(e) => handleSimpleListChange(e, index, 'typewriter')} className="w-full p-2 rounded bg-gray-700 border border-gray-600" />
                            <button type="button" onClick={() => removeItem('typewriter', index)} className="px-3 py-1 bg-red-600 rounded hover:bg-red-700 text-sm">X</button>
                        </div>
                    ))}
                    <button type="button" onClick={() => addItem('typewriter')} className="mt-2 px-4 py-2 bg-green-600 rounded hover:bg-green-700">Add Text</button>
                </Section>

                {/* Social Links */}
                <Section title="Social Links">
                    <InputField label="GitHub" name="social.github" value={data.social.github} onChange={handleFieldChange} />
                    <InputField label="LinkedIn" name="social.linkedin" value={data.social.linkedin} onChange={handleFieldChange} />
                    <InputField label="Email" name="social.email" value={data.social.email} onChange={handleFieldChange} />
                    <InputField label="Phone" name="social.phone" value={data.social.phone} onChange={handleFieldChange} />
                </Section>

                {/* Projects */}
                <Section title="Projects">
                    {safeArray(data.projects).map((item, index) => (
                        <ItemCard key={index} onRemove={() => removeItem('projects', index)}>
                            <InputField placeholder="Title" value={item.title} onChange={(e) => handleInputChange(e, 'projects', index, 'title')} />
                            <TextareaField placeholder="Description" value={item.description} onChange={(e) => handleInputChange(e, 'projects', index, 'description')} />
                            <InputField placeholder="GitHub URL" value={item.github} onChange={(e) => handleInputChange(e, 'projects', index, 'github')} />
                            <InputField placeholder="Demo URL" value={item.demo} onChange={(e) => handleInputChange(e, 'projects', index, 'demo')} />
                        </ItemCard>
                    ))}
                    <button type="button" onClick={() => addItem('projects')} className="mt-4 px-4 py-2 bg-green-600 rounded hover:bg-green-700">Add Project</button>
                </Section>

                {/* Certifications */}
                <Section title="Certifications">
                    <p className="text-sm text-gray-400 mb-4">For images, place the file in `/public/images/` and enter the path here (e.g., `/images/my-cert.png`).</p>
                    {safeArray(data.certifications).map((item, index) => (
                        <ItemCard key={index} onRemove={() => removeItem('certifications', index)}>
                            <InputField placeholder="Title" value={item.title} onChange={(e) => handleInputChange(e, 'certifications', index, 'title')} />
                            <InputField placeholder="Issuer" value={item.issuer} onChange={(e) => handleInputChange(e, 'certifications', index, 'issuer')} />
                            <InputField placeholder="Date" value={item.date} onChange={(e) => handleInputChange(e, 'certifications', index, 'date')} />
                            <InputField placeholder="Image Path" value={item.image} onChange={(e) => handleInputChange(e, 'certifications', index, 'image')} />
                        </ItemCard>
                    ))}
                    <button type="button" onClick={() => addItem('certifications')} className="mt-4 px-4 py-2 bg-green-600 rounded hover:bg-green-700">Add Certification</button>
                </Section>

                {/* Education */}
                <Section title="Education">
                    {safeArray(data.education).map((item, index) => (
                        <ItemCard key={index} onRemove={() => removeItem('education', index)}>
                            <InputField placeholder="Degree" value={item.degree} onChange={(e) => handleInputChange(e, 'education', index, 'degree')} />
                            <InputField placeholder="Institution" value={item.institution} onChange={(e) => handleInputChange(e, 'education', index, 'institution')} />
                            <InputField placeholder="Year" value={item.year} onChange={(e) => handleInputChange(e, 'education', index, 'year')} />
                            <InputField placeholder="Details" value={item.details} onChange={(e) => handleInputChange(e, 'education', index, 'details')} />
                        </ItemCard>
                    ))}
                    <button type="button" onClick={() => addItem('education')} className="mt-4 px-4 py-2 bg-green-600 rounded hover:bg-green-700">Add Education</button>
                </Section>

                <button type="submit" disabled={loading} className="w-full px-4 py-3 bg-blue-600 rounded hover:bg-blue-700 font-bold text-lg disabled:bg-gray-500">
                    {loading ? 'Saving...' : 'Save All Changes'}
                </button>
            </form>
        </div>
    );
};

// Helper Components
const Section = ({ title, children }) => (
    <div className="p-6 bg-gray-800 rounded-lg">
        <h2 className="text-2xl font-semibold mb-4 border-b border-gray-700 pb-2">{title}</h2>
        <div className="space-y-4">{children}</div>
    </div>
);

const ItemCard = ({ children, onRemove }) => (
    <div className="relative space-y-3 p-4 border border-gray-700 rounded-md mb-4">
        <button type="button" onClick={onRemove} className="absolute top-2 right-2 px-2 py-0.5 bg-red-600 rounded-full hover:bg-red-700 text-xs font-bold">X</button>
        {children}
    </div>
);

const InputField = ({ label, ...props }) => (
    <div>
        {label && <label className="block mb-1 text-sm">{label}</label>}
        <input type="text" {...props} className="w-full p-2 rounded bg-gray-700 border border-gray-600" />
    </div>
);

const TextareaField = ({ label, ...props }) => (
    <div>
        {label && <label className="block mb-1 text-sm">{label}</label>}
        <textarea {...props} rows="5" className="w-full p-2 rounded bg-gray-700 border border-gray-600"></textarea>
    </div>
);

export default Admin;
