// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { toast } from 'react-toastify';

// const FreelancerProfile = () => {
//   const [user, setUser] = useState(null);
//   const [editMode, setEditMode] = useState(false);
//   const [editData, setEditData] = useState({});
//   const [projects, setProjects] = useState([]);
//   const [testimonials, setTestimonials] = useState([]);
//   const [projectModal, setProjectModal] = useState(false);
//   const [testimonialModal, setTestimonialModal] = useState(false);
//   const [image, setImage] = useState(null);

//   const token = localStorage.getItem('authToken');

//   const fetchFreelancer = async () => {
//     try {
//       const res = await axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/freelancer/me`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setUser(res.data);
//       // console.log(res.data)
//       setEditData(res.data.user);
//     } catch {
//       toast.error('Failed to fetch freelancer data');
//     }
//   };

//   const fetchProjects = async () => {
//     try {
//       const res = await axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/projectS/${user._id}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setProjects(res.data);
//     } catch {
//       setProjects([]);
//     }
//   };

//   const fetchTestimonials = async () => {
//     try {
//       const res = await axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/testimonialS/${user._id}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setTestimonials(res.data);
//     } catch {
//       setTestimonials([]);
//     }
//   };

//   useEffect(() => {
//     fetchFreelancer();
//   }, []);

//   useEffect(() => {
//     if (user?._id) {
//       fetchProjects();
//       fetchTestimonials();
//     }
//   }, [user]);

//   const handleUpdate = async () => {
//     const formData = new FormData();
//     for (const key in editData) {
//       if (editData[key]) formData.append(key, editData[key]);
//     }
//     if (image) formData.append('profile', image);

//     try {
//       await axios.put(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL }/api/freelancer/updateProfile`, formData, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           'Content-Type': 'multipart/form-data',
//         },
//       });
//       toast.success('Profile updated');
//       setEditMode(false);
//       fetchFreelancer();
//     } catch {
//       toast.error('Update failed');
//     }
//   };

//   return (
//     <div className="p-6 w-[90%]">
//       <div className="flex justify-between items-center mb-6">
//         <h2 className="text-2xl font-bold">Freelancer Profile</h2>
//         <button
//           onClick={() => setEditMode(true)}
//           className="bg-blue-600 text-white px-4 py-2 rounded"
//         >
//           Edit Profile
//         </button>
//       </div>

//       {user && (
//         <div className="space-y-2">
//           <img src={user.profile} className='w-20 h-20 rounded-full' alt="" />
//           <p><strong>Name:</strong> {user?.name}</p>
//           <p><strong>Email:</strong> {user.email}</p>
//           <p><strong>Bio:</strong> {user?.bio}</p>
//           <p><strong>Skills:</strong> {user.skills?.join(', ')}</p>
//           <p><strong>Work Type:</strong> {user.typeOfWork?.join(', ')}</p>
//           <p><strong>Experience:</strong> {user.workExperience}</p>
//           <p><strong>Location:</strong> {user.location?.city}, {user.location?.country}</p>
//           <p><strong>Heard Us From:</strong> {user.heardUsFrom}</p>
//           <img src={user.invoiceLogo} alt="" className='w-20 h-20 rounded-2xls' />
//         </div>
//       )}

//       {/* Edit Modal */}
//       {editMode && (
//         <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
//           <div className="bg-white p-6 rounded shadow-md w-full max-w-lg">
//             <h3 className="text-xl font-bold mb-4">Edit Profile</h3>
//             <input type="file" onChange={(e) => setImage(e.target.files[0])} className="mb-2" />
//             <textarea
//               placeholder="Bio"
//               value={editData.bio || ''}
//               onChange={(e) => setEditData({ ...editData, bio: e.target.value })}
//               className="w-full p-2 border mb-2"
//             />
//             <input
//               type="text"
//               placeholder="Skills (comma separated)"
//               value={editData.skills?.join(',') || ''}
//               onChange={(e) =>
//                 setEditData({ ...editData, skills: e.target.value.split(',') })
//               }
//               className="w-full p-2 border mb-2"
//             />
//             <input
//               type="text"
//               placeholder="Work Types (comma separated)"
//               value={editData.typeOfWork?.join(',') || ''}
//               onChange={(e) =>
//                 setEditData({ ...editData, typeOfWork: e.target.value.split(',') })
//               }
//               className="w-full p-2 border mb-2"
//             />
//             <input
//               type="text"
//               placeholder="Work Experience"
//               value={editData.workExperience || ''}
//               onChange={(e) => setEditData({ ...editData, workExperience: e.target.value })}
//               className="w-full p-2 border mb-2"
//             />
//             <input
//               type="text"
//               placeholder="City"
//               value={editData.location?.city || ''}
//               onChange={(e) =>
//                 setEditData({
//                   ...editData,
//                   location: { ...editData.location, city: e.target.value },
//                 })
//               }
//               className="w-full p-2 border mb-2"
//             />
//             <input
//               type="text"
//               placeholder="Country"
//               value={editData.location?.country || ''}
//               onChange={(e) =>
//                 setEditData({
//                   ...editData,
//                   location: { ...editData.location, country: e.target.value },
//                 })
//               }
//               className="w-full p-2 border mb-2"
//             />
//             <button
//               onClick={handleUpdate}
//               className="bg-green-600 text-white px-4 py-2 rounded"
//             >
//               Save Changes
//             </button>
//             <button
//               onClick={() => setEditMode(false)}
//               className="ml-2 text-gray-500"
//             >
//               Cancel
//             </button>
//           </div>
//         </div>
//       )}

//       <hr className="my-8" />

