
import { Toast } from "primereact/toast";
import PrimeDataTable from "@/widgets/primedatatable";
import { useEffect, useRef, useState } from "react";
import { couponsGet,uploadCouponsFileApi, useDownload } from "@/utils";
import { ApiService } from "@/service";
import { Button } from "@material-tailwind/react";
import Modal from "@/widgets/modal";
import { UploadModal } from "@/widgets/modal/uploadModal";

export function AddCoupon() {
  const [tableData, setTableData] = useState(null);
  const [uploadPopup, setUploadPopup] = useState(false)
  const [modalHeading, setmodalHeading] = useState('');
  const  [downloadUrl, fetchDownloadApi] = useDownload("coupons")
console.log(downloadUrl,"url of download")

  const toast = useRef(null);
  const tableColumns = [
    {
      'field': 'couponCode',
      'header': "Coupon code"
    },
    {
      'field': 'cropName',
      'header': "Crop Name"
    },
    {
      'field': 'mobileNumber',
      'header': "Mobile Number"
    },
    {
      'field': 'couponType',
      'header': "Coupon Type"
    },
    {
      'field': 'lotNumber',
      'header': "Lot Number"
    },
    {
      'field': 'status',
      'header': "Status"
    },
    {
      'field': 'createdOn',
      'header': "Created On"
    }
  ]

  const fetchProductsData = async () => {
    try {
      const apiUrl = couponsGet;
      const response = await ApiService.getData(apiUrl);
      console.log(response,"rsfsfsfsf")
      setTableData(response.response.couponsList);
    } catch (error) {
      console.error("Error fetching product master data:", error);
    }
  };
  useEffect(() => {
    fetchProductsData();
  }, []);


  useEffect(() => {
    if (downloadUrl) {
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.setAttribute('download', 'Coupon_Details.xlsx');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }, [downloadUrl]);
  const handleDownloadFile =  () => {
     fetchDownloadApi();
  };
 

  const handleUploadFile = () =>{
    setUploadPopup(true);
  }
  
  const handleAddNew = () =>{

  }
  const handleEdit = () =>{

  }
  const handleDelete = () =>{


  }

  return (
    <>
       <div class="relative flex flex-col w-full h-full text-gray-700">
        <div class="p-0 px-0">
          <Toast ref={toast} />
          <PrimeDataTable tableHeading={'Add Product'} tableData={tableData} tableColumns={tableColumns} showActions={true} handleAddNew={handleAddNew} handleEdit={handleEdit} handleDelete={handleDelete} handleExport={true} handleDownload={handleDownloadFile} handleUpload={handleUploadFile} />  
          <UploadModal
            visible={uploadPopup}
            header="Upload File" 
            extraParams={"excelFile"}
            upLoadUrl={uploadCouponsFileApi}
            onHide={() => setUploadPopup(false)}
          />
        </div>
      </div>
    </>
  );
}

export default AddCoupon;
