import React, { useState } from "react";
import Header from "./Components/Header/Header";
import Sidebar from "./Components/Sidebar/Sidebar";
import Dashboard from "./Components/Dashboard/Dashboard";
import VideoEdit from "./Components/VideoEdit/VideoEdit"; // Import VideoEdit component
import "./App.css";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import data from "./data.json";
function App() {
  const [videos, setVideos] = useState(data);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const videosPerPage = 5;
  const navigate = useNavigate();
  const handleDelete = (id) => {
    console.log(id);
    const updatedVideos = videos.filter((video) => video.id !== id);
    console.log(updatedVideos);
    setVideos(updatedVideos);
  };

  const handleEdit = (VideoEdit) => {
    const selectedVideoIndex = videos.findIndex(
      (video) => video.id === VideoEdit.id
    );

    if (selectedVideoIndex !== -1) {
      //   console.log(VideoEdit);
      // Create a new video object with updated data
      const updatedVideo = {
        ...videos[selectedVideoIndex],
        title: VideoEdit.title,
        uploadDate: VideoEdit.uploadDate,
        views: VideoEdit.views,
        comments: VideoEdit.comments,
        likes: VideoEdit.likes,
      };

      // Update the videos array in the original position
      const updatedVideos = [...videos]; // Create a shallow copy of the array
      updatedVideos[selectedVideoIndex] = updatedVideo; // Replace the video at the index

      // If you need to set the updatedVideos back to a state or variable, do it here
      setVideos(updatedVideos); // Uncomment if using state management
    }
  };

  // Page handling
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Search function handling
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };
  return (
    <div className="app-container">
      <Header />
      <div className="content-container">
        {" "}
        {/* New container for sidebar and main content */}
        <Sidebar />
        <main className="main-content">
          {" "}
          {/* Main content area */}
          <Routes>
            <Route
              path="/"
              element={
                <Dashboard
                  data={videos}
                  handleDelete={handleDelete}
                  handlePageChange={handlePageChange}
                  handleSearch={handleSearch}
                  handleEdit={handleEdit}
                  searchTerm={searchTerm}
                  setSearchTerm={setSearchTerm}
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                />
              }
            />
            <Route
              path="/edit/:id"
              element={
                <VideoEdit
                  data={videos}
                  handleEdit={handleEdit}
                  handleDelete={handleDelete}
                />
              }
            />{" "}
            {/* Route for editing videos */}
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default App;
