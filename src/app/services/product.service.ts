import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Product } from '../models/product.model';
import {AngularFirestore,AngularFirestoreCollection} from '@angular/fire/compat/firestore';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  public products: Observable<Product[]>;
  public pos = 0;
  public productwhere: Product = {
    id: "",
    name: "",
    price: 0,
    description: "",
    type: "",
    photo: ""
  };
  public productCollection:AngularFirestoreCollection<Product>;

  constructor(private firestore: AngularFirestore) {
    // this.products.push({
    //   name: "Aguacate",
    //   price: 100,
    //   description: "Lorem ipsum dolor sit amet.",
    //   type: "Frutas y Verduras",
    //   photo: "https://picsum.photos/500/300?random",
    // });
    // this.products.push({
    //   name: "Coca Cola",
    //   price: 20,
    //   description: "Lorem ipsum dolor sit amet.",
    //   type: "Abarrotes",
    //   photo: "https://picsum.photos/500/300?random"
    // });
    // this.products.push({
    //   name: "Jabón Zote",
    //   price: 40,
    //   description: "Lorem ipsum dolor sit amet.",
    //   type: "Limpieza",
    //   photo: "https://picsum.photos/500/300?random"
    // });
    // this.products.push({
    //   name: "Aspirina",
    //   price: 50,
    //   description: "Lorem ipsum dolor sit amet.",
    //   type: "Farmacia",
    //   photo: "https://picsum.photos/500/300?random"
    // });
    this.productCollection = this.firestore.collection<Product>('products');
    this.products = this.productCollection.valueChanges()
  }


  //GUARDAR EN FIREBASE
  saveProduct(product: Product): Promise<string> {
    // this.products.push(product);
    return this.productCollection.add(product)
      .then((doc)=>{
        console.log('Producto Añadido con id'+ doc.id);
        product.id = doc.id;
        return 'success'
      })
      .catch((error)=>{
        console.log('Error al añadir producto'+ error);
        return 'Error'
      });
  }
  updateProduct(product:Product):Promise<string>{
    return this.productCollection.doc(product.id).update(product)
    .then((doc)=>{
      console.log('Producto actualizado con id'+ product.id);

      return 'success'
    })
    .catch((error)=>{
      console.log('Error al actualizar producto'+ error);
      return 'Error'
    });
  }

  //Eliminar 
  deleteProduct(product:Product):Promise<string>{
    return this.productCollection.doc(product.id).delete()
    .then((doc)=>{
      console.log('Producto eliminado con id'+ product.id);
      return 'success'
    })
    .catch((error)=>{
      console.log('Error al eliminar producto'+ error);
      return 'Error'
    });
  }
  //OBTENER DE FIREBASE
  getProducts(): Observable<Product[]> {
    // return of(this.products);
    return this.products;
  }
}
