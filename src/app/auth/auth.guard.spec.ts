import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let authService: AuthService;
  let router: Router;

  beforeEach(() => {
    const authServiceStub = {
      authenticate: (email: string, password: string) => of(true)
    };

    const routerStub = {
      navigate: jasmine.createSpy('navigate')
    };

    TestBed.configureTestingModule({
      providers: [
        AuthGuard,
        { provide: AuthService, useValue: authServiceStub },
        { provide: Router, useValue: routerStub }
      ]
    });

    guard = TestBed.inject(AuthGuard);
    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should allow access if user is authenticated', (done: DoneFn) => {
    guard.canActivate().subscribe(result => {
      expect(result).toBeTrue();
      expect(router.navigate).not.toHaveBeenCalled();
      done();
    });
  });

  it('should redirect to login if user is not authenticated', (done: DoneFn) => {
    (authService.authenticate as jasmine.Spy).and.returnValue(of(false));

    guard.canActivate().subscribe(result => {
      expect(result).toBeFalse();
      expect(router.navigate).toHaveBeenCalledWith(['/login']);
      done();
    });
  });
});
