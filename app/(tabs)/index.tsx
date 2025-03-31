import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context'; 
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useUser } from '@/context/UserContextProvider';
import { useEffect } from 'react';

const workoutHistory = [
  { id: '1', date: 'Mar 28, 2025', type: 'Running', duration: '30 min' },
  { id: '2', date: 'Mar 27, 2025', type: 'Cycling', duration: '45 min' },
  { id: '3', date: 'Mar 26, 2025', type: 'Yoga', duration: '60 min' },
];

export default function DashboardScreen() {
  const router = useRouter();
  const { user } = useUser();

  useEffect(() => {
    if (user?.login == false) {
      router.push("/signin")
    }
  }, []);
  
  return (
    <ImageBackground
      source={require("../../assets/images/fitness-images/dashboard.jpg")}
      style={styles.container}
      imageStyle={{ opacity: 0.8 }}
    >
      <View style={styles.content}>     
        <SafeAreaView>
          <View style={styles.header}>
            <Text style={styles.welcomeText}>Welcome, {user.firstName}! 🎉</Text>
            <TouchableOpacity style={styles.profileIcon} onPress={() => router.push('/profile')}>
              <Text style={styles.profileText}>{user?.firstName?.charAt(0).toUpperCase()}</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.statsContainer}>
            <View style={styles.statCard}>
              <Ionicons name="footsteps" size={30} color="#FF5722" />
              <Text style={styles.statValue}>10,000</Text>
              <Text style={styles.statLabel}>Steps Today</Text>
            </View>
            <View style={styles.statCard}>
              <Ionicons name="flame" size={30} color="#FF5722" />
              <Text style={styles.statValue}>500</Text>
              <Text style={styles.statLabel}>Calories Burned</Text>
            </View>
            <View style={styles.statCard}>
              <Ionicons name="timer" size={30} color="#FF5722" />
              <Text style={styles.statValue}>1hr 30min</Text>
              <Text style={styles.statLabel}>Active Time</Text>
            </View>
          </View>
      
          
          <Text style={styles.sectionTitle}>Workout History</Text>
          <FlatList
            data={workoutHistory}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.historyCard}>
                <Text style={styles.historyDate}>{item.date}</Text>
                <Text style={styles.historyType}>{item.type}</Text>
                <Text style={styles.historyDuration}>{item.duration}</Text>
              </View>
            )}
          />
              
              <TouchableOpacity style={styles.trackButton}>
            <Text style={styles.trackButtonText}>Track Workout</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.exploreButton}>
            <Text style={styles.exploreButtonText}>Explore More</Text>
          </TouchableOpacity>
        </SafeAreaView>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "rgba(0, 0, 0, 0.2)",
  },
  content: {
    width: "100%",
    height: "100%",
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  profileIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#FF5722',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  statCard: {
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    width: '30%',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  trackButton: {
    backgroundColor: '#FF5722',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  trackButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  exploreButton: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  exploreButtonText: {
    color: '#FF5722',
    fontSize: 18,
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 20,
    marginBottom: 10,
  },
  historyCard: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  historyDate: {
    fontSize: 14,
    color: '#777',
  },
  historyType: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  historyDuration: {
    fontSize: 14,
    color: '#FF5722',
  },
});
