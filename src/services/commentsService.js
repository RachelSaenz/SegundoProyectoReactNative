import AsyncStorage from '@react-native-async-storage/async-storage';

const COMMENTS_KEY = "event_comments";

// Obtener comentarios por ID de evento
export async function getComments(eventId) {
    const data = await AsyncStorage.getItem(COMMENTS_KEY);
    const parsed = data ? JSON.parse(data) : {};
    return parsed[eventId] || [];
}

// Agregar comentario
export async function addComment(eventId, userId, text, rating) {
    const data = await AsyncStorage.getItem(COMMENTS_KEY);
    const parsed = data ? JSON.parse(data) : {};

    const existing = parsed[eventId] || [];

    // Prevenir duplicado (1 comentario por usuario)
    const hasComment = existing.some(c => c.userId === userId);
    if (hasComment) return false;

    const newComment = {
        id: Date.now(),
        userId,
        text,
        rating,
        date: new Date().toISOString(),
    };

    parsed[eventId] = [...existing, newComment];

    await AsyncStorage.setItem(COMMENTS_KEY, JSON.stringify(parsed));
    return true;
}