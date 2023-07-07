import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  StyleSheet, TouchableOpacity, TextInput, KeyboardAvoidingView, ScrollView, Platform
} from 'react-native';
import Button from "../shared/Button";
import CustomText from "../shared/CustomText";
import Icons from "../../constants/Icons";
import HabitModalDays from "./HabitModalDays";
import HabitColorComponent from "./HabitColorComponent";
import {weekDays} from "../../dummyData/journey-data/week-days";
import {fromHsv, TriangleColorPicker} from "react-native-color-picker";
import {journeyService} from "../../services/JourneyService";
import {useDispatch} from "react-redux";
import {createHabitSaga} from "../../store/journey/actions";

const CreateHabitForm = ({item, closeList, colors, onBlurInput}) => {

    const [colorOptions, setColorOptions] = useState([]);
    const [selectedColor, setSelectedColor] = useState(null);
    const [week, setWeek] = useState(weekDays);
    const [text, setText] = useState('');
    const [showForm, setShowForm] = useState(true);
    const [chosenColor, setChosenColor] = useState('#ffffff');
    const [customHabitName, setCustomHabitName] = useState('');
    const dispatch = useDispatch();

    const backToList = () => {
        closeList()
        setSelectedColor(null)
        setText('')
        setCustomHabitName('')
    }

    const onSaveHabit = () => {
        let days = getDays(week);

        let obj = {
            ...days,
            goal:text,
            type: item.value,
            color: selectedColor,
            custom_name: item.value === 'custom' ? customHabitName : null
        }

        dispatch(createHabitSaga(obj))
        closeList()
    }

    const getDays = (week) => {
        let days = week.filter(day => day.progress === 1);
        return days.reduce((obj, item) => (obj[item.day.toLowerCase()] = true, obj) ,{});
    }

    const getColors = async () => {
        let options = await journeyService.getColorOptions()
        setColorOptions(options)
        setSelectedColor(options[0])
    }

    useEffect(() => {
        getColors()
    },[])

    const renderHeader = () => {
        return(
            <View style={styles.header}>
                <TouchableOpacity onPress={() => backToList()} style={styles.backArrow}>
                    <Icons.ArrowLeftThin  color={colors.fontColor}/>
                </TouchableOpacity>
                <View style={styles.icon}>
                    {
                        item?.title !== 'Custom' ?
                            item?.icon
                            : null
                    }
                    <CustomText children={item.title} size={22} style={{marginLeft: 10}} fontWeight={'700'} color={colors.fontColor}/>
                </View>
            </View>
        )
    }

    const inputForCustom = () => {
        return(
            item?.title === 'Custom' ?
            <View>
            <CustomText children={'Name'} size={22} color={colors.fontColor} fontWeight={'500'} style={{marginTop: 18, marginBottom: 6}}/>
            <TextInput
                style={[styles.input,{borderColor:colors.profileTabTitles, color:colors.fontColor}]}
                placeholder={'Custom habit'}
                placeholderTextColor={colors.seeAllColor}
                selectionColor={colors.primaryColor}
                onBlur={() => onBlurInput()}
                onChangeText={(text) => onSetCustomHabitName(text)}
                value={customHabitName}/>
            </View>
                : null
        )
    }

    const renderInput = () => {
        return(
            <View>
                <CustomText children={'Goal'} size={22} color={colors.fontColor} fontWeight={'500'} style={{marginTop: 18, marginBottom: 6}}/>
                <TextInput
                    style={[styles.input,{borderColor:colors.profileTabTitles, color:colors.fontColor}]}
                    placeholder={'Enter value'}
                    placeholderTextColor={colors.seeAllColor}
                    selectionColor={colors.primaryColor}
                    onChangeText={(text) => onSetText(text)}
                    onBlur={() => onBlurInput()}
                    value={text}/>
            </View>
        )
    }

    const onSetText = (text) => {
        setText(text);
    }

    const onSetCustomHabitName = (customName) => {
        setCustomHabitName(customName);
    }

    const onColorPress = (color) => {
        setSelectedColor(color)
    }

    const onPressDay = (day) => {
        setWeek(
            week.map(el => {
                if (el.id === day.id) {
                    return  day.progress === 0 ?
                    Object.assign({}, el, {progress: 1}) :
                        Object.assign({}, el, {progress: 0})
                }
                return el;
            })
        )

    }

    const onChoseColor = () => {
        setSelectedColor(chosenColor)
        colorOptions.pop()
        setColorOptions([chosenColor,...colorOptions])
        journeyService.setColorOptions([chosenColor,...colorOptions])
        setShowForm(true)
    }

    const isDisabled = () => {
        let isDayCheck = week.filter(day => day.progress === 1)
        if(item.value === 'custom'){
            return isDayCheck.length  > 0 && customHabitName.length > 0
        }
        return isDayCheck.length > 0 && text.length > 0
    }

    return (
        <View style={{justifyContent: 'flex-end', height: '100%'}}>
            {
                showForm ?
                    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollView}>
                            <View style={{width: '100%'}}>
                                {renderHeader()}
                                {inputForCustom()}
                                {renderInput()}

                                <CustomText children={'Repeat'} size={22} color={colors.fontColor} fontWeight={'500'} style={{marginTop: 10, marginBottom: 6}}/>
                                <HabitModalDays week={week} onPress={(day) => onPressDay(day)}/>
                                <CustomText children={'Color'} size={22} color={colors.fontColor} fontWeight={'500'} style={{marginTop: 20, marginBottom: 6}}/>
                                <HabitColorComponent colors={colors} onOpenPicker={() => setShowForm(false)} onPress={(color) => onColorPress(color)} colorOptions={colorOptions} isSelected={selectedColor}/>
                            </View>
                      <View>
                        <Button setWidth={'100%'} isActive={isDisabled()} onPress={()=> onSaveHabit()} title={'Save'} gradientColors={ isDisabled() ? colors.primaryColorGradient : colors.primaryColorGradientDisabled} borderColor={ colors.backgroundColor} />
                      </View>
                    </ScrollView> :
                    <View style={{height: '60%', paddingBottom: 50}}>
                        <TriangleColorPicker
                            onColorChange={color =>setChosenColor(fromHsv(color))}
                            style={styles.pickerView}
                            hideControls={true}
                        />
                        <View style={[styles.pickedView,{backgroundColor:chosenColor}]}/>
                        <Button isActive={chosenColor.length} style={{marginTop: 20}} onPress={() => onChoseColor()} title={'Confirm'} gradientColors={ colors.primaryColorGradient} borderColor={ colors.backgroundColor}/>
                    </View>
            }

        </View>

    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        alignItems: 'center',
        flex: 1
    },
    input: {
        width: '100%',
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#E0E0E0',
        marginBottom: 10,
        height: 55,
        paddingHorizontal: 15
    },
    header: {
        flexDirection: 'row',
        width:'100%',
        alignItems:'center',
        justifyContent:'center'
    },
    backArrow: {
        position:'absolute',
        left:-5,
        padding: 5
    },
    icon: {
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center'
    },
    scrollView: {
        width:'100%',
        paddingHorizontal: 5,
        marginTop:10,
        height: "100%",
        paddingBottom: 50,
        justifyContent: 'space-between'
    },
    pickedView: {
        width: '90%',
        marginLeft:'5%',
        height: 30,
    },
    pickerView: {
        flex: 1,
        height: 300,
        paddingHorizontal: 50,
        paddingVertical: 10
    }
});

export default CreateHabitForm;
