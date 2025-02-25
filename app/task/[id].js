import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button, Surface, Text, IconButton } from 'react-native-paper';
import { router, useLocalSearchParams } from 'expo-router';
import { taskService } from '../../src/services/task';

export default function TaskDetailScreen() {
  const { id } = useLocalSearchParams();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [saveLoading, setSaveLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (id !== 'new') {
      fetchTask();
    }
  }, [id]);

  const fetchTask = async () => {
    try {
      const task = await taskService.getTask(id);
      setTitle(task.title);
      setDescription(task.description);
    } catch (error) {
      setError(error.message);
      console.error('Error fetching task:', error);
    }
  };

  const handleSave = async () => {
    try {
      setSaveLoading(true);
      setError('');
      const taskData = { title, description };

      if (id === 'new') {
        await taskService.createTask(taskData);
      } else {
        await taskService.updateTask(id, taskData);
      }
      router.back();
    } catch (error) {
      setError(error.message);
      console.error('Error saving task:', error);
    } finally {
      setSaveLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      setDeleteLoading(true);
      setError('');
      await taskService.deleteTask(id);
      router.back();
    } catch (error) {
      setError(error.message);
      console.error('Error deleting task:', error);
    } finally {
      setDeleteLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <IconButton
          icon="arrow-left"
          onPress={() => router.back()}
        />
        <Text variant="titleLarge">
          {id === 'new' ? 'New Task' : 'Edit Task'}
        </Text>
      </View>
      <Surface style={styles.surface}>
        {error ? (
          <Text style={styles.error}>{error}</Text>
        ) : null}
        <TextInput
          label="Title"
          value={title}
          onChangeText={setTitle}
          mode="outlined"
          style={styles.input}
        />
        <TextInput
          label="Description"
          value={description}
          onChangeText={setDescription}
          mode="outlined"
          multiline
          numberOfLines={4}
          style={styles.input}
        />
        <Button
          mode="contained"
          onPress={handleSave}
          loading={saveLoading}
          style={styles.button}
          disabled={!title || !description || saveLoading || deleteLoading}
        >
          Save
        </Button>
        {id !== 'new' && (
          <Button
            mode="outlined"
            onPress={handleDelete}
            loading={deleteLoading}
            style={styles.button}
            textColor="red"
            disabled={saveLoading || deleteLoading}
          >
            Delete
          </Button>
        )}
      </Surface>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  surface: {
    padding: 16,
    borderRadius: 8,
    elevation: 4,
  },
  input: {
    marginBottom: 12,
  },
  button: {
    marginTop: 8,
  },
  error: {
    color: 'red',
    marginBottom: 12,
    textAlign: 'center',
  }
});