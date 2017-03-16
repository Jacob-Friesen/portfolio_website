import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ExperienceComponent } from './experience.component';
import { CollapseManagerService } from '../collapse-manager.service';

describe('Component: Experience', () => {
  let fixture,
    component;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        ExperienceComponent
      ],
      providers: [
        CollapseManagerService
      ],
    }).compileComponents();
  });
  beforeEach(() => {
    fixture = TestBed.createComponent(ExperienceComponent);
    component = fixture.debugElement.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
    const node = fixture.debugElement.query(By.all());
    expect(node.nativeElement.innerHTML).not.toEqual('');
  });
});
