import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisableGroupComponent } from './disable-group.component';

describe('DisableGroupComponent', () => {
  let component: DisableGroupComponent;
  let fixture: ComponentFixture<DisableGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisableGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisableGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
