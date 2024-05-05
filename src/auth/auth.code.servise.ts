import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ConfirmationCode } from 'src/user/entities/confirmation-code.entity';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ConfirmationCodeService {
  constructor(
    @InjectRepository(ConfirmationCode)
    private readonly confirmationCodeRepository: Repository<ConfirmationCode>,
  ) {}

  async createConfirmationCode(
    user: User,
    verificationCode: string,
  ): Promise<ConfirmationCode> {
    const confirmationCode = this.confirmationCodeRepository.create({
      user: user,
      code: verificationCode,
      isConfirmed: false,
    });
    return this.confirmationCodeRepository.save(confirmationCode);
  }

  //   async confirmCode(id: number): Promise<void> {
  //     const confirmationCode = await this.confirmationCodeRepository.findOne(id);
  //     if (confirmationCode) {
  //       confirmationCode.isConfirmed = true;
  //       await this.confirmationCodeRepository.save(confirmationCode);
  //     }
  //   }
}
