const handleResponse = (response) => {
    if (!response.ok || ![2].includes(Array.from(String(response.status), Number)[0])) {
        return Promise.reject(response);
    }

    return response;
};

export default handleResponse;
