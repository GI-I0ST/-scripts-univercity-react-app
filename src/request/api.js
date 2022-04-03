import axios from "axios"

const host = "https://university-node-web-app.herokuapp.com";

class Api {
    getAllGroups() {
        return axios.get(host + '/group')
            .then((response) => {
                return response.data
            });
    }

    getGroup(groupId) {
        return axios.get(host + '/group?id=' + groupId)
            .then((response) => {
                return response.data
            });
    }

    editGroup(id, name) {
        return axios.put(host + '/group', {
            id: id,
            name: name
        })
            .then((response) => {
                console.log('edited', response.data)
                return response.data
            }).catch(err => {
                console.log('err', err);
            });
    }

    newGroup(name) {
        return axios.post(host + '/group', {
            name: name
        })
            .then((response) => {
                console.log('new group 1', response.data)
                return response.data
            }).catch(err => {
                console.log('err', err);
            });
    }
}

export default new Api();