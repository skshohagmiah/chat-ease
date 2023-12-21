import Pusher from 'pusher';
import Pusherjs from 'pusher-js';



export const pusherClient = () => {
  //@ts-ignore
    const pusher = new Pusherjs('ddd43f9d3e8ded5121f3',{
      cluster:'eu',
      forceTLS:true,
    })
      return pusher
}


export const pusherServer = () => {
    const pusher = new Pusher ({
        appId: process.env.PUSHER_APP_ID as string,
        key: process.env.PUSHER_APP_KEY as string,
        secret: process.env.PUSHER_SECRET as string,
        cluster: process.env.PUSHER_CLUSTER as string,
        useTLS: true
      });
      return pusher
      
    }
    // pusherServer.trigger("my-channel", "my-event", {
    //   message: "hello world"
    // });