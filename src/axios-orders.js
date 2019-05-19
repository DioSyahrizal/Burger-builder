import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://burger-builder-2c373.firebaseio.com/'
});

export default instance;