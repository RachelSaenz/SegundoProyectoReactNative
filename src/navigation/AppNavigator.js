import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from '../screens/auth/LoginScreen';
import RegisterScreen from '../screens/auth/RegisterScreen';
import ListaEventosScreen from '../screens/eventos/ListaEventosScreen';
import CrearEventosScreen from '../screens/eventos/CrearEventosScreen';
import DetalleEventosScreen from '../screens/eventos/DetalleEventosScreen';
import EditarEventosScreen from '../screens/eventos/EditarEventosScreen';
const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen
          name="EventsList"
          component={ListaEventosScreen}
          options={{ title: 'Eventos' }}
        />
        <Stack.Screen
          name="CreateEvent"
          component={CrearEventosScreen}
          options={{ title: 'Crear Evento' }}
        />
        <Stack.Screen
          name="EventDetails"
          component={DetalleEventosScreen}
          options={{ title: 'Detalles' }}
        />
        <Stack.Screen
          name="EditEvent"
          component={EditarEventosScreen}
          options={{ title: 'Editar Evento' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
