import React, { useState } from "react";
import "./Dashboard.css"; // Add your custom styles here
import { useNavigate } from "react-router-dom";

const Dashboard = ({
  data,
  handleDelete,
  handlePageChange,
  handleSearch,
  handleEdit,
  searchTerm,
  setSearchTerm,
  currentPage,
  setCurrentPage,
}) => {
  const videosPerPage = 5;
  const navigate = useNavigate();

  // Filter videos based on search term
  const filteredVideos = data.filter((video) =>
    video.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastVideo = currentPage * videosPerPage;
  const indexOfFirstVideo = indexOfLastVideo - videosPerPage;
  const currentVideos = filteredVideos.slice(
    indexOfFirstVideo,
    indexOfLastVideo
  );
  const totalPages = Math.ceil(filteredVideos.length / videosPerPage);
  function getTotalViews(data) {
    return data.reduce((total, video) => total + parseInt(video.views), 0);
  }
  function getTotalComments(data) {
    return data.reduce((total, video) => total + parseInt(video.comments), 0);
  }
  function getTotalLikes(data) {
    return data.reduce((total, video) => total + parseInt(video.likes), 0);
  }
  return (
    <div className="app-container">
      <main className="dashboard">
        <h1>Dashboard</h1>

        <div className="picture-component">
          <div className="stat-card">
            <h2>Total Users</h2>
            <p>{data.length}</p>
          </div>
          <div className="stat-card">
            <h2>Total Views</h2>
            <p>{getTotalViews(data)}</p>
          </div>
          <div className="stat-card">
            <h2>Total Comments</h2>
            <p>{getTotalComments(data)}</p>
          </div>
          <div className="stat-card">
            <h2>Total Likes</h2>
            <p>{getTotalLikes(data)}</p>
          </div>
        </div>

        <h1>Videos</h1>

        <input
          type="text"
          placeholder="Search videos..."
          value={searchTerm}
          onChange={handleSearch}
        />
        <table className="video-table">
          <thead>
            <tr>
              <th>Thumbnail</th>
              <th>Video Title</th>
              <th>Uploader</th>
              <th>Upload Date</th>
              <th>Views</th>
              <th>Comments</th>
              <th>Likes</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {currentVideos.map((video) => (
              <tr key={video.id}>
                <td>
                  <img src={video.thumbnail} alt={video.title} />
                </td>
                <td>{video.title}</td>
                <td>{video.uploader}</td>
                <td>{video.uploadDate}</td>
                <td>{video.views}</td>
                <td>{video.comments}</td>
                <td>{video.likes}</td>
                <td>
                  <button onClick={() => navigate(`/edit/${video.id}`)}>
                    Edit
                  </button>
                </td>
                <td>
                  <button onClick={() => handleDelete(video.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination functionality */}
        <div className="pagination">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Prev
          </button>
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              onClick={() => handlePageChange(index + 1)}
              className={currentPage === index + 1 ? "active" : ""}
            >
              {index + 1}
            </button>
          ))}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </main>
    </div>
  );
};
export default Dashboard;
