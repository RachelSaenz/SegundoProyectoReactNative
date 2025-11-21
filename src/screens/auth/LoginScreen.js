import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';

import { GoogleSignin } from '@react-native-google-signin/google-signin';

// 👇 Importamos Firebase Auth (usa tu firebaseConfig.js)
import { auth } from '../../config/firebaseConfig';
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithCredential,
} from 'firebase/auth';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loadingEmail, setLoadingEmail] = useState(false);
  const [loadingGoogle, setLoadingGoogle] = useState(false);

  // 🔹 LOGIN CON CORREO Y CONTRASEÑA
  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Campos obligatorios', 'Ingresa tu correo y contraseña.');
      return;
    }

    try {
      setLoadingEmail(true);

      await signInWithEmailAndPassword(auth, email.trim(), password);

      // Si el login es correcto, navegamos a Home
      navigation.reset({
        index: 0,
        routes: [{ name: 'EventsList' }],
      });
    } catch (error) {
      console.log('Error en login email:', error);
      let msg = 'Error al iniciar sesión.';

      if (error.code === 'auth/user-not-found') {
        msg = 'No existe una cuenta con este correo.';
      } else if (error.code === 'auth/wrong-password') {
        msg = 'Contraseña incorrecta.';
      } else if (error.code === 'auth/invalid-email') {
        msg = 'Correo electrónico no válido.';
      }

      Alert.alert('Error de autenticación', msg);
    } finally {
      setLoadingEmail(false);
    }
  };

  // 🔵 LOGIN CON GOOGLE + FIREBASE
  const loginWithGoogle = async () => {
    try {
      setLoadingGoogle(true);

      // Verifica servicios de Google Play
      await GoogleSignin.hasPlayServices({
        showPlayServicesUpdateDialog: true,
      });

      // Abre el selector de cuentas de Google
      const { idToken } = await GoogleSignin.signIn();

      // Crea credencial de Firebase a partir del idToken
      const googleCredential = GoogleAuthProvider.credential(idToken);

      // Inicia sesión en Firebase con esa credencial
      await signInWithCredential(auth, googleCredential);

      // Navegamos a Lista de eventos
      navigation.reset({
        index: 0,
        routes: [{ name: 'Home' }],
      });
    } catch (error) {
      console.log('Error en login con Google:', error);
      Alert.alert(
        'Error',
        'No se pudo iniciar sesión con Google. Intenta de nuevo.'
      );
    } finally {
      setLoadingGoogle(false);
    }
  };

  const goToRegister = () => {
    navigation.navigate('Register');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Iniciar sesión</Text>

      <Text style={styles.label}>Correo electrónico</Text>
      <TextInput
        style={styles.input}
        placeholder="correo@ejemplo.com"
        autoCapitalize="none"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />

      <Text style={styles.label}>Contraseña</Text>
      <TextInput
        style={styles.input}
        placeholder="********"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <Button
        title={loadingEmail ? 'Ingresando...' : 'Ingresar'}
        onPress={handleLogin}
        disabled={loadingEmail || loadingGoogle}
      />

      {/* Separación visual */}
      <View style={{ height: 16 }} />

      {/* 🔵 BOTÓN DE GOOGLE */}
      <TouchableOpacity
        style={styles.googleBtn}
        onPress={loginWithGoogle}
        disabled={loadingGoogle || loadingEmail}
      >
        <Text style={styles.googleBtnText}>
          {loadingGoogle ? 'Conectando...' : 'Iniciar sesión con Google'}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.linkContainer} onPress={goToRegister}>
        <Text style={styles.linkText}>
          ¿No tienes cuenta? Regístrate aquí
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 24,
    textAlign: 'center',
  },
  label: {
    fontSize: 14,
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: '#cccccc',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 16,
  },
  googleBtn: {
    marginTop: 8,
    padding: 12,
    backgroundColor: '#4285F4',
    borderRadius: 8,
    alignItems: 'center',
  },
  googleBtnText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
  linkContainer: {
    marginTop: 16,
    alignItems: 'center',
  },
  linkText: {
    color: '#1e88e5',
  },
});

