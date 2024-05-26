const BASE_URL = "";

type SessionRes = {
  errcode: string;
  errmsg: string;
  openid: string;
  session_key: string;
  unionid: string;
};

/**
 * 根据用户jscode获取openid
 */
export const getSession = (data: { jsCode: string }) => {
  return new Promise<SessionRes>((resolve, reject) => {
    wx.request<{ code: string; msg: string; data: SessionRes | null }>({
      method: "GET",
      url: `${BASE_URL}/api/jscode2session`,
      data,
      success: (res) => {
        const { code, data, msg } = res.data || {};

        if (code === "0" && data) {
          resolve(data);
        } else {
          reject(msg);
        }
      },
      fail: reject,
    });
  });
};

type PhoneNumberRes = {
  countryCode: string;
  phoneNumber: string;
  purePhoneNumber: string;
};

/**
 * 获取用户手机号
 */
export const getPhoneNumber = (data: { openId: string; code: string }) => {
  return new Promise<PhoneNumberRes>((resolve, reject) => {
    wx.request<{ code: string; msg: string; data: PhoneNumberRes | null }>({
      method: "GET",
      url: `${BASE_URL}/api/getphonenumber`,
      data: data,
      success: (res) => {
        const { code, data, msg } = res.data || {};

        if (code === "0" && data) {
          resolve(data);
        } else {
          reject(msg);
        }
      },
      fail: reject,
    });
  });
};
