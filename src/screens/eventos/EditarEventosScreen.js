import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../config/firebaseConfig';

export default function EditarEventosScreen({ route, navigation }) {
  const { eventId } = route.params;

  const [loading, setLoading] = useState(true);
  const [titulo, setTitulo] = useState('');
  const [fecha, setFecha] = useState('');
  const [hora, setHora] = useState('');
  const [ubicacion, setUbicacion] = useState('');
  const [descripcion, setDescripcion] = useState('');

  useEffect(() => {
    const cargar = async () => {
      const ref = doc(db, 'events', eventId);
      const snap = await getDoc(ref);

      if (snap.exists()) {
        const data = snap.data();
        setTitulo(data.titulo);
        setFecha(data.fecha);
        setHora(data.hora);
        setUbicacion(data.ubicacion);
        setDescripcion(data.descripcion);
      }

      setLoading(false);
    };

    cargar();
  }, []);

  const guardarCambios = async () => {
    try {
      const ref = doc(db, 'events', eventId);

      await updateDoc(ref, {
        titulo,
        fecha,
        hora,
        ubicacion,
        descripcion,
      });

      alert('Evento actualizado');
      navigation.goBack();
    } catch (e) {
      alert('Error al actualizar');
    }
  };

  if (loading) return <ActivityIndicator size="large" style={{ marginTop: 50 }} />;

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 26, fontWeight: 'bold' }}>Editar Evento</Text>

      <TextInput
        placeholder="Título"
        value={titulo}
        onChangeText={setTitulo}
        style={styles.input}
      />

      <TextInput
        placeholder="Fecha"
        value={fecha}
        onChangeText={setFecha}
        style={styles.input}
      />

      <TextInput
        placeholder="Hora"
        value={hora}
        onChangeText={setHora}
        style={styles.input}
      />

      <TextInput
        placeholder="Ubicación"
        value={ubicacion}
        onChangeText={setUbicacion}
        style={styles.input}
      />

      <TextInput
        placeholder="Descripción"
        value={descripcion}
        onChangeText={setDescripcion}
        style={[styles.input, { height: 80 }]}
        multiline
      />

      <TouchableOpacity style={styles.saveButton} onPress={guardarCambios}>
        <Text style={{ color: 'white', fontSize: 16 }}>Guardar cambios</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = {
  input: {
    backgroundColor: '#eee',
    padding: 10,
    marginTop: 15,
    borderRadius: 8,
  },
  saveButton: {
    backgroundColor: 'green',
    padding: 15,
    marginTop: 25,
    borderRadius: 10,
    alignItems: 'center',
  },
};