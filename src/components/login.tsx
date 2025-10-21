import React from 'react';

const LoginComponent: React.FC= () => {
  function redirectRegister(){
    window.location.href = '/registrar';
  }
  return (
    <div className="w-96 p-2 flex flex-col self-center bg-primaryBlue-100 rounded-md mb-4 h-auto border-2 border-primaryBlue-200">
      <div className='w-75 border-b-2 border-primaryBlue-200 self-center p-2'>
        <h1 className='font-sora-extra-bold text-primaryBlue-900 self-center w-full text-center'>Login</h1>
      </div>
      <div className='flex flex-col p-2 gap-2 font-sora-light text-gray-700'>
        {/* Login form elements go here */}
        <input
          className='rounded-md h-8 p-2'
          type="text"
          placeholder="Username"
        />
        <input
          className='rounded-md h-8 p-2 font-sora-light text-gray-700'
          type="password"
          placeholder="Password"
        />
        <button className="mt-2 bg-primaryBlue-600 text-white p-2 rounded-md hover:bg-primaryBlue-700 w-50 self-center font-sora-light">
          Iniciar Sesion
        </button>
      </div>
      <div className='w-75 border-b-2 border-primaryBlue-200 self-center p-2'>
      </div>
      <div className='p-2 w-full justify-center flex'>
      <span className='text-primaryBlue-600  px-1 py-1 font-sora-light'>¿No tienes una cuenta?</span>
      <button onClick={redirectRegister} className="text-primaryBlue-300 px-1 py-1 rounded-md hover:text-primaryBlue-900  font-sora-light underline">
          Registrar
      </button>
      </div>
    </div>
  );
};

export default LoginComponent;