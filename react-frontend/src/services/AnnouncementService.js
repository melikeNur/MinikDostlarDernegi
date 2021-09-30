import axios from 'axios'

const ANNOUNCEMENTS_REST_API_URL = 'http://localhost:8081/api/announcments';

class AnnouncementService {

    getAnnouncements(){
        return axios.get(ANNOUNCEMENTS_REST_API_URL);
    }
}

export default new AnnouncementService();