import { useRoutes } from "react-router-dom";

import { routesAdmin } from "~/routes/admin";
import { routesClient } from "~/routes/client";
import AlertUi from "../AlertUi";
import LoadingUi from "../LoadingUi";

const routes = [...routesAdmin, ...routesClient];

function AllRoute() {
  const elements = useRoutes(routes);
  return (
    <>
      <LoadingUi/>
      <AlertUi />
      {elements}
    </>
  );
}

export default AllRoute;
