import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Surface, Text } from 'react-native-paper';
import { useAuth } from '../../src/context/AuthContext';

export default function ProfileScreen() {
  const { logout } = useAuth();

  return (
    <View style={styles.container}>
      <Surface style={styles.surface}>
        <Text style={styles.title}>Profile</Text>
        <Button 
          mode="contained" 
          onPress={logout}
          style={styles.button}
        >
          Logout
        </Button>
      </Surface>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  surface: {
    padding: 16,
    borderRadius: 8,
    elevation: 4,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
  },
  button: {
    marginTop: 8,
  },
});