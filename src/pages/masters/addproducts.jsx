import PrimeDataTable from "@/widgets/primedatatable";
import React, { useState, useEffect, useRef } from 'react';
import Modal from "@/widgets/modal";
import { Button } from "@material-tailwind/react";
import { getProducts } from "@/utils";
import { ApiService } from "@/service";
import { Toast } from 'primereact/toast';
import { FormFields } from '@/widgets/FormFields';
import { useForm } from 'react-hook-form';
export function AddProduct() {

  const [tableData, setTableData] = useState(null);
  const [previousData, setPreviousData] = useState([]);
  const [showPopup, setShowPopup] = useState(false)
  const [product, setproduct] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [statusValue, setstatusValue] = useState('');
  const toast = useRef(null);
  const { register, handleSubmit, formState: { errors } } = useForm();


  /////API CALL TO GET ALL THE PRODUCTS

  const tableColumns = [
    {
      'field': 'productName',
      'header': "Product Name"
    },
    {
      'field': 'packSize',
      'header': "Pack Size"
    },
    {
      'field': 'packUnit',
      'header': "Pack Unit"
    },
    {
      'field': 'remarks',
      'header': "Remarks"
    },
    {
      'field': 'status',
      'header': "Status"
    }
  ]



  useEffect(() => {

    const fetchProductsData = async () => {
      try {
        const apiUrl = getProducts;
        const response = await ApiService.getData(apiUrl);
        setTableData(response.response.productList);
      } catch (error) {
        console.error("Error fetching product master data:", error);
      }
    };

    if (JSON.stringify(previousData) !== JSON.stringify(tableData)) {
      fetchProductsData();
      setPreviousData(tableData);
    }
  }, [tableData, previousData]);


  // add new record
  
  const handleAddNew = () => { 
    setShowPopup(true)
  }

  const onSubmit = (data) => {
    alert();
    console.log(data); // This will log the form data to the console
    // Handle form data as needed
  };
   



  //On Edit/ update

  const handleEdit = (rowData) => {
    alert(JSON.stringify(rowData));
    console.log(JSON.stringify(rowData))
    setShowPopup(true)
  }

  const [date, setDate] = useState();
  const handleSelectDate = (selectedDate) => {
    setDate(selectedDate);
  };


  //on delete 

  const handleDelete = (rowData) => {
    alert("delete clicked")
    setShowPopup(true)
  }


  //close the modal popup

  const hideDialog = () => {
    setShowPopup(false);
  };

  //status on change
  const handleStatusChange= (e) => {
    setstatusValue(e.target.value); 
  }

  return (
    <>
      <div class="relative flex flex-col w-full h-full text-gray-700 shadow-md rounded-xl bg-clip-border">
        <div class="p-0 px-0">
          <Toast ref={toast} />
          <PrimeDataTable tableHeading={'Add Product'} tableData={tableData} tableColumns={tableColumns} showActions={true} handleAddNew={handleAddNew} handleEdit={handleEdit} handleDelete={handleDelete} handleExport={true} />
          <Modal visible={showPopup} onHide={() => setShowPopup(false)} header={"Add New Product"}>
            <form onSubmit={handleSubmit(onSubmit)}>

              <div className="my-4 flex sm:flex-row flex-col items-center gap-4 mb-8">

                <FormFields type="text" id="productName" label="Product Name" size="sm" color="teal" error={true} register={register} errors={errors} RequiredErrorMsg={'Enter Product name'} />

                <FormFields type="number" id="packSize" label="Pack Size" size="sm" color="teal" error={true} register={register} errors={errors} RequiredErrorMsg={'Enter Pack Size'} />

              </div>

              <div className="my-4 flex sm:flex-row flex-col items-center gap-4 mb-8">

                <FormFields type="number" id="packUnit" label="Pack Unit" size="sm" color="teal" error={true} register={register} errors={errors} RequiredErrorMsg={'Enter Pack Unit'} />
               
 
              </div>

              {/* //formfields */}
              <div className='flex justify-center items-center'>
                <Button type='submit' variant="filled" size="md" className='bg-primaryColor'>Save</Button>
              </div>
            </form>
          </Modal>
        </div>
      </div>
    </>
  );
}

export default AddProduct;

