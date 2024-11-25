import { prop, getModelForClass, Ref } from '@typegoose/typegoose';
import { BaseModel } from '../base.model';
import { Exercise } from './exercise.model';
import { User } from './user.model';

export class ExerciseLog extends BaseModel {
  @prop({ required: true, ref: () => User })
  userId!: Ref<User>;

  @prop({ required: true, ref: () => Exercise })
  exerciseId!: Ref<Exercise>;

  @prop({ required: true })
  reps!: number;

  @prop({ required: true })
  weight!: number;

  @prop({ required: true, min: 0, max: 10 })
  rir!: number;

  @prop({ required: true })
  date!: Date;

  @prop()
  notes?: string;
}

export const ExerciseLogModel = getModelForClass(ExerciseLog); 