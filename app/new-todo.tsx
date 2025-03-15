import { Picker } from '@react-native-picker/picker';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Controller, useForm } from 'react-hook-form';
import { Platform, ScrollView, Text, TextInput, View } from 'react-native';
import DateTimePicker, {
  useDefaultClassNames as useDatePickerDefaultClassNames,
} from 'react-native-ui-datepicker';

import { Button } from '~/components/Button';
import { TODO_DIFFICULTY } from '~/constants';
import { Todo, useTodoStore } from '~/store/todo';

export default function Modal() {
  const form = useForm<Omit<Todo, 'completed'>>({
    defaultValues: {
      name: '',
      note: '',
      date: new Date(new Date().setHours(0, 0, 0, 0)),
      difficulty: 'medium',
    },
  });
  const datePickerDefaultClassNames = useDatePickerDefaultClassNames();
  const { addTodo } = useTodoStore();

  return (
    <>
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
      <ScrollView className="rounded-lg p-4">
        <View className="flex flex-col gap-4">
          <Controller
            control={form.control}
            rules={{ required: 'Name is required' }}
            render={({ field, fieldState }) => (
              <>
                <TextInput
                  placeholder="Name"
                  onChangeText={field.onChange}
                  value={field.value}
                  className="rounded-md border border-gray-600 p-3"
                />
                {fieldState.error && (
                  <Text className="text-red-500">{fieldState.error.message}</Text>
                )}
              </>
            )}
            name="name"
          />
          <Controller
            control={form.control}
            render={({ field }) => (
              <TextInput
                placeholder="Note (Optional)"
                multiline
                numberOfLines={4}
                onChangeText={field.onChange}
                value={field.value}
                className="h-48 rounded-md border border-gray-600 p-3"
              />
            )}
            name="note"
          />
          <Controller
            control={form.control}
            render={({ field }) => (
              <Picker
                selectedValue={field.value}
                onValueChange={(itemValue) => field.onChange(itemValue)}>
                {TODO_DIFFICULTY.map((difficulty) => (
                  <Picker.Item label={difficulty} value={difficulty} key={difficulty} />
                ))}
              </Picker>
            )}
            name="difficulty"
          />
          <Controller
            control={form.control}
            render={({ field }) => (
              <DateTimePicker
                mode="single"
                date={field.value}
                onChange={({ date }) => field.onChange(date)}
                classNames={{
                  ...datePickerDefaultClassNames,
                  selected: 'bg-gray-600',
                  selected_label: 'text-white',
                }}
              />
            )}
            name="date"
          />
          <Button
            title="Add"
            onPress={form.handleSubmit((data) => {
              addTodo({ ...data, completed: false });
              router.replace('/todo');
            })}
            className="mb-4"
          />
        </View>
      </ScrollView>
    </>
  );
}
