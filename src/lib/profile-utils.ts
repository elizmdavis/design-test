/**
 * Set profile sub-page in localStorage and trigger event.
 * Used to coordinate profile navigation across components.
 */
export function setProfileSubPage(subPage: string): void {
  try {
    localStorage.setItem("myProfileSubPage", subPage)
    window.dispatchEvent(new Event("myProfileSubPageChange"))
  } catch {
    // Ignore errors
  }
}

