import { getModelForClass, prop, Ref } from "@typegoose/typegoose";
import { BaseModel } from "../base.model";
import { Mesocycle } from "./mesocycle";
import { Routine } from "./routine.model";
import { Exercise } from "./exercise.model";

export class ExerciseSet {
  @prop({ required: true })
  reps!: number;

  @prop({ required: true })
  weight!: number;

  @prop({ required: true, min: 0, max: 10 })
  rir!: number;
}

export class MicrocycleExercise {
  @prop({ required: true, ref: () => Exercise })
  exerciseId!: Ref<Exercise>;

  @prop({ type: () => ExerciseSet, default: [] })
  sets: ExerciseSet[];

  @prop()
  notes?: string;

  @prop({ required: true })
  order!: number;
}

export class MicrocycleDay {
  @prop({ required: true })
  dayNumber: number;

  @prop({ ref: () => Routine })
  routineId?: Ref<Routine>;

  @prop({ type: () => MicrocycleExercise, default: [] })
  exercises: MicrocycleExercise[];

  @prop({ default: false })
  isRestDay: boolean;

  @prop()
  notes?: string;
}

export class Microcycle extends BaseModel {
  @prop({ required: true })
  cycleNumber: number;

  @prop({ required: true, ref: () => Mesocycle })
  mesocycleId: Ref<Mesocycle>;

  @prop({ type: () => MicrocycleDay, default: [] })
  days: MicrocycleDay[];

  @prop({ default: false })
  isDeload: boolean;

  @prop()
  notes?: string;
}

export const MicrocycleModel = getModelForClass(Microcycle);
