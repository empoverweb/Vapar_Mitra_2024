import PrimeDataTable from "@/widgets/primedatatable";
import React, { useState, useEffect, useRef } from 'react';
import Modal from "@/widgets/modal";
import { Button } from "@material-tailwind/react";
import { UseStatesMaster, addDistrict, getDistricts, useGetCountries } from "@/utils";
import { ApiService } from "@/service";
import { Toast } from 'primereact/toast';
import { FormFields } from '@/widgets/FormFields';
import { useForm } from 'react-hook-form';
import { DeleteModal } from "@/widgets/modal/deleteModal";
export function AddDistrict() {
 
  let emptyDistrict = {
    id: 0,
    name: '',
    code: '',
    countryId:'',
    remarks:'',
    stateId :'',
    status: true
  };
  const [tableData, setTableData] = useState(null);
  const [previousData, setPreviousData] = useState([]);
  const [showPopup, setShowPopup] = useState(false)
  const [district, setdistrict] = useState(emptyDistrict);
  const [submitted, setSubmitted] = useState(false);
  const [statusValue, setstatusValue] = useState();
  const [countryOptionsData,fetchcountryMasters] = useGetCountries() 
  const [deleteStatesDialogVisible, setDeleteStatesDialogVisible] = useState(false); 
  const [stateMasterData,fetchStates] = UseStatesMaster()
  const [isEditMode, setIsEditMode] = useState(false);
  const [modalHeading, setmodalHeading] = useState('');
  const toast = useRef(null);
  const { register, handleSubmit, formState: { errors } } = useForm();


  /////API CALL TO GET ALL THE PRODUCTS

  const tableColumns = [
    {
      'field': 'code',
      'header': "District Code"
    },
    {
      'field': 'name',
      'header': "District Name"
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

console.log('state Data', stateMasterData);

  useEffect(() => {

    const fetchDistrictsData = async () => {
      try {
        const apiUrl = getDistricts;
        const response = await ApiService.getData(apiUrl);
        setTableData(response.response.districtList);
      } catch (error) {
        console.error("Error fetching product master data:", error);
      }
    };

    if (JSON.stringify(previousData) !== JSON.stringify(tableData)) {
      fetchDistrictsData();
      setPreviousData(tableData);
    }
  }, [tableData, previousData]);


  // add new record
 
  const saveRegion = async ()=>{
    const postData = district
    const apiUrl = addDistrict;
    const response = await ApiService.postData(apiUrl,postData)
    response.statusCode == 200 ? setShowPopup(false) : null;
    ApiService.handleResponse(response, toast);
  }
  const handleAddNew = () => {
    setdistrict(emptyDistrict);
    fetchcountryMasters()
    fetchStates()
    setSubmitted(false);
    setmodalHeading('Add District');
    setShowPopup(true)
  }


  //On Edit/ update

  const handleEdit = (rowData) => {
    console.log("rowData",rowData); 
    const updatedState = {
      ...emptyDistrict,
      ...rowData,
      stateId: rowData.state.id,
      countryId: rowData.countryId.id
    };
    setdistrict(updatedState)
    fetchcountryMasters()
    fetchStates()
    setIsEditMode(true);
    setmodalHeading('Edit District');
    setShowPopup(true)
  }

  const [date, setDate] = useState();
  const handleSelectDate = (selectedDate) => {
    setDate(selectedDate);
  };


  //on delete 

  const handleDelete = (rowData) => { 
    const updatedData ={
      id:rowData.id,
      name: rowData.name,
      code: rowData.code,
      countryId:  rowData.countryId.id,
      remarks: rowData.remarks,
      stateId :rowData.state.id,
      status: false
    }
    setdistrict(updatedData)
    setDeleteStatesDialogVisible(true);
  }

  const hideDeleteStatesDialog = () => {
    setDeleteStatesDialogVisible(false);
  };
  const handleDeleteState = async () => {
    const postData = district;
    const apiUrl = addDistrict;
    const response = await ApiService.postData(apiUrl, postData);
    response.statusCode == 200 ? setShowPopup(false) : null;
    ApiService.handleResponse(response, toast);
    setDeleteStatesDialogVisible(false);
    fetchStatesData();
  };

 
  const handleChange = (fieldName, value) => {
    setdistrict(prevRegion => ({
      ...prevRegion,
      [fieldName]: value
    }));
  };

  return (
    <>
      <div class="relative flex flex-col w-full h-full text-gray-700 shadow-md rounded-xl bg-clip-border">
        <div class="p-0 px-0">
          <Toast ref={toast} />
          <PrimeDataTable tableHeading={'Add District'} tableData={tableData} tableColumns={tableColumns} showActions={true} handleAddNew={handleAddNew} handleEdit={handleEdit} handleDelete={handleDelete} handleExport={true} handleDownload={true} handleUpload={true}/>
          <Modal visible={showPopup} onHide={() => setShowPopup(false)} header={modalHeading}>
            <form onSubmit={handleSubmit(saveRegion)}>
              
                   <div className="my-4 flex sm:flex-row flex-col items-center gap-4">

                 <FormFields type="dropdown" id="countryId" label="Country Name" size="sm" color="teal" error={true} optionsData={countryOptionsData} register={register} errors={errors} RequiredErrorMsg={'Select Country'} selectedValue={district.countryId}  onChange={e => handleChange("countryId", e.target.value)} />

                   <FormFields type="dropdown" id="stateId" label="State Name" size="sm" color="teal" error={true} optionsData={stateMasterData} register={register} errors={errors} RequiredErrorMsg={'Select State'} selectedValue={district.stateId}  onChange={e =>handleChange("stateId", e.target.value)}/>

                  </div>
                    <div className="my-4 flex sm:flex-row flex-col items-center gap-4">

                <FormFields type="number" id="code" label="District Code" size="sm" color="teal" error={true} register={register} errors={errors} RequiredErrorMsg={'Enter District Code'}value={district.code} onChange={e =>handleChange('code', e.target.value)} />

                <FormFields type="text" id="name" label="District Name" size="sm" color="teal" error={true} register={register} errors={errors} RequiredErrorMsg={'Enter District Name'} value={district.name} onChange={e=>handleChange("name", e.target.value)}/>

              </div>

              <div className="my-4 flex sm:flex-row flex-col items-center gap-4">

                {/* <FormFields type="number" id="packUnit" label="Pack Unit" size="sm" color="teal" error={true} register={register} errors={errors} RequiredErrorMsg={'Enter First name'} /> */}

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
                    value={district.status}
                    selectedValue={district.status}
                    onChange={e => handleChange("status", e.target.value)}
                  />
                )}

 
              </div>
              <div className="my-4 flex sm:flex-row flex-col items-center gap-4 mb-8">

              <FormFields type="textarea" id="remarks" label="Remarks" size="md" color="teal" error={true} register={register} errors={errors} RequiredErrorMsg={'Enter Remarks'} value={district.remarks} onChange={e => handleChange("remarks", e.target.value)} />

              </div>

              {/* //formfields */}
              <div className='flex justify-center items-center'>
                <Button type='submit' variant="filled" size="md" className='bg-primaryColor'>{isEditMode ? 'Update': 'Save'}</Button>
              </div>
            </form>
          </Modal>
          <DeleteModal
            visible={deleteStatesDialogVisible}
            header="Confirm"
            hideDeleteStatesDialog={hideDeleteStatesDialog}
            handleDelete={handleDeleteState}
            item={district.name}
            onHide={() => setDeleteStatesDialogVisible(false)}
          />
        </div>
      </div>
    </>
  );
}

export default AddDistrict;

