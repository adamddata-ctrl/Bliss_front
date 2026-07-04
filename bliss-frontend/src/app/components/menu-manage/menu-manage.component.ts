import { Component, OnInit } from '@angular/core';
import { MenuService } from '../../services/menu.service';
import { MenuItem } from '../../models/menu-item';

@Component({
  selector: 'app-menu-manage',
  templateUrl: './menu-manage.component.html',
  styleUrls: ['./menu-manage.component.css']
})
export class MenuManageComponent implements OnInit {
   searchTerm: string = '';
   selectedCategory: string = '';

  items: MenuItem[] = [];

   totalItems: number = 0;
  totalMenuValue: number = 0;
  averagePrice: number = 0;
  currentItem: MenuItem = { name: '', category: '', price: 0, available: true , description:'', imageUrl:'' };

  selectedFile: File | null = null;

  constructor(private menuService: MenuService) { }
  ngOnInit(): void {
    this.loadMenu();
  }

  onFileSelected(event: any): void {
  if (event.target.files && event.target.files.length > 0) {
    this.selectedFile = event.target.files[0];
  }
}

  get filteredMenuItems() {
    return this.items.filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchesCategory = this.selectedCategory ? item.category === this.selectedCategory : true;
      return matchesSearch && matchesCategory;
    });
  }
  
  
  loadMenu(): void {
  this.menuService.getItems().subscribe(data => {
    this.items = data;

    // 🧮 Compute dashboard summary values here:
    this.totalItems = data.length;
    this.totalMenuValue = data.reduce((sum, item) => sum + (item.price || 0), 0);
    this.averagePrice = this.totalItems > 0 ? (this.totalMenuValue / this.totalItems) : 0;
  });
}
 saveItem(): void {
  // 🚨 1. Check if the user entered an invalid price
  if (!this.currentItem.price || this.currentItem.price <= 0) {
    alert("You cannot enter zero and negative number as price");
    return; // 🛑 Stops execution immediately so no request is sent
  }

  // 2. Your existing working logic continues seamlessly below
  const formData = new FormData();
  
  formData.append('item', new Blob([JSON.stringify(this.currentItem)], {
    type: 'application/json'
  }));

  if (this.selectedFile) {
    formData.append('file', this.selectedFile);
  }

  if (this.currentItem.id) {
    this.menuService.updateItem(this.currentItem.id, formData).subscribe(() => {
      this.resetForm();
      this.loadMenu();
    });
  } else {
    this.menuService.createItem(formData).subscribe(() => {
      this.resetForm();
      this.loadMenu();
    });
  }
}
 editItem(item: MenuItem): void {
    this.currentItem = { ...item };
  }

 deleteItem(id: number, name: string): void {
  // Triggers a browser confirm popup box before running the delete request
  if (confirm(`Are you sure you want to delete "${name}" from the menu?`)) {
    this.menuService.deleteItem(id).subscribe({
      next: () => {
        this.loadMenu(); // Refreshes the list instantly after deletion
      },
      error: (err) => console.error('Error deleting item:', err)
    });
  }
}

clearFilters(): void {
  this.searchTerm = '';
  this.selectedCategory = '';
}
  
  
  resetForm(): void {
  this.currentItem = { name: '', category: '', price: 0, available: true, description: '', imageUrl: '' };
  this.selectedFile = null;
  const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
  if (fileInput) {
    fileInput.value = '';
  }
}

}