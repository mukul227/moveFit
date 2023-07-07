import ApiService from './ApiService';

const ENDPOINTS = {
    GET_EVENTS: 'events',
    CREATE_EVENT: 'events',
    MOVE_WORKOUT: 'scheduled-workouts/reschedule/:id',
};

class CalendarService extends ApiService {

    getEvents = async (date) => {
        const { data } = await this.apiClient.get( date ? (ENDPOINTS.GET_EVENTS + '/' + date) : ENDPOINTS.GET_EVENTS);
        return data;
    }

    createEvent = async (obj) => {
        const { data } = await this.apiClient.post(ENDPOINTS.GET_EVENTS, obj);
        return data;
    }

    moveWorkout = async (id, obj) => {
        const { data } = await this.apiClient.put(ENDPOINTS.MOVE_WORKOUT.replace(':id', id), obj);
        return data;
    }
}

export const calendarService = new CalendarService();
