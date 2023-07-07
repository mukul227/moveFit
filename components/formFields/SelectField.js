import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import {useTheme} from "react-native-paper";
import CustomText from "../shared/CustomText";

export const SelectField = ({errors, setFieldValue, onValueChange, placeholder, items, field, selectedValue}) => {

    const {colors} = useTheme();

    const [touched, setTouched] = useState(false)

    return (
        <View>
          <RNPickerSelect
            // value={values.state}
            onClose={(e) => setTouched(true)}
            onValueChange={value => setFieldValue(field, value)}
            useNativeAndroidPickerStyle={false}
            underlineColorAndroid='transparent'
            value={selectedValue}
            placeholder={{
              label: placeholder,
              color: '#777B80'
            }}
            style={{
              inputIOS: [styles.iosInput, { color: colors.fontColor,
                backgroundColor: colors.statsBoxColor,
                borderColor: (errors.gender && touched) ? 'red' : colors.inputCalendarBorderColor}],
              // borderColor: colors.inputCalendarBorderColor}],
              inputAndroid: [styles.androidInput, { color: colors.fontColor,
                backgroundColor: colors.statsBoxColor,
                borderColor: colors.inputCalendarBorderColor }],
              placeholder: {
                color: '#777B80'
              }
            }}
            items={items}
            // Icon={() => (
            //     <Icon.Ionicons
            //         name="ios-arrow-down"
            //         size={20}
            //         style={styles.dropdownIcon}
            //     />
            // )}
          />
            <CustomText size={10} color={'red'} children={(errors.gender && touched) ? errors.gender : null}/>
        </View>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        marginBottom: 16,
        height: 50,
        width: '100%',
        borderRadius: 15,
        justifyContent: 'center',
        paddingLeft: 12,
        borderWidth: 1,
    },
    input: {
        fontSize: 14,

    },
    iosInput: {
        color: 'black',
        borderBottomWidth: 1,
        borderWidth: 1,
        borderRadius: 20,
        height: 55,
        paddingLeft: 20,
        justifyContent: 'center',
        fontSize: 14,
        // fontFamily: 'regular',
        borderColor: '#E8EBED',
        // fontFamily: FONT_FAMILY.BOOK,
        paddingRight: 40, // to ensure the text is never behind the icon
        paddingVertical: 14
    },
    androidInput: {
        color: 'black',
        borderWidth: 1,
        borderRadius: 20,
        height: 50,
        paddingLeft: 27,
        justifyContent: 'center',
        fontSize: 14,
        fontFamily: 'regular',
        borderColor: '#E8EBED',
        // fontFamily: FONT_FAMILY.BOOK,
        paddingRight: 40, // to ensure the text is never behind the icon
        paddingVertical: 14,
    },
    dropdownIcon: {
        paddingVertical: 16,
        paddingHorizontal: 18,
        color: '#3894cb'
    }
});
