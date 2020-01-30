import { ProductModel } from "../../models/ProductModel";
import axios, { AxiosResponse } from 'axios';

class ApiService {
    
    getAllProducts() : Promise<AxiosResponse<Array<ProductModel>>> {
        return axios.get<Array<ProductModel>>('http://localhost:3000/grocery')
    }
}

export default new ApiService();