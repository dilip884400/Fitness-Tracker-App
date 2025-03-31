import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  Image,
  StyleSheet,
} from "react-native";
import Toast from "react-native-toast-message";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const generateOTP = () => {
    return Math.floor(1000 + Math.random() * 9000);
  };

  const sendOTP = async () => {
    if (!email) {
      Toast.show({
        type: "error",
        text1: "Please enter your email",
        position: "top",
      });
      return;
    }

    setLoading(true);

    try {
      const usersData = await AsyncStorage.getItem("users");
      const users = usersData ? JSON.parse(usersData) : [];
      const userExists = users.some((user:any) => user.email === email);

      if (!userExists) {
        setLoading(false);
        Toast.show({
          type: "error",
          text1: "Entered email is not registered",
          position: "top",
        });
        return;
      }

      const otp = generateOTP();
      const response = await fetch(
        "https://nodeotpsender-1.onrender.com/send-otp",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, otp }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        Toast.show({
          type: "success",
          text1: "OTP sent to your email",
          position: "top",
        });
        router.push({
          pathname: `/verify-otp`,
          params: { otp, email },
        });
      } else {
        Toast.show({
          type: "error",
          text1: data.message || "Failed to send OTP",
          position: "top",
        });
      }
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Something went wrong. Please try again later.",
        position: "top",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/images/fitness-images/login-image.jpg")}
        style={styles.backgroundImage}
      />
      <View style={styles.overlay}>
        <Text style={styles.title}>Forgot Password</Text>
        <Text style={styles.label}>Enter your registered email to send OTP</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your email"
          placeholderTextColor="#888"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />
        <TouchableOpacity style={styles.button} onPress={sendOTP} disabled={loading}>
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Send OTP</Text>
          )}
        </TouchableOpacity>
        <Toast />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  backgroundImage: {
    position: "absolute",
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  overlay: {
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    padding: 20,
    borderRadius: 10,
    width: "90%",
    alignItems: "center",
    opacity: 0.9,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: "#333",
    marginBottom: 10,
  },
  input: {
    backgroundColor: "#f5f5f5",
    padding: 12,
    borderRadius: 10,
    marginBottom: 15,
    fontSize: 16,
    width: "100%",
  },
  button: {
    backgroundColor: "#FF5722",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
    width: "100%",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default ForgotPassword;