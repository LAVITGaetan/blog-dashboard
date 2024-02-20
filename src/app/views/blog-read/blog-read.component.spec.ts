import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogReadComponent } from './blog-read.component';

describe('BlogReadComponent', () => {
  let component: BlogReadComponent;
  let fixture: ComponentFixture<BlogReadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlogReadComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BlogReadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
