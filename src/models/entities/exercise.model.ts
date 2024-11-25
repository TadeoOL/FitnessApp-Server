import { prop, getModelForClass } from '@typegoose/typegoose';
import { BaseModel } from '../base.model';

export enum MuscleGroup {
  CHEST = 'CHEST',
  BACK = 'BACK',
  LEGS = 'LEGS',
  SHOULDERS = 'SHOULDERS',
  BICEPS = 'BICEPS',
  TRICEPS = 'TRICEPS',
  ABS = 'ABS'
}

export enum Equipment {
  BARBELL = 'BARBELL',
  DUMBBELL = 'DUMBBELL',
  MACHINE = 'MACHINE',
  CABLE = 'CABLE',
  BODYWEIGHT = 'BODYWEIGHT'
}

export class Exercise extends BaseModel {
  @prop({ required: true })
  name!: string;

  @prop()
  description?: string;

  @prop({ required: true, enum: MuscleGroup })
  muscleGroup!: MuscleGroup;

  @prop({ enum: Equipment })
  equipment?: Equipment;
}

export const ExerciseModel = getModelForClass(Exercise); 