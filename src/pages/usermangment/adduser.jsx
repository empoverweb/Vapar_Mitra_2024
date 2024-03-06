import PrimeDataTable from "@/widgets/primedatatable";
import React, { useState, useEffect, useRef } from 'react';
import Modal from "@/widgets/modal";
import { Button } from "@material-tailwind/react";
import { getUsers } from "@/utils";
import { ApiService } from "@/service";
import { Toast } from 'primereact/toast';
import { FormFields } from '@/widgets/FormFields';
import { useForm } from 'react-hook-form';

export function AddUser() {

  const [tableData, setTableData] = useState(null);
  const [previousData, setPreviousData] = useState([]);
  const [showPopup, setShowPopup] = useState(false)
  const [product, setproduct] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [statusValue, setstatusValue] = useState();
  const toast = useRef(null);
  const { register, handleSubmit, formState: { errors } } = useForm();


  /////API CALL TO GET ALL THE COUNTRIES

  const tableColumns = [
    {
      'field': 'ekycDoneDate',
      'header': "eKYC Done Date"
    },
    {
      'field': 'code',
      'header': "Code"
    },
    {
      'field': 'loginId',
      'header': "Login ID"
    },
    {
      'field': 'gender',
      'header': "Gender"
    },
    {
      'field': 'city',
      'header': "City"
    },
    {
      'field': 'mobileNumber',
      'header': "Mobile Number"
    },
    {
      'field': 'latitude',
      'header': "Latitude"
    },
    {
      'field': 'aadharId',
      'header': "Aadhar ID"
    },
    {
      'field': 'emailId',
      'header': "Email ID"
    },
    {
      'field': 'registeredThrough',
      'header': "Registered Through"
    },
    {
      'field': 'deviceId',
      'header': "Device ID"
    },
    {
      'field': 'createdOn',
      'header': "Created On"
    },
    {
      'field': 'countryId',
      'header': "Country ID"
    },
    {
      'field': 'stateName',
      'header': "State Name"
    },
    {
      'field': 'spouseBirthDate',
      'header': "Spouse Birth Date"
    },
    {
      'field': 'storeName',
      'header': "Store Name"
    },
    {
      'field': 'landmark',
      'header': "Landmark"
    },
    {
      'field': 'profileAddressIs',
      'header': "Profile Address Is"
    },
    {
      'field': 'fcmToken',
      'header': "FCM Token"
    },
    {
      'field': 'longitude',
      'header': "Longitude"
    },
    {
      'field': 'deviceType',
      'header': "Device Type"
    },
    {
      'field': 'districtName',
      'header': "District Name"
    },
    {
      'field': 'roleId',
      'header': "Role ID"
    },
    {
      'field': 'stateId',
      'header': "State ID"
    },
    {
      'field': 'dateOfBirth',
      'header': "Date of Birth"
    },
    {
      'field': 'forceUpdate',
      'header': "Force Update"
    },
    {
      'field': 'panNumber',
      'header': "PAN Number"
    },
    {
      'field': 'addressLine',
      'header': "Address Line"
    },
    {
      'field': 'userId',
      'header': "User ID"
    },
    {
      'field': 'deviceToken',
      'header': "Device Token"
    },
    {
      'field': 'gstNumber',
      'header': "GST Number"
    },
    {
      'field': 'districtId',
      'header': "District ID"
    },
    {
      'field': 'pinCode',
      'header': "PIN Code"
    },
    {
      'field': 'roleName',
      'header': "Role Name"
    },
    {
      'field': 'name',
      'header': "Name"
    },
    {
      'field': 'firmName',
      'header': "Firm Name"
    },
    {
      'field': 'location',
      'header': "Location"
    },
    {
      'field': 'countryName',
      'header': "Country Name"
    },
    {
      'field': 'mandatoryUpdate',
      'header': "Mandatory Update"
    },
    {
      'field': 'remarks',
      'header': "Remarks"
    },
    {
      'field': 'ekycStatus',
      'header': "eKYC Status"
    },
    {
      'field': 'status',
      'header': "Status"
    },
    {
      'field': 'martialStatus',
      'header': "Martial Status"
    },
    {
      'field': 'marriageAnniversary',
      'header': "Marriage Anniversary"
    }
];


  useEffect(() => {

    const fetchCountryData = async () => {
      try {
        const fetchUrl = getUsers;
        const response = await ApiService.getData(fetchUrl);
        setTableData(response.response.userList);
      } catch (error) {
        console.error("Error fetching Country master data:", error);
      }
    };

    if (JSON.stringify(previousData) !== JSON.stringify(tableData)) {
      fetchCountryData();
      setPreviousData(tableData);
    }
  }, [tableData, previousData]);


  // add new record

  let emptyCountry = {
    id: 0,
    countryCode:"",
    countryName:"",
    currency:"",
    status:true,
    remarks:""
  };

  const onSubmit = (data) => {
    setproduct(emptyCountry);
    setSubmitted(false);
    setShowPopup(true)
  }

  const handleAddNew = () => {
    setproduct(emptyCountry);
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
      <div class="relative flex flex-col w-full h-full text-gray-700 shadow-md rounded-xl bg-clip-border">
        <div class="p-0 px-0">
          <Toast ref={toast} />
          <PrimeDataTable tableHeading={'Country'} tableData={tableData} tableColumns={tableColumns} showActions={true} handleAddNew={handleAddNew} handleEdit={handleEdit} handleDelete={handleDelete} handleExport={true} />
          <Modal visible={showPopup} onHide={() => setShowPopup(false)} header={"Add New Country"}>
            <form onSubmit={handleSubmit(onSubmit)}>

              <div className="my-4 flex sm:flex-row flex-col items-center gap-4">

                <FormFields type="text" id="countryName" label="Country Name" size="sm" color="teal" error={true} register={register} errors={errors} RequiredErrorMsg={'Enter Country name'} />
                <FormFields type="text" id="countryCode" label="Country Code" size="sm" color="teal" error={true} register={register} errors={errors} RequiredErrorMsg={'Enter Country code'} />
                <FormFields type="text" id="currency" label="Currency" size="sm" color="teal" error={true} register={register} errors={errors} RequiredErrorMsg={'Enter Currency'} />
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

export default AddUser;

