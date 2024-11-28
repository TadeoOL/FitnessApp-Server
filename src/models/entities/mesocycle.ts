import { getModelForClass, prop } from "@typegoose/typegoose";
import { BaseModel } from "../base.model";
import { Types } from "mongoose";

export class Mesocycle extends BaseModel {
  @prop({ required: true })
  name!: string;

  @prop({ required: true, type: () => Types.ObjectId })
  userId!: Types.ObjectId;

  @prop({ required: true })
  totalMicrocycles!: number;

  @prop({ required: true })
  daysPerMicrocycle!: number;

  @prop({ default: false })
  isCompleted!: boolean;

  @prop()
  notes?: string;
}

export const MesocycleModel = getModelForClass(Mesocycle);
