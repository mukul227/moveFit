import React, {useState, useCallback, useEffect} from 'react';
import {
    View,
    StyleSheet,
    Image,
    TouchableWithoutFeedback,
    TouchableOpacity,
    FlatList,
    TextInput,
    LogBox,
    Platform
} from 'react-native';
import { Svg, Path, G, Line, Rect, Circle } from 'react-native-svg';
import moment from 'moment';
import CustomText from './CustomText';
import Button from "./Button";

const DatePicker = ({onSelect, withTime, initialDate = new Date()}) => {

    const [date, setDate] = useState(initialDate);
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const [pressed, setPressed] = useState(false);

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
        if (Platform.OS === 'android') {
            handleSetPicker(selectedDate);
        }
    };

    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };

    const showDatepicker = () => {
        setPressed(true);
        showMode('date');
    };

    const showTimepicker = () => {
        showMode('time');
    };

    const handleSetPicker = () => {
        if (mode === 'date' && withTime) {
            setMode('time');
        } else {
            setShow(false);
            setMode('date');
            onSelect(date);
        }
    }

    return (
        <View style={{alignItems: 'center', justifyContent: 'center'}}>
             <TouchableOpacity style={{height: 55, justifyContent: 'center'}} onPress={showDatepicker} title="Show date picker!">
                 {
                  !pressed ? <CustomText color={'gray'} children={'Date of Birth'} /> : null
                 }
             </TouchableOpacity>
            
        </View>
        // <View style={styles.wrapper}>
        //     <View style={{width: '100%', height: 55, flexDirection: 'row', justifyContent: 'space-between'}}>
        //         <View style={{flexDirection: 'row'}}>
        //           <TouchableOpacity onPress={showDatepicker} style={[styles.input, {color: '#6f7185'}]}>
        //               <CustomText style={{paddingLeft: 12}} children={moment(date).format(withTime ? 'MMM D, YYYY h:mm a' : 'MMM D, YYYY')} color={'#6f7185'}/>
        //           </TouchableOpacity>
        //         </View>
        //         {show && (
        //             <TouchableOpacity onPress={() => handleSetPicker()} style={{color: '#6f7185', height: '100%', paddingHorizontal: 25, justifyContent: 'center'}}>
        //                 <CustomText children={mode === 'date' ? 'Select date' : 'Select time'} color={'#3894cb'}/>
        //             </TouchableOpacity>
        //         )}
        //     </View>
        //     {show && (
        //         <DateTimePicker
        //             testID="dateTimePicker"
        //             value={date}
        //             maximumDate={new Date()}
        //             mode={mode}
        //             is24Hour={true}
        //             display="default"
        //             // minimumDate={new Date()}
        //             themeVariant="dark"
        //             onChange={onChange}
        //             textColor={'white'}
        //         />
        //     )}
        // </View>
    );
};

export default DatePicker;

DatePicker.propTypes = {};

const styles = StyleSheet.create({
    wrapper: {
        width: '100%',
        // marginBottom: 16,
        borderRadius: 20,
        justifyContent: 'center',
        borderColor: '#E8EBED',
        borderWidth: 1,
        overflow: 'hidden',
        backgroundColor: 'white'
    },
    input: {
        marginLeft:15,
        fontSize: 14,
        fontFamily: 'regular',
        height: 55,
        flexGrow: 1,
        justifyContent: 'center'
    }
});

