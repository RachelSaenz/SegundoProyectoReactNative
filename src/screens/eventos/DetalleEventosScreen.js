import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Share,
  ScrollView,
  Alert
} from 'react-native';

import { doc, getDoc, updateDoc, arrayUnion, deleteDoc } from 'firebase/firestore';
import { db, auth } from '../../config/firebaseConfig';

export default function DetalleEventosScreen({ route, navigation }) {
  const { eventId } = route.params;
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  const user = auth.currentUser;

  useEffect(() => {
    const fetchEvent = async () => {
      const ref = doc(db, 'events', eventId);
      const snap = await getDoc(ref);

      if (snap.exists()) {
        setEvent(snap.data());
      }
      setLoading(false);
    };

    fetchEvent();
  }, []);

  const confirmarAsistencia = async () => {
    try {
      const ref = doc(db, 'events', eventId);

      await updateDoc(ref, {
        participantes: arrayUnion({
          uid: user.uid,
          email: user.email,
          confirmado: true,
        }),
      });

      alert('Asistencia confirmada');
    } catch (e) {
      alert('Error al confirmar asistencia');
    }
  };

  const compartirEvento = async () => {
    try {
      await Share.share({
        message: `Mira este evento:\n${event.titulo}\n${event.descripcion}`,
      });
    } catch (error) {
      alert('No se pudo compartir');
    }
  };

  const deleteEvent = async (id) => {
    Alert.alert(
        "Eliminar evento",
        "¿Seguro que deseas eliminar este evento?",
        [
            { text: "Cancelar", style: "cancel" },
            {
                text: "Eliminar",
                style: "destructive",
                onPress: async () => {
                try {
                    await deleteDoc(doc(db, "events", id));
                    alert("Evento eliminado correctamente");
                    navigation.goBack();
                } catch (error) {
                    console.log(error);
                    alert("Error al eliminar el evento");
                }
                }
            }
        ]
    );
};

  if (loading) return <ActivityIndicator size="large" style={styles.loader} />;

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{event.titulo}</Text>

      <Text style={styles.info}>📅 Fecha: {event.fecha}</Text>
      <Text style={styles.info}>⏰ Hora: {event.hora}</Text>
      <Text style={styles.info}>📍 Ubicación: {event.ubicacion}</Text>

      <Text style={styles.subtitle}>Descripción:</Text>
      <Text style={styles.descripcion}>{event.descripcion}</Text>

      <TouchableOpacity
        style={styles.confirmButton}
        onPress={confirmarAsistencia}
      >
        <Text style={styles.buttonText}>Confirmar asistencia</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.shareButton} onPress={compartirEvento}>
        <Text style={styles.buttonText}>Compartir evento</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => deleteEvent(eventId)}
      >
        <Text style={styles.deleteText}>Eliminar</Text>
      </TouchableOpacity>

      <View style={styles.participantesBox}>
        <Text style={styles.participantesTitle}>
          Participantes confirmados:
        </Text>
        <Text style={styles.participantesCount}>
          {event.participantes?.length || 0}
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = {
  container: {
    padding: 20
  },
  loader: {
    marginTop: 50,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  info: {
    marginTop: 10,
    fontSize: 16,
  },
  subtitle: {
    marginTop: 20,
    fontSize: 16,
    fontWeight: 'bold',
  },
  descripcion: {
    color: '#555',
  },
  confirmButton: {
    marginTop: 20,
    padding: 15,
    backgroundColor: 'green',
    borderRadius: 10,
  },
  shareButton: {
    marginTop: 15,
    padding: 15,
    backgroundColor: '#4f46e5',
    borderRadius: 10,
  },
  deleteButton: {
    marginTop: 15,
    padding: 15,
    backgroundColor: 'red',
    borderRadius: 6,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
  deleteText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16
  },
  participantesBox: {
    marginTop: 25,
  },
  participantesTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  participantesCount: {
    fontSize: 16,
  },
};
