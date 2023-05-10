import axios from "axios";
export async function callApi(url, options = {}) {
    const response = await axios.get(url, options);
    return response;
}