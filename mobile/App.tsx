import { AuthProvider } from './app/context/AuthContext';

import { Layout } from './Layout';
// TO RUN
// create account on ngrok: https://ngrok.com/ and get your Authtoken from Your Authtoken page
// open ngrok app
// type ngrok config add-authtoken <your authtoken> (only once)
// run the server
// type ngrok http 3001
// copy the address from Forwarding header (for example: https://a350-178-235-190-219.ngrok-free.app)
// paste address to AuthContext API_URL variable (required every time you close ngrok)
// type npx expo start --tunnel and scan qr code in the Expo Go app

// Color palette
// #6422b8 - fioletowy
// #ffd93b - rzułty
// #ffffff - biały

export default function App() {
  return (
    <AuthProvider>
      <Layout></Layout>
    </AuthProvider>
  );
}