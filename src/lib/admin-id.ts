/** Fails closed: if ADMIN_GITHUB_ID is missing, nobody is the admin. */
export function isAdminGithubId(id: unknown): boolean {
  const adminId = process.env.ADMIN_GITHUB_ID?.trim()
  return Boolean(adminId) && typeof id === 'string' && id === adminId
}
