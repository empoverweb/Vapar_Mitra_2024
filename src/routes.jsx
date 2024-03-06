import {
  HomeIcon,
  UserCircleIcon,
  TableCellsIcon,
  InformationCircleIcon,
  ServerStackIcon,
  RectangleStackIcon,
  UserGroupIcon,
  GiftIcon,
  ChartPieIcon,
  BanknotesIcon,
  UserPlusIcon,
  CloudIcon,
  CircleStackIcon,
  ReceiptPercentIcon,
  ClipboardIcon,
  ClipboardDocumentCheckIcon,
  DocumentIcon,
  DocumentPlusIcon,
  PlusCircleIcon,
  SpeakerWaveIcon,
  ChartBarIcon
} from "@heroicons/react/24/solid";
import { Home} from "@/pages/dashboard"; 
import {AddRole,AddUser} from "@/pages/usermangment"; 
import {AddCategory,AddCrop,AddHybrid,AddProduct,AddPromotions,AddSubCategory,AddState,AddTerritory,AddDistrict,AddProductionPlants} from "@/pages/masters";
import {AddCoupon} from "@/pages/coupons"; 
import Stocks from "@/pages/stocks";
import Reports from '@/pages/reports'
import AddRegion from "./pages/masters/addRegion";

const icon = {
  className: "w-5 h-5 text-inherit",
};
 

export const routes = [ 
  {
    layout: "dashboard",
    pages: [
      {
        icon: <HomeIcon {...icon} />,
        name: "dashboard",
        path: "/home",
        element: <Home />,
      }
    ]
  },
  { 
    layout: "usermanagement",
    pages: [
      {
        icon: <UserCircleIcon {...icon} />,
        name: "User Mangement", 
        subitems:[  
          {
            icon: <UserPlusIcon {...icon} />,
            name: "Add User",
            path: "/add-user",
            element: <AddUser />,
          },
          {
            icon: <UserPlusIcon {...icon} />,
            name: "Add Role",
            path: "/add-role",
            element: <AddRole />,
          } 
        ]
      }
    ]
  },
  { 
    layout: "masters",
    pages: [
      {
        icon: <RectangleStackIcon {...icon} />,
        name: "Masters", 
        subitems:[  
          {
            icon: <ClipboardIcon {...icon} />,
            name: "Category",
            path: "/add-category",
            element: <AddCategory />,
          },
          {
            icon: <ClipboardDocumentCheckIcon {...icon} />,
            name: "Sub Category",
            path: "/add-subcategory",
            element: <AddSubCategory />,
          },
          {
            icon: <DocumentIcon {...icon} />,
            name: "Crops",
            path: "/add-crop",
            element: <AddCrop />,
          },
          {
            icon: <DocumentPlusIcon {...icon} />,
            name: "Hybrid",
            path: "/add-hybrid",
            element: <AddHybrid />,
          },
          {
            icon: <PlusCircleIcon {...icon} />,
            name: "Products",
            path: "/add-product",
            element: <AddProduct />,
          },
          {
            icon: <GiftIcon {...icon} />,
            name: "Promotions",
            path: "/add-promotions",
            element: <AddPromotions />,
          },
          {
            icon: <GiftIcon {...icon} />,
            name: "Regions",
            path: "/add-Regions",
            element: <AddRegion />,
            icon: <PlusCircleIcon {...icon} />,
            name: "States",
            path: "/add-states",
            element: <AddState />,
            icon: <PlusCircleIcon {...icon} />,
            name: "Products",
            path: "/add-product",
            element: <AddProduct />,
          },
          {
            icon: <PlusCircleIcon {...icon} />,
            name: "Territory",
            path: "/add-territory",
            element: <AddTerritory />,
            },
          {
            icon: <PlusCircleIcon {...icon} />,
            name: "Districts",
            path: "/add-districts",
            element: <AddDistrict />,
          },
          {
            icon: <DocumentIcon {...icon} />,
            name: "ProductionPlants",
            path: "/add-productionplants",
            element: <AddProductionPlants/>,
          },
        ]
      }
    ]
  },
  {
    layout: "coupons",
    pages: [
      {
        icon: <ReceiptPercentIcon {...icon} />,
        name: "Coupons",
        path: "/add-coupons",
        element: <AddCoupon />,
      }
    ]
  },
  {
    layout: "promotions",
    pages: [
      {
        icon: <SpeakerWaveIcon {...icon} />,
        name: "Promotions",
        path: "/promitions",
        element: <AddPromotions />,
      }
    ]
  },
  {
    layout: "stocks",
    pages: [
      {
        icon: <CircleStackIcon {...icon} />,
        name: "Stocks",
        path: "/stocks",
        element: <Stocks />,
      }
    ]
  },
  {
    layout: "reports",
    pages: [
      {
        icon: <ChartBarIcon {...icon} />,
        name: "Reports",
        path: "/reports",
        element: <Reports /> 
      }
    ]
  }, 
];
 

export default routes;
