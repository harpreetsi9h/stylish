import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { User } from "../_models";

@Injectable({ providedIn: "root" })
export class UserService {
  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<User[]>(`/users`);
  }

  register(user: User) {
    return this.http.post(`http://localhost:2400/api/auth/signup`, user);
  }

  delete(id: number) {
    return this.http.delete(`/users/${id}`);
  }

  addOrder(data: any) {
    return this.http.post(`http://localhost:2400/api/order/create`, data);
  }
  getOrders(id: any) {
    return this.http.get(`http://localhost:2400/api/order/get/${id}`);
  }

  
  getProduct(data: any) {
    return this.http.post(`http://localhost:2400/api/product/get`,data);
  }
  getProductByID(id: any) {
    return this.http.get(`http://localhost:2400/api/product/get/${id}`);
  }
  addProduct(data: any) {
    return this.http.post(`http://localhost:2400/api/product/add`,data);
  }
  editProduct(data: any) {
    return this.http.post(`http://localhost:2400/api/product/edit`,data);
  }
  deleteProduct(id: any) {
    return this.http.get(`http://localhost:2400/api/product/delete/${id}`);
  }
}
