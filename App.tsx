import React, { useEffect } from 'react';
import AppNavigator from './src/navigation/AppNavigator';
import { configureGoogleSignIn } from './src/config/googleSignInConfig';

function App(): React.JSX.Element {

  // Inicio useEffect ---------------
  useEffect(() => {
    configureGoogleSignIn();
  }, []);
  // Fin useEffect ---------------------

  return (
    <AppNavigator />
  );
}

export default App;

