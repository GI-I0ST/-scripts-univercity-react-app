import axios from "axios"

const host = "http://localhost:3000";

class Api {
    getAllGroups() {
        return axios.get(host + '/group')
            .then((response) => {
                return response.data
            });
    }
}

export default new Api();