// app/screens/Details.tsx
import { View, Text, TextInput, Button, StyleSheet, ActivityIndicator } from 'react-native';
import React, { useState, useEffect } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { FIREBASE_DB } from '../../FirebaseConfig';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { InsideStackParamList } from '../../App';

type DetailsProps = NativeStackScreenProps<InsideStackParamList, 'detail'>;

const Details = ({ navigation, route }: DetailsProps) => {
  const { noteId } = route.params; 
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);
  const db = FIREBASE_DB;

  // --- (LOGIKA FIREBASE TIDAK DIUBAH) ---
  useEffect(() => {
    const fetchNote = async () => {
      try {
        const docSnap = await getDoc(doc(db, 'notes', noteId));
        if (docSnap.exists()) {
          const noteData = docSnap.data();
          setTitle(noteData.title);
          setContent(noteData.content || ''); // Ambil content, atau string kosong
        } else {
          alert('Catatan tidak ditemukan.');
          navigation.goBack();
        }
      } catch (error) {
        alert('Gagal memuat catatan.');
      } finally {
        setLoading(false);
      }
    };
    fetchNote();
  }, [noteId]);

  const updateNote = async () => {
    if (title.trim() === '') {
      alert('Judul tidak boleh kosong.');
      return;
    }
    setLoading(true);
    try {
      const noteRef = doc(db, 'notes', noteId);
      await updateDoc(noteRef, {
        title: title,
        content: content // Simpan content
      });
      alert('Catatan berhasil diperbarui!');
      navigation.goBack();
    } catch (error) {
      alert('Gagal memperbarui catatan.');
    } finally {
      setLoading(false);
    }
  };
  // --- (AKHIR LOGIKA FIREBASE) ---

  if (loading && !title) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Edit Catatan</Text>
      <TextInput
        style={styles.inputTitle}
        placeholder="Judul Catatan"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={styles.inputContent}
        placeholder="Isi catatan..."
        value={content}
        onChangeText={setContent}
        multiline
      />
      {loading ? (
         <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <Button title="Update Catatan" onPress={updateNote} />
      )}
    </View>
  );
};

export default Details;

// --- STYLING AMAN (HANYA LAYOUT & WARNA) ---
const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 16, 
    backgroundColor: '#FFFFFF', // Latar belakang putih
  },
  header: { 
    fontSize: 22, 
    fontWeight: 'bold', 
    marginBottom: 16,
    color: '#333',
  },
  inputTitle: {
    borderWidth: 1, 
    borderColor: '#DDDDDD', 
    padding: 10, 
    borderRadius: 8,
    backgroundColor: '#F9F9F9', 
    marginBottom: 10, 
    fontSize: 18,
  },
  inputContent: {
    borderWidth: 1, 
    borderColor: '#DDDDDD', 
    padding: 10, 
    borderRadius: 8,
    backgroundColor: '#F9F9F9', 
    minHeight: 200, // Area ketik lebih besar
    textAlignVertical: 'top', // Mulai ketik dari atas (Android)
    marginBottom: 20, 
    fontSize: 16,
  },
});