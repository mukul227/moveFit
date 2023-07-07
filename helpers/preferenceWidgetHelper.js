import React from 'react';
import Icons from "../constants/Icons";

class PreferenceWidgetHelper {
  getLocationTitle(location) {
    switch (location) {
      case 'home':
        return 'At Home';

      case 'gym':
        return 'At the Gym';

      case 'outdoors':
        return 'Outdoors';
    }
  };

  getPreferenceTitle (preference) {
    switch (preference) {
      case 'bodyWeight':
        return 'Body Weight';

      case 'liftWeights':
        return 'Lift Weights';

      case 'hitWorkout':
        return 'HIIT Workout';
    }
  };

  getFitnessLevelTitle (fitnessLevel) {
    return fitnessLevel[0].toUpperCase() + fitnessLevel.slice(1).toLowerCase();
  }

  getFitnessLevelIcon (fitnessLevel, colors) {
    if (fitnessLevel === 'beginner') {
      return <Icons.BI color={colors.primaryColor} height={24}/>
    } else if (fitnessLevel === 'intermediate') {
      return <Icons.IA color={colors.primaryColor} height={24}/>
    } else {
      return <Icons.AA color={colors.primaryColor} height={24}/>
    }
  };
}

export const preferenceWidgetHelper = new PreferenceWidgetHelper();
