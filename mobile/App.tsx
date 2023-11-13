import { AuthProvider } from './app/context/AuthContext';
import Toast, { BaseToast, ErrorToast } from 'react-native-toast-message';
import { Layout } from './Layout';
// TO RUN
// create account on ngrok: https://ngrok.com/ and get your Authtoken from Your Authtoken page
// open ngrok app
// type ngrok config add-authtoken <your authtoken> (only once)
// run the server
// type ngrok http --domain fox-humble-inherently.ngrok-free.app 3001
// type npx expo start --tunnel and scan qr code in the Expo Go app (sometimes CommandError: ngrok tunnel took too long to connect may occur, then you just need to run npx expo start command once again)

// Color palette
// #6422b8 - fioletowy
// #ffd93b - rzułty
// #ffffff - biały

const toastConfig = {
  success: (props: any) => (
    <BaseToast
      {...props}
      style={{ backgroundColor: '#6422b8',
        borderLeftColor: 'green' }}
      text1Style={{
        color: '#ffd93b'
      }}
    />
  ),

  error: (props: any) => (
    <ErrorToast
      {...props}
      style={{ backgroundColor: '#6422b8',
        borderLeftColor: 'red' }}
      text1Style={{
        color: '#ffd93b'
      }}
    />
  ),
};

export default function App() {
  return (
    <>
      <AuthProvider>
        <Layout></Layout>
      </AuthProvider>
      <Toast config={toastConfig}/>
    </>
  );
}