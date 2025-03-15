import { Picker } from '@react-native-picker/picker';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Controller, useForm } from 'react-hook-form';
import { Platform, ScrollView, Text, TextInput, View } from 'react-native';
import DateTimePicker, {
  useDefaultClassNames as useDatePickerDefaultClassNames,
} from 'react-native-ui-datepicker';

import { Button } from '~/components/Button';
import { TODO_DIFFICULTY, TODO_DIFFICULTY_TO_COINS } from '~/constants';
import { Todo, useTodoStore } from '~/store/todo';

const TODAY = new Date(new Date().setHours(0, 0, 0, 0));

export default function Modal() {
  const form = useForm<Omit<Todo, 'completed'>>({
    defaultValues: {
      name: '',
      note: '',
      date: TODAY,
      difficulty: 'medium',
    },
  });
  const datePickerDefaultClassNames = useDatePickerDefaultClassNames();
  const { addTodo } = useTodoStore();

  return (
    <>
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
      <ScrollView className="rounded-lg">
        <View className="flex flex-col gap-4 p-4 pb-8">
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
              <>
                <Text className="text-lg font-bold">Difficulty</Text>
                <Picker
                  selectedValue={field.value}
                  onValueChange={(itemValue) => field.onChange(itemValue)}>
                  {TODO_DIFFICULTY.map((difficulty) => (
                    <Picker.Item
                      label={`${difficulty} (${TODO_DIFFICULTY_TO_COINS[difficulty]} coins)`}
                      value={difficulty}
                      key={difficulty}
                    />
                  ))}
                </Picker>
              </>
            )}
            name="difficulty"
          />
          <Controller
            control={form.control}
            render={({ field }) => (
              <>
                <Text className="text-lg font-bold">Date</Text>
                <DateTimePicker
                  mode="single"
                  date={field.value}
                  onChange={({ date }) => field.onChange(date)}
                  classNames={{
                    ...datePickerDefaultClassNames,
                    selected: 'bg-slate-600',
                    selected_label: 'text-white',
                    disabled_label: 'text-gray-400',
                  }}
                  minDate={TODAY}
                />
              </>
            )}
            name="date"
          />
          <Button
            title="Add"
            onPress={form.handleSubmit((data) => {
              addTodo({ ...data, completed: false });
              router.replace('/todo');
            })}
          />
        </View>
      </ScrollView>
    </>
  );
}
