import { Component} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Category } from 'src/app/models/category';
import { CategoriesService } from 'src/app/services/categories.service';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss']
})
export class CategoryFormComponent{
categoryForm!:FormGroup;
categoryToUpdate:Category| null = null;
  

get isEditting():boolean{
  return this.categoryToUpdate !== null;
}
constructor(
  private formBuilder:FormBuilder,
  private categoriesService:CategoriesService,
  private toastrService: ToastrService,
  private activatedRoute: ActivatedRoute,
  private router:Router
){}
ngOnInit(): void {
  this.createCategoryForm();
  this.getCategoryIdFromRoute();
}
createCategoryForm() {
  this.categoryForm = this.formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    description: ['', [Validators.required, Validators.minLength(2)]],
  });
}

onCategoryFormSubmit(): void {
  if (this.categoryForm.invalid) {
    this.toastrService.error('Please fill in the form correctly');
    return;
  }
  if (this.isEditting) this.update();
  else this.add();
}

add(): void {
  const request: Category = {
    ...this.categoryForm.value,
    name: this.categoryForm.value.name.trim(),
  };
  this.categoriesService.add(request).subscribe((response) => {
    this.toastrService.success('Category added successfully');
    this.router.navigate(['/dashboard', 'category', 'edit', response.id]);
  });
}
getCategoryIdFromRoute(): void {
  this.activatedRoute.params.subscribe((params) => {
    if (params['categoryId']) this.getCategoryById(params['categoryId']);
  });
}

getCategoryById(categoryId: number) {
  this.categoriesService.getById(categoryId).subscribe({
    next: (response) => {
      this.categoryToUpdate = response;
      this.categoryForm.patchValue(this.categoryToUpdate);
    },
    error: () => {
      this.toastrService.error('Category not found');
      this.router.navigate(['/dashboard', 'category']);
    },
  });
}

  
update(): void {
  const request: Category = {
    id: this.categoryToUpdate!.id,
    description: this.categoryForm.value.description,
    name: this.categoryForm.value.name.trim(),
  };
  this.categoriesService.update(request).subscribe((response) => {
    this.categoryToUpdate = response;
    this.toastrService.success('Category updated successfully');
  });
}
onDeleteCategory() {
  if (confirm('Are you sure you want to delete this category?') === false)
    return;
  this.delete();
}

delete(): void {
  this.categoriesService.delete(this.categoryToUpdate!.id).subscribe(() => {
    this.toastrService.success('Category deleted successfully');
    this.router.navigate(['/dashboard', 'category']);
  });
}
}



