import { nanoid } from "nanoid";
import { localStorage } from "../utils/Storage";

const findUser = (nickname = "") => {
  localStorage.iterate((val) => {
    const user = JSON.parse(val);
    if (user.nickname === nickname) {
      return user;
    }
    return {};
  }).then((result) => result).catch((err) => err);
};

export async function login(nickname = "", password = "") {
  const dt = new Date();
  let result;

  try {
    const user = findUser(nickname);
    if (user) {
      if (user.password === password) {
        user.section = new Date(dt.getTime() + 30 * 60000).toISOString();
        await localStorage.setItem(user.id, JSON.stringify(user));
        await localStorage.setItem("loggedUser", user.id);
        result = {
          code: 1,
          msg: "Usuário autenticado",
        };
      } else {
        result = {
          code: 0,
          msg: "Senha incorreta",
        };
      }
    } else {
      result = {
        code: 0,
        msg: "Usuário não cadastrado",
      };
    }
    return result;
  } catch (err) {
    return {
      code: 0,
      msg: "Não foi possivel efetuar o login",
      error: err,
    };
  }
}

export async function signUp(nickname = "", password = "") {
  try {
    const user = findUser(nickname);
    const key = nanoid();

    if (user.nickname !== nickname) {
      localStorage.setItem(key, JSON.stringify({
        id: key,
        nickname,
        password,
        section: "",
      }));
      return {
        code: 1,
        msg: "Usuário Cadastrado",
      };
    }
    return {
      code: 0,
      msg: "Usuário já cadastrado",
    };
  } catch (err) {
    return {
      code: 0,
      msg: "Houve um problema no cadastro",
      error: err,
    };
  }
}

export async function logout() {
  try {
    const id = await localStorage.getItem("loggedUser");
    await localStorage.removeItem(id);
    return {
      code: 1,
      msg: "Usuário deslogado",
    };
  } catch (err) {
    return {
      code: 0,
      msg: "Não foi possivel efetuar o logout",
      error: err,
    };
  }
}

export async function isAuthenticated() {
  try {
    const now = new Date();
    debugger;
    const id = await localStorage.getItem("loggedUser") || "";
    const user = await localStorage.getItem(id);

    if (user) {
      const sectionDt = new Date(user.section);
      if (now > sectionDt) {
        return true;
      }
    }
    return false;
  } catch (err) {
    return {
      code: 0,
      msg: "Aconteceu um erro",
      error: err,
    };
  }
}

export default {
  login,
  signUp,
  logout,
  isAuthenticated,
};
