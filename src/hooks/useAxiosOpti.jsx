import axios from "axios";
import { useState } from "react";

const baseUrl = 'https://api.themoviedb.org/3/'

const api = axios.create(
    {baseURL: baseUrl}
);

api.interceptors.request.use(
  (config) => new Promise((resolve) => setTimeout(() => resolve(config), 2000))
);

export const useAxiosOpti = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleRequest = async (requestFunction, ...args) => {
        setLoading(true)
        try {
            const response = await requestFunction(...args)
            setLoading(false)
            return response
        }
        catch (err) {
            setLoading(false)
            setError(err)
            throw err
        }
    }

    const get = (endpoint) => handleRequest(api.get, endpoint)
    const post = (endpoint, data) => handleRequest(api.post, endpoint, data)
    const put = (endpoint, id, data) => handleRequest(api.post, `${endpoint}/${id}` , data)
    const remove = (endpoint, id) => handleRequest(api.delete, `${endpoint}/${id}`)

    return {
        loading,
        error,
        get,
        post,
        put,
        remove,
    }

}