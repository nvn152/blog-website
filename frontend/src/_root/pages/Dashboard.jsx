import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import AdminSideBar from "../../components/ui/AdminSideBar";
import AdminProfile from "../../components/ui/AdminProfile";

function Dashboard() {
  const location = useLocation();
  const [tab, setTab] = useState();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    console.log(tabFromUrl);
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);

  return (
    <div className="h-screen flex">
      <div>
        <AdminSideBar />
      </div>

      <div>{tab === "profile" && <AdminProfile />}</div>
    </div>
  );
}

export default Dashboard;
