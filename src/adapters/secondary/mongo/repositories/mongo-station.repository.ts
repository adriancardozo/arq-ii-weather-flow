import { IStationRepository } from 'src/bussiness/ports/output/repositories/i-station.repository';
import { MongoRepository } from './mongo.repository';
import { CreateStationInput } from 'src/bussiness/ports/input/services/dtos/input/create-station.input';
import { EditStationInput } from 'src/bussiness/ports/input/services/dtos/input/edit-station.input';
import { Station } from 'src/bussiness/entities/station.entity';
import { InjectModel } from '@nestjs/mongoose';
import { ClientSession, Model } from 'mongoose';
import { MongoTransactionService } from '../services/mongo-transaction.service';
import { StationNotFoundError } from 'src/bussiness/errors/station-not-found.error';
import { User } from 'src/bussiness/entities/user.entity';
import { Station as StationObject } from '../schemas/object/station-object.schema';

export class MongoStationRepository
  extends MongoRepository<Station, CreateStationInput, EditStationInput>
  implements IStationRepository
{
  constructor(
    @InjectModel(Station.name) StationModel: Model<Station>,
    @InjectModel(User.name) private UserModel: Model<User>,
    transactionService: MongoTransactionService,
  ) {
    super(StationObject, StationNotFoundError, StationModel, transactionService, ['owner']);
  }

  override async save(input: CreateStationInput, session?: ClientSession): Promise<Station> {
    return await this.transactionService.transaction(async (session) => {
      const station = await super.save(input, session);
      await this.UserModel.updateOne(
        this.normalizedFilter({ id: input.owner }),
        { $addToSet: { stations: station.id } },
        { session },
      );
      return station;
    }, session);
  }

  override async updateOne(updated: Station, session?: ClientSession): Promise<Station> {
    return await this.transactionService.transaction(async (session) => {
      if (updated.id && updated.owner) {
        await this.UserModel.updateMany({}, { $pull: { stations: updated.id } }, { session });
      }
      const station = await super.updateOne(updated, session);
      await this.UserModel.updateOne(
        this.normalizedFilter({ id: updated.owner.id }),
        { $addToSet: { stations: station.id } },
        { session },
      );
      return station;
    }, session);
  }

  override async deleteOneBy(filter: Partial<Station>, session?: ClientSession): Promise<void> {
    return await this.transactionService.transaction(async (session) => {
      await super.deleteOneBy(filter, session);
      if (filter.id) await this.UserModel.updateMany({}, { $pull: { stations: filter.id } }, { session });
    }, session);
  }

  protected override relationsSchema<T = any>(updated: Station): T {
    return { ...updated, owner: updated.owner.id } as T;
  }
}
