import axios from 'axios'

const NEWS_REST_API_URL = 'http://localhost:8081/api/news';

class NewsService {

    getNews(){
        return axios.get(NEWS_REST_API_URL);
    }
}

export default new NewsService();