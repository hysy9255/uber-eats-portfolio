import { Module } from '@nestjs/common';
import { OwnerDraftsController } from './owner-draft.controller';

@Module({
  controllers: [OwnerDraftsController],
})
export class OwnerDraftModule {}
