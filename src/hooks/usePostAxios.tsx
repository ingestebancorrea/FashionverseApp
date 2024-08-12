import { useState } from 'react';
import { AxiosError } from 'axios';
import createApiInstance from '../api/apiInstance';

export const useAxiosPost = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [data, setData] = useState(null);

    const postData = async (baseUrl: string, complement: string, body: object) => {
        setIsLoading(true);
        try {
            const api = createApiInstance(baseUrl);
            const response = await api.post(complement, body);
            setData(response.data);
        } catch (error) {
            console.log(error);
            if (error instanceof AxiosError && error.response) {
                console.log(`Status: ${error.response.status}`);
                console.log(`Message: ${error.response.data.message}`);
                setError(error.response.data.message);
            }
        } finally {
            setIsLoading(false);
        }
    };

    return {
        isLoading,
        error,
        setError,
        data,
        postData,
    };
};
