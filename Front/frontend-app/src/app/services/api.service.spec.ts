import { TestBed } from '@angular/core/testing';
import { ApiService } from './api.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { environment } from '../../enviroment/enviroment';


describe('ApiService', () => {
  let service: ApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], // Simulamos el cliente HTTP
      providers: [ApiService]
    });
    service = TestBed.inject(ApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Verifica que no queden peticiones pendientes
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // PRUEBA 1: Verificar que el Login llame a la URL correcta de .NET
  it('debe enviar una petición POST para el login', () => {
    const mockCredentials = { email: 'test@test.com', password: '123' };
    const mockResponse = { isSuccess: true, data: 'fake-token', message: 'OK' };

    // Ejecutamos la función
    service.login(mockCredentials).subscribe(res => {
      expect(res.data).toBe('fake-token');
    });

    // Interceptamos la petición
    const req = httpMock.expectOne(`${environment.authApi}/auth/login`);
    expect(req.request.method).toBe('POST'); // Debe ser POST
    expect(req.request.body).toEqual(mockCredentials); // Debe enviar los datos

    // Respondemos simuladamente
    req.flush(mockResponse);
  });

  // PRUEBA 2: Verificar que getClients llame a la URL correcta de PHP
  it('debe obtener la lista de clientes vía GET', () => {
    const mockClients = { data: [{ id: 1, name: 'Juan' }] };

    service.getClients().subscribe(res => {
      expect(res.data.length).toBe(1);
    });

    const req = httpMock.expectOne(`${environment.businessApi}/clients`);
    expect(req.request.method).toBe('GET');
    req.flush(mockClients);
  });
});