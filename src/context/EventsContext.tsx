// src/context/EventsContext.tsx
import React, {
    createContext,
    useContext,
    useEffect,
    useState,
    ReactNode,
} from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../config/firebaseConfig';

type Event = {
    id: string;
    titulo: string;
    descripcion: string;
    fecha: string;
    hora: string;
    ubicacion: string;
    [key: string]: any;
};

type EventsContextValue = {
    events: Event[];
    loading: boolean;
    reload: () => Promise<void>;
};

const EventsContext = createContext<EventsContextValue>({
    events: [],
    loading: false,
    reload: async () => { },
});

type Props = {
    children: ReactNode;
};

export const EventsProvider = ({ children }: Props) => {
    const [events, setEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState(true);

    const loadEvents = async () => {
        try {
            setLoading(true);
            const snap = await getDocs(collection(db, 'events'));
            const list: Event[] = [];
            snap.forEach(docSnap => {
                list.push({ id: docSnap.id, ...(docSnap.data() as any) });
            });
            setEvents(list);
        } catch (e) {
            console.log('Error cargando eventos', e);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadEvents();
    }, []);

    return (
        <EventsContext.Provider value={{ events, loading, reload: loadEvents }}>
            {children}
        </EventsContext.Provider>
    );
};

export const useEvents = () => useContext(EventsContext);