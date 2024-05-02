// import React, { useState, useEffect } from 'react';
// import { useNavigate, useParams } from 'react-router-dom'; // Importing necessary hooks for routing
// import stadiumsData from './seed.js'; // Import the array of stadium names from seed.js

// const Navbar = () => {
//     const navigate = useNavigate(); // Initialize navigate function
//     const { stadiumId } = useParams(); // Get the stadiumId parameter from the route
//     const [searchQuery, setSearchQuery] = useState('');
//     const [stadiums, setStadiums] = useState([]); // State for storing backend stadiums data

//     useEffect(() => {
//         // Simulating fetching stadiums data from backend
//         // Replace this with actual backend API call
        
//           const fetchStadiums = async () => {
//               try {
//                   const response = await fetch('/api/stadiums'); // Example endpoint
//                   if (!response.ok) {
//                       throw new Error('Failed to fetch stadiums');
//                   }
//                   const data = await response.json(); // Parse JSON response
//                   setStadiums(data); // Set state with fetched data
//               } catch (error) {
//                   console.error('Error fetching stadiums:', error);
//               }
//           ;
//         // const fetchStadiums = async () => {
//         //     // Simulate delay for demonstration
//         //     await new Promise(resolve => setTimeout(resolve, 1000));
//         //     setStadiums(stadiumsData); // Set stadiums data fetched from backend
//         // };

//         fetchStadiums();
//       }, [],; // Run only once on component mount

//     // Filter stadiums based on search query
//     const filteredStadiums = stadiums.filter(stadium =>
//         stadium.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//         stadium.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
//         stadium.team.toLowerCase().includes(searchQuery.toLowerCase())
//     );

//     // Function to handle navigation to stadium details page
//     const goToStadiumDetails = (stadiumId) => {
//         navigate(`/stadium/${stadiumId}`); // Navigate to stadium details page with stadiumId parameter
//     };

//     return (
//         <nav className="navbar">
//             <div className="navbar-container">
//                 {/* Search bar */}
//                 <input
//                     type="text"
//                     placeholder="Search stadiums by name, location, or team..."
//                     value={searchQuery}
//                     onChange={(e) => setSearchQuery(e.target.value)}
//                     className="search-bar"
//                 />
//                 {/* Render search results */}
//                 <ul className="search-results">
//                     {filteredStadiums.map(stadium => (
//                         <li key={stadium.name} className="search-result" onClick={() => goToStadiumDetails(stadium.id)}>
//                             <div>
//                                 <strong>Name:</strong> {stadium.name}
//                             </div>
//                             <div>
//                                 <strong>Location:</strong> {stadium.location}
//                             </div>
//                             <div>
//                                 <strong>Team:</strong> {stadium.team}
//                             </div>
//                         </li>
//                     ))}
//                 </ul>
//             </div>
//         </nav>
//     );
// };

// export default Navbar;

// // import React from 'react';
// // //routes- book buddy
// // //usenavigate hook
// // //params/useparams hook
// // //map over backend stadiums (use effect) 

// // const Navbar = () => {
// //     return (
// //         <nav className="navbar">
// //           <div className="navbar-container">
// //             <a href="#" className="navbar-logo">Stadiums</a>
// //             <ul className="navbar-menu">
// //               <li className="navbar-item">
// //                 <a href="#" className="navbar-link">Wrigleys</a>
// //               </li>
// //               <li className="navbar-item">
// //                 <a href="#" className="navbar-link">Busch</a>
// //               </li>
// //               <li className="navbar-item">
// //                 <a href="#" className="navbar-link">Chase</a>
// //               </li>
// //               <li className="navbar-item">
// //                 <a href="#" className="navbar-link">Citi Field</a>
// //               </li>
// //             </ul>
// //           </div>
// //         </nav>
// //       );
// //     };

// //     export default Navbar;