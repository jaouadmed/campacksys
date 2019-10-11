/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { CampacksysTestModule } from '../../../test.module';
import { ItemLineDetailComponent } from 'app/entities/item-line/item-line-detail.component';
import { ItemLine } from 'app/shared/model/item-line.model';

describe('Component Tests', () => {
  describe('ItemLine Management Detail Component', () => {
    let comp: ItemLineDetailComponent;
    let fixture: ComponentFixture<ItemLineDetailComponent>;
    const route = ({ data: of({ itemLine: new ItemLine(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [CampacksysTestModule],
        declarations: [ItemLineDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(ItemLineDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ItemLineDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.itemLine).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
