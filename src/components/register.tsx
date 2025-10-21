import { UserInterface } from '@/resource/user.interface';
import { LocationCoordinates } from '@/utils/distancia';
import { extractCoordinatesFromGoogleMapsURL } from '@/utils/gmapsFormatter';
import { validatorForm } from '@/utils/validator';
import React, { useState } from 'react';

const RegisterComponent: React.FC= () => {
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    location: ''
  });
  const validateForm = (registerData: typeof formData) => {
    console.log('Validating form with data:', registerData);
    const coordinates: LocationCoordinates | null = extractCoordinatesFromGoogleMapsURL(registerData.location);
    // Add form validation logic here
    if (!validatorForm(registerData)) {
      setError('Please fill in all fields correctly.');
      return false;
    }
    if(registerData.password !== registerData.confirmPassword){
      setError('Passwords do not match.');
      return false;
    }
    if(!coordinates){
      setError('Invalid location URL.');
      return false;
    }
    console.log('Extracted Coordinates:', coordinates);
    setError(null);
    saveRegister(registerData);
    return true;
  }
  const saveRegister = async (registerData: typeof formData) => {
    console.log('Registering user with data:', registerData);

    try {
      const coordinates: LocationCoordinates | null = extractCoordinatesFromGoogleMapsURL(registerData.location);

      const locationData = {
        description: `${registerData.username} House Location`,
        latitude: coordinates ? String(coordinates.lat) : '0',
        longitude: coordinates ? String(coordinates.lon) : '0',
      };

      // Llamada a la API de ubicaciones
      const resLocation = await fetch('/api/ubicaciones', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(locationData),
      });

      if (!resLocation.ok) {
        throw new Error(`Error creating location: ${resLocation.statusText}`);
      }

      const { id: locationId } = await resLocation.json();

      const userData: Omit<UserInterface, 'id'> = {
        name: registerData.username,
        password: registerData.password,
        location: locationId,
      };

      // Llamada a la API de usuarios
      const resUser = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });

      if (!resUser.ok) {
        throw new Error(`Error creating user: ${resUser.statusText}`);
      }

      const { id: userId } = await resUser.json();
      console.log('User registered with ID:', userId);
    } catch (err: any) {
      console.error('Error during registration:', err);
      setError('Registration failed. Please try again.');
    }
  };

  return (
    <div className="w-96 p-2 flex flex-col self-center bg-primaryBlue-100 rounded-md mb-4 h-auto border-2 border-primaryBlue-200">
      <div className='w-75 border-b-2 border-primaryBlue-200 self-center p-2'>
        <h1 className='font-sora-extra-bold text-primaryBlue-900 self-center w-full text-center'>Registrar</h1>
      </div>
      <div className='flex flex-col p-2 gap-3 font-sora-light text-gray-700'>
        {/* Register form elements go here */}
        <input
          value={formData.username}
          onChange={(e) => setFormData({ ...formData, username: e.target.value })}
          className='rounded-md h-8 p-2'
          type="text"
          placeholder="Username"
        />
        <input
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          className='rounded-md h-8 p-2 font-sora-light text-gray-700'
          type="password"
          placeholder="Password"
        />  
        <input
          value={formData.confirmPassword}
          onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
          className='rounded-md h-8 p-2 font-sora-light text-gray-700'
          type="password"
          placeholder="Confirm Password"
        />
        <span
          className={`text-red-700 text-xs min-h-[1rem] ${error ? '' : 'opacity-0'}`}
        >
          {error || ''}
        </span>
        <div className='w-full flex flex-col self-center p-2 gap-2'>
          <h6 className='w-full text-center font-sora-bold text-primaryBlue-900'>Ubicacion</h6>
          <p className='w-full text-start font-sora-light text-gray-700'><strong>*</strong> Copia la URL de Google Maps seleccionando la direccion de tu hogar.</p>
          <input
            value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            className='rounded-md h-8 p-2 font-sora-light text-gray-700'
            type="text"
            placeholder="Location"
          />
        </div>
        <button onClick={() => validateForm(formData)} className="mt-2 bg-primaryBlue-600 text-white p-2 rounded-md hover:bg-primaryBlue-700 w-50 self-center font-sora-light">
          Registrar
        </button>
      </div>
    </div>
  );
};
export default RegisterComponent;
