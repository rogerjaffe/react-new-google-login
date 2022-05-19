# New Google Login for React

The [Google Sign-In JavaScript Platform Library for web](https://developers.googleblog.com/2021/08/gsi-jsweb-deprecation.html) has been deprecated and will not work for existing uses after Mar 31, 2023 nor for newly created Google Cloud projects.

This React component creates a Google Login button using the new [Google Identity Service for Web](https://developers.google.com/identity/gsi/web) introduced in early 2022 and on successful login generates a JWT that can be used to authenticate other Google or custom services.

## Installation

`npm install --save react-new-google-login`

## Usage

```javascript
import {useState} from 'react';
import GoogleLogin from 'react-new-google-login';

const App = () => {

  const [token, setToken] = useState('');
  const signin = (token) => setToken(token);
  const error = (err) => console.log(err);
  const CLIENT_ID = 'google-client-id-abc123'
  
  return (
    <div className="App">
        <GoogleLogin
          clientId={CLIENT_ID}
          signinCallback={signin}
          errorCallback={error}
          options={options}
        />
      <div>{token}</div>
    </div>
  )
}
```

## Properties

### clientId (string)

The Client ID obtained from Google Cloud Console. 

1. Select the project
2. Select APIs & Services
3. Select Credentials
4. Create an OAuth2 Client
5. Copy the Client ID string

### signinCallback

Signature: `signinCallback(token: string) => void`

Callback function fired with a successful login.  The function receives one string parameter representing the JWT returned from the Google Authentication.  

### errorCallback

Signature: `(err: any) => void`

Error function is fired on a login error. The error object is passed as the only function parameter.

### options

See [full reference](https://developers.google.com/identity/gsi/web/reference/js-reference#GsiButtonConfiguration) for `GsiButtonConfiguration` type

Button configuration options (see full [documentation](https://developers.google.com/identity/gsi/web/reference/js-reference#GsiButtonConfiguration))

  * `type`: `standard` for full-size button or `icon` for a Google icon only (required)
  
  * `theme`: `outline` | `filled_blue` | `filled_black`
  
  * `size`: `large` | `medium` | `small`
  
  * `text`: `signin_with` | `signup_with` | `continue_with` | `signup_with`
  
  * `shape`: `rectangular` | `pill` | `circle` | `square`
  
  * `logo_alignment`: `left` | `center`
  
  * `width`: maximum width of the button
  
  * `locale`: for button localization