//       {/* Projects Section */}
//       <div className="flex justify-between items-center mb-4">
//         <h3 className="text-xl font-semibold">Projects</h3>
//         <button
//           onClick={() => setProjectModal(true)}
//           className="bg-blue-500 text-white px-3 py-1 rounded"
//         >
//           Add Project
//         </button>
//       </div>
//       {projects.length === 0 ? (
//         <p>No projects found. Start by adding a new project.</p>
//       ) : (
//         <ul className="space-y-2">
//           {projects.map((p) => (
//             <li key={p._id} className="border p-3 rounded">
//               <p><strong>{p.title}</strong> - {p.description}</p>
//               <p><strong>Tech:</strong> {p.technologies.join(', ')}</p>
//               <p><a href={p.link} className="text-blue-600 underline">{p.link}</a></p>
//             </li>
//           ))}
//         </ul>
//       )}

//       <hr className="my-8" />

//       {/* Testimonials Section */}
//       <div className="flex justify-between items-center mb-4">
//         <h3 className="text-xl font-semibold">Testimonials</h3>
//         <button
//           onClick={() => setTestimonialModal(true)}
//           className="bg-blue-500 text-white px-3 py-1 rounded"
//         >
//           Add Testimonial
//         </button>
//       </div>
//       {testimonials.length === 0 ? (
//         <p>No testimonials yet.</p>
//       ) : (
//         <ul className="space-y-2">
//           {testimonials.map((t) => (
//             <li key={t._id} className="border p-3 rounded">
//               <p><strong>{t.clientName}</strong> ({t.clientRole} @ {t.clientCompany})</p>
//               <p className="italic">"{t.feedback}"</p>
//               <p><strong>Rating:</strong> {t.rating}/5</p>
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default FreelancerProfile;


// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { toast } from 'react-toastify';

// const FreelancerProfile = () => {
//   const [user, setUser] = useState(null);
//   const [editMode, setEditMode] = useState(false);
//   const [editData, setEditData] = useState({});
//   const [projects, setProjects] = useState([]);
//   const [testimonials, setTestimonials] = useState([]);
//   const [projectModal, setProjectModal] = useState(false);
//   const [testimonialModal, setTestimonialModal] = useState(false);
//   const [image, setImage] = useState(null);

//   const token = localStorage.getItem('authToken');

//   const fetchFreelancer = async () => {
//     try {
//       const res = await axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/freelancer/me`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setUser(res.data);
//       // console.log(res.data)
//       setEditData(res.data.user);
//     } catch {
//       toast.error('Failed to fetch freelancer data');
//     }
//   };

//   const fetchProjects = async () => {
//     try {
//       const res = await axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/projectS/${user._id}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setProjects(res.data);
//     } catch {
//       setProjects([]);
//     }
//   };

//   const fetchTestimonials = async () => {
//     try {
//       const res = await axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/testimonialS/${user._id}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setTestimonials(res.data);
//     } catch {
//       setTestimonials([]);
//     }
//   };

//   useEffect(() => {
//     fetchFreelancer();
//   }, []);

//   useEffect(() => {
//     if (user?._id) {
//       fetchProjects();
//       fetchTestimonials();
//     }
//   }, [user]);

//   const handleUpdate = async () => {
//     const formData = new FormData();
//     for (const key in editData) {
//       if (editData[key]) formData.append(key, editData[key]);
//     }
//     if (image) formData.append('profile', image);

//     try {
//       await axios.put(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL }/api/freelancer/updateProfile`, formData, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           'Content-Type': 'multipart/form-data',
//         },
//       });
//       toast.success('Profile updated');
//       setEditMode(false);
//       fetchFreelancer();
//     } catch {
//       toast.error('Update failed');
//     }
//   };

//   return (
//     <div className="p-6 w-[90%]">
//       <div className="flex justify-between items-center mb-6">
//         <h2 className="text-2xl font-bold">Freelancer Profile</h2>
//         <button
//           onClick={() => setEditMode(true)}
//           className="bg-blue-600 text-white px-4 py-2 rounded"
//         >
//           Edit Profile
//         </button>
//       </div>

//       {user && (
//         <div className="space-y-2">
//           <img src={user.profile} className='w-20 h-20 rounded-full' alt="" />
//           <p><strong>Name:</strong> {user?.name}</p>
//           <p><strong>Email:</strong> {user.email}</p>
//           <p><strong>Bio:</strong> {user?.bio}</p>
//           <p><strong>Skills:</strong> {user.skills?.join(', ')}</p>
//           <p><strong>Work Type:</strong> {user.typeOfWork?.join(', ')}</p>
//           <p><strong>Experience:</strong> {user.workExperience}</p>
//           <p><strong>Location:</strong> {user.location?.city}, {user.location?.country}</p>
//           <p><strong>Heard Us From:</strong> {user.heardUsFrom}</p>
//           <img src={user.invoiceLogo} alt="" className='w-20 h-20 rounded-2xls' />
//         </div>
//       )}

