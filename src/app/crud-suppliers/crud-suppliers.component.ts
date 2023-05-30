import { SuppliersService } from './../suppliers.service';
import { Supplier } from './../supplier';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-crud-suppliers',
  templateUrl: './crud-suppliers.component.html',
  styleUrls: ['./crud-suppliers.component.css']
})
export class CrudSuppliersComponent {
  lista: Supplier[] = [];
  formGroupSupplier : FormGroup;
  updating: number = -1;

  constructor (private service: SuppliersService, formBuilder: FormBuilder){
    this.formGroupSupplier = formBuilder.group({
      id : [''],
      name : [''],
      active : [''],
      category : [''],
      contact : ['']
    });
  }

  ngOnInit(): void {
    this.loadList();
  }

  loadList(){
      this.service.getSuppliers().subscribe(
        {
            next:  data =>  this.lista = data,
            error: msg  => console.log("Erro ao chamar o endpoint " + msg)
        }
      )
  }

  salvar() {
    if(this.updating < 0)
      this.service.addSupplier(this.formGroupSupplier.value).subscribe({
        next: data => {
          this.lista.push(data);
          this.formGroupSupplier.reset();
          this.updating = -1;
        }
      });
    else
      this.service.updateSupplier(this.formGroupSupplier.value).subscribe({
        next : () => {
          this.lista[this.updating] = this.formGroupSupplier.value;
          this.formGroupSupplier.reset();
          this.updating = -1;
        }
      });
  }

  excluir(target : Supplier, index : number)
  {
    if(this.updating >= 0)
      alert("Finalize edição primeiramente!");
    else
      this.service.removeSupplier(target).subscribe({
        next: () => this.lista.splice(index, 1)
      });
  }

  alterar(target : Supplier, index : number)
  {
    this.updating = index;
    this.formGroupSupplier.setValue(target);
  }
}
