import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Transaction } from './entities/transaction.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TransactionService {
  constructor(
    @InjectRepository(Transaction)
    private readonly transactionRepository: Repository<Transaction>,
  ) {}

  async create(createTransactionDto: CreateTransactionDto, id: number) {
    if (!createTransactionDto.title || !createTransactionDto.amount || !createTransactionDto.type) {
      throw new BadRequestException("Поля 'title', 'amount' и 'type' обязательны для заполнения.");
    }

    const newTransaction = this.transactionRepository.create({
      title: createTransactionDto.title,
      amount: createTransactionDto.amount,
      type: createTransactionDto.type,
      category: { id: +createTransactionDto.category },
      user: { id },
    });

    return await this.transactionRepository.save(newTransaction);
  }

  async findAllByType(id: number, type: string) {
    const transactions = await this.transactionRepository.find({
      where: {
        user: { id },
        type,
      },
    });

    const total = transactions.reduce((acc, obj) => acc + obj.amount, 0);

    return total;
  }

  async findAll(id: number) {
    const transactions = await this.transactionRepository.find({
      where: {
        user: { id },
      },
      relations: ['category'],
      order: {
        createdAt: 'DESC',
      },
    });

    return transactions;
  }

  async findOne(id: number) {
    const transaction = await this.transactionRepository.findOne({
      where: { id },
      relations: ['user', 'category'],
    });

    if (!transaction) {
      throw new NotFoundException('Такой транзакции нет');
    }

    return transaction;
  }

  async update(id: number, updateTransactionDto: UpdateTransactionDto) {
    const transaction = await this.transactionRepository.findOneOrFail({
      where: { id },
      relations: ['user', 'category'],
    });

    return await this.transactionRepository.update(id, updateTransactionDto);
  }

  async remove(id: number) {
    const transaction = await this.transactionRepository.findOneOrFail({
      where: { id },
      relations: ['user', 'category'],
    });

    return await this.transactionRepository.softDelete(id);
  }

  async findAllWithPagination(id: number, page: number, limit: number) {
    const transactions = await this.transactionRepository.find({
      where: { user: { id } },
      take: limit,
      skip: (page - 1) * limit,
    });

    return transactions;
  }
}