//       {/* Edit Modal */}
//       {editMode && (
//         <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
//           <div className="bg-white p-6 rounded shadow-md w-full max-w-lg">
//             <h3 className="text-xl font-bold mb-4">Edit Profile</h3>
//             <input type="file" onChange={(e) => setImage(e.target.files[0])} className="mb-2" />
//             <textarea
//               placeholder="Bio"
//               value={editData.bio || ''}
//               onChange={(e) => setEditData({ ...editData, bio: e.target.value })}
//               className="w-full p-2 border mb-2"
//             />
//             <input
//               type="text"
//               placeholder="Skills (comma separated)"
//               value={editData.skills?.join(',') || ''}
//               onChange={(e) =>
//                 setEditData({ ...editData, skills: e.target.value.split(',') })
//               }
//               className="w-full p-2 border mb-2"
//             />
//             <input
//               type="text"
//               placeholder="Work Types (comma separated)"
//               value={editData.typeOfWork?.join(',') || ''}
//               onChange={(e) =>
//                 setEditData({ ...editData, typeOfWork: e.target.value.split(',') })
//               }
//               className="w-full p-2 border mb-2"
//             />
//             <input
//               type="text"
//               placeholder="Work Experience"
//               value={editData.workExperience || ''}
//               onChange={(e) => setEditData({ ...editData, workExperience: e.target.value })}
//               className="w-full p-2 border mb-2"
//             />
//             <input
//               type="text"
//               placeholder="City"
//               value={editData.location?.city || ''}
//               onChange={(e) =>
//                 setEditData({
//                   ...editData,
//                   location: { ...editData.location, city: e.target.value },
//                 })
//               }
//               className="w-full p-2 border mb-2"
//             />
//             <input
//               type="text"
//               placeholder="Country"
//               value={editData.location?.country || ''}
//               onChange={(e) =>
//                 setEditData({
//                   ...editData,
//                   location: { ...editData.location, country: e.target.value },
//                 })
//               }
//               className="w-full p-2 border mb-2"
//             />
//             <button
//               onClick={handleUpdate}
//               className="bg-green-600 text-white px-4 py-2 rounded"
//             >
//               Save Changes
//             </button>
//             <button
//               onClick={() => setEditMode(false)}
//               className="ml-2 text-gray-500"
//             >
//               Cancel
//             </button>
//           </div>
//         </div>
//       )}

//       <hr className="my-8" />

//       {/* Projects Section */}
//       <div className="flex justify-between items-center mb-4">
//         <h3 className="text-xl font-semibold">Projects</h3>
//         <button
//           onClick={() => setProjectModal(true)}
//           className="bg-blue-500 text-white px-3 py-1 rounded"
//         >
//           Add Project
//         </button>
//       </div>
//       {projects.length === 0 ? (
//         <p>No projects found. Start by adding a new project.</p>
//       ) : (
//         <ul className="space-y-2">
//           {projects.map((p) => (
//             <li key={p._id} className="border p-3 rounded">
//               <p><strong>{p.title}</strong> - {p.description}</p>
//               <p><strong>Tech:</strong> {p.technologies.join(', ')}</p>
//               <p><a href={p.link} className="text-blue-600 underline">{p.link}</a></p>
//             </li>
//           ))}
//         </ul>
//       )}

//       <hr className="my-8" />

//       {/* Testimonials Section */}
//       <div className="flex justify-between items-center mb-4">
//         <h3 className="text-xl font-semibold">Testimonials</h3>
//         <button
//           onClick={() => setTestimonialModal(true)}
//           className="bg-blue-500 text-white px-3 py-1 rounded"
//         >
//           Add Testimonial
//         </button>
//       </div>
//       {testimonials.length === 0 ? (
//         <p>No testimonials yet.</p>
//       ) : (
//         <ul className="space-y-2">
//           {testimonials.map((t) => (
//             <li key={t._id} className="border p-3 rounded">
//               <p><strong>{t.clientName}</strong> ({t.clientRole} @ {t.clientCompany})</p>
//               <p className="italic">"{t.feedback}"</p>
//               <p><strong>Rating:</strong> {t.rating}/5</p>
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default FreelancerProfile;


// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { toast } from 'react-toastify';

// const FreelancerProfile = () => {
//   const [user, setUser] = useState(null);
//   const [editing, setEditing] = useState(false);
//   const [editData, setEditData] = useState({});
//   const [projects, setProjects] = useState([]);
//   const [testimonials, setTestimonials] = useState([]);
//   const token = localStorage.getItem('authToken');

//   useEffect(() => {
//     fetchProfile();
//   }, []);

//   const fetchProfile = async () => {
//     try {
//       const { data } = await axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/freelancer/me`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setUser(data);
//       fetchProjects(data._id);
//       fetchTestimonials(data._id);
//     } catch {
//       toast.error('Failed to load profile');
//     }
//   };

//   const fetchProjects = async (id) => {
//     try {
//       const { data } = await axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/projects/${id}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setProjects(data);
//     } catch {
//       toast.error('Failed to load projects');
//     }
//   };

//   const fetchTestimonials = async (id) => {
//     try {
//       const { data } = await axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/testimonials/${id}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setTestimonials(data);
//     } catch {
//       toast.error('Failed to load testimonials');
//     }
//   };

//   const handleUpdate = async () => {
//     const formData = new FormData();
//     Object.keys(editData).forEach((key) => {
//       if (editData[key]) formData.append(key, editData[key]);
//     });

//     try {
//       await axios.put(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/freelancer/updateProfile`, formData, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           'Content-Type': 'multipart/form-data',
//         },
//       });
//       toast.success('Profile updated');
//       setEditing(false);
//       fetchProfile();
//     } catch {
//       toast.error('Update failed');
//     }
//   };

//   if (!user) return <div>Loading...</div>;

//   return (
//     <div className="p-6">
//       <div className="bg-white shadow p-4 rounded mb-6">
//         <h2 className="text-xl font-bold mb-2">Freelancer Profile</h2>
//         <img src={user.profile} alt="Profile" className="w-20 h-20 rounded-full mb-2" />
//         <p><strong>Name:</strong> {user.name}</p>
//         <p><strong>Email:</strong> {user.email}</p>
//         <p><strong>Bio:</strong> {user.bio}</p>
//         <p><strong>Skills:</strong> {user.skills.join(', ')}</p>
//         <p><strong>Work Experience:</strong> {user.workExperience}</p>
//         <p><strong>Location:</strong> {user.location.city}, {user.location.country}</p>
//         <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded" onClick={() => setEditing(true)}>Edit</button>
//       </div>

