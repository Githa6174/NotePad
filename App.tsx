import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator, NativeStackScreenProps } from '@react-navigation/native-stack'; // Tambahkan import
import Login from './app/screens/Login';
import Home from './app/screens/Home';
import Details from './app/screens/Details';
import { useEffect, useState } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { FIREBASE_AUTH } from './FirebaseConfig';

// --- INI ADALAH "PETA RUTE" ---
// Definisikan parameter untuk setiap layar
export type InsideStackParamList = {
  home: undefined; // Halaman 'home' tidak menerima parameter
  detail: { noteId: string }; // Halaman 'detail' WAJIB menerima 'noteId'
};

export type AuthStackParamList = {
  Login: undefined;
  Home: { screen: keyof InsideStackParamList }; // Tentukan bahwa 'Home' adalah navigator
};
// --- SELESAI ---


// Tumpukan (Stack) utama untuk Auth
// KOREKSI: Gunakan AuthStackParamList
const Stack = createNativeStackNavigator<AuthStackParamList>();

// Tumpukan (Stack) terpisah untuk bagian dalam aplikasi
// KOREKSI: Gunakan InsideStackParamList
const InsideStack = createNativeStackNavigator<InsideStackParamList>();

// Komponen grup untuk layar di dalam aplikasi
const InsideStackScreen = () => {
  return (
    <InsideStack.Navigator>
      <InsideStack.Screen name="home" component={Home} /> 
      {/* ERROR Anda akan hilang dari baris ini */}
      <InsideStack.Screen name="detail" component={Details} /> 
    </InsideStack.Navigator>
  );
}

export default function App() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, (user) => {
      console.log('user', user);
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  return (
    <NavigationContainer>
      {/* KOREKSI: initialRouteName harus 'Login' (sesuai nama di Stack) */}
      <Stack.Navigator initialRouteName="Login">
        {user ? (
          <Stack.Screen name='Home' component={InsideStackScreen} options={{ headerShown: false }} />
        ) : (
          <Stack.Screen name='Login' component={Login} options={{ headerShown: false }} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}