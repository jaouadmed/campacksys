/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { CampacksysTestModule } from '../../../test.module';
import { DurationDetailComponent } from 'app/entities/duration/duration-detail.component';
import { Duration } from 'app/shared/model/duration.model';

describe('Component Tests', () => {
  describe('Duration Management Detail Component', () => {
    let comp: DurationDetailComponent;
    let fixture: ComponentFixture<DurationDetailComponent>;
    const route = ({ data: of({ duration: new Duration(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [CampacksysTestModule],
        declarations: [DurationDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(DurationDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(DurationDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.duration).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
