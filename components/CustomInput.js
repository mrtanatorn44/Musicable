import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";

export const CustomInput = (props) => { 
  return (
    <View> 
      <TextInput
        style={styles.input}
        onChangeText={props.onChangeText}
        value={props.value}
        placeholder={props.placeholder}
        placeholderTextColor={'lightgray'}
        placeholderFontSize={'25'}
        editable={props.editable}
        secureTextEntry={props.secureTextEntry}
      />
    </View> 
  );
}

const styles = StyleSheet.create({
  input: {
    flex: 1,
    fontSize : 25,
    marginVertical: '0.25rem',
    paddingVertical: '0.25rem',
    paddingHorizontal: '0.75rem',
    backgroundColor: 'white',
    borderColor: 'lightgray',
    borderWidth: 2,
    borderRadius: 50,
    height: 50,
    textAlign: 'left',
  },
});