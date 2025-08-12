const PATH_ADMIN = "/admin";

const routesAdmin = {
  dashboard: PATH_ADMIN + "/dashboard",
  auth: {
    login: PATH_ADMIN + "/auth/login",
    logout: PATH_ADMIN + "/auth/logout",
  },
  users: {
    list: PATH_ADMIN + "/users",
  },
};

export default routesAdmin;
