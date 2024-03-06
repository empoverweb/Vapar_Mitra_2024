import PrimeDataTable from "@/widgets/primedatatable";
import React, { useState, useEffect, useRef } from 'react';
import Modal from "@/widgets/modal";
import { Button } from "@material-tailwind/react";
import { getStates } from "@/utils";
import { ApiService } from "@/service";
import { Toast } from 'primereact/toast';
import { FormFields } from '@/widgets/FormFields';
import { useForm } from 'react-hook-form';
  
  export function AddState() {
    const [tableData, setTableData] = useState(null);
    const [previousData, setPreviousData] = useState([]);
    const [showPopup, setShowPopup] = useState(false)
    const [state, setState] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [statusValue, setstatusValue] = useState();
    const toast = useRef(null);
    const { register, handleSubmit, formState: { errors } } = useForm();
  
  
    /////API CALL TO GET ALL THE Crops
  
    const tableColumns = [
      {
        'field': 'stateName',
        'header': "State Name"
      },
      {
        'field': 'stateCode',
        'header': "State Code"
      },
      {
        'field': 'zone.zoneName',
        'header': "Zone Name"
      },
      {
        'field': 'country.countryName',
        'header': "Country Name"
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
  
      const fetchStatesData = async () => {
        try {
          const apiUrl = getStates;
          const response = await ApiService.getData(apiUrl);
          setTableData(response.response.stateList);
        } catch (error) {
          console.error("Error fetching StateName master data:", error);
        }
      };
  
      if (JSON.stringify(previousData) !== JSON.stringify(tableData)) {
        fetchStatesData();
        setPreviousData(tableData);
      }
    }, [tableData, previousData]);
  
  
    // add new record
  
    let emptyState = {
      id: 0,
      stateName: '',
      stateCode: '',
      country: '',
      zone: '',
      remarks: '',
      status: true
    };
  
    const onSubmit = (data) => {
      setState(emptyState);
      setSubmitted(false);
      setShowPopup(true)
    }
  
    const handleAddNew = () => {
      setState(emptyState);
      setSubmitted(false);
      setShowPopup(true)
    }
  
  
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
        <div className="relative flex flex-col w-full h-full text-gray-700 shadow-md rounded-xl bg-clip-border">
        <div className="p-0 px-0">
          <Toast ref={toast} />
          <PrimeDataTable tableHeading={'Add State'} tableData={tableData} tableColumns={tableColumns} showActions={true} handleAddNew={handleAddNew} handleEdit={handleEdit} handleDelete={handleDelete} handleExport={true} />
          <Modal visible={showPopup} onHide={() => setShowPopup(false)} header={"Add New state"}>
            <form onSubmit={handleSubmit(onSubmit)}>

              <div className="my-4 flex sm:flex-row flex-col items-center gap-4">

                <FormFields type="select" id="country" label="country Name" size="sm" color="teal" error={true} register={register} errors={errors} RequiredErrorMsg={'Enter country name'} />

                <FormFields type="number" id="zone" label="zone Name" size="sm" color="teal" error={true} register={register} errors={errors} RequiredErrorMsg={'Enter zone Code'} />

              </div>  
              <div className="my-4 flex sm:flex-row flex-col items-center gap-4">

                <FormFields type="text" id="stateName" label="state Name" size="sm" color="teal" error={true} register={register} errors={errors} RequiredErrorMsg={'Enter State name'} />

                <FormFields type="number" id="stateCode" label="State Code" size="sm" color="teal" error={true} register={register} errors={errors} RequiredErrorMsg={'Enter State Code'} />

              </div>          
              <div className="my-4 flex sm:flex-row flex-col items-center gap-4">

                <FormFields type="text" id="remarks" label="Remarks" size="sm" color="teal" error={true} register={register} errors={errors} RequiredErrorMsg={'Enter Remarks'} />

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
                  onChange={handleStatusChange}
                  selectedValue={statusValue}
                />
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
  
  export default AddState;
  