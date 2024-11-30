import DateTimePicker from '@react-native-community/datetimepicker';
import { Calendar } from 'lucide-react-native';
import moment from "moment";
import React, { useEffect, useState } from 'react';
import { Keyboard, View } from 'react-native';
import { Input } from './Input';

type Props = {
  placeholder?: string;
  date: string | null;
  onChangeDate: (value: string | null) => void;
  variant?: 'default' | 'error' | null | undefined;
  disabled?: boolean;
};

export function DateInput({ placeholder, date, onChangeDate, variant, disabled }: Props) {
  const [show, setShow] = useState(false);
  const [inputValue, setInputValue] = useState(
    date ? moment(date, 'YYYY-MM-DD').format('DD/MM/YYYY') : ''
  );

  useEffect(() => {
    setInputValue(date ? moment(date, 'YYYY-MM-DD').format('DD/MM/YYYY') : '');
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
    } else if (parsedDate.isValid()) {
      onChangeDate(parsedDate.format('YYYY-MM-DD'));
    }
  };

  const handleChangeDate = (event: any, selectedDate: Date | undefined) => {
    setShow(false);

    if (selectedDate) {
      onChangeDate(moment(selectedDate).format('YYYY-MM-DD'));
      setInputValue(moment(selectedDate).format('DD/MM/YYYY'));
    }
  };

  return (
    <View>
      <Input
        className='w-full'
        placeholder={placeholder}
        value={inputValue}
        variant={variant}
        onChangeText={handleInputChange}
        endIcon={Calendar}
        endIconPress={showDatePicker}
        editable={!disabled}
      />

      {show && (
        <DateTimePicker
          value={date ? moment(date, 'YYYY-MM-DD').toDate() : new Date()} // Converte string para Date
          mode="date"
          is24Hour={true}
          display="default"
          onChange={handleChangeDate}
          style={{ backgroundColor: 'white' }}
          maximumDate={new Date()}
        />
      )}
    </View>
  );
}
