import React from 'react';
import 'animate.css';

interface PopUp {
  isOpen: boolean;
  loginStatus: boolean;
  onClose: () => void
}

const LoginStatus: React.FC<PopUp> = ({ isOpen, loginStatus, onClose }) => {
  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 flex justify-center mb-8 z-50 animate__animated animate__bounceInLeft">
          <div className="fixed bottom-0 bg-white p-8 rounded-lg shadow-md flex flex-col justify-center items-center">
            {loginStatus ? (
              <h2 className="text-2xl font-semibold mb-4">Login is successful!</h2>
            ) : (
              <h2 className="text-2xl font-semibold mb-4">Username or password is incorrect</h2>
            )}

            {loginStatus ? (
              // eslint-disable-next-line react/no-unescaped-entities
              <p>We're glad to see you!</p>
            ) : (
              <p>Sorry, try another username or password</p>
            )}

            <button onClick={onClose} className="w-1/2 mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default LoginStatus;
