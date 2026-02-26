import PrivateRoutesClient from "~/components/ui/PrivateRoutesClient";
import config from "~/config";
import LayoutDefault from "~/layouts/client/DefaultLayout";
import Home from "~/pages/client/Home/Home";
import Page404 from "~/pages/Page404";
import CategoryPage from "~/pages/client/CategoryPage";
import Introduce from "~/pages/client/Introduce";
import TermOfUse from "~/pages/client/TermOfUse";
import FrequentlyAskedQuestions from "~/pages/client/FrequentlyAskedQuestions";
import AboutUs from "~/pages/client/AboutUs";
import Detail from "~/pages/client/Detail";
import MyProfile from "~/pages/client/MyProfile";
import FileUploadPage from "~/pages/Upload";
import DocumentsSearch from "~/pages/client/DocumentsSearch";
import Library from "~/pages/client/Library";
import LibraryDetail from "~/pages/client/LibraryDetail";
import DocumentEdit from "~/pages/client/DocumentEdit";
import ChangePasswordPage from "~/pages/client/ChangePasswordPage/ChangePasswordPage";
import GoogleCallback from "~/pages/client/GoogleLoginCallback/GoogleLoginCallback";
import VerifyAccount from "~/pages/client/VerifyAccount/VerifyAccount";

const publicRoutesClient = [
  // Public routes
  {
    path: config.routesClient.home,
    element: <LayoutDefault />,
    children: [
      { path: config.routesClient.home, element: <Home /> },
      {
        path: "/category",
        children: [{ path: ":categoryId", element: <CategoryPage /> }],
      },
      {
        path: "documents",
        children: [
          { path: ":documentId", element: <Detail /> },
          { path: "search/:keyword", element: <DocumentsSearch /> },
          { path: "search", element: <DocumentsSearch /> },
        ],
      },
      { path: config.routesClient.introduce, element: <Introduce /> },
      { path: "/verify-account", element: <VerifyAccount /> },
    ],
  },
  {
    path: "cau-hoi-thuong-gap",
    element: <FrequentlyAskedQuestions />,
  },
  {
    path: "dieu-khoan-su-dung",
    element: <TermOfUse />,
  },
  {
    path: "gioi-thieu",
    element: <AboutUs />,
  },
  {
    path: "/google/callback",
    element: <GoogleCallback />,
  },
  {
    path: "/account/profile",
    element: <MyProfile />,
  },
  {
    path: "/users/change-password",
    element: <ChangePasswordPage />,
  },
  { path: "*", element: <Page404 /> },
];

const privateRoutesClient = [
  {
    path: "/",
    element: <LayoutDefault />,
    children: [
      {
        element: <PrivateRoutesClient />,
        children: [
          {
            path: "/documents",
            children: [{ path: "edit/:documentId", element: <DocumentEdit /> }],
          },
          { path: "upload", element: <FileUploadPage /> },
          {
            path: "library",
            children: [
              { path: "", element: <Library /> },
              { path: "detail/:libraryId", element: <LibraryDetail /> },
            ],
          },
        ],
      },
    ],
  },
];

export const routesClient = [...publicRoutesClient, ...privateRoutesClient];
