import React, { useState, useEffect} from 'react';
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
import { AddLocationProps } from '../types/props';
import { useSelector } from 'react-redux';
import { selectToken, selectUserId, selectUsername } from '../redux/reducers/userReducer';





const AddLocation: React.FC<AddLocationProps> = ({ initialLongitude, initialLatitude, mapRef }) => {

  const baseUrl: string = import.meta.env.VITE_BACKEND_URL || "http://localhost:9000";
  const sitekey: string = import.meta.env.VITE_RECAPTCHA
  
  const userState = useSelector((state) => state.user);
  const userId = selectUserId(userState)
  const userToken = selectToken(userState)
  

  const addendpoint = `${baseUrl}/api/add`;
  

  

  const [markerCoords, setMarkerCoords] = useState<{ longitude: number; latitude: number }>({
    longitude: initialLongitude,
    latitude: initialLatitude,
  });
  
  const [formData, setFormData] = useState<{
    name: string;
    tyyppi: string;
    maakunta: string;
  }>({
    name: '',
    tyyppi: '',
    maakunta: '',
  });

 
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [confirmationDialogOpen, setConfirmationDialogOpen] = useState<boolean>(false);
  const [showDragPopup, setShowDragPopup] = useState<boolean>(true);
  const [verified, setVerified] = useState<boolean>(false);

  const getCurrentZoom = () => {
    return mapRef?.current?.getMap?.()?.getZoom();
  };


  
 

  const currentZoom = getCurrentZoom();
  const offsetMultiplier = 0.00030 * Math.pow(2, 15 - (currentZoom ?? 0));

  const handleMarkerClick = () => {
    setShowDragPopup(false); // Hide the drag popup when marker is clicked
   ; // Show the main popup when marker is clicked
  };

  const handleMarkerDragEnd = (event: { lngLat: { lng: number; lat: number } } | undefined) => {
    if (event) {
      const { lng, lat } = event.lngLat;
      const updatedCoords = { longitude: lng, latitude: lat };
      setMarkerCoords(updatedCoords);
      setShowPopup(true);
      setShowDragPopup(false);
    }
  };

  
  
  const handleVerifyRecaptcha = (response: string | null) => {
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
  

  const handleConfirmation = async (confirmed: boolean) => {
    if (confirmed) {
      // Prepare data to send to the backend
      const dataToSend = {
        ...formData,
        tyyppi: formData.tyyppi === 'Oma kohde (näkyy vain sinulle)' ? 'Oma kohde' : formData.tyyppi,
        longitude: markerCoords.longitude,
        latitude: markerCoords.latitude,
        user_id: userId,
        
      };
     

      try {
        
  
        const response = await fetch(addendpoint, {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${userToken}`, // Include the token in the Authorization header
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

  const tyyppiOptions = [
    'Autiotupa', 'Päivätupa', 'Kammi', 'Kota', 'Laavu', 'Lähde', 'Lintutorni', 'Luola',
    'Nähtävyys', 'Ruokailukatos', 'Sauna', 'Nuotipaikka', 'Varaustupa', 
    ...(userId && userToken ? ['Oma kohde (näkyy vain sinulle)'] : []),
  ];
  
  
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
           
            
            closeOnClick={false}
          >
            <Box sx={{ padding: '25px' }}>
              <IconButton
                aria-label="close"
                onClick={() => setShowPopup(false)}
                sx={{
                  position: 'absolute',
                  top: '-0px',
                  right: '-0px',
                  zIndex: '1',
                  '&:hover': {
                    transform: 'scale(0.9)',
                  },
                  '&:hover:focus-visible': {
                    outline: '0,1px solid gray',
                  },
                }}
              >
                <FaTimes className="h-5 w-5 text-black active:scale-x-90" />
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
         
        >
          <Box sx={{ padding: '10px' }}>
            <p >Siirrä minut haluamaasi kohtaan ja lisää kohde</p>
          </Box>
        </Popup>
      )}

      <ToastContainer /> 
    </>
  );
};

export default AddLocation;
