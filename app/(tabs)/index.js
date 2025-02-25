import React, { useState, useCallback } from 'react';
import { View, StyleSheet, RefreshControl, ActivityIndicator } from 'react-native';
import { FAB, List, Surface, Text } from 'react-native-paper';
import { router, useFocusEffect } from 'expo-router';
import { ScrollView } from 'react-native-gesture-handler';
import { useAuth } from '../../src/context/AuthContext';
import { taskService } from '../../src/services/task';

export default function TasksScreen() {
  const { userToken } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTasks = async () => {
    if (!userToken) {
      router.replace('/(auth)/login');
      return;
    }

    try {
      setError(null);
      const tasksData = await taskService.getTasks();
      setTasks(tasksData);
    } catch (error) {
      console.error('Error fetching tasks:', error);
      setError('Failed to load tasks. Please try again.');
      if (error?.response?.status === 401) {
        router.replace('/(auth)/login');
      }
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchTasks();
    setRefreshing(false);
  }, [userToken]);

  useFocusEffect(
    useCallback(() => {
      fetchTasks();
    }, [userToken])
  );

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centerContainer}>
        <Text>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {tasks.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text>No tasks found. Create one by tapping the + button.</Text>
          </View>
        ) : (
          tasks.map((task) => (
            <Surface key={task._id} style={styles.taskItem}>
              <List.Item
                title={task.title}
                description={task.description}
                onPress={() => router.push(`/task/${task._id}`)}
              />
            </Surface>
          ))
        )}
      </ScrollView>
      <FAB
        icon="plus"
        style={styles.fab}
        onPress={() => router.push('/task/new')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyContainer: {
    padding: 16,
    alignItems: 'center',
  },
  taskItem: {
    marginHorizontal: 16,
    marginVertical: 4,
    elevation: 2,
    borderRadius: 8,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});