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
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../../config/firebaseConfig';

export default function RegisterScreen({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!name || !email || !password || !confirm) {
      Alert.alert('Campos obligatorios', 'Completa todos los campos.');
      return;
    }

    if (password.length < 6) {
      Alert.alert(
        'Contraseña débil',
        'La contraseña debe tener al menos 6 caracteres.'
      );
      return;
    }

    if (password !== confirm) {
      Alert.alert('Error', 'Las contraseñas no coinciden.');
      return;
    }

    try {
      setLoading(true);

      // 👉 Aquí SÍ se crea el usuario en Firebase
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email.trim(),
        password
      );

      // Guardar el nombre en el perfil (opcional)
      await updateProfile(userCredential.user, {
        displayName: name,
      });

      Alert.alert('Registro exitoso', 'Ahora puedes iniciar sesión.');

      navigation.reset({
        index: 0,
        routes: [{ name: 'Login' }],
      });
    } catch (error) {
      console.log('Error en registro:', error);
      let msg = 'Ocurrió un error al registrarte.';

      if (error.code === 'auth/email-already-in-use') {
        msg = 'Este correo ya está registrado.';
      } else if (error.code === 'auth/invalid-email') {
        msg = 'Correo electrónico no válido.';
      } else if (error.code === 'auth/weak-password') {
        msg = 'La contraseña es demasiado débil.';
      }

      Alert.alert('Error de registro', msg);
    } finally {
      setLoading(false);
    }
  };

  const goToLogin = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Crear cuenta</Text>

      <Text style={styles.label}>Nombre completo</Text>
      <TextInput
        style={styles.input}
        placeholder="Tu nombre"
        value={name}
        onChangeText={setName}
      />

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

      <Text style={styles.label}>Confirmar contraseña</Text>
      <TextInput
        style={styles.input}
        placeholder="********"
        secureTextEntry
        value={confirm}
        onChangeText={setConfirm}
      />

      <Button
        title={loading ? 'Registrando...' : 'Registrarme'}
        onPress={handleRegister}
        disabled={loading}
      />

      <TouchableOpacity style={styles.linkContainer} onPress={goToLogin}>
        <Text style={styles.linkText}>
          ¿Ya tienes cuenta? Inicia sesión
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
  linkContainer: {
    marginTop: 16,
    alignItems: 'center',
  },
  linkText: {
    color: '#1e88e5',
  },
});

