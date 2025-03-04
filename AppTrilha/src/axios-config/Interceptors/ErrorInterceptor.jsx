
export const errorInterceptor = (error) => {
    if (error.message === "Network Error"){
        return Promise.reject(new Error("Erro de conexão."))
    }

    if (error.response?.status === 401){
        return Promise.reject(new Error("Erro de conexão."))
    }

    return Promise.reject(error);
}