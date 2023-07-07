import React, {useCallback, useRef, useState} from 'react';
import {FlatList, View} from "react-native";
import ExerciseVideoListItem from "./ExerciseVideoListItem";
import ExerciseCountdownModal from "./ExerciseCountdownModal";
import RestModal from "./RestModal";

const ExerciseVideoList = ({ data, onItemChange, exercise, workout, colors }) => {

  const refList = useRef(null);
  const [indexFromModal, setIndexFromModal] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [restIsVisible, setRestIsVisible] = useState(false);

  const scrollToIndex = index => {
    setSelectedIndex(index);
    if (data.length > index) {
      refList.current.scrollToIndex({index});
    }
  }

  const renderItem = ({ item, index }) => {
    return (
      <ExerciseVideoListItem item={item} index={index} indexFromModal={0} selectedIndex={selectedIndex} scrollToIndex={scrollToIndex}/>
    );
  };

  const onViewableItemsChanged = useCallback(({ viewableItems, changed }) => {
    if (changed[0].isViewable && selectedIndex !== changed[0].index) {
      setSelectedIndex(changed[0].index);
      setRestIsVisible(true)
    }
  }, []);

  return (
    <View>
      <FlatList
        ref={refList}
        data={data}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        pagingEnabled
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={{itemVisiblePercentThreshold: 60, waitForInteraction: true}}
      />
      <ExerciseCountdownModal isVisible={indexFromModal === null} colors={colors} workout={workout} exercise={exercise} setSelectedModalIndex={() => setIndexFromModal(0)}/>
      <RestModal isVisible={restIsVisible} setSelectedIndex={() => {
        setIndexFromModal(selectedIndex);
        setRestIsVisible(false);
      }}/>
    </View>
  );
};

export default ExerciseVideoList;
