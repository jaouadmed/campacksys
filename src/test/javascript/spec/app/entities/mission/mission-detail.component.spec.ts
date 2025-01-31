/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { CampacksysTestModule } from '../../../test.module';
import { MissionDetailComponent } from 'app/entities/mission/mission-detail.component';
import { Mission } from 'app/shared/model/mission.model';

describe('Component Tests', () => {
  describe('Mission Management Detail Component', () => {
    let comp: MissionDetailComponent;
    let fixture: ComponentFixture<MissionDetailComponent>;
    const route = ({ data: of({ mission: new Mission(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [CampacksysTestModule],
        declarations: [MissionDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(MissionDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(MissionDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.mission).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
