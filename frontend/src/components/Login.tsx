// Login.tsx
import React, { useState } from 'react';
import { Button, TextField, Typography, IconButton, InputAdornment } from '@mui/material';

import { FaTimes, FaEye, FaEyeSlash } from 'react-icons/fa';

interface LoginProps {
  setShowRegister: React.Dispatch<React.SetStateAction<boolean>>;
  setShowLogin: React.Dispatch<React.SetStateAction<boolean>>;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  handleLogin: () => Promise<void>;
}

const Login: React.FC<LoginProps> = ({ setShowRegister, setShowLogin, setUsername, setPassword, handleLogin }) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleShowRegister = () => {
    setShowLogin(false);
    setShowRegister(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Perform client-side validation if needed
    handleLogin();
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

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
      <div style={{ display: 'flex', zIndex: '10', }}>
        <form onSubmit={handleSubmit} style={{ background: 'white', padding: '15px', borderRadius: '8px', boxShadow: '0px 0px 8px rgba(0, 0, 0, 0.1)', marginTop: '20px' }}>
          <IconButton
            aria-label="close"
            onClick={() => setShowLogin(false)}
            style={{
              position: 'absolute',
              top: '14px',
              right: '0px',
              margin: '10px',
            }}
          >
            <FaTimes className="h-5 w-5 text-black active:scale-x-90" />
          </IconButton>
          <Typography variant="h6" gutterBottom>
            Login
          </Typography>
          <TextField
            required
            id="username"
            name="username"
            label="Käyttäjänimi tai Sähköposti"
            fullWidth
            onChange={(e) => setUsername(e.target.value)}
            style={{ marginBottom: '10px' }}
          />
          <TextField
            required
            id="password"
            name="password"
            label="Salasana"
            type={showPassword ? 'text' : 'password'}
            fullWidth
            onChange={(e) => setPassword(e.target.value)}
            style={{ marginBottom: '15px' }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={togglePasswordVisibility} edge="end" style={{ fontSize: '1rem' }}>
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Button type="submit" variant="contained" color="primary">
            Kirjaudu
          </Button>

          <p style={{ marginTop: '10px', textAlign: 'center', cursor: 'pointer', color: 'blue', zIndex: "10" }} onClick={handleShowRegister}>
            Ei käyttäjää? Rekisteröidy tästä!
          </p>

        </form>

      </div>
    </div>
  );
};

export default Login;