//       {editing && (
//         <div className="bg-gray-100 p-4 mb-6 rounded">
//           <h3 className="font-semibold mb-2">Edit Profile</h3>
//           <input type="file" name="profile" onChange={(e) => setEditData({ ...editData, profile: e.target.files[0] })} />
//           <input type="text" placeholder="Bio" className="w-full mb-2" onChange={(e) => setEditData({ ...editData, bio: e.target.value })} />
//           <input type="text" placeholder="Skills (comma separated)" className="w-full mb-2" onChange={(e) => setEditData({ ...editData, skills: e.target.value })} />
//           <input type="text" placeholder="Type of Work" className="w-full mb-2" onChange={(e) => setEditData({ ...editData, typeOfWork: e.target.value })} />
//           <input type="text" placeholder="Work Experience" className="w-full mb-2" onChange={(e) => setEditData({ ...editData, workExperience: e.target.value })} />
//           <input type="text" placeholder="City" className="w-full mb-2" onChange={(e) => setEditData({ ...editData, location: { ...editData.location, city: e.target.value } })} />
//           <input type="text" placeholder="Country" className="w-full mb-2" onChange={(e) => setEditData({ ...editData, location: { ...editData.location, country: e.target.value } })} />
//           <button onClick={handleUpdate} className="bg-green-600 text-white px-4 py-2 rounded">Save</button>
//         </div>
//       )}

//       <div className="mb-6">
//         <h2 className="text-xl font-bold mb-2">Projects</h2>
//         {projects.length === 0 ? (
//           <p>No projects found. <button className="text-blue-500 underline">Add Project</button></p>
//         ) : (
//           projects.map((proj) => (
//             <div key={proj._id} className="border p-4 rounded mb-2">
//               <p><strong>{proj.title}</strong></p>
//               <p>{proj.description}</p>
//               <button className="text-sm text-yellow-600">Edit</button>
//               <button className="text-sm text-red-600 ml-2">Delete</button>
//             </div>
//           ))
//         )}
//         <button className="mt-2 px-4 py-2 bg-blue-500 text-white rounded">Add Project</button>
//       </div>

//       <div>
//         <h2 className="text-xl font-bold mb-2">Testimonials</h2>
//         {testimonials.length === 0 ? (
//           <p>No testimonials found. <button className="text-blue-500 underline">Add Testimonial</button></p>
//         ) : (
//           testimonials.map((test) => (
//             <div key={test._id} className="border p-4 rounded mb-2">
//               <p><strong>{test.clientName}</strong> — {test.clientCompany}</p>
//               <p>{test.feedback}</p>
//               <button className="text-sm text-yellow-600">Edit</button>
//               <button className="text-sm text-red-600 ml-2">Delete</button>
//             </div>
//           ))
//         )}
//         <button className="mt-2 px-4 py-2 bg-green-500 text-white rounded">Add Testimonial</button>
//       </div>
//     </div>
//   );
// };

// export default FreelancerProfile;



// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { toast } from 'react-toastify';

// const FreelancerProfile = () => {
//   const [user, setUser] = useState(null);
//   const [editing, setEditing] = useState(false);
//   const [editData, setEditData] = useState({});
//   const [projects, setProjects] = useState([]);
//   const [testimonials, setTestimonials] = useState([]);
//   const [showProjectModal, setShowProjectModal] = useState(false);
//   const [showTestimonialModal, setShowTestimonialModal] = useState(false);
//   const [newProject, setNewProject] = useState({});
//   const [newTestimonial, setNewTestimonial] = useState({});
//   const token = localStorage.getItem('authToken');

//   useEffect(() => {
//     fetchProfile();
//   }, []);

//   const fetchProfile = async () => {
//     try {
//       const { data } = await axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/freelancer/me`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setUser(data);
//       fetchProjects(data._id);
//       fetchTestimonials(data._id);
//     } catch {
//       toast.error('Failed to load profile');
//     }
//   };

//   const fetchProjects = async (id) => {
//     try {
//       const { data } = await axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/projects/${id}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setProjects(data);
//     } catch {
//       toast.error('Failed to load projects');
//     }
//   };

//   const fetchTestimonials = async (id) => {
//     try {
//       const { data } = await axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/testimonials/${id}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setTestimonials(data);
//     } catch {
//       toast.error('Failed to load testimonials');
//     }
//   };

//   const handleUpdate = async () => {
//     const formData = new FormData();
//     Object.keys(editData).forEach((key) => {
//       if (editData[key]) formData.append(key, editData[key]);
//     });

//     try {
//       await axios.put(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/freelancer/updateProfile`, formData, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           'Content-Type': 'multipart/form-data',
//         },
//       });
//       toast.success('Profile updated');
//       setEditing(false);
//       fetchProfile();
//     } catch {
//       toast.error('Update failed');
//     }
//   };

//   const handleAddProject = async () => {
//     const formData = new FormData();
//     Object.keys(newProject).forEach((key) => {
//       if (newProject[key]) formData.append(key, newProject[key]);
//     });

//     try {
//       await axios.post(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/projects`, formData, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           'Content-Type': 'multipart/form-data',
//         },
//       });
//       toast.success('Project added');
//       setShowProjectModal(false);
//       fetchProfile();
//     } catch {
//       toast.error('Failed to add project');
//     }
//   };

//   const handleAddTestimonial = async () => {
//     const formData = new FormData();
//     Object.keys(newTestimonial).forEach((key) => {
//       if (newTestimonial[key]) formData.append(key, newTestimonial[key]);
//     });

//     try {
//       await axios.post(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/testimonials`, formData, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           'Content-Type': 'multipart/form-data',
//         },
//       });
//       toast.success('Testimonial added');
//       setShowTestimonialModal(false);
//       fetchProfile();
//     } catch {
//       toast.error('Failed to add testimonial');
//     }
//   };

//   if (!user) return <div>Loading...</div>;

