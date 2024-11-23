import { modelOptions, prop } from '@typegoose/typegoose';

@modelOptions({ 
  schemaOptions: { 
    timestamps: true,
    toJSON: { virtuals: true,
        transform: (_doc, ret) => {
            delete ret._id;
            delete ret.__v;
            return ret;
        }
     },
    toObject: { virtuals: true,
        transform: (_doc, ret) => {
            delete ret._id;
            delete ret.__v;
            return ret;
        }
     }
  } 
})
export abstract class BaseModel {
  @prop()
  createdAt?: Date;

  @prop()
  updatedAt?: Date;
} 