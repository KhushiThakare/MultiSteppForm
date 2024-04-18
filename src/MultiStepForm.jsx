// MultiStepForm.jsx
import React, { useState, useEffect } from 'react';
import { Stepper, Step, StepLabel, Button, Typography, TextField, Container, Grid, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import Dashboard from './Dashboard'; // Import Dashboard component

function MultiStepForm() {
  // Your existing code for form state and logic

  // State to track whether the form is submitted
  const [submitted, setSubmitted] = useState(false);

  // Handle form submission
  const handleSubmit = () => {
    setShowSubmitConfirmation(true);
  };

  // Confirm form submission
  const handleConfirmSubmit = () => {
    setSubmitted(true);
    setShowSubmitConfirmation(false);
  };

  // Render the form and the dashboard if submitted
  return (
    <Container maxWidth="sm">
      {/* Your existing code for form JSX */}
      {/* Show the dashboard if form is submitted */}
      {submitted ? (
        <Dashboard
          personalInfo={personalInfo}
          educationDetails={educationDetails}
          address={address}
        />
      ) : (
        <div>
          {/* Your existing code for form JSX */}
        </div>
      )}
      {/* Your existing code for submit confirmation dialog */}
    </Container>
  );
}

export default MultiStepForm;
