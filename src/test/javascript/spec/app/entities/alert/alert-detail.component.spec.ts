/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { CampacksysTestModule } from '../../../test.module';
import { AlertDetailComponent } from 'app/entities/alert/alert-detail.component';
import { Alert } from 'app/shared/model/alert.model';

describe('Component Tests', () => {
  describe('Alert Management Detail Component', () => {
    let comp: AlertDetailComponent;
    let fixture: ComponentFixture<AlertDetailComponent>;
    const route = ({ data: of({ alert: new Alert(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [CampacksysTestModule],
        declarations: [AlertDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(AlertDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(AlertDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.alert).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
