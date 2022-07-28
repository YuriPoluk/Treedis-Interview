import './App.css';
import React, { useRef, useEffect } from 'react';

const App = () => {
  const ref = useRef(null);
  useEffect(() => {
    const sdk = ref.current
    const showcaseWindow = sdk.contentWindow;
    sdk.addEventListener('load', async function() {
      let sdk;
      try {
        sdk = await showcaseWindow.MP_SDK.connect(showcaseWindow);
      }
      catch(e) {
        console.error(e);
        return;
      }
    });

    //TODO: add some more actions using sdk. E.g. sdk.Scene()...

  }, []);
  return (
    <div className="App">
        <iframe 
            ref={ref}
            src="/mp-sdk/3.1.63/showcase.html?m=gUr9K6pRUWt&applicationKey=295ba0c0f04541318359a8e75af33043&play=1"
            frameBorder="0"
            allowFullScreen allow="vr">
        </iframe>
    </div>
  );
}

export default App;
