import React, {useState} from 'react';
import {TextInput, View, StyleSheet, Image} from 'react-native';
import {useTheme} from "react-native-paper";
import CustomText from "../shared/CustomText";

export const TextInputField = ({
                                 backgroundColor = 'white',
                                 borderColor,
                                 width = '100%',
                                 icon,
                                 contentJustifiedCenter,
                                 field,
                                 form,
                                 ...props
                               }) => {
  const [focusedField, setFocusedField] = useState('');
  const {colors} = useTheme();
  const {errors, handleChange, handleBlur, setFieldTouched, touched} = form;
  const isEntryValid = !errors[`${field.name}`];

  const chooseBorderColor = () => {
    if (borderColor) {
      return borderColor
    }
    if (props.error && touched[`${field.name}`]) {
      return 'red'
    } else {
      if (focusedField && isEntryValid) {
        return colors.primaryColor;
      }
      return colors.inputCalendarBorderColor;
    }
  };

  // const chooseBackgroundColor = () => {
  //   if ((isEntryValid && !focusedField) || focusedField) {
  //     return 'blue';
  //   } else {
  //     return 'orange';
  //   }
  // };

  const handleOnFocus = () => {
    setFocusedField(form.touched);
  };

  const handleOnBlur = () => {
    handleBlur(field.name);
    setFieldTouched(field.name);
    setFocusedField('');
  };

  return (
    <View>
      <View
        style={[
          styles.wrapper,
          focusedField && !isEntryValid ? styles.shadow : null,

          {
            borderColor: chooseBorderColor(),
            backgroundColor: backgroundColor,
            paddingLeft: props.centered ? 0 : 12,
            justifyContent: contentJustifiedCenter ? 'center' : 'flex-start',
            width: width
          }
        ]}
      >
        {
          icon ? <Image source={icon} style={{width: 25, height: 15}}/> : null
        }
        <TextInput
          {...props}
          onFocus={handleOnFocus}
          style={[styles.input, {
            marginLeft: icon ? 10 : 0,
            color: '#6f7185',
            textAlign: props.centered ? 'center' : 'left'
          }]}
          value={field.value}
          onChangeText={handleChange(field.name)}
          ref={props.forwardRef}
          onBlur={handleOnBlur}
          placeholderTextColor={'#696F74'}
        />
      </View>
      <View style={{marginBottom: 5}}>
        <CustomText children={props.error && touched[`${field.name}`] ? errors[`${field.name}`] : null} size={10}
                    color={'red'}/>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 5,
    height: 55,
    width: '100%',
    paddingLeft: 12,
    borderWidth: 1,
    borderRadius: 20,
    zIndex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  errorText: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingHorizontal: 5,
    position: 'absolute',
    bottom: -8,
    left: 5
  },
  input: {
    fontSize: 16,
    height: 55,
    width: '100%',
  },
});
