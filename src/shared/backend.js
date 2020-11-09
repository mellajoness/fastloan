import axios from "axios";
import {GET_SESSION_ID} from '../shared/storage'

 const loginBaseUrl = 'https://dtptest.fidelitybank.ng/MigoLoanService/api';
 const baseUrl='https://dtptest.fidelitybank.ng/LimitlessAPIGateway/api/loan/'

export async function  GET_SERVICE (endpoint) {
    const url = baseUrl + endpoint;  
    const headers = await setHeaders();
    try {
        return await axios.get(url, {headers});
    } catch (error) {
        return error.response;
    }
}


export async function POST_SERVICE(body, endpoint) {
    const url = baseUrl + endpoint;
    const headers = await setHeaders();

    try {
        return await axios.post(url, body, {headers});
    } catch (e) {
        return e.response;
    }
}

export async function  PATCH_SERVICE (endpoint) {
    const url = baseUrl + endpoint;
    const headers = await setHeaders();

    try {
        return await axios.patch(url, {headers});
    } catch (error) {
        return error.response;
    }
}

  
export async function  DELETE_SERVICE (endpoint) {
    const url = baseUrl + endpoint;
    const headers = await setHeaders();

    try {
        return await axios.delete(url, {headers});
    } catch (error) {
        return error.response;
    }
}


export async function lOGIN_POST_SERVICE(body, endpoint) {
    const url = loginBaseUrl + endpoint;
    const headers = await setHeaders();

    try {
        return await axios.post(url, body, {headers});
    } catch (e) {
        return e.response;
    }
}



async function setHeaders() {
    const sessionId = await GET_SESSION_ID();
    let headers;

    if (sessionId)
    {
        headers =
        {
            'Authorization': 'Bearer ' + sessionId,
            'Content-Type': 'application/json',
            'ChannelName': 'SUPA_APP',
            'APISecret': '567bf3bf232649d0b38e53df79976459'
        };
    }
    else
    {
        headers = {'Content-Type': 'application/json'};
    }

    return headers;
}
