import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogListeComponent } from './dialog-liste.component';

describe('DialogListeComponent', () => {
  let component: DialogListeComponent;
  let fixture: ComponentFixture<DialogListeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogListeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogListeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
