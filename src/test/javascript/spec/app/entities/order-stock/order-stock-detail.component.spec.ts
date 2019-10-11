/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { CampacksysTestModule } from '../../../test.module';
import { OrderStockDetailComponent } from 'app/entities/order-stock/order-stock-detail.component';
import { OrderStock } from 'app/shared/model/order-stock.model';

describe('Component Tests', () => {
  describe('OrderStock Management Detail Component', () => {
    let comp: OrderStockDetailComponent;
    let fixture: ComponentFixture<OrderStockDetailComponent>;
    const route = ({ data: of({ orderStock: new OrderStock(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [CampacksysTestModule],
        declarations: [OrderStockDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(OrderStockDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(OrderStockDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.orderStock).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
