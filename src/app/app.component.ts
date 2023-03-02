import { Component, OnInit, ViewChild } from '@angular/core';
import { Product } from './product';
import { ProductService } from './product.service';
import { MessageService } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ProductService, MessageService, ConfirmationService]
})
export class AppComponent implements OnInit {
  products: Product[] = [];

  selectedProduct: Product = {} as Product;

  displayAddDialog: boolean = false;

  displayEditDialog: boolean = false;

  displayDeleteDialog: boolean = false;

  newProduct: Product = {} as Product;

  @ViewChild('dt') dt: Table | undefined;

  options: any;

  overlays: any[] = [];

  constructor(private productService: ProductService, private messageService: MessageService, private confirmationService: ConfirmationService) {}

  ngOnInit(): void {
    this.getProducts();
    this.options = {
      center: {lat: 36.890257, lng: 30.707417},
      zoom: 12
    };
  }

  applyFilterGlobal($event: any, stringVal: any) {
    this.dt!.filterGlobal(($event.target as HTMLInputElement).value, stringVal);
  }

  getProducts(): void {
    this.productService.getProducts().subscribe(products => this.products = products);
  }

  showDialogToAdd(): void {
    this.newProduct = {} as Product;
    this.displayAddDialog = true;
  }

  save(): void {
    this.productService.createProduct(this.newProduct).subscribe(() => {
      this.messageService.add({severity:'success', summary:'Éxito', detail:'Producto agregado correctamente'});
      this.getProducts();
      this.displayAddDialog = false;
    }, error => {
      this.messageService.add({severity:'error', summary:'Error', detail:'Error al agregar el producto'});
    });
  }

  edit(product: Product): void {
    this.selectedProduct = {...product};
    this.displayEditDialog = true;
  }

  update(): void {
    this.productService.updateProduct(this.selectedProduct).subscribe(() => {
      this.messageService.add({severity:'success', summary:'Éxito', detail:'Producto actualizado correctamente'});
      this.getProducts();
      this.displayEditDialog = false;
    }, error => {
      this.messageService.add({severity:'error', summary:'Error', detail:'Error al actualizar el producto'});
    });
  }

  deleteConfirmation(product: Product): void {
    this.selectedProduct = {...product};
    this.confirmationService.confirm({
      message: '¿Está seguro de que desea eliminar este producto?',
      accept: () => {
        this.delete();
      }
    });
  }

  delete(): void {
    this.productService.deleteProduct(this.selectedProduct.product_id).subscribe(() => {
      this.messageService.add({severity:'success', summary:'Éxito', detail:'Producto eliminado correctamente'});
      this.getProducts();
      this.displayDeleteDialog = false;
    }, error => {
      this.messageService.add({severity:'error', summary:'Error', detail:'Error al eliminar el producto'});
    });
  }
}
