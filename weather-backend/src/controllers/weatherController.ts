import { Request, Response } from 'express';
import Weather, { IWeather } from '../models/weather';

// export const addOrUpdateWeather = async (req: Request, res: Response): Promise<void> => {
//   const { city, temperature, description, humidity, windSpeed, icon } = req.body;

//   try {
//     const weatherData = {
//       temperature,
//       description,
//       humidity,
//       windSpeed,
//       icon,
//       timestamp: Date.now(),
//     };

//     const weather = await Weather.findOneAndUpdate(
//       { city },
//       weatherData,
//       { upsert: true, new: true } // Upsert: create or update
//     );

//     res.status(201).json({ success: true, data: weather });
//   } catch (error) {
//     if (error instanceof Error) {
//       console.error('Error adding/updating weather data:', error.message);
//       res.status(500).json({ message: 'Failed to add or update weather data', error: error.message });
//     } else {
//       console.error('Unknown error:', error);
//       res.status(500).json({ message: 'An unknown error occurred' });
//     }
//   }
// };

export const addOrUpdateWeather = async (req: Request, res: Response): Promise<void> => {
  const { city, temperature, description, humidity, windSpeed, icon } = req.body;

  try {
    const today = new Date().toISOString().split('T')[0]; // Current date in YYYY-MM-DD format

    // Fetch the existing weather record for the city
    const existingWeather = await Weather.findOne({ city });

    if (existingWeather) {
      const existingDate = new Date(existingWeather.timestamp).toISOString().split('T')[0]; // Stored date

      if (existingDate !== today) {
        // Reset tag counts if the date has changed
        existingWeather.sunnyCount = 0;
        existingWeather.rainyCount = 0;
        existingWeather.cloudyCount = 0;
        existingWeather.windyCount = 0;
      }

      // Update weather data and timestamp
      existingWeather.temperature = temperature;
      existingWeather.description = description;
      existingWeather.humidity = humidity;
      existingWeather.windSpeed = windSpeed;
      existingWeather.icon = icon;
      existingWeather.timestamp = new Date()

      const updatedWeather = await existingWeather.save();
      res.status(201).json({ success: true, data: updatedWeather });
    } else {
      // Create new weather record if city doesn't exist
      const weatherData = {
        city,
        temperature,
        description,
        humidity,
        windSpeed,
        icon,
        sunnyCount: 0, // Initialize counts to zero
        rainyCount: 0,
        cloudyCount: 0,
        windyCount: 0,
        timestamp: Date.now(),
      };

      const newWeather = await Weather.create(weatherData);
      res.status(201).json({ success: true, data: newWeather });
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error adding/updating weather data:', error.message);
      res.status(500).json({ message: 'Failed to add or update weather data', error: error.message });
    } else {
      console.error('Unknown error:', error);
      res.status(500).json({ message: 'An unknown error occurred' });
    }
  }
};



export const incrementTagCount = async (req: Request, res: Response): Promise<void> => {
  const { city, tag } = req.body;

  try {
    const updateField: Record<string, number> = {};

    // Increment specific tag count
    if (tag === 'Sunny') updateField.sunnyCount = 1;
    if (tag === 'Rainy') updateField.rainyCount = 1;
    if (tag === 'Cloudy') updateField.cloudyCount = 1;
    if (tag === 'Windy') updateField.windyCount = 1;

    const weather = await Weather.findOneAndUpdate(
      { city },
      { $inc: updateField }, // Increment field
      { new: true } // Return the updated document
    );

    if (!weather) {
      res.status(404).json({ message: 'City not found' });
      return;
    }

    res.status(200).json({ success: true, data: weather });
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error incrementing tag count:', error.message);
      res.status(500).json({ message: 'Failed to increment tag count', error: error.message });
    } else {
      console.error('Unknown error:', error);
      res.status(500).json({ message: 'An unknown error occurred' });
    }
  }
};

export const getTagCounts = async (req: Request, res: Response): Promise<void> => {
  const { city } = req.query;

  try {

    if (typeof city !== 'string') {
      res.status(400).json({ message: 'Invalid city parameter' });
      return;
    }

    const weather = await Weather.findOne({ city });
    if (!weather) {
      res.status(404).json({ message: 'City not found' });
      return;
    }

    const tagCounts = {
      Sunny: weather.sunnyCount,
      Rainy: weather.rainyCount,
      Cloudy: weather.cloudyCount,
      Windy: weather.windyCount,
    };

    res.status(200).json(tagCounts);
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error fetching tag counts:', error.message);
      res.status(500).json({ message: 'Failed to fetch tag counts', error: error.message });
    } else {
      console.error('Unknown error:', error);
      res.status(500).json({ message: 'An unknown error occurred' });
    }
  }
};
