import axios from 'axios';


//const baseUrl = "https://afternoon-garden-34249.herokuapp.com/api/persons";
const baseUrl = "/api/persons";

const getAll = () => {
    return axios.get(baseUrl);
}

const create = newObject => {
    return axios.post(baseUrl, newObject)
}

const update = (id, newObject) => {
    return axios.put(`${baseUrl}/${id}`, newObject)
}

const deletePerson = (id) => {
    return axios.delete(`${baseUrl}/${id}`);
}

export default {
    getAll,
    create,
    update,
    deletePerson
}