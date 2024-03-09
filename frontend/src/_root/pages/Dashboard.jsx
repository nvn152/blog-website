import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import AdminSideBar from "../../components/ui/AdminSideBar";
import AdminProfile from "../../components/ui/AdminProfile";
import AllPosts from "../../components/AllPosts";
import AllUsers from "../../components/AllUsers";
import AllComments from "../../components/AllComments";
import DashboardStats from "../../components/DashboardStats";

function Dashboard() {
  const location = useLocation();
  const [tab, setTab] = useState();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");

    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);

  return (
    <div className="md:min-h-screen flex flex-col md:flex-row">
      <div className="md:w-64 flex-shrink-0">
        <AdminSideBar />
      </div>

      <div className="h-full w-full">
        {tab === "profile" && <AdminProfile />}
        {tab === "posts" && <AllPosts />}
        {tab === "users" && <AllUsers />}
        {tab === "comments" && <AllComments />}
        {tab === "stats" && <DashboardStats />}
      </div>
    </div>
  );
}

export default Dashboard;
