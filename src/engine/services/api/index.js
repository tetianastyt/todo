import axios from 'axios';

class Api {
    constructor() {
        this.http = axios.create({ baseURL: 'http://localhost:3004' });
    }

    static getInstance() {
        if (!Api.instance) {
            Api.instance = new Api();
        }
        return Api.instance;
    }

    getData() {
        return this.http.get('/tasks');
    }

    postData(data) {
        return this.http.post('/tasks', { "task": data, "statusIsDone": false });
    }

    deleteData(id) {
        return this.http.delete('/tasks/' + id)
            .catch(error => console.log(error));
    };

    editData(id, data, status) {
        return this.http.put('/tasks/' + id, {task: data, statusIsDone: status})
            .catch(error => console.log(error));
    };

}

export default Api.getInstance();
