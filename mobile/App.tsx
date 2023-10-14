import { AuthProvider } from './app/context/AuthContext';

import { Layout } from './Layout';
// TO RUN
// create account on ngrok: https://ngrok.com/ and get your Authtoken from Your Authtoken page
// open ngrok app
// type ngrok config add-authtoken <your authtoken> (only once)
// run the server
// type ngrok http --domain fox-humble-inherently.ngrok-free.app 3001
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