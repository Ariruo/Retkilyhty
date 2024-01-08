import { userCoordinates } from '../types/props';

const getUserCoordinates = (): Promise<UserCoordinates> => {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position: GeolocationPosition) => {
          const { latitude, longitude } = position.coords;
          resolve({ latitude, longitude });
        },
        (error) => {
          reject(error);
        }
      );
    } else {
      reject(new Error('Geolocation API is not available in this browser.'));
    }
  });
};

export default getUserCoordinates;
