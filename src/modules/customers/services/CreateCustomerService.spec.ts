import AppError from '@shared/errors/AppError';

import CreateCustomerService from './CreateCustomerService';
import FakeCustomersRepository from '../repositories/fakes/fakeCustomersRepository';

let fakeCustomersRepository: FakeCustomersRepository;
let createCustomersServices: CreateCustomerService;

describe('CreateUsers', () => {
  beforeEach(() => {
    fakeCustomersRepository = new FakeCustomersRepository();

    createCustomersServices = new CreateCustomerService(
      fakeCustomersRepository,
    );
  });
  it('should be able to create a new customer', async () => {
    const customer = await createCustomersServices.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
    });

    expect(customer).toHaveProperty('id');
  });

  // TESTA SE O MESMO EMAIL JA ESTA SENDO USADO
  it('should not be able to create a customer with one e-mail thats already registered', async () => {
    await createCustomersServices.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
    });

    await expect(
      createCustomersServices.execute({
        name: 'John Doe',
        email: 'johndoe@example.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
