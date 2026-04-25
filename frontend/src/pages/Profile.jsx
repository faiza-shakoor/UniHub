import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Profile.css';

const Profile = () => {
  const navigate = useNavigate();

  // For now, these are placeholders. 
  // Later, you will fetch these from Supabase.
  const user = {
    name: "Fatima",
    bio: "Passionate creator and developer.",
    skills: ["React", "UI Design", "Python"]
  };

  return (
    <div className="profile-wrapper">
      <div className="profile-card">
        <div className="profile-info">
          <div className="avatar-placeholder">F</div>
          <h1>{user.name}</h1>
          <p className="bio">{user.bio}</p>
          <div className="skills-tags">
            {user.skills.map(skill => <span key={skill} className="tag">{skill}</span>)}
          </div>
        </div>

        <div className="action-buttons">
          <button className="bubble-btn shop-btn" onClick={() => navigate('/create-shop')}>
            🛍️ Create Shop
          </button>
          <button className="bubble-btn request-btn" onClick={() => navigate('/create-request')}>
            📝 Post Request
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
