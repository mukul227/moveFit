import React, {useEffect, useState} from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import Icons from "../../../constants/Icons";
import CustomText from "../../shared/CustomText";
import LinearGradient from "react-native-linear-gradient";
import moment from "moment";

const SettingsListItem = ({item, colors, onPressItem}) => {


  const [isDisabled, setIsDisabled] = useState(false);
  const [itemTitle, setItemTitle] = useState(item.title);
  const [itemSubtitle, setItemSubtitle] = useState(null);


  useEffect(() => {
    if (item.id === 2) {
      if (item.activeSubscription && item.subscribed) {
        switch (item.activeSubscription.type) {
          case 'month': setItemTitle('1 Month Subscription'); break;
          case '3months': setItemTitle('3 Months Subscription'); break;
          case '6months': setItemTitle('6 Months Subscription'); break;
          case 'year': setItemTitle('1 Year Subscription'); break;
        }
        setIsDisabled(true);
        setItemSubtitle('Active until ' + moment(item.activeSubscription.valid_to).format('YYYY-MM-DD'));
      }
    }

  }, []);


  return (
      <TouchableOpacity style={styles.itemOutside} disabled={isDisabled} onPress={() => onPressItem(item)}>
        <LinearGradient start={{x: 0, y: 1}} end={{x: 1, y: 1}} colors={colors.primaryColorGradient}
                        style={styles.linearGradient}>
        <View style={[styles.itemInside, {borderColor: colors.borderColor}]}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            {item.icon}
            <View>
              <CustomText children={itemTitle} color={!isDisabled ? colors.backgroundColor : colors.exerciseSubtitle} style={{marginLeft: 12}} size={16}/>
              { itemSubtitle && <CustomText children={itemSubtitle} color={!isDisabled ? colors.backgroundColor : colors.exerciseSubtitle} style={{marginLeft: 12}} size={12} /> }
            </View>
          </View>
          {
            !isDisabled ? <Icons.ArrowRight color={colors.backgroundColor}/> : null
          }
        </View>
        </LinearGradient>
      </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  itemInside: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
  },
  itemOutside: {
    marginBottom: 8,
    height: 65,
    borderRadius: 20
  },
  linearGradient: {
    width: '100%',
    position: 'absolute',
    height: '100%',
    borderRadius: 20,
    justifyContent: 'center'
  }
});

export default SettingsListItem;
