import { ProductModel } from "../../models/ProductModel";
import axios, { AxiosResponse } from 'axios';

class ApiService {
    baseApiUrl = 'http://localhost:3000/grocery';

    getAllProducts() : Promise<AxiosResponse<ProductModel[]>> {
        return axios.get<ProductModel[]>(this.baseApiUrl)
    }
    getFavoriteProducts() : Promise<AxiosResponse<ProductModel[]>> {
        return axios.get<ProductModel[]>(this.baseApiUrl, {
            params: {
                favorite:1
            }
        })
    }
    getProductsPage(page: number) : Promise<AxiosResponse<ProductModel[]>> {
        return axios.get<ProductModel[]>(this.baseApiUrl, {
            params: {
                '_page': page, 
                '_limit': 16
            }
        })
    }
    patchProduct(productId: string, product: ProductModel): Promise<AxiosResponse> {
        return axios.patch(`${this.baseApiUrl}/${productId}`, product);
    }
}

export default new ApiService();