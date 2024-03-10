import PrimeDataTable from "@/widgets/primedatatable";
import React, { useState, useEffect, useRef } from 'react';
import Modal from "@/widgets/modal";
import { Button } from "@material-tailwind/react";
import { getRoles, useGetZones } from "@/utils";
import { ApiService } from "@/service";
import { Toast } from 'primereact/toast';
import { FormFields } from '@/widgets/FormFields';
import { useForm } from 'react-hook-form';

export function AddUserMapping() {

    const [tableData, setTableData] = useState(null);
    const [previousData, setPreviousData] = useState([]);
    const [showPopup, setShowPopup] = useState(false)
    const [userMap, setUserMap] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [statusValue, setstatusValue] = useState();
    const toast = useRef(null);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [isEditMode, setIsEditMode] = useState(false);
    const [modalHeading, setmodalHeading] = useState('');
    const [zonesOptionsData, fetchZoneMasters] = useGetZones();


    /////API CALL TO GET ALL THE ROLES

    const tableColumns = [
        {
            'field': 'name',
            'header': "Zone"
        },
        {
            'field': 'remarks',
            'header': "Region"
        },
        {
            'field': 'description',
            'header': "Territory"
        },
        {
            'field': 'status',
            'header': "Users"
        },
        {
            'field': 'status',
            'header': "Retailers"
        }
    ]

    useEffect(() => {

        const fetchRolesData = async () => {
            try {
                const fetchUrl = getRoles;
                const response = await ApiService.getData(fetchUrl);
                setTableData(response.response.rolesList);
            } catch (error) {
                console.error("Error fetching roles master data:", error);
            }
        };

        if (JSON.stringify(previousData) !== JSON.stringify(tableData)) {
            fetchRolesData();
            setPreviousData(tableData);
        }
    }, [tableData, previousData]);


    // add new record

    let emptyUserMap = {
        id: 0,
        zones: '',
        regions: '',
        territory: '',
        users: '',
        retailers: '',
        status: true
    };

    const onSubmit = (data) => {
        setUserMap(emptyRole);
        setSubmitted(false);
        setShowPopup(true)
    }

    

    const handleAddNew = () => {
        setUserMap(emptyUserMap);
        fetchZoneMasters();
        setSubmitted(false);
        setShowPopup(true)
    }

    const saveProduct = async () => {
        const postData = userMap;
        const apiUrl = addProduct;
        const response = await ApiService.postData(apiUrl, postData);
        response.statusCode == 200 ? setShowPopup(false) : null;
        ApiService.handleResponse(response, toast);
        // Update table data with the new record
        fetchProductsData();
      }

    //On Edit/ update

    const handleEdit = (rowData) => {
        alert(JSON.stringify(rowData));
        const updatedProduct = {
            ...emptyUserMap,
            ...rowData

        };
        setUserMap(updatedProduct);
        fetchZoneMasters();
        setIsEditMode(true);
        setmodalHeading('Edit User Mapped');
        setShowPopup(true);

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


    const [uploadModalVisible, setUploadModalVisible] = useState(false);

    const handleUpload = () => {
        // Logic for handling file upload
        // You can implement this according to your requirements
        console.log('File uploaded!');
        // Once upload is done, you may want to close the modal
        setUploadModalVisible(false);
    };

    const hideUploadModal = () => {
        setUploadModalVisible(false);
    };

    //close the modal popup

    const hideDialog = () => {
        setShowPopup(false);
    };

    //status on change
    const handleStatusChange = (e) => {
        setstatusValue(e.target.value);
    }

    return (
        <>
            <div class="relative flex flex-col w-full h-full text-gray-700 shadow-md rounded-xl bg-clip-border">
                <div class="p-0 px-0">
                    <Toast ref={toast} />
                    <PrimeDataTable tableHeading={'User Mapping'} tableData={tableData} tableColumns={tableColumns} showActions={true} handleAddNew={handleAddNew} handleEdit={handleEdit} handleDelete={handleDelete} handleExport={true} handleUpload={handleUpload} />
                    <Modal visible={showPopup} onHide={() => setShowPopup(false)} header={"Map Users"}>
                        <form onSubmit={handleSubmit(onSubmit)}>

                            <div className="my-4 flex sm:flex-row flex-col items-center gap-4">

                                <FormFields type="text" id="zoneId" label="Zone Name" size="md" color="teal" error={true} register={register} errors={errors} RequiredErrorMsg={'Select Zone'} />
                                <FormFields type="text" id="description" label="Regions" size="sm" color="teal" error={true} register={register} errors={errors} RequiredErrorMsg={'Enter Region'} />
                                <FormFields type="text" id="remarks" label="Territory" size="sm" color="teal" error={true} register={register} errors={errors} RequiredErrorMsg={'Enter Territory'} />

                            </div>
                            <div className="my-4 flex sm:flex-row flex-col items-center gap-4">

                                <FormFields type="text" id="name" label="Users" size="sm" color="teal" error={true} register={register} errors={errors} RequiredErrorMsg={'Enter User'} />
                                <FormFields type="text" id="description" label="Retailers" size="sm" color="teal" error={true} register={register} errors={errors} RequiredErrorMsg={'Enter Retailer'} />

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

export default AddUserMapping;

