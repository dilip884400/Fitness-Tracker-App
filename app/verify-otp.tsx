import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useLocalSearchParams, useRouter } from 'expo-router';
import OTPInput from 'react-native-otp-textinput';
import Toast from 'react-native-toast-message';

const VerifyOtp = () => {
    const [otp, setOtp] = useState('');
    const [showReset, setShowReset] = useState(false);
    const [newPassword, setNewPassword] = useState('');
    const { otp: expectedOtp, email } = useLocalSearchParams();
    const router = useRouter();

    useEffect(() => {
        console.log('Received OTP:', expectedOtp);
    }, []);

    const verifyOTP = async () => {
        if (otp.length !== 4) {
            Toast.show({ type: 'error', text1: 'Please enter a valid 4-digit OTP', position: 'top' });
            return;
        }
        if (otp === expectedOtp) {
            const usersData = await AsyncStorage.getItem('users');
            const users = usersData ? JSON.parse(usersData) : [];
            const userExists = users.some((user: any) => user.email === email);

            if (!userExists) {
                Toast.show({ type: 'error', text1: 'User does not exist. Please create an account.', position: 'top' });
                return;
            }

            Toast.show({ type: 'success', text1: 'OTP Verified Successfully', position: 'top' });
            setShowReset(true);
        } else {
            Toast.show({ type: 'error', text1: 'Invalid OTP. Please try again.', position: 'top' });
        }
    };

    const resetPassword = async () => {
        if (!newPassword) {
            Toast.show({ type: 'error', text1: 'Please enter a new password', position: 'top' });
            return;
        }
        const usersData = await AsyncStorage.getItem('users');
        let users = usersData ? JSON.parse(usersData) : [];
        users = users.map((user: any) => user.email === email ? { ...user, password: newPassword } : user);
        await AsyncStorage.setItem('users', JSON.stringify(users));
        Toast.show({ type: 'success', text1: 'Password changed successfully', position: 'top' });
        setTimeout(() => router.push('/signin'), 2000);
    };

    return (
        <View style={styles.container}>
            <Image source={require('../assets/images/fitness-images/login-image.jpg')} style={styles.backgroundImage} />
            <Toast />
            <View style={styles.overlay}>
                {!showReset ? (
                    <>
                        <Text style={styles.title}>Verify OTP</Text>
                        <Text style={styles.label}>Enter the OTP sent to your email</Text>
                        <OTPInput
                            inputCount={4}
                            handleTextChange={setOtp}
                            tintColor="#FF5722"
                            offTintColor="#ccc"
                            containerStyle={styles.otpContainer}
                            textInputStyle={styles.otpInput}
                        />
                        <TouchableOpacity style={styles.button} onPress={verifyOTP}>
                            <Text style={styles.buttonText}>Verify OTP</Text>
                        </TouchableOpacity>
                    </>
                ) : (
                    <View style={styles.resetContainer}>
                        <Text style={styles.label}>Enter New Password</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="New Password"
                            secureTextEntry
                            value={newPassword}
                            onChangeText={setNewPassword}
                        />
                        <TouchableOpacity style={styles.button} onPress={resetPassword}>
                            <Text style={styles.buttonText}>Reset Password</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    backgroundImage: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    overlay: {
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        padding: 20,
        borderRadius: 10,
        width: '90%',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    label: {
        fontSize: 16,
        color: '#333',
        marginBottom: 10,
    },
    otpContainer: {
        marginBottom: 20,
    },
    otpInput: {
        backgroundColor: '#f5f5f5',
        borderRadius: 10,
        fontSize: 20,
        textAlign: 'center',
        color: '#000',
        borderWidth: 1,
        borderColor: '#FF5722',
    },
    button: {
        backgroundColor: '#FF5722',
        padding: 12,
        borderRadius: 10,
        alignItems: 'center',
        width: '100%',
        marginTop: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    resetContainer: {
        marginTop: 20,
        width: '100%',
        alignItems: 'center',
    },
    input: {
        backgroundColor: '#f5f5f5',
        padding: 12,
        borderRadius: 10,
        fontSize: 16,
        width: '100%',
        marginBottom: 10,
    },
});

export default VerifyOtp;
