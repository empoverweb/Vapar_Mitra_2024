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
  ChartBarIcon,
  UserIcon,
  Square2StackIcon,
  Squares2X2Icon
} from "@heroicons/react/24/solid";
import { Home} from "@/pages/dashboard"; 
import {AddRole,AddUser, AddUserMapping} from "@/pages/usermangment"; 
import {AddCategory,AddCrop,AddHybrid,AddProduct,AddPromotions,AddSubCategory,AddState,AddTerritory,AddDistrict,AddProductionPlants,AddSeasons,AddHeadQuarters,AddCountry,AddRegion} from "@/pages/masters";
import {AddCoupon} from "@/pages/coupons"; 
import Stocks from "@/pages/stocks";
import Reports from '@/pages/reports' 
import AddEkycBypassApproval from "./pages/eKycBypassApproval/eKycBypassApproval";
import AddRetailers from "./pages/retailers/retailers";
import AddZones from "@/pages/masters/addzones";

const icon = {
  className: "w-5 h-5 text-inherit",
};
 

export const routes = [ 
  {
    layout: "dashboard",
    pages: [
      {
        icon: <Squares2X2Icon {...icon} />,
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
        icon: <UserIcon {...icon} />,
        name: "User Mangement", 
        subitems:[   
          {
            icon: <UserPlusIcon {...icon} />,
            name: "Add Role",
            path: "/add-role",
            element: <AddRole />,
          },
          {
            icon: <UserPlusIcon {...icon} />,
            name: "User Mapping",
            path: "/add-userMapping",
            element: <AddUserMapping />,
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
            name: "Zones",
            path: "/add-Zones",
            element: <AddZones />,
          },
          {
            icon: <GiftIcon {...icon} />,
            name: "Regions",
            path: "/add-Regions",
            element: <AddRegion />,
          },
          {
            icon: <PlusCircleIcon {...icon} />,
            name: "States",
            path: "/add-states",
            element: <AddState />,
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
          {
            icon: <DocumentIcon {...icon} />,
            name: "Seasons",
            path: "/add-seasons",
            element: <AddSeasons/>,
          },
          {
            icon: <GiftIcon {...icon} />,
            name: "Head Quarters",
            path: "/add-headQuarters",
            element: <AddHeadQuarters/>,
          },
          {
            icon: <GiftIcon {...icon} />,
            name: "Countries",
            path: "/add-country",
            element: <AddCountry/>,
          }
        ]
      }
    ]
  },
  {
    layout: "eKycBypassApproval",
    pages: [
      {
        icon: <ReceiptPercentIcon {...icon} />,
        name: "eKYC Approval",
        path: "/add-ekycBypassApproval",
        element: <AddEkycBypassApproval />,
      }
    ]
  },
  {
    layout: "retailers",
    pages: [
      {
        icon: <ReceiptPercentIcon {...icon} />,
        name: "Retailers",
        path: "/add-retailers",
        element: <AddRetailers />,
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
