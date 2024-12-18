import { useEffect, useState } from 'react';

const ChatbotIntegration = () => {
  const [isChatbotLoaded, setIsChatbotLoaded] = useState(false);

  useEffect(() => {
    if (!isChatbotLoaded) {
      const loadBotpress = () => {
        const script = document.createElement('script');
        script.src = 'https://cdn.botpress.cloud/webchat/v1/inject.js';
        script.async = true;
        document.body.appendChild(script);

        script.onload = () => {
          // Wait for the window.botpressWebChat to be available
          const checkBotpressAvailability = setInterval(() => {
            if (window.botpressWebChat) {
              clearInterval(checkBotpressAvailability);
              
              window.botpressWebChat.init({
                "composerPlaceholder": "Chat with bot",
                "botConversationDescription": "This chatbot was built surprisingly fast with Botpress",
                "botId": "c8a1ffdc-e1b8-42bc-9e42-028c32066dd9",
                "hostUrl": "https://cdn.botpress.cloud/webchat/v1",
                "messagingUrl": "https://messaging.botpress.cloud",
                "clientId": "c8a1ffdc-e1b8-42bc-9e42-028c32066dd9",
                "webhookId": "4c921d5f-08c6-4cd1-831e-46a43ce83fcd",
                "lazySocket": true,
                "themeName": "prism",
                "frontendVersion": "v1",
                "showPoweredBy": true,
                "theme": "prism",
                "themeColor": "#2563eb",
                "hideWidget": false,
                "disableAnimations": false,
                "closeOnEscape": false,
                "showConversationsButton": true,
                "enableTranscriptDownload": false,
                "className": "webchat-injection",
                "containerWidth": "100%25",
                "layoutWidth": "100%25",
                "showCloseButton": true
              });

              console.log('Botpress WebChat initialized successfully');
              setIsChatbotLoaded(true);
            }
          }, 100);

          // Set a timeout to avoid infinite checking
          setTimeout(() => clearInterval(checkBotpressAvailability), 10000);
        };
      };

      loadBotpress();
    }

    return () => {
      // Cleanup function to remove the scripts when component unmounts
      if (isChatbotLoaded) {
        const scripts = document.querySelectorAll('script[src*="botpress"]');
        scripts.forEach(script => script.remove());
        if (window.botpressWebChat) {
          window.botpressWebChat.sendEvent({ type: 'hide' });
        }
      }
    };
  }, [isChatbotLoaded]);

  return null;
};

export default ChatbotIntegration;