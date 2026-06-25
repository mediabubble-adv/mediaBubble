export function dmKeyForUsers(userA: string, userB: string): string {
  return [userA, userB].sort().join(':')
}

export function isDmChannel(type: string | null | undefined): boolean {
  return type === 'DM'
}

export function isActivityChannel(type: string | null | undefined): boolean {
  return type === 'Activity'
}
