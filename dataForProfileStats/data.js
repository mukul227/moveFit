import React from "react";
import Icons from "../constants/Icons";
import WakeUp from "../assets/icons/WakeUp.svg";

export const achievement = {
  id: 1,
  title: 'Congrats!',
  description: 'First week of program completed',
  icon: <Icons.Success width={62} height={44}/>
};

export const userStats = [
  {
    id: 1,
    title: 'Walking',
    icon: <Icons.Walking width={24} height={24} color={'#B43DA7'}/>,
    difference: 0,
    value: 0,
    unit: 'mi',
    color: '#B43DA7'
  },
  {
    id: 2,
    title: 'Heart',
    icon: <Icons.Heart width={24} height={24} color={'#BA4141'}/>,
    difference: 0,
    value: 0,
    unit: 'bpm',
    color: '#BA4141'
  },
  {
    id: 3,
    title: 'Sleep',
    icon: <Icons.Sleep width={24} height={24} color={'#1DA1F3'}/>,
    difference: 0,
    value: 0,
    unit: 'hrs',
    color: '#1DA1F3'
  },
  {
    id: 4,
    title: 'Steps',
    icon: <Icons.Walking width={24} height={24} color={'#1D9D9A'}/>,
    difference: 0,
    value: 0,
    unit: 'Steps',
    color: '#1D9D9A'
  }
];

export const workoutStats = [
  {
    id: 1,
    title: 'Time',
    icon: <Icons.WakeUp width={24} height={24} color={'#1DA1F3'}/>,
    value: 10,
    unit: 'hr',
    color: '#1DA1F3'
  },
  {
    id: 2,
    title: 'Heart',
    icon: <Icons.Heart width={24} height={24} color={'#BA4141'}/>,
    difference: 53,
    value: 72,
    unit: 'bpm',
    color: '#BA4141'
  },
  {
    id: 3,
    title: 'Active Calories',
    icon: <Icons.LocalFire width={24} height={24} color={'#FD6955'}/>,
    difference: 0,
    value: 240,
    unit: 'cal',
    color: '#FD6955'
  },
  {
    id: 4,
    title: 'Total Calories',
    icon: <Icons.Fire width={24} height={24} color={'#B43DA7'}/>,
    value: 410,
    unit: 'cal',
    color: '#B43DA7'
  }
];
