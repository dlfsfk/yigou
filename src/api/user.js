import axios from '@/axios';
function delay(duration) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, duration);
  });
}

export async function login(loginId, loginPwd) {
  await delay(1000);
  let user = await axios.post('/login', {
    loginId,
    loginPwd
  });
  if (user) {
    localStorage.setItem("user", JSON.stringify(user));
    user.name = decodeURI(user.name);
    return user;
  }
  return null;
}
export async function register(account, password, name) {
  name = encodeURI(name);
  return axios.post('/register', { account, password, name });
}

export async function checkAccount(account) {
  return axios.get('/checkAccount', { params: { account } });
}

export async function checkName(name) {
  name = encodeURI(name);
  return axios.get('/checkName', { params: { name } });
}

export async function loginOut() {
  await delay(1000);
  localStorage.removeItem("user");
}

export async function whoAmI() {
  await delay(1000);
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
}
