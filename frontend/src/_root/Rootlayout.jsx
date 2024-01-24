import { Outlet } from "react-router-dom";
import Header from "../components/ui/Header";

function Rootlayout() {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
}

export default Rootlayout;
