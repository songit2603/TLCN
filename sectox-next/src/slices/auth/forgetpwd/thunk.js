import { userForgetPasswordSuccess, userForgetPasswordError } from "./reducer"

//Include Both Helper File with needed methods
import { getFirebaseBackend } from "../../../helper/firebase_helper";

import {
  postFakeForgetPwd,
  postJwtForgetPwd,
} from "../../../helper/fakebackend_helper";

const fireBaseBackend = getFirebaseBackend();

export const userForgetPassword = (user, history) => async (dispatch) => {
  try {
      let response;
      if (process.env.NEXT_PUBLIC_REACT_APP_DEFAULTAUTH === "firebase") {

          response = fireBaseBackend.forgetPassword(
              user.email
          )

      } else if (process.env.NEXT_PUBLIC_REACT_APP_DEFAULTAUTH === "jwt") {
          response = postJwtForgetPwd(
              user.email
          )
      } else {
          response = postFakeForgetPwd(
              user.email
          )
      }

      const data = await response;

      if (data) {
          dispatch(userForgetPasswordSuccess(
              "Reset link are sended to your mailbox, check there first"
          ))
      }
  } catch (forgetError) {
      dispatch(userForgetPasswordError(forgetError))
  }
}