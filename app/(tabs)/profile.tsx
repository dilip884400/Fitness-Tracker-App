import { useUser } from '@/context/UserContextProvider';
import { View, Text, StyleSheet, TouchableOpacity, Image, ImageBackground } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import { useEffect } from 'react';

export default function ProfileScreen() {
  const { user, setUser } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (user?.login == false) {
      router.push("/signin")
    }
  }, [user]);

  const formatDate = (dateString: string) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('loggedInUser');
      setUser({
        id: "",
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        dob: "",
        gender: "",
        login: false
      });
      await AsyncStorage.removeItem('loginPerson');


      Toast.show({
        type: 'success',
        text1: 'Logged out successfully!',
        position: 'top',
      });

      setTimeout(() => {
        router.push('/signin');
      }, 1000);
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Logout failed!',
        position: 'top',
      });
    }
  };

  return (
    <ImageBackground
      source={require("../../assets/images/fitness-images/dashboard.jpg")}
      style={styles.container}
      imageStyle={{ opacity: 0.8 }}
    >
      <SafeAreaView style={styles.content}>
        <View style={styles.profileContainer}>
          <Image source={require("../../assets/images/fitness-images/profile.jpg")} style={styles.avatar} />
          <Text style={styles.name}>{user.firstName}</Text>
          <Text style={styles.info}>{user.email}</Text>
          <Text style={styles.info}>{formatDate(user.dob)}</Text>
          <Text style={styles.info}>{user.gender}</Text>
        </View>

        <View style={styles.actionsContainer}>
          <TouchableOpacity style={styles.editButton}>
            <Text style={styles.editButtonText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  profileContainer: {
    alignItems: 'center',
    backgroundColor: 'rgba(252, 252, 252, 0.47)',
    padding: 20,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.8,
    shadowRadius: 5,
    elevation: 5,
    width: 270,
  },
  avatar: {
    width: 140,
    height: 140,
    borderRadius: 70,
    borderWidth: 3,
    borderColor: '#fff',
    marginBottom: 10,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
  },
  info: {
    fontSize: 16,
    color: '#000',
    fontWeight: '500',
    marginTop: 4,
  },
  actionsContainer: {
    marginTop: 20,
  },
  editButton: {
    borderColor: '#fff',
    borderWidth: 1, padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  editButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  logoutButton: {
    backgroundColor: '#FF5722',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 40,
    width: '50%',
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

