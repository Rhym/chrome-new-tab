export function greeting(state = null, action) {
  switch (action.type) {
    case 'GREETING_SET':
      return action.greeting;
    default:
      return state;
  }
}
