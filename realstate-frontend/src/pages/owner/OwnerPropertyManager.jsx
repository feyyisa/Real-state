import { useState, useEffect } from 'react';
import axios from 'axios';

const OwnerPropertyManager = ({ ownerId }) => {

  
  const [formData, setFormData] = useState({
    title: '', description: '', price: '', availability: true, terms: 'rent',
  });
  const [files, setFiles] = useState({ images: [], videos: [], documents: [] });
  const [properties, setProperties] = useState([]);


  useEffect(() => {
    if (ownerId) { // Only make the request if ownerId is defined
      axios.get(`/api/properties/owner/${ownerId}`)
        .then(response => {
          setProperties(response.data);
        })
        .catch(error => {
          console.error('Error fetching properties:', error);
        });
    } else {
      console.warn('ownerId is undefined.  Not fetching properties.');
    }
  }, [ownerId]);

  const fetchProperties = async () => {
    const res = await axios.get(`http://localhost:5000/api/properties/owner/${ownerId}`);
    setProperties(res.data);
  };

  useEffect(() => { fetchProperties(); }, []);

  const handleFileChange = (e) => {
    setFiles(prev => ({ ...prev, [e.target.name]: e.target.files }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.entries(formData).forEach(([key, val]) => data.append(key, val));
    data.append('ownerId', ownerId);
    ['images', 'videos', 'documents'].forEach(field =>
      [...files[field]].forEach(file => data.append(field, file))
    );

    await axios.post('http://localhost:5000/api/properties', data);
    fetchProperties();
  };
  const deleteProperty = async (id) => {
    await axios.delete(`http://localhost:5000/api/properties/${id}`);
    fetchProperties();
  };
  return (
    <div className="p-4">
      <form onSubmit={handleSubmit} className="space-y-4 bg-white shadow p-4 rounded">
        <input type="text" placeholder="Title" className="input" value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} />
        <textarea placeholder="Description" className="input" value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} />
        <input type="number" placeholder="Price" className="input" value={formData.price} onChange={e => setFormData({ ...formData, price: e.target.value })} />
        <select className="input" value={formData.terms} onChange={e => setFormData({ ...formData, terms: e.target.value })}>
          <option value="rent">Rent</option>
          <option value="sale">Sale</option>
        </select>
        <label className="block">
          Availability:
          <input type="checkbox" checked={formData.availability} onChange={e => setFormData({ ...formData, availability: e.target.checked })} />
        </label>
        <div>
          <input type="file" name="images" multiple onChange={handleFileChange} />
          <input type="file" name="videos" multiple onChange={handleFileChange} />
          <input type="file" name="documents" multiple onChange={handleFileChange} />
        </div>
        <button className="btn bg-blue-500 text-white px-4 py-2 rounded">Submit</button>
      </form>

      <div className="mt-8">
        <h2 className="text-xl font-bold">Your Properties</h2>
        {properties.map(p => (
          <div key={p._id} className="mt-4 border p-4 rounded">
            <h3>{p.title} - ${p.price}</h3>
            <p>{p.description}</p>
            <p>Type: {p.terms}</p>
            <p>Status: {p.availability ? 'Available' : 'Not Available'}</p>
            <button className="text-red-500" onClick={() => deleteProperty(p._id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OwnerPropertyManager;
