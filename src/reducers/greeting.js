export function greeting(state = 'Robert\'); DROP TABLE Students;--', action) {
  switch (action.type) {
    case 'GREETING_SET':
      return action.greeting;
    default:
      return state;
  }
}