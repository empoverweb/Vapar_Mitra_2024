import PrimeDataTable from "@/widgets/primedatatable";
import React, { useState, useEffect, useRef } from 'react';
import Modal from "@/widgets/modal";
import { Button } from "@material-tailwind/react";
import { getSubCategories,addSubCategory, UseCategoryMaster } from "@/utils";
import { ApiService } from "@/service";
import { Toast } from 'primereact/toast';
import { FormFields } from '@/widgets/FormFields';
import { useForm } from 'react-hook-form';
import { DeleteModal } from "@/widgets/modal/deleteModal";
export function AddSubCategory() {

  let emptySubCategory = {
    id: 0,
    name: '',
    categoryId:'',
    remarks:'',
    status: true
  };
  const [tableData, setTableData] = useState(null);
  const [previousData, setPreviousData] = useState([]);
  const [showPopup, setShowPopup] = useState(false)
  const [subCategory, setsubCategory] = useState(emptySubCategory);
  const [submitted, setSubmitted] = useState(false);
  const [statusValue, setstatusValue] = useState();
  const [isEditMode, setIsEditMode] = useState(false);
  const [modalHeading, setmodalHeading] = useState('');
  const [categoryMasterData,fetchCategoriesData] = UseCategoryMaster()
  const [deleteProductsDialogVisible, setDeleteProductsDialogVisible] = useState(false);
  const toast = useRef(null);
  const { register, handleSubmit, formState: { errors } } = useForm();


  /////API CALL TO GET ALL THE SUBCATEGORIES

  const tableColumns = [
    {
      'field': 'name',
      'header': "SubCategory Name"
    },
 
    {
      'field': 'category.remarks',
      'header': "Remarks"
    },
    {
      'field': 'category.name',
      'header': "Category Name"
    },
    {
      'field': 'status',
      'header': "Status"
    }
  ]

  

  useEffect(() => {
    const fetchsubCategoriesData = async () => {
      try {
        const apiUrl = getSubCategories;
        const response = await ApiService.getData(apiUrl);
        setTableData(response.response.subCategoryList);
        console.log("Response:", response); // Log the response object
        
      } catch (error) {
        console.error("Error fetching subcategory master data:", error);
      }
    };
  
    if (JSON.stringify(previousData) !== JSON.stringify(tableData)) {
      fetchsubCategoriesData();
      setPreviousData(tableData);
    }
  }, [tableData, previousData]);
  
 
  const handleAddNew = () => {
    setsubCategory(emptySubCategory);
    fetchCategoriesData()
    setSubmitted(false);
    setShowPopup(true)
  }
  const saveProduct = async () => {
    const postData = subCategory;
    const apiUrl = addSubCategory;
    const response = await ApiService.postData(apiUrl, postData);
    console.log(response,'add subCategory');
    response.statusCode == 200 ? setShowPopup(false) : null;
    ApiService.handleResponse(response, toast); 
    fetchsubCategoriesData();
  }

  //On Edit/ update

  const handleEdit = (rowData) => { 
    const updatedSubCategory = {
      ...emptySubCategory,
      ...rowData, 
      categoryId: rowData.category.id
    }; 
    setsubCategory(updatedSubCategory) 
    fetchCategoriesData()
    setIsEditMode(true);
    setmodalHeading('Edit SubCategory');
    setShowPopup(true)
  }
 
  //on delete 

  const handleDelete = (rowData) => {
    const updatedProduct = { 
      id: rowData.id,
      name: rowData.name,
      categoryId: rowData.category.id,
      remarks: rowData.remarks,
      status: false
    };
     setsubCategory(updatedProduct)
    setDeleteProductsDialogVisible(true);

  }
  const hideDeleteProductsDialog = () => {
    setDeleteProductsDialogVisible(false);
  };

  const handleDeleteProduct = async () => { 
    const postData = subCategory;
    const apiUrl = addSubCategory;
    const response = await ApiService.postData(apiUrl, postData);
    response.statusCode == 200 ? setShowPopup(false) : null;
    ApiService.handleResponse(response, toast);
    setDeleteProductsDialogVisible(false);
    fetchsubCategoriesData();
  };
 
 
  //onChange
  const handleChange = (fieldName, value) => {
    setsubCategory(prevProduct => ({
      ...prevProduct,
      [fieldName]: value
    }));
  };
  useEffect(()=>{
    fetchCategoriesData()
  },[])
  return (
    <>
      <div class="relative flex flex-col w-full h-full text-gray-700 shadow-md rounded-xl bg-clip-border">
        <div class="p-0 px-0">
          <Toast ref={toast} />
          <PrimeDataTable tableHeading={'Add SubCategory'} tableData={tableData} tableColumns={tableColumns} showActions={true} handleAddNew={handleAddNew} handleEdit={handleEdit} handleDelete={handleDelete} handleExport={true} handleDownload={true} handleUpload={true}/>
          <Modal visible={showPopup} onHide={() => setShowPopup(false)} header={modalHeading}>
            <form onSubmit={handleSubmit(saveProduct)}>

              <div className="my-4 flex sm:flex-row flex-col items-center gap-4">

                <FormFields type="text" id="name" label="subCategory Name" size="sm" value={subCategory.name} onChange={e => handleChange("name", e.target.value)} color="teal" error={true} register={register} errors={errors} RequiredErrorMsg={'Enter  Name'} />
                <FormFields
                  label="Category"
                  type="dropdown"
                  size="lg"
                  color="teal"
                  id="categoryId"
                  placeholder="category"
                  error={true}
                  register={register}
                  errors={errors} 
                  optionsData={categoryMasterData} 
                  RequiredErrorMsg={"slect Category"} 
                  selectedValue={subCategory.categoryId}
                  onChange={e => handleChange("categoryId", e.target.value)}
                /> 
              </div> 
              <div className="my-4 flex sm:flex-row flex-col items-center gap-4"> 
              <FormFields type="text" id="remarks" label="Remarks" size="sm" color="teal" value={subCategory.remarks} onChange={e => handleChange("remarks", e.target.value)} error={true} register={register} errors={errors} RequiredErrorMsg={'Enter  Remarks'} />
              {isEditMode && (
                <FormFields
                  label="Status"
                  type="statusDropdown"
                  size="lg"
                  color="teal"
                  id="status"
                  placeholder="status"
                  error={true}
                  register={register}
                  errors={errors}
                  RequiredErrorMsg={"slect status"}
                  value={subCategory.status}
                  selectedValue={subCategory.status}
                  onChange={e => handleChange("status", e.target.value)}
                />
                )}
 
              </div>

              {/* //formfields */}
              <div className='flex justify-center items-center'>
                <Button type='submit' variant="filled" size="md" className='bg-primaryColor'>{isEditMode ? 'Update': 'Save'}</Button>
              </div>
            </form>
          </Modal>

             {/* ///delete modal component loading */}

             <DeleteModal
              onHide={() => setDeleteProductsDialogVisible(false)}
            visible={deleteProductsDialogVisible}
            header="Confirm"
            hideDeleteProductsDialog={hideDeleteProductsDialog}
            handleDelete={handleDeleteProduct}
            item={subCategory.name}
            
          />
        </div>
      </div>
    </>
  );
}

export default AddSubCategory;

