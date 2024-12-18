/* eslint-disable */
declare global {
    interface Window {
      botpressWebChat: {
        sendEvent: (event: { type: string }) => void;
        // You can add other properties/methods that the Botpress WebChat may expose
      };
    }
  }
  
  export {};
  