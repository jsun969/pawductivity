import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Platform, TextInput, View } from 'react-native';

export default function Modal() {
  const [name, setName] = useState('');
  const [notes, setNotes] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  return (
    <>
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
      <View className="rounded-lg p-4">
        <TextInput
          className="mb-4 rounded-md border border-gray-600 p-3"
          placeholder="Name"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          className="mb-4 rounded-md border border-gray-600 p-3"
          placeholder="Notes (optional)"
          value={notes}
          onChangeText={setNotes}
        />
        {/* TODO: Replace with time/date pickers from a package */}
        <TextInput
          className="mb-4 rounded-md border border-gray-600 p-3"
          placeholder="Date (optional)"
          value={date}
          onChangeText={setDate}
        />
        <TextInput
          className="mb-4 rounded-md border border-gray-600 p-3"
          placeholder="Time (optional)"
          value={time}
          onChangeText={setTime}
        />
      </View>
    </>
  );
}
