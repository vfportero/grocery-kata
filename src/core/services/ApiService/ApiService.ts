import { ProductModel } from "../../models/ProductModel";
import axios, { AxiosResponse } from 'axios';

class ApiService {
    baseApiUrl = 'http://localhost:3000/grocery';

    getAllProducts() : Promise<AxiosResponse<ProductModel[]>> {
        return axios.get<ProductModel[]>(this.baseApiUrl)
    }
    getProductsPage(page: number) : Promise<AxiosResponse<ProductModel[]>> {
        return axios.get<ProductModel[]>(this.baseApiUrl, {
            params: {
                '_page': page, 
                '_limit': 16
            }
        })
    }
}

export default new ApiService();