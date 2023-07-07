import ApiService from './ApiService';
import Fitness from "@ovalmoney/react-native-fitness";


const permissions = [
    { kind: Fitness.PermissionKinds.Steps, access: Fitness.PermissionAccesses.Write },
    { kind: Fitness.PermissionKinds.Steps, access: Fitness.PermissionAccesses.Read },
    { kind: Fitness.PermissionKinds.SleepAnalysis, access: Fitness.PermissionAccesses.Write },
    { kind: Fitness.PermissionKinds.SleepAnalysis, access: Fitness.PermissionAccesses.Read },
    { kind: Fitness.PermissionKinds.Calories, access: Fitness.PermissionAccesses.Write },
    { kind: Fitness.PermissionKinds.Calories, access: Fitness.PermissionAccesses.Read },
    { kind: Fitness.PermissionKinds.Distances, access: Fitness.PermissionAccesses.Write },
    { kind: Fitness.PermissionKinds.Distances, access: Fitness.PermissionAccesses.Read },
    { kind: Fitness.PermissionKinds.HeartRate, access: Fitness.PermissionAccesses.Write },
    { kind: Fitness.PermissionKinds.HeartRate, access: Fitness.PermissionAccesses.Read },
];

class HealthService extends ApiService {


    appleHealthInit = async () => {
        const res = await Fitness.isAuthorized(permissions);
        return res;
    }

    requestPermission = async () => {
        const res = await Fitness.requestPermissions(permissions);
        return res;
    }

    getStepCounts = async (startDate, endDate) => {

        let options = {
            startDate: startDate || new Date().toISOString(),
            endDate: endDate || new Date().toISOString(),
        }
        const res = await Fitness.getSteps(options)
        return res;
    }

    getHeartRate = async (startDate, endDate) => {

        let options = {
            startDate: startDate || new Date().toISOString(),
            endDate: endDate || new Date().toISOString(),
            // interval:'minute'
        }
        const res = await Fitness.getHeartRate(options)
        return res;
    }

    getSleep = (startDate, endDate) => {
        let options = {
            startDate: startDate || new Date().toISOString(),
            endDate: endDate || new Date().toISOString(),
        }
        const res = Fitness.getSleepAnalysis(options)
        return res;
    }


    getDistance = (startDate, endDate) => {
        let options = {
            startDate: startDate || new Date().toISOString(),
            endDate: endDate || new Date().toISOString(),
        }
        const res = Fitness.getDistances(options)
        return res;
    }
}

export const healthService = new HealthService();
