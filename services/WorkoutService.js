import ApiService from './ApiService';

const ENDPOINTS = {
  GET_WORKOUT: 'workouts/:workoutId',
  COMPLETE_WORKOUT: 'workouts/complete/:workoutId',
  SHARE_WORKOUT: 'workouts/share',
  SEND_FEEDBACK: 'feedbacks'
};

class WorkoutService extends ApiService {
  getWorkout = async (workoutId) => {
    const { data } = await this.apiClient.get(ENDPOINTS.GET_WORKOUT.replace(':workoutId', workoutId));
    return data;
  };

  shareWorkout = async () => {
    const { data } = await this.apiClient.put(ENDPOINTS.SHARE_WORKOUT);
    return data;
  };

  sendFeedback = async (feedback) => {
    const { data } = await this.apiClient.post(ENDPOINTS.SEND_FEEDBACK, feedback);
    return data;
  };

  completeWorkout = async (workoutId, weekId) => {
    const programWeek = {
      programWeekId: weekId
    }
    const { data } = await this.apiClient.put(ENDPOINTS.COMPLETE_WORKOUT.replace(':workoutId', workoutId), programWeek);
    return data;
  };
}

export const workoutService = new WorkoutService();
