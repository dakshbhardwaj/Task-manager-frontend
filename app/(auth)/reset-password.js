import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button, Surface, Text } from 'react-native-paper';
import { router, useLocalSearchParams } from 'expo-router';
import { authService } from '../../src/services/auth';

export default function ResetPasswordScreen() {
  const { email } = useLocalSearchParams();
  const [resetCode, setResetCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleResetPassword = async () => {
    if (!resetCode || !newPassword || !confirmPassword) {
      setError('Please fill in all fields');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      setLoading(true);
      setError('');
      await authService.resetPassword(email, resetCode, newPassword);
      alert('Password reset successful');
      router.replace('/login');
    } catch (error) {
      setError(error.toString());
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Surface style={styles.surface}>
        <Text variant="titleLarge" style={styles.title}>Reset Password</Text>
        {error ? <Text style={styles.errorText}>{error}</Text> : null}
        <TextInput
          label="Reset Code"
          value={resetCode}
          onChangeText={setResetCode}
          mode="outlined"
          keyboardType="number-pad"
          style={styles.input}
        />
        <TextInput
          label="New Password"
          value={newPassword}
          onChangeText={setNewPassword}
          mode="outlined"
          secureTextEntry
          style={styles.input}
        />
        <TextInput
          label="Confirm Password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          mode="outlined"
          secureTextEntry
          style={styles.input}
        />
        <Button 
          mode="contained" 
          onPress={handleResetPassword}
          loading={loading}
          style={styles.button}
        >
          Reset Password
        </Button>
        <Button 
          mode="text" 
          onPress={() => router.push('/login')}
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
  }
});