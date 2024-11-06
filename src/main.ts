import "./style.css";
import Handlebars from "handlebars";
import * as Components from "./components";
import * as Pages from "./pages";
import iconRight from "./assets/icons/circle_arrow_right.svg";
import iconLeft from "./assets/icons/circle_arrow_left.svg";
import defaultAvatarIcon from "./assets/icons/avatar_img.svg";
import { userInfoButtons, userProfileInfo, userProfilePasswordInfo } from "./utils/constants";

// Регистрация хелперов
Handlebars.registerHelper({
  and: (a, b) => a && b,
  or: (a, b) => a || b,
  not: (a) => !a,
  eq: (a, b) => a === b,
});

// Регистрация компонентов
Object.entries(Components).forEach(([name, template]) => {
  Handlebars.registerPartial(name, template);
});

const pages = {
  signInPage: [Pages.SignInPage],
  signUpPage: [Pages.SignUpPage],
  navigatePage: [Pages.NavigatePage],
  addUserModal: [Pages.AddUserModal],
  deleteUserModal: [Pages.DeleteUserModal],
  fileUploadModal: [Pages.FileUploadModal],
  internalServerErrorPage: [Pages.InternalServerErrorPage],
  badRequestPage: [Pages.BadRequestPage],
  profilePage: [Pages.ProfilePage, { iconLeft, iconRight, defaultAvatarIcon, userProfileInfo, userInfoButtons }],
  changePasswordPage: [Pages.ChangePasswordPage, { iconLeft, iconRight, defaultAvatarIcon, userProfilePasswordInfo }],
  changeUserInfoPage: [Pages.ChangeUserInfoPage, { iconLeft, iconRight, defaultAvatarIcon, userProfileInfo }]
};

// Навигация по страницам
function navigate(page: string) {
  //@ts-ignore
  const [source, context] = pages[page];
  const root = document.querySelector<HTMLDivElement>("#app");

  const temlpatingFunction = Handlebars.compile(source);
  root!.innerHTML = temlpatingFunction(context);

  // Сохраняем состояние в историю
  history.pushState({ page }, "", `#${page}`);
}

// Обработчик события для 'popstate'
window.addEventListener("popstate", (event) => {
  if (event.state && event.state.page) {
    navigate(event.state.page);
  } else {
    // Возврат на страницу навигации
    navigate("navigatePage");
  }
});

// Инициализация после загрузки документа
document.addEventListener("DOMContentLoaded", () => navigate("navigatePage"));

document.addEventListener("click", (e) => {
  //@ts-ignore
  const page = e.target.getAttribute("page");
  if (page) {
    navigate(page);

    e.preventDefault();
    e.stopImmediatePropagation();
  }
});
