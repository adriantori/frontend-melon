import { useState, useCallback, useRef, useEffect } from "react";

export const useHttpClient = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();
    const [success, setSuccess] = useState();

    const activeHttpRequests = useRef([]);

    const sendRequest = useCallback (async (url, method = 'GET', body = null, headers = {}) => {
        setIsLoading(true);
        const httpAbortController = new AbortController();
        activeHttpRequests.current.push(httpAbortController);
        try{
            const response = await fetch(url, {
                method,
                body,
                headers,
                signal: httpAbortController.signal
            });
    
            const responseData = await response.json();

            activeHttpRequests.current = activeHttpRequests.current.filter(requestController => requestController !== httpAbortController);
    
            if (!response.ok) {
                throw new Error(responseData.message);
            }
            
            setIsLoading(false);
            setSuccess("login sukses");
            return responseData;
        }catch(err){
            setError(err.message);
            setIsLoading(false);
            throw err;
        }
    }, []);

    const clearError = () => {
        setError(null);
    };

    const clearSuccess = () => {
        setSuccess(null);
    };

    useEffect(() => {
        return() => {
            activeHttpRequests.current.forEach(AbortController => AbortController.abort());
        };
    }, []); //never continue request if component gone

    return { isLoading, error, sendRequest, clearError, success, clearSuccess };
};