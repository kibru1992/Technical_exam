import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./VideoEdit.css"; // Add your custom styles here

const VideoEdit = ({ data, handleEdit, handleDelete }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const videoData = data.find((video) => video.id === parseInt(id));
  const [video, setVideo] = useState(videoData);
  // // Save edited video data
  const handleSave = async () => {
    handleEdit(video);
    navigate(-1);
  };
  const handleDeleteSave = async () => {
    handleDelete(video.id);
    navigate(-1);
  };

  // // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setVideo({ ...video, [name]: value });
  };

  if (!video) {
    return <div>Video not found</div>;
  }

  return (
    <div className="video-edit-container">
      <h1>Edit Video</h1>
      <form>
        <div className="form-group">
          <label>Title:</label>
          <input
            type="text"
            name="title"
            value={video.title}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>Uploader:</label>
          <input
            type="text"
            name="uploader"
            value={video.uploader}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>Upload Date:</label>
          <input
            type="text"
            name="uploadDate"
            value={video.uploadDate}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>Views:</label>
          <input
            type="number"
            name="views"
            value={video.views}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>Comments:</label>
          <input
            type="number"
            name="comments"
            value={video.comments}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>Likes:</label>
          <input
            type="number"
            name="likes"
            value={video.likes}
            onChange={handleInputChange}
          />
        </div>
        <button type="button" onClick={handleSave}>
          Save
        </button>
        <button type="button" onClick={handleDeleteSave}>
          Delete
        </button>
        <button type="button" onClick={() => navigate(-1)}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default VideoEdit;
