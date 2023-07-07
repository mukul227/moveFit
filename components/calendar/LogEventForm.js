import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput, ScrollView
} from 'react-native';
import {Formik, Field} from 'formik';
import {TextInputField} from "../formFields/TextInputField";
import CustomText from "../shared/CustomText";
import DatePicker from 'react-native-date-picker'
import moment from "moment";
import Button from "../shared/Button";
import {newEventValidationRules} from "../../validation/auth";

export const LogEventForm = ({colors, onSubmit}) => {

  const [date, setDate] = useState(new Date());
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedStartTime, setSelectedStartTime] = useState(null);
  const [selectedEndTime, setSelectedEndTime] = useState(null);
  const [open, setOpen] = useState(false);
  const [openStartTime, setOpenStartTime] = useState(false);
  const [openEndTime, setOpenEndTime] = useState(false);
  const [touchedDate, setTouchedDate] = useState(false)
  const [touchedStartTime, setTouchedStartTime] = useState(false)
  const [touchedEndTime, setTouchedEndTime] = useState(false)


  return (
    <View style={styles.wrapper}>
      <Formik
        initialValues={{name: '', date: '', description: '', start_time: '', end_time: ''}}
        onSubmit={onSubmit}
        validateOnMount={true}
        validationSchema={newEventValidationRules}
      >
        {({handleSubmit, isValid, dirty, setFieldValue, errors}) => (
          <View style={styles.formikWrapper}>
            <CustomText style={{paddingVertical: 21}} size={22} children={'Log Event'} color={colors.fontColor}
                        fontWeight={'700'}/>
            <DatePicker
              modal
              open={open}
              date={date}
              mode={'date'}

              onConfirm={(date) => {
                setOpen(false)
                setDate(date)
                setSelectedDate(moment(date).format('YYYY-MM-DD'));
                setFieldValue('date', date);
              }}
              onCancel={() => {
                setOpen(false)
                setTouchedDate(true);
              }}
            />
            <DatePicker
                modal
                open={openStartTime}
                date={startTime ? startTime : new Date()}
                mode={'time'}
                is24hourSource={'locale'}
                locale={'en_US'}

                onConfirm={(startTime) => {
                  setOpenStartTime(false)
                  setStartTime(startTime)
                  setSelectedStartTime(moment(startTime).format('hh:mm A'));
                  setFieldValue('start_time', moment(startTime).format('HH:mm'));
                }}
                onCancel={() => {
                  setOpenStartTime(false)
                  setTouchedStartTime(true);
                }}
            />
            <DatePicker
                modal
                open={openEndTime}
                date={startTime ? startTime : new Date()}
                mode={'time'}
                is24hourSource={'locale'}
                locale={'en_US'}
                minimumDate={startTime}
                onConfirm={(endTime) => {
                  setOpenEndTime(false)
                  setEndTime(endTime)
                  setSelectedEndTime(moment(endTime).format('hh:mm A'));
                  setFieldValue('end_time', moment(endTime).format('HH:mm'));
                }}
                onCancel={() => {
                  setOpenEndTime(false)
                  setTouchedEndTime(true);
                }}
            />
            <ScrollView>
              <Field
                autoFocus={true}
                style={styles.fields}
                name="name"
                autoCapitalize="none"
                placeholder={'Event Name*'}
                component={TextInputField}
                backgroundColor={colors.statsBoxColor}
                borderColor={colors.inputCalendarBorderColor}
                color={colors.fontColor}
                error={errors.name ? errors.name : null}
                onChangeText={value => {
                  setFieldValue('name', value);
                }}
              />
              <View style={styles.dateWrapper}>
                <View style={{width: '100%'}}>
                  <TouchableOpacity
                    onPress={() => setOpen(true)}
                    style={[styles.datePress, {borderColor: colors.inputCalendarBorderColor}]}>
                    <CustomText
                      color={selectedDate ? colors.fontColor : 'gray'}
                      children={selectedDate ? selectedDate : 'Date*'}/>
                  </TouchableOpacity>
                  <CustomText children={(touchedDate && errors.date) ? errors.date : null} color={'red'} size={10}/>
                </View>

              </View>

              <View style={{flexDirection:'row', width:'100%', justifyContent:'space-between'}}>
                <View style={styles.timeWrapper}>
                  <View style={{width: '100%'}}>
                    <TouchableOpacity
                        onPress={() => setOpenStartTime(true)}
                        style={[styles.datePress, {borderColor: colors.inputCalendarBorderColor}]}>
                      <CustomText
                          color={selectedStartTime ? colors.fontColor : 'gray'}
                          children={selectedStartTime ? selectedStartTime : 'Start Time*'}/>
                    </TouchableOpacity>
                    <CustomText children={(touchedStartTime && errors.start_time) ? errors.start_time : null} color={'red'} size={10}/>
                  </View>

                </View>
                <View style={styles.timeWrapper}>
                  <View style={{width: '100%'}}>
                    <TouchableOpacity
                        disabled={!startTime}
                        onPress={() => setOpenEndTime(true)}
                        style={[styles.datePress, {borderColor: colors.inputCalendarBorderColor}]}>
                      <CustomText
                          color={selectedEndTime ? colors.fontColor : 'gray'}
                          children={selectedEndTime ? selectedEndTime : 'End Time*'}/>
                    </TouchableOpacity>
                    <CustomText children={(touchedEndTime && errors.end_time) ? errors.end_time : null} color={'red'} size={10}/>
                  </View>

                </View>

              </View>
              {/*<Field*/}
              {/*  style={styles.fields}*/}
              {/*  name="duration"*/}
              {/*  keyboardType={"numeric"}*/}
              {/*  autoCapitalize="none"*/}
              {/*  placeholder={'Duration*'}*/}
              {/*  component={TextInputField}*/}
              {/*  backgroundColor={colors.statsBoxColor}*/}
              {/*  borderColor={colors.inputCalendarBorderColor}*/}
              {/*  color={colors.fontColor}*/}
              {/*  error={errors.duration ? errors.duration : null}*/}
              {/*  onChangeText={value => {*/}
              {/*    setFieldValue('duration', value);*/}
              {/*  }}*/}
              {/*/>*/}

              <TextInput
                style={[styles.textInput, {color: colors.fontColor, borderColor: colors.inputCalendarBorderColor}]}
                onChangeText={(text) => setFieldValue('description', text)}
                placeholder="Description"
                placeholderTextColor={'#70767B'}
                multiline={true}
                numberOfLines={5}
                minHeight={100}
                maxHeight={100}
                textAlignVertical={"top"}
              />
            </ScrollView>
            <Button onPress={handleSubmit} title={'Save'}
                    borderColor={isValid ? colors.primaryColor : colors.backgroundColor}
                    gradientColors={isValid ? colors.primaryColorGradient : colors.primaryColorGradientDisabled} isActive={isValid}/>
          </View>
        )}
      </Formik>
    </View>

  )
};

const styles = StyleSheet.create({
  wrapper: {
    flexGrow: 1,
    width: '100%',
  },
  formikWrapper: {
    flexGrow: 1,
    width: '100%',
    marginTop: 10,
  },
  fields: {
    width: '100%',
  },
  container: {
    width: '100%',
  },
  textInput: {
    marginBottom: 20,
    padding: 12,
    paddingTop: 15,
    borderWidth: 1,
    borderRadius: 20,
  },
  dateWrapper: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    marginBottom: 10,
    alignItems: 'center'
  },
  timeWrapper: {
    flexDirection: 'row',
    width: '48%',
    justifyContent: 'space-between',
    marginBottom: 10,
    alignItems: 'center'
  },
  datePress: {
    borderWidth: 1,
    height: 55,
    paddingLeft: 15,
    borderRadius: 20,
    justifyContent: 'center',
  }
});
