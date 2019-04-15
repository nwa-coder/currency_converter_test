import axios from 'axios';

const BASE_URL='http://apilayer.net/api/';

export default axios.create({
    baseURL:BASE_URL,
    headers:{

    }
})