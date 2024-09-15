import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return true for valid credentials', (done: DoneFn) => {
    service.authenticate('uner@gmail.com', 'password123').subscribe(isAuthenticated => {
      expect(isAuthenticated).toBeTrue();
      done();
    });
  });

  it('should return false for invalid credentials', (done: DoneFn) => {
    service.authenticate('invalid@gmail.com', 'wrongpassword').subscribe(isAuthenticated => {
      expect(isAuthenticated).toBeFalse();
      done();
    });
  });
});
