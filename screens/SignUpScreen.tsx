import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Alert } from 'react-native';
import supabase from '../supabaseClient';
import { useNavigation } from '@react-navigation/native';

const SignUpScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');

  const handleSignUp = async () => {
    if (!email || !password || !username) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { username }, // Custom user data
      },
    });

    if (error) {
      Alert.alert('Sign-Up Error', error.message);
    } else {
      Alert.alert('Success', 'Check your email to confirm your account!');
      navigation.navigate('SignInScreen');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={handleSignUp}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('SignInScreen')}>
        <Text style={styles.switchText}>Already have an account? Sign In</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  title: { fontSize: 24, marginBottom: 20, textAlign: 'center' },
  input: { borderBottomWidth: 1, marginBottom: 15, padding: 10 },
  button: { backgroundColor: '#ff6347', padding: 15, borderRadius: 5 },
  buttonText: { textAlign: 'center', color: '#fff', fontWeight: 'bold' },
  switchText: { marginTop: 10, textAlign: 'center', color: '#007bff' },
});

export default SignUpScreen;