//   return (
//     <div className="p-6">
//       <div className="bg-white shadow p-4 rounded mb-6">
//         <h2 className="text-xl font-bold mb-2">Freelancer Profile</h2>
//         <img src={user.profile} alt="Profile" className="w-20 h-20 rounded-full mb-2" />
//         <p><strong>Name:</strong> {user.name}</p>
//         <p><strong>Email:</strong> {user.email}</p>
//         <p><strong>Bio:</strong> {user.bio}</p>
//         <p><strong>Skills:</strong> {user.skills.join(', ')}</p>
//         <p><strong>Work Experience:</strong> {user.workExperience}</p>
//         <p><strong>Location:</strong> {user.location.city}, {user.location.country}</p>
//         <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded" onClick={() => setEditing(true)}>Edit</button>
//       </div>

//       {editing && (
//         <div className="bg-gray-100 p-4 mb-6 rounded">
//           <h3 className="font-semibold mb-2">Edit Profile</h3>
//           <input type="file" name="profile" onChange={(e) => setEditData({ ...editData, profile: e.target.files[0] })} />
//           <input type="text" placeholder="Bio" className="w-full mb-2" onChange={(e) => setEditData({ ...editData, bio: e.target.value })} />
//           <input type="text" placeholder="Skills (comma separated)" className="w-full mb-2" onChange={(e) => setEditData({ ...editData, skills: e.target.value })} />
//           <input type="text" placeholder="Type of Work" className="w-full mb-2" onChange={(e) => setEditData({ ...editData, typeOfWork: e.target.value })} />
//           <input type="text" placeholder="Work Experience" className="w-full mb-2" onChange={(e) => setEditData({ ...editData, workExperience: e.target.value })} />
//           <input type="text" placeholder="City" className="w-full mb-2" onChange={(e) => setEditData({ ...editData, location: { ...editData.location, city: e.target.value } })} />
//           <input type="text" placeholder="Country" className="w-full mb-2" onChange={(e) => setEditData({ ...editData, location: { ...editData.location, country: e.target.value } })} />
//           <button onClick={handleUpdate} className="bg-green-600 text-white px-4 py-2 rounded">Save</button>
//         </div>
//       )}

//       <div className="mb-6">
//         <h2 className="text-xl font-bold mb-2">Projects</h2>
//         {projects.length === 0 ? (
//           <p>No projects found. <button className="text-blue-500 underline" onClick={() => setShowProjectModal(true)}>Add Project</button></p>
//         ) : (
//           projects.map((proj) => (
//             <div key={proj._id} className="border p-4 rounded mb-2">
//               <p><strong>{proj.title}</strong></p>
//               <p>{proj.description}</p>
//               <button className="text-sm text-yellow-600">Edit</button>
//               <button className="text-sm text-red-600 ml-2">Delete</button>
//             </div>
//           ))
//         )}
//         <button className="mt-2 px-4 py-2 bg-blue-500 text-white rounded" onClick={() => setShowProjectModal(true)}>Add Project</button>
//       </div>

//       {showProjectModal && (
//         <div className="bg-white p-4 rounded shadow mb-6">
//           <h3 className="font-bold mb-2">Add Project</h3>
//           <input type="text" placeholder="Title" className="w-full mb-2" onChange={(e) => setNewProject({ ...newProject, title: e.target.value })} />
//           <input type="text" placeholder="Description" className="w-full mb-2" onChange={(e) => setNewProject({ ...newProject, description: e.target.value })} />
//           <input type="text" placeholder="Technologies (comma separated)" className="w-full mb-2" onChange={(e) => setNewProject({ ...newProject, technologies: e.target.value })} />
//           <input type="text" placeholder="Link" className="w-full mb-2" onChange={(e) => setNewProject({ ...newProject, link: e.target.value })} />
//           <input type="file" onChange={(e) => setNewProject({ ...newProject, image: e.target.files[0] })} />
//           <button className="bg-green-500 text-white px-4 py-2 rounded mt-2" onClick={handleAddProject}>Submit</button>
//           <button className="ml-2 text-gray-600" onClick={() => setShowProjectModal(false)}>Cancel</button>
//         </div>
//       )}

//       <div>
//         <h2 className="text-xl font-bold mb-2">Testimonials</h2>
//         {testimonials.length === 0 ? (
//           <p>No testimonials found. <button className="text-blue-500 underline" onClick={() => setShowTestimonialModal(true)}>Add Testimonial</button></p>
//         ) : (
//           testimonials.map((test) => (
//             <div key={test._id} className="border p-4 rounded mb-2">
//               <p><strong>{test.clientName}</strong> — {test.clientCompany}</p>
//               <p>{test.feedback}</p>
//               <button className="text-sm text-yellow-600">Edit</button>
//               <button className="text-sm text-red-600 ml-2">Delete</button>
//             </div>
//           ))
//         )}
//         <button className="mt-2 px-4 py-2 bg-green-500 text-white rounded" onClick={() => setShowTestimonialModal(true)}>Add Testimonial</button>
//       </div>

//       {showTestimonialModal && (
//         <div className="bg-white p-4 rounded shadow mt-4">
//           <h3 className="font-bold mb-2">Add Testimonial</h3>
//           <input type="text" placeholder="Client Name" className="w-full mb-2" onChange={(e) => setNewTestimonial({ ...newTestimonial, clientName: e.target.value })} />
//           <input type="text" placeholder="Client Role" className="w-full mb-2" onChange={(e) => setNewTestimonial({ ...newTestimonial, clientRole: e.target.value })} />
//           <input type="text" placeholder="Client Company" className="w-full mb-2" onChange={(e) => setNewTestimonial({ ...newTestimonial, clientCompany: e.target.value })} />
//           <textarea placeholder="Feedback" className="w-full mb-2" onChange={(e) => setNewTestimonial({ ...newTestimonial, feedback: e.target.value })} />
//           <input type="number" placeholder="Rating (1-5)" className="w-full mb-2" onChange={(e) => setNewTestimonial({ ...newTestimonial, rating: e.target.value })} />
//           <input type="file" onChange={(e) => setNewTestimonial({ ...newTestimonial, clientPhoto: e.target.files[0] })} />
//           <button className="bg-green-500 text-white px-4 py-2 rounded mt-2" onClick={handleAddTestimonial}>Submit</button>
//           <button className="ml-2 text-gray-600" onClick={() => setShowTestimonialModal(false)}>Cancel</button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default FreelancerProfile;


