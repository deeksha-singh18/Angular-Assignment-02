import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuickCreateProductComponent } from './quick-create-product.component';

describe('QuickCreateProductComponent', () => {
  let component: QuickCreateProductComponent;
  let fixture: ComponentFixture<QuickCreateProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuickCreateProductComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuickCreateProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
