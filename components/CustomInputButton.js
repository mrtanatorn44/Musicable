import { StyleSheet, TextInput, TouchableOpacity, View, Text } from "react-native";
import { PlusCircleFilled } from '@ant-design/icons';
// https://ant.design/components/icon/
import { Icon } from '@iconify/react';
// https://icon-sets.iconify.design/ion/add-circle/

export const CustomInputButton = (props) => { 
  // const [inputText, setInputText] = useState()
  return (
    <View style={{flexDirection:'row', alignItems:'center', borderRadius:10 }}>
      <View style={{ width: '100%' }}>
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
      <View style={{position: 'absolute', right: '4%', top: '25%'}}>
        <TouchableOpacity 
          style={{ 
            width: 25, 
            height: 25, 
            borderRadius: 50, 
            alignItems: 'center', 
          }}
          onPress={props.btnOnPress}
        >
          <Icon icon="ion:add-circle" style={{ color: '#A9A9A9', fontSize: 25, alignSelf: 'center' }} />
          {/* <PlusCircleFilled style={{ color: '#A9A9A9', fontSize: 25, alignSelf: 'center' }} /> */}
        </TouchableOpacity>
      </View>
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
    width: '100%'
  },
});