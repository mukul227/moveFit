import ApiService from './ApiService';

const ENDPOINTS = {
  GET_PROGRAM: 'programs/:programId',
  GET_PROGRAMS_FOR_HOME_PAGE: 'programs/for-home-page',
  START_PROGRAM: 'programs/start/:programId'
};

class ProgramsService extends ApiService {
  getProgram = async (programId) => {
    const { data } = await this.apiClient.get(ENDPOINTS.GET_PROGRAM.replace(':programId', programId));
    return data;
  };

  getProgramsForHomePage = async () => {
    const { data } = await this.apiClient.get(ENDPOINTS.GET_PROGRAMS_FOR_HOME_PAGE);
    return data;
  }

  startProgram = async (programId) => {
    const { data } = await this.apiClient.post(ENDPOINTS.START_PROGRAM.replace(':programId', programId));
    return data;
  }
}

export const programsService = new ProgramsService();
