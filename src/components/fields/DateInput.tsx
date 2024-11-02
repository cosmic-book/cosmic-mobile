import DateTimePicker from '@react-native-community/datetimepicker';
import { Calendar } from 'lucide-react-native';
import moment from "moment";
import React, { useEffect, useState } from 'react';
import { Keyboard, View } from 'react-native';
import { Input } from './Input';

type Props = {
  placeholder?: string;
  date: Date | null;
  onChangeDate: (value: Date | null) => void;
  variant?: 'default' | 'error' | null | undefined;
};

export function DateInput({ placeholder, date, onChangeDate, variant }: Props) {
  const [show, setShow] = useState(false);
  const [inputValue, setInputValue] = useState(date ? moment(date).format('DD/MM/YYYY') : '');

  useEffect(() => {
    setInputValue(date ? moment(date).format('DD/MM/yyyy') : '');
    onChangeDate(date ? date : null);
  }, [date]);

  const showDatePicker = () => {
    setShow(true);
    Keyboard.dismiss();
  };

  const formatDateString = (text: string) => {
    const numbersOnly = text.replace(/\D/g, '');

    if (numbersOnly.length <= 2) {
      return numbersOnly;
    }

    if (numbersOnly.length <= 4) {
      return `${numbersOnly.slice(0, 2)}/${numbersOnly.slice(2)}`;
    }

    return `${numbersOnly.slice(0, 2)}/${numbersOnly.slice(2, 4)}/${numbersOnly.slice(4, 8)}`;
  };

  const handleInputChange = (text: string) => {
    const formattedText = formatDateString(text);
    setInputValue(formattedText);

    const parsedDate = moment(formattedText, 'DD/MM/YYYY', true);

    if (text.length === 0) {
      onChangeDate(null);
    }

    if (parsedDate.isValid()) {
      onChangeDate(parsedDate.toDate());
    }
  };

  const handleChangeDate = (event: any, selectedDate: Date | undefined) => {
    setShow(false);

    if (selectedDate) {
      onChangeDate(selectedDate);
      setInputValue(moment(selectedDate).format('DD/MM/YYYY'));
    }
  };

  return (
    <View>
      <Input
        placeholder={placeholder}
        value={inputValue}
        variant={variant}
        onChangeText={handleInputChange}
        endIcon={Calendar}
        endIconPress={showDatePicker}
      />

      {show && (
        <DateTimePicker
          value={date ?? new Date()}
          mode="date"
          is24Hour={true}
          display="default"
          onChange={handleChangeDate}
          style={{ backgroundColor: 'white' }}
        />
      )}
    </View>
  );
}