import React, { useEffect, useState } from 'react';
import { User, MapPin, Briefcase, Star, Plus, Edit2, Trash2, X, Save, Eye } from 'lucide-react';
import axios from "axios";
import { toast } from 'react-toastify';

const FreelancerProfile = () => {
  const [user, setUser] = useState(null);
  const [editing, setEditing] = useState(false);
  const [editData, setEditData] = useState({});
  const [projects, setProjects] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [showTestimonialModal, setShowTestimonialModal] = useState(false);
  const [newProject, setNewProject] = useState({});
  const [newTestimonial, setNewTestimonial] = useState({});
  const [loading, setLoading] = useState(true);

  // Mock data for demonstration
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
      fetchProfile();
    }, 1000);
  }, []);

  // Comment: Original API functions preserved but commented out for demo
  
  const token = localStorage.getItem('authToken');

  const fetchProfile = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/freelancer/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(data);
      fetchProjects(data._id);
      fetchTestimonials(data._id);
    } catch {
      toast.error('Failed to load profile');
    }
  };

  const fetchProjects = async (id) => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/projects/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProjects(data);
    } catch {
      toast.error('Failed to load projects');
    }
  };

  const fetchTestimonials = async (id) => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/testimonials/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTestimonials(data);
    } catch {
      toast.error('Failed to load testimonials');
    }
  };

  const handleUpdate = async () => {
    const formData = new FormData();
    Object.keys(editData).forEach((key) => {
      if (editData[key]) formData.append(key, editData[key]);
    });

    try {
      await axios.put(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/freelancer/updateProfile`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      toast.success('Profile updated');
      setEditing(false);
      fetchProfile();
    } catch {
      toast.error('Update failed');
    }
  };

  const handleAddProject = async () => {
    const formData = new FormData();
    Object.keys(newProject).forEach((key) => {
      if (newProject[key]) formData.append(key, newProject[key]);
    });

    try {
      await axios.post(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/projects`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      toast.success('Project added');
      setShowProjectModal(false);
      fetchProfile();
    } catch {
      toast.error('Failed to add project');
    }
  };

  const handleAddTestimonial = async () => {
    const formData = new FormData();
    Object.keys(newTestimonial).forEach((key) => {
      if (newTestimonial[key]) formData.append(key, newTestimonial[key]);
    });

    try {
      await axios.post(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/testimonials`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      toast.success('Testimonial added');
      setShowTestimonialModal(false);
      fetchProfile();
    } catch {
      toast.error('Failed to add testimonial');
    }
  };

  const handleProjectDelete = async (projectId) => {
    try {
      const confirmed = window.confirm("Are you sure you want to delete this project?");
      if (!confirmed) return;

      const res = await axios.delete(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/projects/${projectId}`, {
      headers:{Authorization: `Bearer ${token}`}
      });
      fetchProjects(user._id);
      toast.success("Project deleted successfully")

    } catch (err) {
      console.error("Error deleting project:", err);
      toast.error ("Project deletion failed")
    }
  };


  const   HandleTestimonialDelete = async (testimonialId) => {
    try {
      const confirmed = window.confirm("Are you sure you want to delete this testimonial?");
      if (!confirmed) return;

      const res = await axios.delete(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/testimonials/${testimonialId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchTestimonials(user._id);
      toast.success("Testimonial Removed Successfully");

    } catch (err) {
      console.error("Error deleting project:", err);
      toast.error("Testimonial Deletion failed");
    }
  };

  




  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-4 w-full">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              {[1, 2, 3].map(i => (
                <div key={i} className="h-24 bg-gray-200 rounded-xl"></div>
              ))}
            </div>
            <div className="h-64 bg-gray-200 rounded-xl"></div>
          </div>
        </div>
      </div>
    );
  }


  if (!user) return null;

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Header with gradient background */}
      <div className="bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 text-white py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center animate-fade-in text-black">
            Freelancer  <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Profile Dashboard </span>
          </h1>
          <p className="text-center mt-2 text-gray-900 animate-fade-in-delay">
            Manage your professional presence
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Card */}
        <div className="bg-white rounded-2xl shadow-xl p-6 lg:p-8 mb-8 transform hover:scale-105 transition-all duration-300 animate-slide-up">
          <div className="flex flex-col lg:flex-row items-center lg:items-start gap-6">
            {/* Profile Image */}
            <div className="relative group">
              <img
                src={user.profile}
                alt="Profile"
                className="w-24 h-24 lg:w-32 lg:h-32 rounded-full   object-cover transition-transform duration-300 group-hover:scale-110"
              />
              {/* <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-300 rounded-full"></div> */}
            </div>

            {/* Profile Info */}
            <div className="flex-1 text-center lg:text-left">
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-2">{user.name}</h2>
              <p className="text-gray-600 mb-4 flex items-center justify-center lg:justify-start gap-2">
                <User className="w-4 h-4" />
                {user.email}
              </p>
              <p className="text-gray-700 mb-4 leading-relaxed">{user.bio}</p>

              {/* Skills */}
              <div className="flex flex-wrap gap-2 justify-center lg:justify-start mb-4">
                {user.skills.flatMap((skillStr, index) => {
                  try {
                    const parsedSkills = JSON.parse(skillStr); // e.g. ["React"]
                    return Array.isArray(parsedSkills)
                      ? parsedSkills.map((skill, i) => (
                        <span
                          key={`${index}-${i}`}
                          className="px-3 py-1 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full text-sm font-medium transform hover:scale-105 transition-transform duration-200"
                        >
                          {skill}
                        </span>
                      ))
                      : null;
                  } catch (e) {
                    // Fallback if skillStr isn't a valid JSON string
                    return (
                      <span
                        key={index}
                        className="px-3 py-1 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full text-sm font-medium transform hover:scale-105 transition-transform duration-200"
                      >
                        {skillStr}
                      </span>
                    );
                  }
                })}
              </div>


              {/* Location and Experience */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start text-gray-600">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span>{user.location.city}, {user.location.country}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Briefcase className="w-4 h-4" />
                  <span>{user.workExperience}</span>
                </div>
              </div>
            </div>

            {/* Edit Button */}
            <button
              className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-3 rounded-full hover:from-blue-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center gap-2 cursor-pointer"
              onClick={() => setEditing(true)}
            >
              <Edit2 className="w-4 h-4" />
              Edit Profile
            </button>
          </div>
        </div>

        {/* Edit Form */}
        {editing && (
          <div className="bg-white rounded-2xl shadow-xl p-6 lg:p-8 mb-8 animate-slide-down">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-800">Edit Profile</h3>
              <button
                onClick={() => setEditing(false)}
                className="text-gray-500 hover:text-gray-700 p-2 rounded-full hover:bg-gray-100 transition-colors duration-200 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Profile Picture</label>
                <input
                  type="file"
                  name="profile"
                  
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  onChange={(e) => setEditData({ ...editData, profile: e.target.files[0] })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Type of Work</label>
                <input
                  type="text"
                  placeholder="e.g., Full-stack Developer"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  onChange={(e) => setEditData({ ...editData, typeOfWork: e.target.value })}
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
                <textarea
                  placeholder="Tell us about yourself..."
                  rows="3"
                  value={user.bio}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  onChange={(e) => setEditData({ ...editData, bio: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Skills</label>
                <input
                  type="text"
                  placeholder="React, Node.js, Python (comma separated)"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  onChange={(e) => setEditData({ ...editData, skills: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Work Experience</label>
                <input
                  type="text"
                  value={user.workExperience}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  onChange={(e) => setEditData({ ...editData, workExperience: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                <input
                  type="text"
                  value={user.location.city }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  onChange={(e) => setEditData({ ...editData, location: { ...editData.location, city: e.target.value } })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Country</label>
                <input
                  type="text"
                 value= {user.location.country}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  onChange={(e) => setEditData({ ...editData, location: { ...editData.location, country: e.target.value } })}
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setEditing(false)}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200 cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdate}
                className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-200 transform hover:scale-105 flex items-center gap-2 cursor-pointer"
              >
                <Save className="w-4 h-4" />
                Save Changes
              </button>
            </div>
          </div>
        )}

       {/* Projects Section */}
        {/* <div className="bg-white rounded-2xl shadow-xl p-6 lg:p-8 mb-8 animate-slide-up">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Projects</h2>
            <button
              className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-200 transform hover:scale-105 flex items-center gap-2 cursor-pointer"
              onClick={() => setShowProjectModal(true)}
            >
              <Plus className="w-4 h-4" />
              Add Project
            </button>
          </div> */}

          {/* {projects.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <Briefcase className="w-16 h-16 mx-auto" />
              </div>
              <p className="text-gray-600 mb-4">No projects found</p>
              <button
                className="text-blue-500 hover:text-blue-600 font-medium cursor-pointer"
                onClick={() => setShowProjectModal(true)}
              >
                Add your first project
              </button>
            </div>
          ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map((proj, index) => (
                  <div
                    key={proj._id}
                    className="border border-gray-200 rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 animate-fade-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  > */}
                    {/* Project Image */}
                    {/* {proj.image && (
                      <img
                        src={proj.image.url}
                        alt={proj.title}
                        className="w-full h-48 object-cover"
                      />
                    )} */}

                    {/* Card Content */}
                    {/* <div className="p-6">
                      <h3 className="font-bold text-gray-800 text-lg mb-2">{proj.title}</h3>
                      <p className="text-gray-600 mb-4 text-sm">{proj.description}</p> */}

                      {/* Tech Stack */}
                      {/* {Array.isArray(proj.technologies) && proj.technologies.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-4">
                          {proj.technologies.map((tech, i) => (
                            <span
                              key={i}
                              className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-medium"
                            >
                              {tech.trim?.() || tech}
                            </span>
                          ))}
                        </div>
                      )} */}

                      {/* Actions */}
                      {/* <div className="flex gap-3"> */}
                        {/* Optional Edit button */}
                        {/* <button className="flex items-center gap-1 text-blue-600 hover:text-blue-800 text-sm transition-colors duration-200 cursor-pointer">
            <Edit2 className="w-4 h-4" />
            Edit
          </button> */}
                        {/* Live Link Button */}
                        {/* {proj.link && (
                          <a
                            href={proj.link.startsWith("http") ? proj.link : `https://${proj.link}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block text-white bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 px-3 py-2 text-sm rounded-full transition duration-200"
                          >
                            🔗 Live Demo
                          </a>
                        )}

                        <button
                          className="flex items-center gap-1 text-red-600 hover:text-red-800 text-sm transition-colors duration-200 cursor-pointer"
                          onClick={() => handleProjectDelete(proj._id)}
                        >
                          <Trash2 className="w-4 h-4" />
                          Delete
                        </button>
                      </div>
                    </div>
                  </div> */}
                {/* ))} */}
              {/* </div>

          )}
        </div> */}

        {/* Project Modal */}
        {/* {showProjectModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 animate-fade-in">
            <div className="bg-white rounded-2xl p-6 w-full max-w-md animate-slide-up">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-800">Add New Project</h3>
                <button
                  onClick={() => setShowProjectModal(false)}
                  className="text-gray-500 hover:text-gray-700 p-2 rounded-full hover:bg-gray-100 transition-colors duration-200 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Project Title</label>
                  <input
                    type="text"
                    placeholder="Enter project title"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <textarea
                    placeholder="Project description..."
                    rows="3"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Technologies</label>
                  <input
                    type="text"
                    placeholder="React, Node.js, MongoDB (comma separated)"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    onChange={(e) => setNewProject({ ...newProject, technologies: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Project Link</label>
                  <input
                    type="url"
                    placeholder="https://example.com"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    onChange={(e) => setNewProject({ ...newProject, link: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Project Image</label>
                  <input
                    type="file"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    onChange={(e) => setNewProject({ ...newProject, image: e.target.files[0] })}
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <button
                  onClick={() => setShowProjectModal(false)}
                  className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddProject}
                  className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-200 transform hover:scale-105 cursor-pointer"
                >
                  Add Project
                </button>
              </div>
            </div>
          </div>
        )} */}

        {/* Testimonials Section */}
        {/* <div className="bg-white rounded-2xl shadow-xl p-6 lg:p-8 animate-slide-up">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Client Testimonials</h2>
            <button
              className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-4 py-2 rounded-lg hover:from-green-600 hover:to-blue-600 transition-all duration-200 transform hover:scale-105 flex items-center gap-2 cursor-pointer"
              onClick={() => setShowTestimonialModal(true)}
            >
              <Plus className="w-4 h-4" />
              Add Testimonial
            </button>
          </div>

          {testimonials.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <Star className="w-16 h-16 mx-auto" />
              </div>
              <p className="text-gray-600 mb-4">No testimonials yet</p>
              <button
                className="text-blue-500 hover:text-blue-600 font-medium cursor-pointer"
                onClick={() => setShowTestimonialModal(true)}
              >
                Add your first testimonial
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {testimonials.map((test, index) => (
                <div
                  key={test._id}
                  className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                      <img src={test.clientPhoto.url} className='w-12 h-12 rounded-full object-center' alt="" />
                    </div>
                    <div>
                      <h2 className="font-bold text-gray-800">{test.clientName}</h2>
                      <h4 className='text-gray-800 text-lg'>{test.clientRole}</h4>
                      <p className="text-gray-600 text-sm">{test.clientCompany}</p>
                    </div>
                  </div>

                  <div className="flex gap-1 mb-3">
                    {[...Array(test.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                    ))}
                  </div>

                  <p className="text-gray-700 mb-4">"{test.feedback}"</p>

                  <div className="flex gap-2"> */}
                    {/* <button className="flex items-center gap-1 text-blue-600 hover:text-blue-800 text-sm transition-colors duration-200 cursor-pointer">
                      <Edit2 className="w-3 h-3" />
                      Edit
                    </button> */}
                    {/* <button className="flex items-center gap-1 text-red-600 hover:text-red-800 text-sm transition-colors duration-200 cursor-pointer" onClick={()=>{HandleTestimonialDelete(test._id)}}>
                      <Trash2 className="w-3 h-3" />
                      Delete
                    </button> */}
                  {/* </div>
                </div>
              ))}
            </div>
          )}
        </div> */}

        {/* Testimonial Modal */}
        {/* {showTestimonialModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 animate-fade-in">
            <div className="bg-white rounded-2xl p-6 w-full max-w-md animate-slide-up">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-800">Add New Testimonial</h3>
                <button
                  onClick={() => setShowTestimonialModal(false)}
                  className="text-gray-500 hover:text-gray-700 p-2 rounded-full hover:bg-gray-100 transition-colors duration-200 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Client Name</label>
                  <input
                    type="text"
                    placeholder="Enter client name"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    onChange={(e) => setNewTestimonial({ ...newTestimonial, clientName: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Client Role</label>
                  <input
                    type="text"
                    placeholder="e.g., CEO, Project Manager"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    onChange={(e) => setNewTestimonial({ ...newTestimonial, clientRole: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Company</label>
                  <input
                    type="text"
                    placeholder="Company name"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    onChange={(e) => setNewTestimonial({ ...newTestimonial, clientCompany: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Feedback</label>
                  <textarea
                    placeholder="Client feedback..."
                    rows="4"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    onChange={(e) => setNewTestimonial({ ...newTestimonial, feedback: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
                  <select
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    onChange={(e) => setNewTestimonial({ ...newTestimonial, rating: parseInt(e.target.value) })}
                  >
                    <option value="">Select rating</option>
                    <option value="5">5 - Excellent</option>
                    <option value="4">4 - Very Good</option>
                    <option value="3">3 - Good</option>
                    <option value="2">2 - Fair</option>
                    <option value="1">1 - Poor</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Client Photo</label>
                  <input
                    type="file"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    onChange={(e) => setNewTestimonial({ ...newTestimonial, clientPhoto: e.target.files[0] })}
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <button
                  onClick={() => setShowTestimonialModal(false)}
                  className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddTestimonial}
                  className="px-6 py-2 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-lg hover:from-green-600 hover:to-blue-600 transition-all duration-200 transform hover:scale-105 cursor-pointer"
                >
                  Add Testimonial
                </button>
              </div>
            </div>
          </div>
        )}  */}
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slide-down {
          from {
            opacity: 0;
            transform: translateY(-30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }

        .animate-fade-in-delay {
          animation: fade-in 0.6s ease-out 0.2s both;
        }

        .animate-slide-up {
          animation: slide-up 0.6s ease-out;
        }

        .animate-slide-down {
          animation: slide-down 0.4s ease-out;
        }

        /* Gradient border effect */
        .border-gradient-to-r {
          border: 4px solid;
          border-image: linear-gradient(to right, #3b82f6, #8b5cf6) 1;
        }

        /* Hover effects */
        .hover-lift:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
        }

        /* Responsive adjustments */
        @media (max-width: 768px) {
          .animate-fade-in {
            animation-delay: 0.1s;
          }
        }
      `}</style>
    </div>
  );
};

export default FreelancerProfile;