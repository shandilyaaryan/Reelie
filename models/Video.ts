import mongoose, { model, models, Schema } from "mongoose";

export const VIDEO_DIMENSIONS = {
  height: 1920,
  width: 1080,
} as const;

export interface IVideo {
  _id?: mongoose.Types.ObjectId;
  title: string;
  description: string;
  videoUrl: string;
  thumbnailUrl: string;
  controls: boolean;
}
