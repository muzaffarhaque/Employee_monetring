import axios from 'axios';

const commonGetApi = async (url) => {
    try {
        const res = await axios.get(url);
        return res;
    } catch (error) {
        return error;
    }
};

export default commonGetApi;

export const commonAllAuthApi = async (url='',data='',method='get',obj={}) => {
    try {
        const res = await axios?.[method](url,data,obj);
        return res;
    } catch (error) {
        return error;
    }
};