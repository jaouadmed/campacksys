/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { CampacksysTestModule } from '../../../test.module';
import { CategoryDetailComponent } from 'app/entities/category/category-detail.component';
import { Category } from 'app/shared/model/category.model';

describe('Component Tests', () => {
  describe('Category Management Detail Component', () => {
    let comp: CategoryDetailComponent;
    let fixture: ComponentFixture<CategoryDetailComponent>;
    const route = ({ data: of({ category: new Category(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [CampacksysTestModule],
        declarations: [CategoryDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(CategoryDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(CategoryDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.category).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
