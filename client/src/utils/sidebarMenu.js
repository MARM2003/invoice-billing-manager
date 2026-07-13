import DashboardIcon from "@mui/icons-material/Dashboard";
import GroupsIcon from "@mui/icons-material/Groups";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import PaymentsIcon from "@mui/icons-material/Payments";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";

const sidebarMenu = [
  {
    id: 1,
    title: "Dashboard",
    path: "/",
    icon: DashboardIcon,
  },
  {
    id: 2,
    title: "Customers",
    path: "/customers",
    icon: GroupsIcon,
  },
  {
    id: 3,
    title: "Invoices",
    path: "/invoices",
    icon: ReceiptLongIcon,
  },
  {
    id: 4,
    title: "Payments",
    path: "/payments",
    icon: PaymentsIcon,
  },
  {
    id: 5,
    title: "Subscription",
    path: "/subscription",
    icon: WorkspacePremiumIcon,
  },
  {
    id: 6,
    title: "Settings",
    path: "/settings",
    icon: SettingsIcon,
  },
  {
    id: 7,
    title: "Logout",
    path: "/logout",
    icon: LogoutIcon,
  },
];

export default sidebarMenu;