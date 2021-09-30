import axios from 'axios'

const FILES_REST_API_URL = 'http://localhost:8081/api/upload';

class UploadService {

    getFiles(){
        return axios.get(FILES_REST_API_URL);
    }
}

export default new UploadService();