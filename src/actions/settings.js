export function settingsIsActive(bool) {
  return {
    type: 'SETTINGS_IS_ACTIVE',
    isActive: bool,
  };
}
