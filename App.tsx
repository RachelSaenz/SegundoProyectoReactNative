// App.tsx
import React, {useEffect} from 'react';
import AppNavigator from './src/navigation/AppNavigator';
import {configureGoogleSignIn} from './src/config/googleSignInConfig';
import {EventsProvider} from './src/context/EventsContext';

function App(): React.JSX.Element {
  useEffect(() => {
    configureGoogleSignIn();
  }, []);

  return (
    <EventsProvider>
      <AppNavigator />
    </EventsProvider>
  );
}

export default App;
