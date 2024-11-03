import "./style.css";
import Handlebars from "handlebars";
import * as Components from "./components";
import { SignInPage } from "./pages";

// Регистрация хелперов
Handlebars.registerHelper({
  and: (a, b) => a && b,
  or: (a, b) => a || b,
  not: (a) => !a,
  eq: (a, b) => a === b,
});

Object.entries(Components).forEach(([name, template]) => {
  Handlebars.registerPartial(name, template);
});

const signInPage = Handlebars.compile(SignInPage);

document.addEventListener("DOMContentLoaded", () => {
  const root = document.querySelector<HTMLDivElement>("#app");

  root!.innerHTML = signInPage({});
});
