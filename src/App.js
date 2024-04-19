import React, { useState, useEffect } from 'react';
import { Stepper, Step, StepLabel, Button, Typography, TextField, Container, Grid, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import jsPDF from 'jspdf'; // Import jspdf library for PDF generation
 
  import 'jspdf-autotable';
import './App.css'; // Import CSS file for styles

function MultiStepForm() {
  const [activeStep, setActiveStep] = useState(0);

  const [personalInfo, setPersonalInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    dateOfBirth: '',
    profileImage: null,
    imagePreview: '',
    phone: '',
  });

  const [educationDetails, setEducationDetails] = useState({
    degree: '',
    institution: '',
    graduationYear: '',
    number: '',
    tenthPercentage: '', // New field for 10th percentage
    twelfthPercentage: '', // New field for 12th percentage
    skills: '', // New field for skills
  });

  const [address, setAddress] = useState({
    address: '',
    address1: '',
    street: '',
    city: '',
    state: '',
    zip: '',
  });

  const [previewData, setPreviewData] = useState(null);
  const [showSubmitConfirmation, setShowSubmitConfirmation] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false); // Track form submission
  const [showThankYouDialog, setShowThankYouDialog] = useState(false); // Track whether to show the thank you dialog

  const steps = ['Personal Info', 'Education Details', 'Address'];

  useEffect(() => {
    // Load form data from localStorage if available
    const storedPersonalInfo = localStorage.getItem('personalInfo');
    if (storedPersonalInfo) {
      setPersonalInfo(JSON.parse(storedPersonalInfo));
    }
    const storedEducationDetails = localStorage.getItem('educationDetails');
    if (storedEducationDetails) {
      setEducationDetails(JSON.parse(storedEducationDetails));
    }
    const storedAddress = localStorage.getItem('address');
    if (storedAddress) {
      setAddress(JSON.parse(storedAddress));
    }
  }, []);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleChange = (e, setter) => {
    const { name, value } = e.target;
    setter((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      setPersonalInfo((prevState) => ({
        ...prevState,
        profileImage: file,
        imagePreview: reader.result,
      }));
    };
    reader.readAsDataURL(file);
  };

  const generatePreview = () => {
    const previewContent = (
       <div className='form-preview'>
        <h1>Form Preview</h1>
        <h2>Profile Image:</h2>
        {personalInfo.imagePreview && <img src={personalInfo.imagePreview} alt="" />}
        <h2>Personal Information:</h2>
        <p>First Name: {personalInfo.firstName}</p>
        <p>Last Name: {personalInfo.lastName}</p>
        <p>Email: {personalInfo.email}</p>
        <p>Date of Birth: {personalInfo.dateOfBirth}</p>
        <p>Phone: {personalInfo.phone}</p>
        <h2>Education Details:</h2>
        <p>Degree: {educationDetails.degree}</p>
        <p>Institution: {educationDetails.institution}</p>
        <p>Graduation Year: {educationDetails.graduationYear}</p>
        <p>University No: {educationDetails.number}</p>
        <p>SSC: {educationDetails.tenthPercentage}</p>
        <p>HSC/Diploma: {educationDetails.tw}</p>
        <h2>Address:</h2>
        <p>Address1: {address.address}</p>
        <p>Address2: {address.address}</p>
        <p>Street: {address.street}</p>
        <p>City: {address.city}</p>
        <p>State: {address.state}</p>
        <p>ZIP Code: {address.zip}</p>
        
        <Button variant="contained" onClick={handleSubmit}>Submit</Button>
      </div>
    );
    setPreviewData(previewContent);
    setActiveStep(steps.length);
  };

  const handleSubmit = () => {
    setShowSubmitConfirmation(true);
  };

  const handleConfirmSubmit = () => {
    generatePDF(); // Generate PDF before submitting the form
    // Handle form submission logic here
    // Reset the form or navigate to another page if needed
    setShowSubmitConfirmation(false);
    setFormSubmitted(true); // Set formSubmitted to true after successful submission
    setShowThankYouDialog(true); // Show the thank you dialog after submission
  };

  const handleCancelSubmit = () => {
    setShowSubmitConfirmation(false);
  };

  const handleDialogClose = () => {
    setShowThankYouDialog(false); // Close the thank you dialog
  };


 
  const generatePDF = () => {
    const pdf = new jsPDF();
    // Add profile image if available
      if (personalInfo.imagePreview) {
        const imgData = personalInfo.imagePreview;
        pdf.addImage(imgData, 'JPEG', 10, 10, 50, 50);
      }

    // Define table columns and rows
    const tableRows = [
      ["First Name", personalInfo.firstName],
      ["Last Name", personalInfo.lastName],
      ["Email", personalInfo.email],
      ["Date of Birth", personalInfo.dateOfBirth],
      ["Phone", personalInfo.phone],
      ["Degree", educationDetails.degree],
      ["Institution", educationDetails.institution],
      ["Graduation Year", educationDetails.graduationYear],
      ["University No", educationDetails.number],
      ["10th Percentage", educationDetails.tenthPercentage],
      ["12th Percentage", educationDetails.twelfthPercentage],
      ["Skills", educationDetails.skills],
      ["Address1", address.address],
      ["Address2", address.address1],
      ["Street", address.street],
      ["City", address.city],
      ["State", address.state],
      ["ZIP Code", address.zip],
    ];
  
    // Set table properties
    const startY = 70; // Initial y position for table
    const cellWidth = 80; // Width of each cell
  
    // Define custom theme object
    const customTheme = {
      tableLineColor: [0, 0, 0], // Color of the table lines (RGB array)
      tableLineWidth: 0.2, // Width of the table lines
      textColor: [0, 0, 0], // Text color (RGB array)
      fontStyle: 'normal', // Font style (normal, bold, italic)
      overflow: 'linebreak', // Overflow behavior of text in cells
      fillColor: [255, 255, 255], // Fill color of the table cells (RGB array)
      rowHeight: 10, // Height of each row
      columnWidth: 'auto', // Width of each column
      cellPadding: 2, // Padding of the cells
      valign: 'middle', // Vertical alignment of the content within cells
      halign: 'left', // Horizontal alignment of the content within cells
      fontSize: 10, // Font size of the text in cells
    };
  
    // Add table to PDF with custom theme
    pdf.autoTable({
      startY: startY,
      head: [['Details', 'Information']],
      body: tableRows,
      theme: 'grid', // Use predefined theme or custom theme object
      columnStyles: {
        0: { cellWidth: cellWidth, fontStyle: 'bold' },
        1: { cellWidth: 'auto' },
      },
      styles: { fontSize: 10, overflow: 'linebreak' },
      ...customTheme, // Spread custom theme properties
    });
  
    // Save the PDF
    pdf.save('form_preview.pdf');
  };
  
  
  useEffect(() => {
    // Save form data to localStorage
    localStorage.setItem('personalInfo', JSON.stringify(personalInfo));
    localStorage.setItem('educationDetails', JSON.stringify(educationDetails));
    localStorage.setItem('address', JSON.stringify(address));
  }, [personalInfo, educationDetails, address]);

  return (
    <div className="background-animation"> {/* Apply the animated background */}
      <Container maxWidth="sm" style={{ marginTop: '30px', position: 'relative', zIndex: 1 }}> {/* Adjust z-index to ensure form elements are on top */}
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <div style={{ marginBottom: '30px' ,marginTop:'15px'}}>
          {activeStep === steps.length ? (
            <div>
              {formSubmitted ? (
                <Typography variant="h5">Thank you for your response!</Typography>
              ) : (
                <div>
                  <Button variant="contained" onClick={() => setActiveStep(0)} style={{ marginRight: '10px' }}>Reset</Button>
                  <Button variant="contained" onClick={generatePreview} style={{ marginLeft: '260px' }}>Generate Preview</Button>
                </div>
              )}
            </div>
          ) : (
            <div>
      {activeStep === 0 && (
        <Grid container spacing={2} style={{ border: '1px solid #ccc', padding: '40px', marginTop:'15px',borderRadius: '8px', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',backgroundColor:'white' }}>
          <Grid item xs={12}>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              style={{ marginBottom: '20px' }}
            />
            {personalInfo.imagePreview && (
              <img src={personalInfo.imagePreview} alt="" style={{ width: '20%', marginTop: '10px' }} />
            )}
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField fullWidth label="First Name" name="firstName" value={personalInfo.firstName} onChange={(e) => handleChange(e, setPersonalInfo)} style={{ marginBottom: '20px' }} />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField fullWidth label="Last Name" name="lastName" value={personalInfo.lastName} onChange={(e) => handleChange(e, setPersonalInfo)} style={{ marginBottom: '20px' }} />
          </Grid>
          <Grid item xs={12}>
            <TextField fullWidth label="Email" name="email" value={personalInfo.email} onChange={(e) => handleChange(e, setPersonalInfo)} style={{ marginBottom: '20px' }} />
          </Grid>
          <Grid item xs={12}>
            <TextField fullWidth label="" type="date" name="dateOfBirth" value={personalInfo.dateOfBirth} onChange={(e) => handleChange(e, setPersonalInfo)} style={{ marginBottom: '20px' }} />
          </Grid>
          <Grid item xs={12}>
            <TextField fullWidth label="Phone" name="phone" value={personalInfo.phone} onChange={(e) => handleChange(e, setPersonalInfo)} style={{ marginBottom: '20px' }} />
          </Grid>
          
        </Grid>
      )}
      {activeStep === 1 && (
        <Grid container spacing={2} style={{ border: '1px solid #ccc', padding: '20px',backgroundColor:'white' ,marginTop:'15px', borderRadius: '8px', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)' }}>
          <Grid item xs={12} md={6}>
            <TextField fullWidth label="Degree" name="degree" value={educationDetails.degree} onChange={(e) => handleChange(e, setEducationDetails)} style={{ marginBottom: '20px' }} />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField fullWidth label="Institution" name="institution" value={educationDetails.institution} onChange={(e) => handleChange(e, setEducationDetails)} style={{ marginBottom: '20px' }} />
          </Grid>
          <Grid item xs={12}>
            <TextField fullWidth label="Graduation Year" name="graduationYear" value={educationDetails.graduationYear} onChange={(e) => handleChange(e, setEducationDetails)} style={{ marginBottom: '20px' }} />
          </Grid>
          <Grid item xs={12} >
            <TextField fullWidth label="University No" name="number" value={educationDetails.number} onChange={(e) => handleChange(e, setEducationDetails)} style={{ marginBottom: '20px' }} />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField fullWidth label="10th Percentage" name="tenthPercentage" value={educationDetails.tenthPercentage} onChange={(e) => handleChange(e, setEducationDetails)} style={{ marginBottom: '20px' }} />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField fullWidth label="12th Percentage" name="twelfthPercentage" value={educationDetails.twelfthPercentage} onChange={(e) => handleChange(e, setEducationDetails)} style={{ marginBottom: '20px' }} />
          </Grid>

          <Grid item xs={12}>
          <TextField fullWidth label="Skills" name="skills" value={educationDetails.skills} onChange={(e) => handleChange(e, setEducationDetails)} style={{ marginBottom: '20px' }} />
        </Grid>
        </Grid>
      )}
      {activeStep === 2 && (
        <Grid container spacing={2} style={{ border: '1px solid #ccc', padding: '20px',backgroundColor:'white' ,marginTop:'15px', borderRadius: '8px', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)' }}>
          <Grid item xs={12}>
            <TextField fullWidth label="Address1" name="address" value={address.address} onChange={(e) => handleChange(e, setAddress)} style={{ marginBottom: '20px' }} />
          </Grid>
          <Grid item xs={12}>
            <TextField fullWidth label="Address2" name="address1" value={address.address1} onChange={(e) => handleChange(e, setAddress)} style={{ marginBottom: '20px' }} />
          </Grid>
          <Grid item xs={12} >
            <TextField fullWidth label="Street" name="street" value={address.street} onChange={(e) => handleChange(e, setAddress)} style={{ marginBottom: '20px' }} />
          </Grid>
          <Grid item xs={12}>
            <TextField fullWidth label="City" name="city" value={address.city} onChange={(e) => handleChange(e, setAddress)} style={{ marginBottom: '20px' }} />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField fullWidth label="State" name="state" value={address.state} onChange={(e) => handleChange(e, setAddress)} style={{ marginBottom: '20px' }} />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField fullWidth label="ZIP Code" name="zip" value={address.zip} onChange={(e) => handleChange(e, setAddress)} style={{ marginBottom: '20px' }} />
          </Grid>
        </Grid>
      )}
      <div style={{ marginTop: '20px' }}>
        <Button disabled={activeStep === 0} onClick={handleBack} style={{ marginRight: '10px' }}>Back</Button>
        <Button variant="contained" onClick={handleNext} style={{ marginLeft: '370px' }}>{activeStep === steps.length - 1 ? 'Finish' : 'Next'}</Button>
      </div>
    </div>

            )}
          </div>
          <Dialog open={showSubmitConfirmation} onClose={handleCancelSubmit}>
            <DialogTitle>Confirmation</DialogTitle>
            <DialogContent>
              <Typography variant="body1">Are you sure you want to submit the form?</Typography>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCancelSubmit}>Cancel</Button>
              <Button onClick={handleConfirmSubmit} color="primary">Submit</Button>
            </DialogActions>
          </Dialog>
          <Dialog open={showThankYouDialog} onClose={handleDialogClose}>
            <DialogTitle>Thank You</DialogTitle>
            <DialogContent>
              <Typography variant="body1">Thank you for your response!</Typography>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleDialogClose} color="primary">Close</Button>
            </DialogActions>
          </Dialog>
          <div>
            {previewData && (
              <div style={{ border: '1px solid #ccc', padding: '20px', borderRadius: '8px', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)', marginTop: '30px' ,backgroundColor:'white' }}>
              {/* <Typography variant="h5">Form Preview</Typography> */}
              {previewData}
            </div>
            
            )}
          </div>
        </Container>
      </div>
    );
  }
  
  export default MultiStepForm;
