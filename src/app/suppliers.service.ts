import { Supplier } from './supplier';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SuppliersService {

  url = "http://localhost:3000/Suppliers";

  constructor(private http: HttpClient) { }


  getSuppliers(): Observable<Supplier[]> {

      return this.http.get<Supplier[]>(this.url);
  }

  addSupplier(newSupplier : Supplier): Observable<Supplier> {
    return this.http.post<Supplier>(this.url, newSupplier);
  }

  updateSupplier(toBeUpdated : Supplier): Observable<void> {
    return this.http.put<void>(`${this.url}/${toBeUpdated.id}`,toBeUpdated);
  }

  removeSupplier(toBeDeleted : Supplier): Observable<void>{
    //this.http.delete<void>(this.url+"/"+toBeDeleted.id); same thing
    return this.http.delete<void>(`${this.url}/${toBeDeleted.id}`);
  }
}
