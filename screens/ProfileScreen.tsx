import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import supabase from '../supabaseClient'
import { useNavigation } from '@react-navigation/native';
const ProfileScreen = () => {
  const [user, setUser] = useState<any>(null);
    const navigation= useNavigation();
  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
    };
    fetchUser();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    Alert.alert('Logged Out', 'You have successfully logged out.');
    navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>
      {user ? (
        <>
          <Text style={styles.info}>Email: {user.email}</Text>
          <TouchableOpacity style={styles.button} onPress={handleLogout}>
            <Text style={styles.buttonText}>Logout</Text>
          </TouchableOpacity>
        </>
      ) : (
        <Text style={styles.info}>No user data available.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  info: { fontSize: 18, marginBottom: 15 },
  button: { backgroundColor: '#ff6347', padding: 15, borderRadius: 5 },
  buttonText: { textAlign: 'center', color: '#fff', fontWeight: 'bold' },
});

export default ProfileScreen;
