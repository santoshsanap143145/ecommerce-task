import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Iproduct } from "../models/product";




@Injectable({
    providedIn: 'root'
})
export class ProductService{
    BASE_URL: string = environment.baseUrl
    PRODUCTS_URL : string = `${this.BASE_URL}/products`
    constructor(private _http: HttpClient){}

    fetchAllProducts(): Observable<Array<Iproduct>>{
        return this._http.get<Array<Iproduct>>(this.PRODUCTS_URL)
    }

    getProduct(prodId: string): Observable<Iproduct>{
        return this._http.get<Iproduct>(`${this.PRODUCTS_URL}/${prodId}`)!
    }
}