import { Schema } from "mongoose";

export const CommentSchema = new Schema({
  creatorId: { type: Schema.ObjectId, required: true, ref: 'Account' },
  eventId: { type: Schema.ObjectId, required: true, ref: 'TowerEvent' },
  body: { type: String, minlength: 1, maxlength: 500, required: true }
}, { timestamps: true, toJSON: { virtuals: true } })

CommentSchema.virtual('creator', {
  loacalField: 'creatorId',
  ref: 'Account',
  foreignField: '_id',
  count: true
})