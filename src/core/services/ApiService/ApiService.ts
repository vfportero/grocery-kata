import { ProductModel } from "../../models/ProductModel";
import axios, { AxiosResponse } from 'axios';

class ApiService {
    
    getAllProducts() : Promise<AxiosResponse<ProductModel[]>> {
        return axios.get<ProductModel[]>('http://localhost:3000/grocery')
    }
}

export default new ApiService();