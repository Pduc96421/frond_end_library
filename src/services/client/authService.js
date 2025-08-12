import request from "~/utils/request";

export const login = async (email, password) => {
  try {
    const res = await request.post(`auth/register`, {
      email: email,
      password: password,
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const register = async (email, userName, password, fullName, dod) => {
  try {
    const res = await request.post(`auth/register`, {
      email: email,
      fullName: fullName,
      userName: userName,
      password: password,
      dod: dod,
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const googleLogin = async () => {
  try {
    const res = await request.get(`auth/google-login`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
}

