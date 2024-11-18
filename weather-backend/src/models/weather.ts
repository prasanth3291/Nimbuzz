import mongoose, { Document, Schema } from 'mongoose';

export interface IWeather extends Document {
  city: string;
  temperature: number;
  description: string;
  humidity: number;
  windSpeed: number;
  icon: string;
  timestamp: Date;
  sunnyCount: number;
  rainyCount: number;
  cloudyCount: number;
  windyCount: number;
}

const WeatherSchema: Schema = new Schema({
  city: { type: String, required: true, unique: true },
  temperature: { type: Number, required: true },
  description: { type: String, required: true },
  humidity: { type: Number, required: true },
  windSpeed: { type: Number, required: true },
  icon: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  sunnyCount: { type: Number, default: 0 },
  rainyCount: { type: Number, default: 0 },
  cloudyCount: { type: Number, default: 0 },
  windyCount: { type: Number, default: 0 },
});

export default mongoose.model<IWeather>('Weather', WeatherSchema);
