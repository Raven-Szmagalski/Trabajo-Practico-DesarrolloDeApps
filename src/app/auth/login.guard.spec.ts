import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { LoginGuard } from './login.guard';
import { AuthService } from './auth.service';

describe('LoginGuard', () => {
  let guard: LoginGuard;
  let authService: AuthService;
  let router: Router;

  beforeEach(() => {
    const authServiceStub = {
      isAuthenticated: () => of(true) // Simula que el usuario está autenticado
    };

    const routerStub = {
      navigate: jasmine.createSpy('navigate')
    };

    TestBed.configureTestingModule({
      providers: [
        LoginGuard,
        { provide: AuthService, useValue: authServiceStub },
        { provide: Router, useValue: routerStub }
      ]
    });

    guard = TestBed.inject(LoginGuard); // Inyecta la instancia del guard
    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should redirect to home if user is authenticated', (done: DoneFn) => {
    (authService.isAuthenticated as jasmine.Spy).and.returnValue(of(true)); // Simula que el usuario está autenticado

    guard.canActivate().subscribe(result => {
      expect(result).toBeFalse();
      expect(router.navigate).toHaveBeenCalledWith(['/home']);
      done();
    });
  });

  it('should allow access if user is not authenticated', (done: DoneFn) => {
    (authService.isAuthenticated as jasmine.Spy).and.returnValue(of(false)); // Simula que el usuario no está autenticado

    guard.canActivate().subscribe(result => {
      expect(result).toBeTrue();
      expect(router.navigate).not.toHaveBeenCalled();
      done();
    });
  });
  
});
