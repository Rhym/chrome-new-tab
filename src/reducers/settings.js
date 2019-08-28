export function settingsIsActive(state = false, action) {
  switch (action.type) {
    case 'SETTINGS_IS_ACTIVE':
      return action.isActive;
    default:
      return state;
  }
}
