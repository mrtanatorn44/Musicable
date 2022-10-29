import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export const CustomButton = (props) => { 
  return (
    <View> 
      <TouchableOpacity
        style={styles.button}
        onPress={props.onPress}
      >
        <Text style={styles.text}>
          {props.text}
        </Text>
      </TouchableOpacity>
    </View> 
  );
}

const styles = StyleSheet.create({
  button: {
    flex: 1,
    marginVertical: '0.25rem',
    padding: '0.5rem',
    backgroundColor: 'lightgray',
    borderRadius: 50,
    textAlign: 'center',
  },
  text: {
    fontSize : 25,
  }
});
