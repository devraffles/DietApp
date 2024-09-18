import { 
    View, 
    Text,
    TextInput, 
    StyleSheet,
    KeyboardTypeOptions  
} from 'react-native';

import { Controller } from 'react-hook-form';

import { colors } from '@/constants/colors';

interface InputProps{
    title: string;
    placeholder?: string;
    name: string;
    control: any;
    rules?: object;
    error?: string;
    keyboardType: KeyboardTypeOptions;
}

export function Input({ title, placeholder, name, control, rules, error, keyboardType }: InputProps) {
 return (
   <View style={styles.container}>
    <Text style={styles.label}>{title}</Text>
    <Controller
        control={control}
        name={name}
        rules={rules}
        render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
                style={styles.input}
                placeholder={placeholder}
                onBlur={onBlur}
                value={value}
                onChangeText={onChange}
                keyboardType={keyboardType}
            />
        )}
    />

    {error && <Text style={styles.errorText}>{error}</Text>}
   </View>
  );
}

const styles = StyleSheet.create({
    container:{
        marginBottom: 16
    },
    label:{
        fontSize: 16,
        fontWeight: 'bold',
        color: colors.white,
        marginBottom: 8
      },
    input:{
        height: 44,
        backgroundColor: colors.white,
        paddingHorizontal: 10,
        borderRadius: 4,
    },
    errorText:{
        backgroundColor: 'red',
        color: colors.white,
        marginTop: 8,
        padding: 14,
        borderRadius: 4
    }
})