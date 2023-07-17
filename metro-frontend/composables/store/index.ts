import { defineStore } from "pinia";

let initialState = {
  // all these properties will have their type inferred automatically
  authLoadType: "normal",
  authOrigin: "",
  auth: false,
  refreshToken: null,
  accessToken: null,
  userType: null,
  userData: {},
  mortal: {},
  tabId: null,
  BASE_BX_URL: "",
  BASE_DX_URL: "",
  BASE_EX_URL: "",
};

// useStore could be anything like useUser, useCart
// the first argument is a unique id of the store across your application
export const useAuthStore = defineStore("auth", {
  state: () => {
    return initialState;
  },

  getters: {
    // use getters like computed properties
  },

  actions: {
    // use actions just like methods but async
    login({ token, userType, refreshToken, mortal, authLoadType, authOrigin }) {
      this.auth = token ? token : true;
      this.refreshToken = refreshToken;
      this.userType = userType;
      this.mortal = mortal;
      this.authLoadType = authLoadType;
      this.authOrigin = authOrigin;
      sessionStorage.setItem("auth", token);
      sessionStorage.setItem("userType", userType);
      sessionStorage.setItem("refreshToken", refreshToken);
      sessionStorage.setItem("mortal", JSON.stringify(mortal));
      sessionStorage.setItem("authLoadType", authLoadType);
      sessionStorage.setItem("authOrigin", authOrigin);
    },

    userData: function (userData) {
      this.userData = userData;
    },
    logout: async function (requestType: any = null) {
      const iState = JSON.parse(JSON.stringify(initialState));
      let authByPopUpUtilsDefault = await import("@common-ui/authenticator/child/attemptAuthByPopUpUtils");
      let authByPopUpUtils = authByPopUpUtilsDefault.default;

      for (let key in iState) {
        this[key] = iState[key];
      }
      if (requestType != null && requestType.request === "logoutReqFromSelf") {
        try {
          let tabId = sessionStorage.getItem("tabId");
          sessionStorage.clear();
          // Send logout request to parent to logout itself and all child windows opened
          if (window.opener) {
            window.opener.postMessage(
              {
                request: "logoutReqFromChild",
                origin: window.location.origin,
                tabId,
              },
              authByPopUpUtils.KX_UI
            );
          }
        } catch (error) {
          console.log("error: ", error);
          console.log("FAILED TO SEND MSG TO PARENT WINDOW");
        }
      } else {
        sessionStorage.clear();
      }
    },

    /**
     * Set auth in store
     *
     * @param payload Payload from the parent window
     * @param conf Conf used for authenication
     */
    setAuth(payload, conf) {
      sessionStorage.setItem("tabId", payload.tabId);
      this.login({
        token: payload.accessToken,
        userType: payload.mortal.type,
        refreshToken: payload.refreshToken,
        mortal: payload.mortal,
        authLoadType: conf.type,
        authOrigin: conf.opener,
      });
      if (payload?.mortal?.userData) {
        this.userData(payload.mortal.userData);
      } else {
        console.log(`%c UserData not found`, "color:red; font-weight:bold;font-size:20px");
        this.userData({});
      }
      sessionStorage.setItem("isAuthSet", "true");
    },
  },
});
