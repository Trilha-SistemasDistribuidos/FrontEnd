import axios from "axios";
import { errorInterceptor, responseInterceptor } from "./Interceptors";

// Definição das URLs base
const BASE_URLS = {
  apiUser:  "http://127.0.0.1:8001",
  apiTrilhas:  "http://127.0.0.1:8002",
  apiAgendamentos:  "http://127.0.0.1:8003",
  apiReview:  "http://127.0.0.1:8004",
  apiCategoria:  "http://127.0.0.1:8005",
};

// Criar instâncias de axios para cada API
const createApiInstance = (baseURL) => {
  const instance = axios.create({ baseURL });

  instance.interceptors.response.use(
    (response) => responseInterceptor(response),
    (error) => errorInterceptor(error)
  );

  return instance;
};

// Exportando instâncias específicas para cada API
export const ApiUser = createApiInstance(BASE_URLS.apiUser);
export const ApiTrilhas = createApiInstance(BASE_URLS.apiTrilhas);
export const ApiAgendamentos = createApiInstance(BASE_URLS.apiAgendamentos);
export const ApiReview = createApiInstance(BASE_URLS.apiReview);
export const ApiCategoria = createApiInstance(BASE_URLS.apiCategoria);
