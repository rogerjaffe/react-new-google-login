

function ___$insertStyle(css) {
    if (!css || typeof window === 'undefined') {
        return;
    }
    const style = document.createElement('style');
    style.setAttribute('type', 'text/css');
    style.innerHTML = css;
    document.head.appendChild(style);
    return css;
}

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function __awaiter(thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

function useInterval(callback, delay) {
    var savedCallback = React.useRef();
    React.useEffect(function () {
        savedCallback.current = callback;
    }, [callback]);
    React.useEffect(function () {
        function tick() {
            savedCallback.current();
        }
        if (delay) {
            var id_1 = setInterval(tick, delay);
            return function () { return clearInterval(id_1); };
        }
        else {
            return;
        }
    }, []);
}

var NONCE_SIZE = 20;
var getNonce = function (size) {
    if (size === void 0) { size = NONCE_SIZE; }
    var charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var buf = [];
    for (var i = 0; i < size; i++) {
        buf.push(charset[Math.trunc(Math.random() * charset.length)]);
    }
    return buf.join("");
};
function GoogleSignin(props) {
    var _this = this;
    var clientId = props.clientId, options = props.options, signinCallback = props.signinCallback, errorCallback = props.errorCallback, className = props.className;
    var _a = React.useState(), google = _a[0], setGoogle = _a[1];
    var _b = React.useState(true), googleIsLoading = _b[0], setGoogleIsLoading = _b[1];
    var divRef = React.useRef(null);
    useInterval(function () {
        if (typeof window !== "undefined" && window.google) {
            setGoogle(window.google);
            setGoogleIsLoading(false);
        }
    }, googleIsLoading ? 100 : null);
    React.useEffect(function () {
        var script = document.createElement("script");
        script.src = "https://accounts.google.com/gsi/client";
        script.async = true;
        document.body.appendChild(script);
        return function () {
            document.body.removeChild(script);
        };
    }, []);
    React.useEffect(function () {
        var _options = {
            type: "standard",
            theme: "filled_blue",
            size: "large",
            text: "signin_with",
            shape: "rectangular",
            logo_alignment: "left",
        };
        var $options = __assign({}, _options, options);
        if (google && divRef.current && $options) {
            try {
                google.accounts.id.initialize({
                    client_id: clientId,
                    callback: function (res) { return __awaiter(_this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            signinCallback && signinCallback(res.credential);
                            return [2 /*return*/];
                        });
                    }); },
                    nonce: getNonce(),
                });
                google.accounts.id.renderButton(divRef.current, $options);
            }
            catch (error) {
                errorCallback && errorCallback(error);
            }
        }
    }, [clientId, errorCallback, google, options, signinCallback]);
    return React.createElement("div", { className: className, ref: divRef });
}

exports.default = GoogleSignin;
//# sourceMappingURL=index.js.map
