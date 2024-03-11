import PrimeDataTable from "@/widgets/primedatatable";
import React, { useState, useEffect, useRef } from 'react';
import Modal from "@/widgets/modal";
import { Button } from "@material-tailwind/react";
import { addCountry, getCountries } from "@/utils";
import { ApiService } from "@/service";
import { Toast } from 'primereact/toast';
import { FormFields } from '@/widgets/FormFields';
import { useForm } from 'react-hook-form';
import { DeleteModal } from "@/widgets/modal/deleteModal";

export function AddCountry() {

  let emptyCountry = {
    id: 0,
    name:"",
    code:"",
    currency:"",
    status:true,
    remarks:""
  };
  const [tableData, setTableData] = useState(null);
  const [country,setCountry] = useState(emptyCountry)
  const [showPopup, setShowPopup] = useState(false)
  const [submitted, setSubmitted] = useState(false);
  const [statusValue, setstatusValue] = useState();
  const [isEditMode, setIsEditMode] = useState(false);
  const [modalHeading, setModalHeading] = useState('');
  const [deleteCountryDialogVisible, setDeleteCountryDialogVisible] = useState(false);
  const toast = useRef(null);
  const { register, handleSubmit, formState: { errors } } = useForm();


  /////API CALL TO GET ALL THE COUNTRIES

  const tableColumns = [
    {
      'field': 'name',
      'header': "Country Name"
    },
    {
      'field': 'code',
      'header': "Country Code"
    },
    {
      'field': 'currency',
      'header': "Currency"
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

    const fetchCountryData = async () => {
      try {
        const fetchUrl = getCountries;
        const response = await ApiService.getData(fetchUrl);
        setTableData(response.response.countryList);
      } catch (error) {
        console.error("Error fetching Country master data:", error);
      }
    };

    useEffect(() =>{
        fetchCountryData()
    },[country])

    


  // add new record
  const saveProduct = async () => {
    const postData = country;
    const apiUrl = addCountry;
    const response = await ApiService.postData(apiUrl, postData);
    response.statusCode == 200 ? setShowPopup(false) : null;
    ApiService.handleResponse(response, toast);
    // Update table data with the new record
  fetchCountryData();
  }

  const handleAddNew = () => {
    setShowPopup(true)
    setCountry(emptyCountry);
    setIsEditMode(false)
    setSubmitted(false);
    setModalHeading('Add Product');
  }


  //On Edit/ update

  const handleEdit = (rowData) => {
    setShowPopup(true)
    setIsEditMode(true);
    setModalHeading('Edit Country');
    const updatedProduct = {
      ...emptyCountry,
      ...rowData,
    };
    setCountry(updatedProduct);
    fetchCountryData()
  }
  //on delete 

 
  const handleDelete = (rowData) => {
    const updatedCountry = {
      id: rowData.id,
      name: rowData.name,
      code: rowData.code,
      remarks: rowData.remarks,
      status: false,
    };
    setCountry(updatedCountry);
    // Set the delete modal visible
    setDeleteCountryDialogVisible(true);
  }

  const handleDeleteCountry = async () => { 
    const postData = country;
    const apiUrl = addCountry;
    const response = await ApiService.postData(apiUrl, postData);
    response.statusCode == 200 ? setShowPopup(false) : null;
    ApiService.handleResponse(response, toast);
    setDeleteCountryDialogVisible(false);
    fetchCountryData();
  };

  const hideDeleteCountryDialog = () => {
    setDeleteCountryDialogVisible(false);
  };

  // on change
  const handleChange = (fieldName,value) =>{
    setCountry(prevProduct => ({
      ...prevProduct,
      [fieldName]: value
    }));
  }

  return (
    <>
      <div class="relative flex flex-col w-full h-full text-gray-700 shadow-md rounded-xl bg-clip-border">
        <div class="p-0 px-0">
          <Toast ref={toast} />
          <PrimeDataTable tableHeading={'Country'} tableData={tableData} tableColumns={tableColumns} showActions={true} handleAddNew={handleAddNew} handleEdit={handleEdit} handleDelete={handleDelete} handleExport={true} />
          <Modal visible={showPopup} onHide={() => setShowPopup(false)} header={modalHeading}>
            <form onSubmit={handleSubmit(saveProduct)}>
              <div className="my-4 flex sm:flex-row flex-col items-center gap-4">
                <FormFields type="text" id="name" label="Country Name" size="sm" color="teal" error={true} register={register} errors={errors} RequiredErrorMsg={'Enter Country name'} value={country.name} onChange={e => handleChange("name", e.target.value)}  />
                <FormFields type="text" id="code" label="Country Code" size="sm" color="teal" error={true} register={register} errors={errors} RequiredErrorMsg={'Enter Country code'} value={country.code} onChange={e => handleChange("code", e.target.value)}  />
                <FormFields type="number" id="currency" label="Currency" size="sm" color="teal" error={true} register={register} errors={errors} RequiredErrorMsg={'Enter Currency'} value={country.currency} onChange={e => handleChange("currency", e.target.value)}  />
                <FormFields type="text" id="remarks" label="Remarks" size="sm" color="teal" error={true} register={register} errors={errors} RequiredErrorMsg={'Enter Remarks'} value={country.remarks} onChange={e => handleChange("remarks", e.target.value)}  />
              </div>
              <div className="my-4 flex sm:flex-row flex-col items-center gap-4">
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
                  selectedValue={country.status}
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
            visible={deleteCountryDialogVisible}
            header="Confirm"
            hideDeleteProductsDialog={hideDeleteCountryDialog}
            handleDelete={handleDeleteCountry}
            onHide={() => setDeleteCountryDialogVisible(false)}
          />
        </div>
      </div>
    </>
  );
}

export default AddCountry;

