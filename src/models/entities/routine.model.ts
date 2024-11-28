import { prop, getModelForClass, Ref } from '@typegoose/typegoose';
import { BaseModel } from '../base.model';
import { User } from './user.model';
import { Exercise } from './exercise.model';

export class RoutineExercise {
  @prop({ required: true, ref: () => Exercise })
  exerciseId!: Ref<Exercise>;

  @prop({ required: true })
  order!: number;
}

export class Routine extends BaseModel {
  @prop({ required: true })
  name!: string;

  @prop({ required: true, ref: () => User })
  userId!: Ref<User>;

  @prop()
  description?: string;

  @prop({ type: () => RoutineExercise, default: [] })
  exercises?: RoutineExercise[];
}

export const RoutineModel = getModelForClass(Routine); 