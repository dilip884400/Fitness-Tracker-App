import { useRouter } from 'expo-router';
import { useState, useEffect } from 'react';
import {
  StyleSheet,
  ImageBackground,
  View,
  Text,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import { Ionicons } from '@expo/vector-icons';
import { useUser } from '@/context/UserContextProvider';

export default function LoginScreen() {
  const { user, setUser } = useUser();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);



  useEffect(() => {
    if (user?.login == true) {
      router.push("/(tabs)");
    }
    Toast.hide();
  }, []);

  const handleLogin = async () => {
    if (!email || !password) {
      Toast.show({
        type: 'error',
        text1: 'All fields are required.',
        position: 'top',
      });
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      Toast.show({
        type: 'error',
        text1: 'Invalid Email',
        position: 'top',
      });
      return;
    }

    if (password.length < 6) {
      Toast.show({
        type: 'error',
        text1: 'Password must be at least 6 characters long.',
        position: 'top',
      });
      return;
    }

    try {
      const existingUsers = await AsyncStorage.getItem('users');
      let users = existingUsers ? JSON.parse(existingUsers) : [];

      const foundUser = users.find((u: any) => u.email === email);

      if (!foundUser) {
        Toast.show({
          type: 'error',
          text1: 'User does not exist!',
          position: 'top',
        });
        return;
      }

      if (foundUser.password !== password) {
        Toast.show({
          type: 'error',
          text1: 'Incorrect Password!',
          position: 'top',
        });
        return;
      }

      const loggedInUser = { ...foundUser, login: true };
      setUser(loggedInUser);

      Toast.show({
        type: 'success',
        text1: 'Login Successful!',
        position: 'top',
      });

      setTimeout(() => router.push('/(tabs)'), 1000);
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Something Went Wrong!',
        position: 'top',
      });
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <ImageBackground source={require('../assets/images/fitness-images/login-image.jpg')} style={styles.background}>
        <SafeAreaView style={styles.container}>
          <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
            <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
              <View style={styles.content}>
                <Text style={styles.title}>Welcome Back!</Text>
                <Text style={styles.subtitle}>Login to continue your Fitness Tracking</Text>

                <TextInput placeholder="Email" style={styles.input} keyboardType="email-address" onChangeText={setEmail} />

                <View style={styles.passwordContainer}>
                  <TextInput
                    placeholder="Password"
                    style={styles.passwordInput}
                    secureTextEntry={!showPassword}
                    onChangeText={setPassword}
                  />
                  <Pressable onPress={() => setShowPassword(!showPassword)}>
                    <Ionicons name={showPassword ? 'eye-off' : 'eye'} size={24} color="#666" style={styles.eyeIcon} />
                  </Pressable>
                </View>

                <Pressable onPress={() => router.push('/forgot-password')}>
                  <Text style={styles.forgotPassword}>Forgot Password?</Text>
                </Pressable>

                <Button mode="contained" style={styles.loginButton} onPress={handleLogin}>
                  Login
                </Button>

                <View style={styles.signupContainer}>
                  <Text style={styles.signupText}>Don't have an account?</Text>
                  <Pressable onPress={() => router.push('/signup')}>
                    <Text style={styles.signupLink}> Sign Up</Text>
                  </Pressable>
                </View>
              </View>
              <Toast />
            </ScrollView>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </ImageBackground>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    width: '100%',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: 20,
    borderRadius: 15,
    width: '90%',
    alignItems: 'center',
    opacity: 0.9,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#f5f5f5',
    padding: 12,
    borderRadius: 10,
    marginBottom: 15,
    fontSize: 16,
    width: '100%',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    marginBottom: 15,
    width: '100%',
    paddingHorizontal: 10,
  },
  passwordInput: {
    flex: 1,
    padding: 12,
    fontSize: 16,
  },
  eyeIcon: {
    padding: 10,
  },
  forgotPassword: {
    color: '#007BFF',
    textAlign: 'right',
    marginBottom: 20,
  },
  loginButton: {
    backgroundColor: '#FF5722',
    padding: 10,
    borderRadius: 10,
    marginBottom: 20,
    width: '100%',
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  signupText: {
    fontSize: 16,
    color: '#666',
  },
  signupLink: {
    fontSize: 16,
    color: '#FF5722',
    fontWeight: 'bold',
  },
});
