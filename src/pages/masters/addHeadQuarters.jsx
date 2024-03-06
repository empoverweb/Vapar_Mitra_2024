import PrimeDataTable from "@/widgets/primedatatable";
import React, { useState, useEffect, useRef } from 'react';
import Modal from "@/widgets/modal";
import { Button } from "@material-tailwind/react";
import { getHeadQuarters } from "@/utils";
import { ApiService } from "@/service";
import { Toast } from 'primereact/toast';
import { FormFields } from '@/widgets/FormFields';
import { useForm } from 'react-hook-form';

export function AddHeadQuarters() {

  const [tableData, setTableData] = useState(null);
  const [previousData, setPreviousData] = useState([]);
  const [showPopup, setShowPopup] = useState(false)
  const [product, setproduct] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [statusValue, setstatusValue] = useState();
  const toast = useRef(null);
  const { register, handleSubmit, formState: { errors } } = useForm();

  /////API CALL TO GET ALL THE HEAD QUARTERS

  const tableColumns = [
    {
      'field': 'headquarterName',
      'header': "Head Quarter Name"
    },
    {
      'field': 'territory.territoryName',
      'header': "Territory Name"
    },
    {
      'field': 'territory.region.regionName',
      'header': "Region Name"
    },
    {
      'field': 'territory.region.zone.zoneName',
      'header': "Zone Name"
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

    const fetchHeadQuartersData = async () => {
      try {
        const apiUrl = getHeadQuarters;
        const response = await ApiService.getData(apiUrl);
        setTableData(response.response.headQuartorsList);
      } catch (error) {
        console.error("Error fetching HeadQuarters Master data:", error);
      }
    };

    if (JSON.stringify(previousData) !== JSON.stringify(tableData)) {
      fetchHeadQuartersData();
      setPreviousData(tableData);
    }
  }, [tableData, previousData]);


  // add new record

  let emptyHeadQuarters = {
    id: 0,
    headquarterName: '',
    remarks: '',
    status: true
  };

  const onSubmit = (data) => {
    setproduct(emptyHeadQuarters);
    setSubmitted(false);
    setShowPopup(true)
  }

  const handleAddNew = () => {
    setproduct(emptyHeadQuarters);
    setSubmitted(false);
    setShowPopup(true);
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
      <div class="relative flex flex-col w-full h-full text-gray-700 shadow-md rounded-xl bg-clip-border">
        <div class="p-0 px-0">
          <Toast ref={toast} />
          <PrimeDataTable tableHeading={'Head Quarters'} tableData={tableData} tableColumns={tableColumns} showActions={true} handleAddNew={handleAddNew} handleEdit={handleEdit} handleDelete={handleDelete} handleExport={true} />
          <Modal visible={showPopup} onHide={() => setShowPopup(false)} header={"Add New Head Quarter Master"}>
            <form onSubmit={handleSubmit(onSubmit)}>

              <div className="my-4 flex sm:flex-row flex-col items-center gap-4">

                <FormFields type="text" id="headquarterName" label="Head Quarter Name" size="sm" color="teal" error={true} register={register} errors={errors} RequiredErrorMsg={'Enter Head Quarter Name'} />
                <FormFields type="text" id="remarks" label="Remarks" size="sm" color="teal" error={true} register={register} errors={errors} RequiredErrorMsg={'Enter Remarks'} />
              </div>

              <div className="my-4 flex sm:flex-row flex-col items-center gap-4">

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

export default AddHeadQuarters;

