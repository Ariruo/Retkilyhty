// Register.tsx
import React from 'react';
import { Button, TextField, Typography, IconButton } from '@mui/material';

import { FaTimes } from 'react-icons/fa';

import 'react-toastify/dist/ReactToastify.css';

interface RegisterProps {
  setShowRegister: React.Dispatch<React.SetStateAction<boolean>>;
  setShowLogin: React.Dispatch<React.SetStateAction<boolean>>;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  handleRegister: (e: React.FormEvent) => Promise<void>;
}

const Register: React.FC<RegisterProps> = ({ setShowRegister,  setEmail, setUsername, setPassword, handleRegister }) => {

  return (
    <div style={{
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: '10'
    }}>
      <form onSubmit={handleRegister} style={{ background: 'white', padding: '15px', borderRadius: '8px', boxShadow: '0px 0px 8px rgba(0, 0, 0, 0.1)', zIndex: '10' }}>
      <IconButton
  aria-label="close"
  onClick={() => setShowRegister(false)}
  style={{
    position: 'absolute',
    top: '-5px',
    right: '0px',
    margin: '10px',
  }}
>
  <FaTimes className="h-5 w-5 text-black active:scale-x-90" />
</IconButton>
        <Typography variant="h6" gutterBottom>
          Lisää Käyttäjä
        </Typography>
        <TextField
          required
          id="email"
          name="email"
          label="Email"
          fullWidth
          onChange={(e) => setEmail(e.target.value)}
          style={{ marginBottom: '10px' }}
        />
        <TextField
          required
          id="username"
          name="username"
          label="Username"
          fullWidth
          onChange={(e) => setUsername(e.target.value)}
          style={{ marginBottom: '10px' }}
        />
        <TextField
          required
          id="password"
          name="password"
          label="Password"
          type="password"
          fullWidth
          onChange={(e) => setPassword(e.target.value)}
          style={{ marginBottom: '15px' }}
        />
        <Button type="submit" variant="contained" color="primary">
          Lisää
        </Button>
      </form>
   
    </div>
  );
};

export default Register;
