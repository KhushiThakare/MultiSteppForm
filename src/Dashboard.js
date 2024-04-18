// Dashboard.js

import React from 'react';

function Dashboard({ formData }) {
  return (
    <div>
      <h2>Submitted Information</h2>
      <div>
        <h3>Personal Information</h3>
        <p>First Name: {formData.personalInfo.firstName}</p>
        <p>Last Name: {formData.personalInfo.lastName}</p>
        <p>Email: {formData.personalInfo.email}</p>
        <p>Date of Birth: {formData.personalInfo.dateOfBirth}</p>
        <p>Phone: {formData.personalInfo.phone}</p>
      </div>
      <div>
        <h3>Education Details</h3>
        <p>Degree: {formData.educationDetails.degree}</p>
        <p>Institution: {formData.educationDetails.institution}</p>
        <p>Graduation Year: {formData.educationDetails.graduationYear}</p>
        <p>University No: {formData.educationDetails.number}</p>
        <p>10th Percentage: {formData.educationDetails.tenthPercentage}</p>
        <p>12th Percentage: {formData.educationDetails.twelfthPercentage}</p>
        <p>Skills: {formData.educationDetails.skills}</p>
      </div>
      <div>
        <h3>Address</h3>
        <p>Address1: {formData.address.address}</p>
        <p>Address2: {formData.address.address}</p>
        <p>Street: {formData.address.street}</p>
        <p>City: {formData.address.city}</p>
        <p>State: {formData.address.state}</p>
        <p>ZIP Code: {formData.address.zip}</p>
      </div>
    </div>
  );
}

export default Dashboard;
