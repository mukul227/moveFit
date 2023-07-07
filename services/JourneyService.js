import ApiService from './ApiService';
import asyncStorageService from "./AsyncStorageService";

const ENDPOINTS = {
    GET_HABITS: 'habits',
    CREATE_HABIT: 'habits',
    COMPLETE_HABIT: 'habits/:id',
    DELETE_HABIT: 'habits/:id',
};

class JourneyService extends ApiService {

    getColorOptions = async () => {
        const options = await asyncStorageService.getItem('colorOptions');
        return options;
    };

    setColorOptions = async (colors) => {
        await asyncStorageService.setItem('colorOptions', colors);
    };

    getHabits = async () => {
        const { data } = await this.apiClient.get(ENDPOINTS.GET_HABITS);
        return data;
    }

    createHabit = async (obj) => {
        const { data } = await this.apiClient.post(ENDPOINTS.GET_HABITS, obj);
        return data;
    }

    completeHabit = async (id, date) => {
        const { data } = await this.apiClient.post(ENDPOINTS.COMPLETE_HABIT.replace(':id', id), date);
        return data;
    }

    deleteHabit = async (id) => {
        const { data } = await this.apiClient.delete(ENDPOINTS.DELETE_HABIT.replace(':id', id));
        return data;
    }

}

export const journeyService = new JourneyService();
