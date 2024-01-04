import React, { useState } from 'react';
import { Marker, Popup } from 'react-map-gl';
import {
  Box,
  Button,
  Select,
  MenuItem,
  TextField,
  IconButton,
  InputLabel,
  Dialog,
  DialogTitle,
  DialogActions,
} from '@mui/material';
import { FaTimes } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import ReCAPTCHA from "react-google-recaptcha";
import 'react-toastify/dist/ReactToastify.css';

const AddLocation = ({ initialLongitude, initialLatitude, mapRef }) => {

  const baseUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:9000"; 
  const sitekey = import.meta.env.VITE_RECAPTCHA
  const addendpoint = `${baseUrl}/api/add`;

  const [markerCoords, setMarkerCoords] = useState({ longitude: initialLongitude, latitude: initialLatitude });
  const [formData, setFormData] = useState({
    name: '',
    tyyppi: '',
    maakunta: '',
  });
  const [showPopup, setShowPopup] = useState(false);
  const [confirmationDialogOpen, setConfirmationDialogOpen] = useState(false);
  const [showDragPopup, setShowDragPopup] = useState(true); 
  const [verified, setVerified] = useState(false);

  const getCurrentZoom = () => {
    return mapRef?.current?.getMap?.()?.getZoom?.();
  };
  

  const currentZoom = getCurrentZoom();
  const offsetMultiplier = 0.00030 * Math.pow(2, 15 - currentZoom);

  const handleMarkerClick = () => {
    setShowDragPopup(false); // Hide the drag popup when marker is clicked
   ; // Show the main popup when marker is clicked
  };

  const handleMarkerDragEnd = (event) => {
    const { lng, lat } = event.lngLat;
    const updatedCoords = { longitude: lng, latitude: lat };
    setMarkerCoords(updatedCoords);
    setShowPopup(true);
    setShowDragPopup(false);
  };

  const handleVerifyRecaptcha = (response) => {
    if (response) {
      setVerified(true);
    }
  };

  const handleSubmit = async () => {
    if (!verified) {
      // If reCAPTCHA is not verified, don't proceed
      return;
    }
    setConfirmationDialogOpen(true);
  };
  

  const handleConfirmation = async (confirmed) => {
    if (confirmed) {
      // Prepare data to send to the backend
      const dataToSend = {
        ...formData,
        longitude: markerCoords.longitude,
        latitude: markerCoords.latitude,
      };

      try {
        const response = await fetch(addendpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(dataToSend),
        });

        if (response.ok) {
          // Show success notification using react-toastify
          toast.success('Kohde lisätty onnistuneesti!', {
            position: 'top-right',
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            style: { zIndex: 9999 },
          });

          // Reset form and close popup
          setFormData({
            name: '',
            tyyppi: '',
            maakunta: '',
          });
          setShowPopup(false);
        } else {
          console.error('Failed to send marker data to the server');
        }
      } catch (error) {
        console.error('Error sending marker data:', error);
      }
    }

    // Close confirmation dialog
    setConfirmationDialogOpen(false);
  };

  const tyyppiOptions = ['Autiotupa','Päivätupa', 'Kammi', 'Kota', "Laavu", 'Lähde','Lintutorni', 'Luola', 'Nähtävyys', 'Ruokailukatos', 'Sauna', 'Nuotipaikka', 'Varaustupa'];
  const maakuntaOptions = [
    'Ahvenanmaa', 'Keski-Suomi', 'Keski-Pohjanmaa', 'Itä-Suomi', 'Varsinais-Suomi', 'Kainuu', 'Kymenlaakso', 'Lappi', 'Pohjois-Karjala', 'Pohjois-Pohjanmaa', 'Pohjois-Savo', 'Pohjanmaa', 'Päijät-Häme', 'Pirkanmaa', 'Satakunta', 'Etelä-Karjala', 'Etelä-Pohjanmaa', 'Etelä-Savo', 'Häme', 'Uusimaa'
  ];

  return (
    <>
 
      <Marker
        longitude={markerCoords.longitude}
        latitude={markerCoords.latitude}
        draggable
        
        onDragStart={handleMarkerClick} // Attach the click event handler to show the popup
        onDragEnd={handleMarkerDragEnd}
      >
  
        {showPopup && (
          <Popup
            longitude={markerCoords.longitude}
            latitude={markerCoords.latitude + offsetMultiplier}
            onClose={() => setShowPopup(false)}
            closeButton={false}
            anchor="bottom"
            className="custom-popup"
            tipSize={5}
            dynamicPosition={true}
            closeOnClick={false}
          >
            <Box sx={{ padding: '25px' }}>
              <IconButton
                aria-label="close"
                onClick={() => setShowPopup(false)}
                sx={{
                  position: 'absolute',
                  top: '-4px',
                  right: '-5px',
                  zIndex: '1',
                  '&:hover': {
                    transform: 'scale(0.9)', // Reduce the size when hovered
                  },
                }}
              >
                <FaTimes className="h-6 w-6 text-gray-700 hover:text-gray-900" />
              </IconButton>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSubmit();
                }}
              >
                <TextField
                  label="Nimi"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  fullWidth
                  sx={{ marginBottom: '10px' }}
                />
                <InputLabel id="demo-simple-select-standard-label">Tyyppi</InputLabel>
                <Select
                  id="demo-simple-select-standard"
                  value={formData.tyyppi}
                  onChange={(e) => setFormData({ ...formData, tyyppi: e.target.value })}
                  required
                  fullWidth
                  sx={{ marginBottom: '10px' }}
                >
                  {tyyppiOptions.map((option, index) => (
                    <MenuItem key={index} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </Select>
                <InputLabel id="demo-simple-select-standard-label">Maakunta</InputLabel>
                <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  value={formData.maakunta}
                  onChange={(e) => setFormData({ ...formData, maakunta: e.target.value })}
                  required
                  fullWidth
                  placeholder="Maakunta"
                  sx={{ marginBottom: '10px' }}
                >
                  {maakuntaOptions.map((option, index) => (
                    <MenuItem key={index} value={option}>
                      {option}

                    </MenuItem>
                  ))}
 
                </Select>
                <ReCAPTCHA
  sitekey= {sitekey}
  onChange={handleVerifyRecaptcha}
  className="transform scale-75 " // Apply Tailwind classes directly to the component
  style={{ marginLeft: '-56px'}}
/>
    
                <Button type="submit" variant="contained" color="primary" sx={{ backgroundColor: '#9A3412' }}>
                  Lisää
                </Button>
              </form>
              
            </Box>
          </Popup>
        )}
      </Marker>
      <Dialog open={confirmationDialogOpen} onClose={() => setConfirmationDialogOpen(false)}>
  <DialogTitle>
  Oletko varma, että haluat lisätä kohteen <span style={{ fontWeight: 'bold', color: 'black' }}>{formData.name}</span>?
  </DialogTitle>

  <DialogActions>
    <Button onClick={() => handleConfirmation(false)} color="primary">
      Peruuta
    </Button>
    <Button onClick={() => handleConfirmation(true)} color="primary" autoFocus>
      Lisää
    </Button>
  </DialogActions>
</Dialog>

{showDragPopup && ( // Render the drag popup if showDragPopup is true
        <Popup
        longitude={markerCoords.longitude }
        latitude={markerCoords.latitude + offsetMultiplier} 
          closeButton={false}
          anchor="bottom"
          tipSize={5}
        >
          <Box sx={{ padding: '10px' }}>
            <p>Siirrä minut haluamaasi kohtaan ja lisää kohde</p>
          </Box>
        </Popup>
      )}

      <ToastContainer />
    </>
  );
};

export default AddLocation;
