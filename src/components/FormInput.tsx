/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import { Controller } from 'react-hook-form';
import { StyleSheet, View } from 'react-native';
import { HelperText, TextInput } from 'react-native-paper';
import { FormInputProps } from '../interfaces/Interfaces';

export default function FormInput(formInputProps: FormInputProps) {
  const styles = StyleSheet.create({
    input: {
      marginVertical: 2,
      height: 35,
    },
  });

  const {
    rules,
    control,
    name,
    errorMessage,
    error,
    placeHolder,
    isSecureTextEntry,
  } = formInputProps;

  return (
    <View>
      <Controller
        control={control}
        rules={rules}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            mode="outlined"
            placeholder={placeHolder}
            secureTextEntry={isSecureTextEntry}
          />
        )}
        name={name}
      />
      {error && <HelperText type="error"> {errorMessage} </HelperText>}
    </View>
  );
}
