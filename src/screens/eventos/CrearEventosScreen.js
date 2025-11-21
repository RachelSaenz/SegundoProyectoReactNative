import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db, auth } from '../../config/firebaseConfig';

export default function CrearEventosScreen({ navigation }) {
  const [titulo, setTitulo] = useState("");
  const [fecha, setFecha] = useState("");
  const [hora, setHora] = useState("");
  const [ubicacion, setUbicacion] = useState("");
  const [descripcion, setDescripcion] = useState("");

  const handleCreate = async () => {

    if (!titulo || !fecha || !hora || !ubicacion || !descripcion) {
      Alert.alert("Error", "Todos los campos son obligatorios.");
      return;
    }

    try {
      await addDoc(collection(db, "events"), {
        titulo,
        fecha,
        hora,
        ubicacion,
        descripcion,
        creador: auth.currentUser?.uid || "anon",
        fecha_creacion: serverTimestamp(),
        fecha_actualizacion: serverTimestamp(),
      });

      Alert.alert("Éxito", "Evento creado correctamente.");
      navigation.goBack();

    } catch (error) {
      console.log(error);
      Alert.alert("Error", "No se pudo crear el evento.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Crear Evento</Text>

      <TextInput
        placeholder="Título"
        style={styles.input}
        value={titulo}
        onChangeText={setTitulo}
      />

      <TextInput
        placeholder="Fecha (YYYY-MM-DD)"
        style={styles.input}
        value={fecha}
        onChangeText={setFecha}
      />

      <TextInput
        placeholder="Hora (HH:MM)"
        style={styles.input}
        value={hora}
        onChangeText={setHora}
      />

      <TextInput
        placeholder="Ubicación"
        style={styles.input}
        value={ubicacion}
        onChangeText={setUbicacion}
      />

      <TextInput
        placeholder="Descripción"
        style={[styles.input, { height: 100 }]}
        multiline
        value={descripcion}
        onChangeText={setDescripcion}
      />

      <TouchableOpacity style={styles.button} onPress={handleCreate}>
        <Text style={styles.buttonText}>Guardar Evento</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 26, fontWeight: "bold", marginBottom: 20 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    borderRadius: 10,
    marginBottom: 15
  },
  button: {
    backgroundColor: "green",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10
  },
  buttonText: {
    color: "white",
    fontSize: 18
  }
});