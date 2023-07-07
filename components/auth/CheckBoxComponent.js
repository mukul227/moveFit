import React, {useEffect, useState} from 'react';
import {FlatList, View, StyleSheet, TouchableOpacity} from "react-native";
import CheckboxListItem from "./CheckboxListItem";
import Icons from "../../constants/Icons";
import {useTheme} from "react-native-paper";
import {useDispatch} from "react-redux";
import {updateUser} from "../../store/auth";
import Button from "../shared/Button";

export default function CheckBoxComponent({data, navigation, where, objectKey = null, setSelectedItem, singleSelection = true, notOnboarding}) {

  const dispatch = useDispatch();

  const { colors } = useTheme();

  const [options, setOptions] = useState([]);

  const getMultipleArr = () => {
    let array = [];
    options.map((item) => {
      if (item.selected) {
        const data = {
          id: item.id
        };
        array.push(data);
      }
    });
    dispatch(updateUser({goals: array}));
  }

  const getSingleArr = () => {
    let data = '';
    options.map((item) => {
      if (item.selected) {
        data = objectKey === 'preference' ? item.id : item.value;
      }
    });
    dispatch(updateUser(getObjectKey(data)));
  }

  const getObjectKey = (value) => {
      switch (objectKey){
        case 'location':
          const data = {
            preference: {
              location: value
            }
          }
          return data;
        case 'preference':
          const data1 = {
            preference: {
              preference_id: value
            }
          }
          return data1;
        case 'fitness_level':
          const data2 = {
            preference: {
              fitness_level: value
            }
          }
          return data2;
      }
  }

  const onSubmitForm = () => {
    if (!singleSelection) {
      getMultipleArr()
    } else {
      getSingleArr()
    }
  }

  useEffect(() => {
    if (data.length) {
      setOptions(data)
    }
  }, [data]);

  const renderCheckboxListItem = ({item}) => (
    <CheckboxListItem index={item.id} item={item} onPress={handleOnPress}/>
  );

  const handleOnPress = selectedItem => {
    {notOnboarding ? setSelectedItem(selectedItem.difficulty) : null}
    setOptions(
      singleSelection
        ? options.map(el => {
          if (el.id === selectedItem.id) {
            return Object.assign({}, el, {selected: true});
          } else if (el.selected) {
            return Object.assign({}, el, {selected: false});
          }
          return el;
        })
        : options.map(
        el =>
          el.id === selectedItem.id
            ? Object.assign({}, el, {selected: !el.selected})
            : el
        )
    );
  };


  return (
    <View style={{flexGrow: 1, width: '100%', marginTop: 30}}>
      <View style={styles.container}>
        <FlatList
          data={options}
          renderItem={renderCheckboxListItem}
          contentContainerStyle={{paddingHorizontal: 5}}
        />
        {!notOnboarding ?
        <View style={styles.buttonWrapper}>
              <Button
                borderColor={colors.backgroundColor}
                gradientColors={colors.primaryColorGradient}
                showCenterIcon={true}
                setWidth={'25%'}
                onPress={() => onSubmitForm()}
                isActive={true}
              />
              {/*<TouchableOpacity*/}
              {/*    // onPress={() => navigation.navigate(where)}*/}
              {/*    onPress={() => onSubmitForm()}*/}
              {/*    style={[styles.button, {backgroundColor: colors.primaryColor}]}>*/}
              {/*  <Icons.ArrowWhite/>*/}
              {/*</TouchableOpacity>*/}
        </View>  : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
    justifyContent: 'space-between',
  },
  buttonWrapper: {
    width: '100%',
    paddingHorizontal: 10,
    alignItems: 'flex-end',
    marginBottom: 80
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 25,
    paddingVertical: 10,
    borderRadius: 20
  }
});
