import React from 'react';
import '../styles/UserDetails.css';

const UserDetails = ({ user, onClose }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h2>User Details</h2>
        <table>
          <tbody>
            <tr>
              <td>ID</td>
              <td>{user.id}</td>
            </tr>
            <tr>
              <td>Name</td>
              <td>{user.name}</td>
            </tr>
            <tr>
              <td>Username</td>
              <td>{user.username}</td>
            </tr>
            <tr>
              <td>Email</td>
              <td>{user.email}</td>
            </tr>
            <tr>
              <td>Address</td>
              <td>{user.address.street}, {user.address.suite}, {user.address.city}, {user.address.zipcode}</td>
            </tr>
            <tr>
              <td>Phone</td>
              <td>{user.phone}</td>
            </tr>
            <tr>
              <td>Website</td>
              <td>{user.website}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserDetails;
