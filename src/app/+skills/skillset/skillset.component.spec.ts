import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { SkillsetComponent } from './skillset.component';
import { CollapseManagerService } from '../../collapse-manager.service';

describe('Component: Skillset', () => {
  let fixture,
    component;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        SkillsetComponent
      ],
      providers: [
        CollapseManagerService
      ],
    }).compileComponents();
  });
  beforeEach(() => {
    fixture = TestBed.createComponent(SkillsetComponent);
    component = fixture.debugElement.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
    const node = fixture.debugElement.query(By.all());
    expect(node.nativeElement.innerHTML).not.toEqual('');
  });
});
