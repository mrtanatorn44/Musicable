import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Icon } from '@iconify/react';

export const CustomButtonIcon = (props) => { 
  return (
    <View>

      <TouchableOpacity
        style={styles.button}
        onPress={props.onPress}
      >
        <Icon icon={props.icon}
          style={ props.isFocus ?  styles.iconFocus :  styles.icon } />
        <Text
          style={ props.isFocus ?  styles.textFocus :  styles.text } 
        >
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
    borderRadius: 50,
    textAlign: 'center',
  },
  icon: {
    width: 40, 
    height: 40, 
    alignSelf: 'center',
    color: '#A9A9A9'
  },
  iconFocus: {
    width: 40, 
    height: 40, 
    alignSelf: 'center',
    color: '#AA336A'
  },  
  text: {
    fontSize : 10,
    color: '#A9A9A9'
  },
  textFocus: {
    fontSize : 10,
    color: '#AA336A'
  }
});
