import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { StyleSheet, ImageBackground, View, Text, TextInput, Pressable, Alert, Platform, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import { useUser } from '@/context/UserContextProvider';

export default function SignupScreen() {
    const router = useRouter();
      const { user } = useUser();
    
    const [form, setForm] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        dob: new Date(),
        gender: ''
    });
    const [showPicker, setShowPicker] = useState(false);

     useEffect(() => {
        if (user?.login) {
          router.push("/(tabs)");
        }
      }, []);

    const handleChange = (name: string, value: any) => {
        setForm({ ...form, [name]: value });
    };

    const validateAndSubmit = async () => {
        if (!form.firstName || !form.lastName || !form.email || !form.password || !form.dob || !form.gender) {
            Toast.show({
                type: 'error',
                text1: 'All fields are required.',
                position: 'top',
            });
            return;
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
            Toast.show({
                type: 'error',
                text1: 'Invalid Email',
                position: 'top',
            });
            return;
        }

        if (form.password.length < 6) {
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

            if (users.some((user: any) => user.email === form.email)) {
                Toast.show({
                    type: 'error',
                    text1: 'Email already exists!',
                    text2: 'Try logging in instead.',
                    position: 'top',
                });
                return;
            }

            users.push(form);

            await AsyncStorage.setItem('users', JSON.stringify(users));

            Toast.show({
                type: 'success',
                text1: 'Signup Successful!',
                text2: 'Redirecting to login...',
                position: 'top',
            });

            setTimeout(() => router.push('/signin'), 1000);
        } catch (error) {
            Alert.alert('Error', 'Something went wrong while saving data.');
        }
    };

    return (
        <ImageBackground source={require('../assets/images/fitness-images/login-image.jpg')} style={styles.background}>
            <SafeAreaView style={styles.container}>
                <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
                    <View style={styles.content}>
                        <Text style={styles.title}>Create Account</Text>
                        <Text style={styles.subtitle}>Sign up to start your fitness journey</Text>

                        <TextInput placeholder="First Name" style={styles.input} onChangeText={(value) => handleChange('firstName', value)} />
                        <TextInput placeholder="Last Name" style={styles.input} onChangeText={(value) => handleChange('lastName', value)} />
                        <TextInput placeholder="Email" style={styles.input} keyboardType="email-address" onChangeText={(value) => handleChange('email', value)} />
                        <TextInput placeholder="Password" style={styles.input} secureTextEntry onChangeText={(value) => handleChange('password', value)} />

                        <Pressable style={styles.input} onPress={() => setShowPicker(true)}>
                            <Text>{form.dob.toDateString()}</Text>
                        </Pressable>

                        {showPicker && (
                            <DateTimePicker
                                value={form.dob}
                                mode="date"
                                display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                                onChange={(event, date) => {
                                    setShowPicker(false);
                                    if (date) {
                                        handleChange('dob', date);
                                    }
                                }}
                            />
                        )}

                        <View style={styles.pickerContainer}>
                            <Picker
                                selectedValue={form.gender}
                                style={styles.picker}
                                onValueChange={(value) => handleChange('gender', value)}
                            >
                                <Picker.Item label="Select Gender" value="" />
                                <Picker.Item label="Male" value="male" />
                                <Picker.Item label="Female" value="female" />
                                <Picker.Item label="Other" value="other" />
                            </Picker>
                        </View>

                        <Button mode="contained" style={styles.signupButton} onPress={validateAndSubmit}>
                            Sign Up
                        </Button>

                        <View style={styles.loginContainer}>
                            <Text style={styles.loginText}>Already have an account?</Text>
                            <Pressable onPress={() => router.push('/signin')}> 
                                <Text style={styles.loginLink}> Login</Text>
                            </Pressable>
                        </View>
                    </View>
                </ScrollView>
                <Toast />
            </SafeAreaView>
        </ImageBackground>
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
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        padding: 20,
        borderRadius: 15,
        width: '90%',
        alignItems: 'center',
        opacity: 0.8
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
    pickerContainer: {
        backgroundColor: '#f5f5f5',
        borderRadius: 10,
        marginBottom: 15,
        width: '100%',
    },
    picker: {
        height: 50,
        width: '100%',
    },
    signupButton: {
        backgroundColor: '#FF5722',
        padding: 10,
        borderRadius: 10,
        marginBottom: 20,
        width: '100%',
    },
    loginContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    loginText: {
        fontSize: 16,
        color: '#666',
    },
    loginLink: {
        fontSize: 16,
        color: '#FF5722',
        fontWeight: 'bold',
    },
});
