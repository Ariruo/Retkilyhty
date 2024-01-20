// RegisterPage.tsx
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import Login from './Login';
import Register from './Register';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import { login } from '../redux/reducers/userReducer';

interface RegisterPageProps {
    setShowRegister: React.Dispatch<React.SetStateAction<boolean>>;
    setShowLogin: React.Dispatch<React.SetStateAction<boolean>>;
    showRegister: boolean;
    showLogin: boolean;
  }

const RegisterPage: React.FC<RegisterPageProps> = ({ setShowRegister, setShowLogin, showRegister, showLogin }) => {
    const dispatch = useDispatch();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const handleLogin = async () => {
    const baseUrl: string = import.meta.env.VITE_BACKEND_URL || 'http://localhost:9000';

    try {
      const response = await fetch(`${baseUrl}/api/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      console.log(data);

      if (response.ok) {
      
        const { token, user_id, username } = data;
        console.log(token, user_id, username);
      
        setShowLogin(false);
        dispatch(login({ token, user_id, username })),
        

        // Display toast notification for successful login
        toast.success('Kirjautuminen onnistui!');

        
      } else {
        // Login failed
        toast.error(`Login failed: ${data.error}`);
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:9000';
    const registerEndpoint = `${baseUrl}/api/register`;

    try {
      const response = await fetch(registerEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Registration successful
        toast.success(`${data.username} Lisätty onnistuneesti!`);
        setShowRegister(false);
      } else {
        // Registration failed
        toast.error(`Rekisteröityminen epäonnistui: ${data.message}`);
      }
    } catch (error) {
      console.error('Error during registration:', error);
    }
  };

  return (
    <>
      {showLogin && (
        <Login
          
          setShowLogin={setShowLogin}
          setShowRegister={setShowRegister}
          
          handleLogin={handleLogin}
          setUsername={setUsername} 
          setPassword={setPassword} 
        />
      )}

{showRegister && (
        <Register
          
          setShowRegister={setShowRegister}
          setShowLogin={setShowLogin}
          setEmail={setEmail}
          setUsername={setUsername}
          setPassword={setPassword}
          handleRegister={handleRegister}
        />
      )}
      <ToastContainer />
    </>
  );
};

export default RegisterPage;
