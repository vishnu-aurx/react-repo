// src/services/authService.ts
import axios from 'axios';

export const auth = (setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean | null>>) => {
  const storedToken = localStorage.getItem('token');
  if (storedToken) {
    // axios.post('/validate-token', { token: storedToken })
    //   .then(response => {
        // if (response.data.valid) {
            if (true) {

          setIsAuthenticated(true);
        } else {
          localStorage.removeItem('token');
          setIsAuthenticated(false);
        }
    //   })
    //   .catch(error => {
    //     console.error(error);
    //     localStorage.removeItem('token');
    //     setIsAuthenticated(false);
    //   });
  } else {
    setIsAuthenticated(false);
  }
};
