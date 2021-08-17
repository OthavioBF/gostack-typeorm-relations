import { getRepository, Repository } from 'typeorm';

import IOrdersRepository from '@modules/orders/repositories/IOrdersRepository';
import ICreateOrderDTO from '@modules/orders/dtos/ICreateOrderDTO';
import Order from '../entities/Order';

class OrdersRepository implements IOrdersRepository {
  private ormRepository: Repository<Order>;

  constructor() {
    this.ormRepository = getRepository(Order);
  }

  public async create({ customer, products }: ICreateOrderDTO): Promise<Order> {
    const ordersProducts = this.ormRepository.create({
      customer,
      order_products: products,
    });

    return ordersProducts;
  }

  public async findById(id: string): Promise<Order | undefined> {
    const findId = this.ormRepository.findOne(id);

    return findId;
  }
}

export default OrdersRepository;
