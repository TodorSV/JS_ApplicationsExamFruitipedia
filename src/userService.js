import { api } from "./api.js";
import { userHelper } from "./userHelper.js";

const userEndPoints = {
   login:'users/login',
   register:'users/register',
    logout:'users/logout'
}

async function register(email, password) {
    
    const data = await api.post(userEndPoints.register, {email, password});
    userHelper.setUserData(data);
}

async function login(email, password) {
    const data = await api.post(userEndPoints.login, {email, password});
    userHelper.setUserData(data);
}

async function logout() {
     const result = await api.get(userEndPoints.logout);
    return result;
}

export const userService = {
    register,
    login,
    logout
}

