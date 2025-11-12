// app/screens/Login.tsx
import { View, Text, StyleSheet, TextInput, ActivityIndicator, Button } from 'react-native';
import React, { useState } from 'react';
import { FIREBASE_AUTH } from '../../FirebaseConfig'; 
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';

// Komponen Logo Sederhana (Aman)
const AppLogo = () => (
  <View style={styles.logoContainer}>
    <Text style={styles.logoText}>NP</Text>
  </View>
);

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const auth = FIREBASE_AUTH;

  // --- (Fungsi signIn dan signUp TIDAK DIUBAH) ---
  const signIn = async () => {
    if (email === '' || password === '') {
      alert('Email dan Password tidak boleh kosong.');
      return; 
    }
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error: any) {
      alert('Error logging in: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const signUp = async () => {
    if (email === '' || password === '') {
      alert('Email dan Password tidak boleh kosong.');
      return; 
    }
    setLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert('User registered successfully');
    } catch (error: any) {
      alert('Register failed: ' + error.message);
    } finally {
      setLoading(false);
    }
  };
  // --- (AKHIR FUNGSI TIDAK DIUBAH) ---

  return (
    <View style={styles.container}>
      <AppLogo />
      <Text style={styles.title}>Selamat Datang</Text>
      
      <TextInput
        value={email}
        style={styles.input}
        placeholder='Email'
        autoCapitalize='none'
        keyboardType='email-address'
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        value={password}
        style={styles.input}
        placeholder='Password'
        autoCapitalize='none'
        onChangeText={(text) => setPassword(text)}
        secureTextEntry
      />

      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" style={{ marginVertical: 20 }}/>
      ) : (
        // Bungkus tombol dalam View agar rapi
        <View style={styles.buttonContainer}>
          <Button title='Login' onPress={signIn} />
          {/* Beri jarak antar tombol */}
          <View style={{ height: 10 }} /> 
          <Button title='Create Account' onPress={signUp} />
        </View>
      )}
    </View>
  );
};

export default Login;

// --- STYLING AMAN (HANYA LAYOUT & WARNA) ---
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF', // Latar belakang putih bersih
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20, // Beri jarak dari pinggir layar
  },
  logoContainer: {
    width: 80,
    height: 80,
    borderRadius: 40, // Membuat lingkaran
    backgroundColor: '#EFEFEF', // Abu-abu muda
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  logoText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#555',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 30, // Jarak di bawah judul
  },
  input: {
    width: '100%', // Lebar penuh
    height: 50,
    borderWidth: 1,
    borderColor: '#DDDDDD', // Garis batas abu-abu
    marginBottom: 15,
    paddingHorizontal: 15,
    borderRadius: 8, // Sudut sedikit melengkung
    fontSize: 16,
    backgroundColor: '#F9F9F9', // Latar input sedikit abu-abu
  },
  buttonContainer: {
    width: '100%', // Lebar penuh
  },
});