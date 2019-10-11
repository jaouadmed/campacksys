import { Component, OnInit } from '@angular/core';
import { JhiLanguageService } from 'ng-jhipster';
import { Message } from 'primeng/components/common/api';
import { EventService } from './service/event.service';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

@Component({
  selector: 'jhi-fullcalendar',
  templateUrl: './fullcalendardemo.component.html',
  styles: []
})
export class FullCalendarDemoComponent implements OnInit {
  msgs: Message[] = [];
  activeIndex = 0;

  events: any[];

  options: any;

  header: any;

  constructor(private eventService: EventService) {}

  ngOnInit() {
    this.eventService.getEvents().subscribe((events: any) => {
      this.events = events.data;
    });

    this.options = {
      plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
      defaultDate: '2019-09-20',
      header: {
        left: 'prev,next',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek'
      },
      editable: true
    };
  }

  onChangeStep(label: string) {
    this.msgs.length = 0;
    this.msgs.push({ severity: 'info', summary: label });
  }
}
