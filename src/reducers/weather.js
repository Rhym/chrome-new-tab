export function weather(state = null, action) {
  switch (action.type) {
    case 'WEATHER_SET':
      return action.weather;
    default:
      return state;
  }
}

export function weatherCache(state = null, action) {
  switch (action.type) {
    case 'WEATHER_SET_CACHE':
      return action.weatherCache;
    default:
      return state;
  }
}

export function weatherCity(state = 'London', action) {
  switch (action.type) {
    case 'WEATHER_SET_CITY':
      return action.weatherCity;
    default:
      return state;
  }
}