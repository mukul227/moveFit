import React from "react";
import Icons from "../constants/Icons";

export const whatBringsYuToMoveFit = [
  {
    id: 1,
    title: 'Lose Weight',
    selected: true
  },
  {
    id: 2,
    title: 'Build Muscle',
    selected: false
  },
  {
    id: 3,
    title: 'Bulk',
    selected: false
  },
  {
    id: 4,
    title: 'Intense Cardio',
    selected: false
  },
  {
    id: 5,
    title: 'Gain Strength',
    selected: false
  }
];

export const preferWorkout = [
  {
    id: 1,
    title: 'At Home',
    value: 'home',
    selected: true,
    icon: <Icons.House style={{marginRight: 15}}/>
  },
  {
    id: 2,
    title: 'At the Gym',
    value: 'gym',
    selected: false,
    icon: <Icons.Barbell style={{marginRight: 15}}/>
  },
  // {
  //   id: 3,
  //   title: 'Outdoors',
  //   value: 'outdoors',
  //   selected: false,
  //   icon: <Icons.Gym style={{marginRight: 15}}/>
  // }
];

export const typeOfWorkout = [
  {
    id: 1,
    title: 'Bodyweight',
    value: 'bodyWeight',
    selected: true,
  },
  {
    id: 2,
    title: 'List Weights',
    value: 'liftWeights',
    selected: false,
  },
  {
    id: 3,
    title: 'HIIT Workout',
    value: 'hitWorkout',
    selected: false,
  }
];

export const fitnessLevel = [
  {
    id: 1,
    title: 'Beginner',
    value: 'beginner',
    selected: true,
    icon: <Icons.BA color={'#32A1C7'} style={{marginRight: 15}}/>
  },
  {
    id: 2,
    title: 'Intermediate',
    value: 'intermediate',
    selected: false,
    icon: <Icons.IA color={'#32A1C7'} style={{marginRight: 15}}/>
  },
  {
    id: 3,
    title: 'Advanced',
    value: 'advanced',
    selected: false,
    icon: <Icons.AA color={'#32A1C7'} style={{marginRight: 15}}/>
  }
];

export const subscription = [
  {
    id: 1,
    title: 'Monthly',
    price: 17.99,
    type: 'month',
    selected: false,
    productId: 'move.monthly.subscription'
  },
  {
    id: 2,
    title: '3 months',
    price: 44.99,
    perMonth: 14.99,
    topView: 'Most Popular',
    type: '3months',
    selected: true,
    productId: 'move.3_months.subscription'
  },
  {
    id: 3,
    title: '6 months',
    price: 77.99,
    perMonth: 12.99,
    type: '6months',
    selected: false,
    productId: 'move.6_months.subscription'
  },
  {
    id: 4,
    title: '1 year',
    price: 119.99,
    perMonth: 9.99,
    topView: 'Most Saving',
    type: 'year',
    selected: false,
    productId: 'move.1_year.subscription'
  }
];
