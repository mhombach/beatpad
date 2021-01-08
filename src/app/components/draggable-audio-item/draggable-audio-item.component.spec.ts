import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DraggableAudioItemComponent } from './draggable-audio-item.component';

describe('DraggableAudioItemComponent', () => {
  let component: DraggableAudioItemComponent;
  let fixture: ComponentFixture<DraggableAudioItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DraggableAudioItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DraggableAudioItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
