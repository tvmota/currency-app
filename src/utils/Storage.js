import localforage from "localforage";

const { createInstance } = localforage;

export const localStorage = createInstance({
  name: "authStore",
});

export default {
  localStorage,
};
