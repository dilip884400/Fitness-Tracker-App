import { useUser } from "@/context/UserContextProvider";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import {
  StyleSheet,
  ImageBackground,
  View,
  Text,
  Pressable,
  SafeAreaView,
} from "react-native";

export default function WelcomeScreen() {
  const router = useRouter();

  const { user } = useUser();

  useEffect(() => {
    if (user?.login) {
      router.push("/(tabs)");
    }
  }, []);

  return (
    <ImageBackground
      source={require("../assets/images/fitness-images/jumping-girl.jpg")}
      style={styles.background}
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.title}>Welcome to Fitness Tracker</Text>
          <Text style={styles.subtitle}>
            Track your fitness journey with us
          </Text>
        </View>
        <Pressable
          onPress={() => router.push("/signup")}
          style={styles.getStartedButton}
        >
          <Text style={styles.getStartedText}>Get Started</Text>
        </Pressable>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 50,
  },
  container: {
    flex: 1,
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    color: "white",
    textShadowColor: "rgba(0, 0, 0, 0.7)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 5,
  },
  subtitle: {
    fontSize: 18,
    color: "white",
    textAlign: "center",
    marginTop: 10,
    textShadowColor: "rgba(0, 0, 0, 0.5)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 5,
  },
  getStartedButton: {
    backgroundColor: "#FF5722",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginBottom: 30,
  },
  getStartedText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
