export function weather(string) {
  return {
    type: 'WEATHER_SET',
    weather: string
  };
}

export function weatherCache(string) {
  return {
    type: 'WEATHER_SET_CACHE',
    weatherCache: string
  };
}

export function weatherCity(string) {
  return {
    type: 'WEATHER_SET_CITY',
    weatherCity: string
  };
}