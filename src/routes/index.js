import Home from "../pages/Home";
import Profile from "../pages/Profile";
import Login from "../pages/Login";
import HeaderOnly from "../components/Layout/HeaderOnly";
import Register from "../pages/Register";
import PostDetail from "../components/Posts/PostDetail";
import PostAuction from "../pages/PostAuction";
import ProjectAuction from "../pages/ProjectAuction";
import About from "pages/About";
import Contact from "pages/Contact";
import DetailProject from "components/Projects/DetailProject";
const publicRoutes = [
  { path: "/", layout: HeaderOnly, component: Home, title: "Trang chủ" },
  { path: "/about", layout: HeaderOnly, component: About, title: "Giới thiệu" },
  {
    path: "/contact",
    layout: HeaderOnly,
    component: Contact,
    title: "Giới thiệu",
  },
  { path: "/login", component: Login, layout: HeaderOnly, title: "Đăng nhập" },
  {
    path: "/register",
    component: Register,
    layout: HeaderOnly,
    title: "Đăng ký",
  },
  { path: "/post-auction", component: PostAuction, title: "Bài viết từ thiện" },
  {
    path: "/project-auction",
    component: ProjectAuction,
    title: "Dự án từ thiện",
  },
];

const privateRoutes = [
  { path: "/post-auction/:postId", component: PostDetail },
  {
    path: "/project-auction/:projectId",
    component: DetailProject,
    title: "Dự án từ thiện",
  },
  { path: "/profile", component: Profile, title: "Trang cá nhân" },
];

export { publicRoutes, privateRoutes };
