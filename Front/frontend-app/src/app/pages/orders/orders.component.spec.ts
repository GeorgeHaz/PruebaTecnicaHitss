import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OrdersComponent } from './orders.component';
import { ApiService } from '../../services/api.service';
import { of } from 'rxjs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('OrdersComponent', () => {
  let component: OrdersComponent;
  let fixture: ComponentFixture<OrdersComponent>;
  let apiSpy: jasmine.SpyObj<ApiService>;

  beforeEach(async () => {
    apiSpy = jasmine.createSpyObj('ApiService', ['getOrders', 'getClients', 'createOrder', 'updateOrder']);

    apiSpy.getOrders.and.returnValue(of([]));
    apiSpy.getClients.and.returnValue(of([]));
    apiSpy.createOrder.and.returnValue(of({} as any));

    await TestBed.configureTestingModule({
      imports: [OrdersComponent, BrowserAnimationsModule],
      providers: [{ provide: ApiService, useValue: apiSpy }]
    }).compileComponents();

    fixture = TestBed.createComponent(OrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debe cargar Pedidos y Clientes al iniciar', () => {
    expect(apiSpy.getOrders).toHaveBeenCalled();
    expect(apiSpy.getClients).toHaveBeenCalled();
  });

  it('el formulario debe ser inválido si falta el cliente o el total', () => {
    component.orderForm.controls['client_id'].setValue('');
    component.orderForm.controls['total'].setValue('');
    expect(component.orderForm.valid).toBeFalsy();
  });

  it('debe intentar crear pedido si el formulario es válido', () => {
    component.orderForm.patchValue({
        client_id: '1',
        total: '100',
        order_date: '2025-11-20',
        status: 'pending'
    });

    component.saveOrder();

    expect(apiSpy.createOrder).toHaveBeenCalled();
  });
});