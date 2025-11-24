import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ClientsComponent } from './clients.component';
import { ApiService } from '../../services/api.service';
import { of } from 'rxjs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('ClientsComponent', () => {
  let component: ClientsComponent;
  let fixture: ComponentFixture<ClientsComponent>;
  let apiSpy: jasmine.SpyObj<ApiService>;

  beforeEach(async () => {
    apiSpy = jasmine.createSpyObj('ApiService', ['getClients', 'createClient', 'updateClient', 'deleteClient']);

    apiSpy.getClients.and.returnValue(of({ data: [] }));
    apiSpy.createClient.and.returnValue(of({ 
        first_name: 'Test', last_name: 'User', email: 't@t.com', id: 1 
    } as any));

    await TestBed.configureTestingModule({
      imports: [ClientsComponent, BrowserAnimationsModule],
      providers: [{ provide: ApiService, useValue: apiSpy }]
    }).compileComponents();

    fixture = TestBed.createComponent(ClientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debe llamar a getClients al iniciar', () => {
    expect(apiSpy.getClients).toHaveBeenCalled();
  });

  it('debe llamar a createClient cuando el formulario es válido y guardamos', () => {
    component.clientForm.controls['first_name'].setValue('Juan');
    component.clientForm.controls['last_name'].setValue('Perez');
    component.clientForm.controls['email'].setValue('juan@test.com');
    
    component.saveClient();

    expect(apiSpy.createClient).toHaveBeenCalled();
    const args = apiSpy.createClient.calls.mostRecent().args[0];
    expect(args.email).toBe('juan@test.com');
  });

  it('NO debe llamar a la API si el formulario es inválido', () => {
    component.clientForm.reset();
    component.saveClient();
    expect(apiSpy.createClient).not.toHaveBeenCalled();
  });
});