import * as React from "react";
import { useState, useEffect, useRef } from "react";
import useInterval from "./useInterval";

export interface IdConfiguration {
  client_id: string;
  auto_select?: boolean;
  callback: (handleCredentialResponse: CredentialResponse) => void;
  login_uri?: string;
  native_callback?: (...args: any[]) => void;
  cancel_on_tap_outside?: boolean;
  prompt_parent_id?: string;
  nonce?: string;
  context?: string;
  state_cookie_domain?: string;
  ux_mode?: "popup" | "redirect";
  allowed_parent_origin?: string | string[];
  intermediate_iframe_close_callback?: (...args: any[]) => void;
}

export interface CredentialResponse {
  credential?: string;
  select_by?:
    | "auto"
    | "user"
    | "user_1tap"
    | "user_2tap"
    | "btn"
    | "btn_confirm"
    | "brn_add_session"
    | "btn_confirm_add_session";
  clientId?: string;
}

export interface GsiButtonConfiguration {
  type: "standard" | "icon";
  theme?: "outline" | "filled_blue" | "filled_black";
  size?: "large" | "medium" | "small";
  text?: "signin_with" | "signup_with" | "continue_with" | "signup_with";
  shape?: "rectangular" | "pill" | "circle" | "square";
  logo_alignment?: "left" | "center";
  width?: string;
  locale?: string;
}

export interface PromptMomentNotification {
  isDisplayMoment: () => boolean;
  isDisplayed: () => boolean;
  isNotDisplayed: () => boolean;
  getNotDisplayedReason: () =>
    | "browser_not_supported"
    | "invalid_client"
    | "missing_client_id"
    | "opt_out_or_no_session"
    | "secure_http_required"
    | "suppressed_by_user"
    | "unregistered_origin"
    | "unknown_reason";
  isSkippedMoment: () => boolean;
  getSkippedReason: () =>
    | "auto_cancel"
    | "user_cancel"
    | "tap_outside"
    | "issuing_failed";
  isDismissedMoment: () => boolean;
  getDismissedReason: () =>
    | "credential_returned"
    | "cancel_called"
    | "flow_restarted";
  getMomentType: () => "display" | "skipped" | "dismissed";
}

export interface RevocationResponse {
  successful: boolean;
  error: string;
}

export interface Credential {
  id: string;
  password: string;
}

export interface Google {
  accounts: {
    id: {
      initialize: (input: IdConfiguration) => void;
      prompt: (
        momentListener?: (res: PromptMomentNotification) => void
      ) => void;
      renderButton: (
        parent: HTMLElement,
        options: GsiButtonConfiguration
      ) => void;
      disableAutoSelect: () => void;
      storeCredential: (credentials: Credential, callback: () => void) => void;
      cancel: () => void;
      onGoogleLibraryLoad: () => void;
      revoke: (
        hint: string,
        callback: (done: RevocationResponse) => void
      ) => void;
    };
  };
}

declare global {
  export interface Window {
    google?: Google;
  }
}

export type SigninCallback = (token: string | undefined) => void;
export type ErrorCallback = (err: any) => void;

/**
 * clientId: Obtained from APIs & Services | Credentials | OAuth2 Client IDs page in the GCloud console
 * divRef: HTML <div> element containing the sign-in button
 * options: see https://developers.google.com/identity/gsi/web/reference/js-reference)
 */
export type GoogleSigninPropsType = {
  clientId: string;
  options?: GsiButtonConfiguration;
  signinCallback?: SigninCallback;
  errorCallback?: ErrorCallback;
  className?: string;
};

const NONCE_SIZE = 20;

const getNonce = (size = NONCE_SIZE) => {
  const charset =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const buf = [];
  for (let i = 0; i < size; i++) {
    buf.push(charset[Math.trunc(Math.random() * charset.length)]);
  }
  return buf.join("");
};

export default function GoogleSignin(props: GoogleSigninPropsType) {
  const { clientId, options, signinCallback, errorCallback, className } = props;
  const [google, setGoogle] = useState();
  const [googleIsLoading, setGoogleIsLoading] = useState(true);

  const divRef = useRef(null);

  useInterval(
    () => {
      if (typeof window !== "undefined" && window.google) {
        setGoogle(window.google);
        setGoogleIsLoading(false);
      }
    },
    googleIsLoading ? 100 : null
  );

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  useEffect(() => {
    const _options = {
      type: "standard",
      theme: "filled_blue",
      size: "large",
      text: "signin_with",
      shape: "rectangular",
      logo_alignment: "left",
    };

    const $options = { ..._options, ...options };
    if (google && divRef.current && $options) {
      try {
        google.accounts.id.initialize({
          client_id: clientId,
          callback: async (res: CredentialResponse) => {
            signinCallback && signinCallback(res.credential);
          },
          nonce: getNonce(),
        });
        google.accounts.id.renderButton(divRef.current, $options);
      } catch (error) {
        errorCallback && errorCallback(error);
      }
    }
  }, [clientId, errorCallback, google, options, signinCallback]);

  return <div className={className} ref={divRef} />;
}
