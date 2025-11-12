// app/screens/Home.tsx
import { View, Text, Button, TextInput, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import React, { useState, useEffect } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { FIREBASE_AUTH, FIREBASE_DB } from '../../FirebaseConfig';
import { InsideStackParamList } from '../../App';
import { collection, addDoc, onSnapshot, query, where, deleteDoc, doc, serverTimestamp } from 'firebase/firestore';
import { Ionicons } from '@expo/vector-icons';

// Tipe data untuk catatan kita
interface Note {
  id: string;
  title: string;
  userId: string;
  // Pastikan 'content' ada jika Anda menggunakannya di Details
  // Jika tidak, hapus 'content' dari mana-mana
}

type HomeProps = NativeStackScreenProps<InsideStackParamList, 'home'>;

const Home = ({ navigation }: HomeProps) => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [newNote, setNewNote] = useState('');
  const [loading, setLoading] = useState(true);

  const userId = FIREBASE_AUTH.currentUser?.uid;
  const db = FIREBASE_DB;

  // --- (LOGIKA FIREBASE TIDAK DIUBAH) ---
  useEffect(() => {
    if (!userId) return;
    setLoading(true);
    const notesCollectionRef = collection(db, 'notes');
    const q = query(notesCollectionRef, where('userId', '==', userId));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const userNotes: Note[] = [];
      snapshot.forEach((doc) => {
        userNotes.push({ id: doc.id, ...doc.data() } as Note);
      });
      setNotes(userNotes);
      setLoading(false);
    });
    return () => unsubscribe();
  }, [userId]);

  const addNote = async () => {
    if (newNote.trim() === '' || !userId) return;
    try {
      await addDoc(collection(db, 'notes'), {
        title: newNote,
        userId: userId,
        createdAt: serverTimestamp(),
      });
      setNewNote('');
    } catch (error) {
      console.error("Error adding document: ", error);
      alert('Gagal menambah catatan');
    }
  };
  
  const deleteNote = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'notes', id));
    } catch (error) {
      console.error("Error deleting document: ", error);
      alert('Gagal menghapus catatan');
    }
  };
  // --- (AKHIR LOGIKA FIREBASE) ---


  // --- Tampilan Item Catatan (diberi style) ---
  const renderNote = ({ item }: { item: Note }) => (
    <TouchableOpacity 
      style={styles.noteItem}
      onPress={() => navigation.navigate('detail', { noteId: item.id })}
    >
      <Text style={styles.noteTitle}>{item.title}</Text>
      <TouchableOpacity onPress={() => deleteNote(item.id)} style={styles.deleteButton}>
        <Ionicons name="trash-bin" size={24} color="#C70039" />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  // --- Header untuk FlatList (Form Pindah ke Sini) ---
  const ListHeader = (
    <View style={styles.inputContainer}>
      <Text style={styles.headerTitle}>Catatan Saya</Text>
      <TextInput
        style={styles.input}
        placeholder="Tulis catatan baru..."
        value={newNote}
        onChangeText={setNewNote}
      />
      <Button title="Tambah Catatan" onPress={addNote} />
    </View>
  );

  return (
    <View style={styles.container}>
      {loading && notes.length === 0 ? (
        <ActivityIndicator size="large" color="#0000ff" style={{ flex: 1 }} />
      ) : (
        <FlatList
          data={notes}
          renderItem={renderNote}
          keyExtractor={(item) => item.id}
          ListHeaderComponent={ListHeader} // Form sebagai header
          ListEmptyComponent={
            <Text style={styles.emptyText}>Belum ada catatan.</Text>
          }
          contentContainerStyle={{ paddingBottom: 100 }}
        />
      )}

      <View style={styles.footerButtons}>
        <Button onPress={() => FIREBASE_AUTH.signOut()} title="Logout" color="#C70039" />
      </View>
    </View>
  );
};

export default Home;

// --- STYLING AMAN (HANYA LAYOUT & WARNA) ---
const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#F5F5F5', // Latar belakang abu-abu
  },
  inputContainer: { 
    padding: 16, 
    backgroundColor: '#FFFFFF', 
    borderBottomWidth: 1, 
    borderColor: '#E0E0E0', // Garis batas lebih lembut
    marginBottom: 10,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  input: { 
    borderWidth: 1, 
    borderColor: '#DDDDDD', 
    padding: 10, 
    borderRadius: 8, 
    marginBottom: 10,
    backgroundColor: '#FFFFFF',
    fontSize: 16,
  },
  noteItem: { 
    backgroundColor: '#FFFFFF', 
    padding: 16, 
    borderRadius: 8, 
    marginVertical: 8, 
    marginHorizontal: 16, 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    borderWidth: 1, // Mengganti 'elevation' dengan 'borderWidth'
    borderColor: '#E0E0E0',
  },
  noteTitle: { 
    fontSize: 18, 
    fontWeight: '600',
    color: '#333',
    flex: 1, 
    marginRight: 10,
  },
  deleteButton: {
    padding: 5,
  },
  emptyText: { 
    textAlign: 'center', 
    marginTop: 40, 
    fontStyle: 'italic', 
    color: '#888',
    fontSize: 16,
  },
  footerButtons: { 
    padding: 16, 
    borderTopWidth: 1, 
    borderColor: '#E0E0E0', 
    backgroundColor: '#FFFFFF',
  }
});