import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button, Surface, Text } from 'react-native-paper';
import { router } from 'expo-router';
import { authService } from '../../src/services/auth';

export default function ForgotPasswordScreen() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleForgotPassword = async () => {
    if (!email) {
      setError('Please enter your email');
      return;
    }

    try {
      setLoading(true);
      setError('');
      const response = await authService.forgotPassword(email);
      setSuccess('Reset code has been sent to your email');
      router.push({
        pathname: '/reset-password',
        params: { email }
      });
    } catch (error) {
      setError(error.toString());
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Surface style={styles.surface}>
        <Text variant="titleLarge" style={styles.title}>Forgot Password</Text>
        {error ? <Text style={styles.errorText}>{error}</Text> : null}
        {success ? <Text style={styles.successText}>{success}</Text> : null}
        <TextInput
          label="Email"
          value={email}
          onChangeText={setEmail}
          mode="outlined"
          keyboardType="email-address"
          autoCapitalize="none"
          style={styles.input}
        />
        <Button 
          mode="contained" 
          onPress={handleForgotPassword}
          loading={loading}
          style={styles.button}
        >
          Send Reset Code
        </Button>
        <Button 
          mode="text" 
          onPress={() => router.back()}
        >
          Back to Login
        </Button>
      </Surface>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
  },
  surface: {
    padding: 16,
    borderRadius: 8,
    elevation: 4,
  },
  title: {
    textAlign: 'center',
    marginBottom: 16,
  },
  input: {
    marginBottom: 12,
  },
  button: {
    marginTop: 8,
    marginBottom: 16,
  },
  errorText: {
    color: 'red',
    marginBottom: 12,
    textAlign: 'center',
  },
  successText: {
    color: 'green',
    marginBottom: 12,
    textAlign: 'center',
  }
});