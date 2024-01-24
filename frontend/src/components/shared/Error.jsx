import { useRouteError } from "react-router-dom";

function Error() {
  const error = useRouteError();
  console.log(error);
  return <div>Error</div>;
}

export default Error;
