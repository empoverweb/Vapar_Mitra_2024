import PrimeDataTable from "@/widgets/primedatatable";
import React, { useState, useEffect, useRef } from 'react';
import Modal from "@/widgets/modal";
import { Button } from "@material-tailwind/react";
import { addCategory, getCategories } from "@/utils";
import { ApiService } from "@/service";
import { Toast } from 'primereact/toast';
import { FormFields } from '@/widgets/FormFields';
import { useForm } from 'react-hook-form';
import { DeleteModal } from "@/widgets/modal/deleteModal";
export function AddCategory() {

  let emptyCategory = {
    id:0,
    name:'',
    status:true,
    remarks:''
};


  const [tableData, setTableData] = useState(null);
  const [showPopup, setShowPopup] = useState(false)
  const [category, setcategory] = useState(emptyCategory);
  const [isEditMode, setIsEditMode] = useState(false);
  const [modalHeading, setmodalHeading] = useState('');
  const [deleteProductsDialogVisible, setDeleteProductsDialogVisible] = useState(false);
  const toast = useRef(null);
  const { register, handleSubmit, formState: { errors } } = useForm();


  /////API CALL TO GET ALL THE CATEGORIES
  const tableColumns = [
    {
      'field': 'name',
      'header': "Category Name"
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
    fetchCategoriesData();
  }, [category]);


    const fetchCategoriesData = async () => {
      try {
        const apiUrl = getCategories;
        const response = await ApiService.getData(apiUrl);
        setTableData(response.response.categoryList);
      } catch (error) {
        console.error("Error fetching category master data:", error);
      }
    };


  // add new record
  const handleAddNew = () => {
    setcategory(emptyCategory);
    setShowPopup(true)
    setIsEditMode(false)
    setSubmitted(false);
  }
  const saveProduct = async () => {
    const postData = category;
    const apiUrl = addCategory;
    const response = await ApiService.postData(apiUrl, postData);
    response.statusCode == 200 ? setShowPopup(false) : null;
    ApiService.handleResponse(response, toast);
    // Update table data with the new record
    fetchCategoriesData();
  }

  //On Edit/ update
  const handleEdit = (rowData) => {
    console.log(rowData,"category row data")
   const updatedProduct = {
      ...emptyCategory,
      ...rowData,
    };
    setcategory(updatedProduct);
    setIsEditMode(true);
    setmodalHeading('Edit Category');
    setShowPopup(true);
  }

  //on delete 
  const handleDelete = (rowData) => {
    const updatedProduct = {
      id: rowData.id,
      name: rowData.name,
      status: false,
      remarks: rowData.remarks,
    };
    setcategory(updatedProduct);
    setDeleteProductsDialogVisible(true);
  }
  const handleDeleteProduct = async () => { 
    const postData = category;
    const apiUrl = addCategory;
    const response = await ApiService.postData(apiUrl, postData);
    response.statusCode == 200 ? setShowPopup(false) : null;
    ApiService.handleResponse(response, toast);
    setDeleteProductsDialogVisible(false);
    fetchCategoriesData();
  };
  //close the modal popup
  const handleChange = (fieldName, value) => {
    setcategory(prevCategory => ({
      ...prevCategory,
      [fieldName]: value
    }));
  };

  
  return (
    <>
      <div class="relative flex flex-col w-full h-full text-gray-700 shadow-md rounded-xl bg-clip-border">
        <div class="p-0 px-0">
          <Toast ref={toast} />
          <PrimeDataTable tableHeading={'Add Category'} tableData={tableData} tableColumns={tableColumns} showActions={true} handleAddNew={handleAddNew} handleEdit={handleEdit} handleDelete={handleDelete} handleExport={true} handleDownload={true} handleUpload={true} />
          <Modal visible={showPopup} onHide={() => setShowPopup(false)} header={modalHeading}>
            <form onSubmit={handleSubmit(saveProduct)}>

              <div className="my-4 flex sm:flex-row flex-col items-center gap-4">

                <FormFields type="text" id="name" label="Category Name" size="sm" color="teal" error={true} register={register}  errors={errors} RequiredErrorMsg={'Enter  Name'}  value={category.name} onChange={e => handleChange("name", e.target.value)} />
              </div>
              <div className="my-4 flex sm:flex-row flex-col items-center gap-4">
                <FormFields type="text" id="remarks" label="Remarks" size="sm" color="teal" error={true} register={register} errors={errors}  RequiredErrorMsg={'Enter  Remarks'} value={category.remarks} onChange={e => handleChange("remarks", e.target.value)} />
              </div>
              <div className="my-4 flex sm:flex-row flex-col items-center gap-4">
              {isEditMode && (
                  <FormFields
                    type="statusDropdown"
                    id="status"
                    label="Status"
                    size="md"
                    color="teal"
                    error={true}
                    register={register}
                    errors={errors}
                    RequiredErrorMsg={'Select Status'}
                    value={category.status}
                    selectedValue={category.status}
                    onChange={e => handleChange("status", e.target.value)}
                  />
                )} 
              </div>
              {/* //formfields */}
              <div className='flex justify-center items-center'>
                <Button type='submit' variant="filled" size="md" className='bg-primaryColor'>Save</Button>
              </div>
            </form>
          </Modal>
          <DeleteModal
            visible={deleteProductsDialogVisible}
            header="Confirm"
            // hideDeleteProductsDialog={hideDeleteProductsDialog}
            handleDelete={handleDeleteProduct}
            // item={product.productName}
            onHide={() => setDeleteProductsDialogVisible(false)}
          />

        </div>
      </div>
    </>
  );
}

export default AddCategory;

