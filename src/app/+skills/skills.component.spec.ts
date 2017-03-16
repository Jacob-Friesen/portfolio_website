import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { SkillsComponent } from './skills.component';
import { SkillsetComponent } from './skillset';
import { CollapseManagerService } from '../collapse-manager.service';

describe('Component: Skills', () => {
  let fixture,
    component;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        SkillsetComponent,
        SkillsComponent
      ],
      providers: [
        CollapseManagerService
      ],
    }).compileComponents();
  });
  beforeEach(() => {
    fixture = TestBed.createComponent(SkillsComponent);
    component = fixture.debugElement.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
    const node = fixture.debugElement.query(By.all());
    expect(node.nativeElement.innerHTML).not.toEqual('');
  });
});
