import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NewPlacePage } from './new-place.page';

describe('NewPlacePage', () => {
  let component: NewPlacePage;
  let fixture: ComponentFixture<NewPlacePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NewPlacePage],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NewPlacePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
