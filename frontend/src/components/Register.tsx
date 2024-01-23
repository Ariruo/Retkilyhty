// Register.tsx
import React, { useState } from 'react';
import { Button, TextField, Typography, IconButton, InputAdornment } from '@mui/material';
import { FaTimes, FaEye, FaEyeSlash } from 'react-icons/fa';
import 'react-toastify/dist/ReactToastify.css';

interface RegisterProps {
  setShowRegister: React.Dispatch<React.SetStateAction<boolean>>;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  handleRegister: (e: React.FormEvent) => Promise<void>;
  password: string;
}

const Register: React.FC<RegisterProps> = ({ setShowRegister, setEmail, setUsername, setPassword, handleRegister, password }) => {
  
  const [passwordsMatch, setPasswordsMatch] = useState<boolean>(true);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
    setPasswordsMatch(password === e.target.value);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: '10' }}>
      <form onSubmit={(e) => {
        e.preventDefault();
        if (!passwordsMatch) {
          // Passwords do not match, handle accordingly (show error, etc.)
          console.error("Passwords do not match");
          return;
        }
        handleRegister(e);
      }} style={{ background: 'white', padding: '15px', borderRadius: '8px', boxShadow: '0px 0px 8px rgba(0, 0, 0, 0.1)', zIndex: '10' }}>
        <IconButton aria-label="close" onClick={() => setShowRegister(false)} style={{ position: 'absolute', top: '-5px', right: '0px', margin: '10px' }}>
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
          id="käyttäjänimi"
          name="käyttäjänimi"
          label="käyttäjänimi"
          fullWidth
          onChange={(e) => setUsername(e.target.value)}
          style={{ marginBottom: '10px' }}
        />
        <TextField
          required
          id="salasana"
          name="salasana"
          label="salasana"
          type={showPassword ? 'text' : 'password'}
          fullWidth
          onChange={(e) => setPassword(e.target.value)}
          style={{ marginBottom: '10px' }}
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
        <TextField
          required
          id="vahvista salasana"
          name="vahvista salasana"
          label="vahvista salasana"
          type={showConfirmPassword ? 'text' : 'password'}
          fullWidth
          error={!passwordsMatch}
          helperText={!passwordsMatch && "Salasanat eivät täsmää"}
          onChange={handleConfirmPasswordChange}
          style={{ marginBottom: '15px' }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={toggleConfirmPasswordVisibility} edge="end" style={{ fontSize: '1rem' }}>
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <Button type="submit" variant="contained" color="primary">
          Lisää
        </Button>
      </form>
    </div>
  );
};

export default Register;
