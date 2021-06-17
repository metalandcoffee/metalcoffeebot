/**
 * Helper functions.
 */

 export function isWithinThreeHours(date) {
    const hour = 1000 * 60 * 60;
    const threeHoursAgo = Date.now() - (3 * hour);
    console.log(date);
    console.log(threeHoursAgo);
    return date > threeHoursAgo;
  }
  