import { useEffect, useRef } from "react";
import OktaSignIn from '@okta/okta-signin-widget';
import '@okta/okta-signin-widget/dist/css/okta-sign-in.min.css';
import { oktaConfig } from "../lib/oktaConfig";

const OktaSignInWidget = 
({ onSuccess, onError }) =>{
    const widgetRef = useRef();
    useEffect(() => {
        if (!widgetRef.current) {
          return; // No need to proceed if the ref is not available.
        }
    
        const widget = new OktaSignIn(oktaConfig);
        widget
          .showSignInToGetTokens({
            el: widgetRef.current,
          })
          .then(onSuccess)
          .catch(onError);
    
        return () => {
          widget.remove(); // Cleanup the widget when the component unmounts.
        };
      }, [onSuccess, onError]);
    
      return (
        <div>
          <div ref={widgetRef} />
        </div>
      
      );

}
export default OktaSignInWidget;