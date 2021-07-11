/**
 * Helper functions.
 */

 import chalk from 'chalk';

 export function isWithinThreeHours(date) {
    const hour = 1000 * 60 * 60;
    const threeHoursAgo = Date.now() - (3 * hour);
    console.log(date);
    console.log(threeHoursAgo);
    return date > threeHoursAgo;
  }
  
  export function logColorMsg(msg) {
    const randColor = Math.floor(Math.random()*16777215).toString(16);
    console.log(chalk.hex(`#${randColor}`)(msg));
  }