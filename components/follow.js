// Determine if chatter is on Metalhead VIP list and give shoutout (if not given yet).
function newFollowNotif(channel, tags, message, self) {

}
  
  // Initialize autoshoutout check on each message sent in chat.
  export default function initFollowNotif() {
    console.log('Initialized new follower notifications.');
    this.on('event', (data) => {
        // Data collecting for future enhancements.
        console.log('stream elements event happened');
    });
  }