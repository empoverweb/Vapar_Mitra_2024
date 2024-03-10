import PrimeDataTable from "@/widgets/primedatatable";
import React, { useState, useEffect, useRef } from 'react';
import Modal from "@/widgets/modal";
import { DeleteModal } from "@/widgets/modal/deleteModal";
import { Button } from "@material-tailwind/react";
import { getProducts, addProduct, useGetSeasons } from "@/utils";
import { ApiService } from "@/service";
import { Toast } from 'primereact/toast';
import { FormFields } from '@/widgets/FormFields';
import { useForm } from 'react-hook-form';
import UploadModal from "@/widgets/modal/uploadModal";

export function AddRetailers() {

    let emptyProduct = {
        id: 0,
        productName: '',
        packSize: '',
        packUnit: '',
        remarks: '',
        seasonId: '',
        status: true
    };

    const [tableData, setTableData] = useState(null);
    const [previousData, setPreviousData] = useState([]);
    const [showPopup, setShowPopup] = useState(false)
    const [product, setproduct] = useState(emptyProduct);
    const [submitted, setSubmitted] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [modalHeading, setmodalHeading] = useState('');
    const [deleteProductsDialogVisible, setDeleteProductsDialogVisible] = useState(false);
    const [seasonsOptionsData, fetchSeasondMasters] = useGetSeasons();
    const toast = useRef(null);
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    //tabel columns

    const tableColumns = [
        {
            'field': 'productName',
            'header': "Member Name"
        },
        {
            'field': 'packSize',
            'header': "Company Name"
        },
        {
            'field': 'packUnit',
            'header': "Mobile No."
        },
        {
            'field': 'remarks',
            'header': "District"
        },
        {
            'field': 'seasonId.seasonName',
            'header': "Taluk"
        },
        {
            'field': 'seasonId.seasonName',
            'header': "City"
        },
        {
            'field': 'seasonId.seasonName',
            'header': "State"
        },
        {
            'field': 'status',
            'header': "Status"
        }
    ]

    //get all products api
    useEffect(() => {
        fetchProductsData();
    }, []);


    const fetchProductsData = async () => {
        try {
            const apiUrl = getProducts;
            const response = await ApiService.getData(apiUrl);
            setTableData(response.response.productList);
        } catch (error) {
            console.error("Error fetching product master data:", error);
        }
    };

    ///add new recrod 

    const handleAddNew = () => {
        setproduct(emptyProduct);
        fetchSeasondMasters();
        setmodalHeading('Add Product');
        setShowPopup(true);
    }

    const saveProduct = async () => {
        const postData = product;
        const apiUrl = addProduct;
        const response = await ApiService.postData(apiUrl, postData);
        response.statusCode == 200 ? setShowPopup(false) : null;
        ApiService.handleResponse(response, toast);
        // Update table data with the new record
        fetchProductsData();
    }

    //On Edit/ update

    const handleEdit = (rowData) => {
        const updatedProduct = {
            ...emptyProduct,
            ...rowData,
            seasonId: rowData.seasonId.id
        };
        setproduct(updatedProduct);
        //fetchSeasondMasters();
        setIsEditMode(true);
        setShowPopup(true);
    }


    //on delete product

    const handleDelete = (rowData) => {

        // Create a new object with the relevant fields and set the status to false
        const updatedProduct = {
            id: rowData.id,
            productName: rowData.productName,
            packSize: rowData.packSize,
            packUnit: rowData.packUnit,
            remarks: rowData.remarks,
            seasonId: rowData.seasonId.id,
            status: false
        };

        setproduct(updatedProduct);
        ;

        // Set the delete modal visible
        setDeleteProductsDialogVisible(true);

    }

    const handleDeleteProduct = async () => {
        const postData = product;
        const apiUrl = addProduct;
        const response = await ApiService.postData(apiUrl, postData);
        response.statusCode == 200 ? setShowPopup(false) : null;
        ApiService.handleResponse(response, toast);
        setDeleteProductsDialogVisible(false);
        fetchProductsData();
    };

    const hideDeleteProductsDialog = () => {
        setDeleteProductsDialogVisible(false);
    };

    // Handle Upload Starts
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
    // Handle Upload End

    ///onchange to update the new value

    const handleChange = (fieldName, value) => {
        setproduct(prevProduct => ({
            ...prevProduct,
            [fieldName]: value
        }));
    };

    return (
        <>
            <div class="relative flex flex-col w-full h-full text-gray-700 shadow-md rounded-xl bg-clip-border">
                <div class="p-0 px-0">
                    <Toast ref={toast} />
                    <PrimeDataTable tableHeading={'Retailers'} tableData={tableData} tableColumns={tableColumns} showActions={true} handleAddNew={handleAddNew} handleEdit={handleEdit} handleDelete={handleDelete} handleExport={true} handleUpload={handleUpload} />
                    <Modal visible={showPopup} onHide={() => setShowPopup(false)} header={modalHeading}>
                        <form onSubmit={handleSubmit(saveProduct)}>

                            <div className="my-4 flex sm:flex-row flex-col items-center gap-4 mb-8">

                                <FormFields type="text" label="Member Name" size="md" color="teal" error={true} register={register} errors={errors} RequiredErrorMsg={'Enter Member name'} value={product.productName} onChange={e => handleChange("productName", e.target.value)} />

                                <FormFields type="text" id="packSize" label="Company Name" size="md" color="teal" error={true} register={register} errors={errors} RequiredErrorMsg={'Enter Company Name'} value={product.packSize} onChange={e => handleChange("packSize", e.target.value)} />

                            </div>

                            <div className="my-4 flex sm:flex-row flex-col items-center gap-4 mb-8">

                                <FormFields type="text" label="Mobile Number" size="md" color="teal" error={true} register={register} errors={errors} RequiredErrorMsg={'Enter Mobile Number'} value={product.productName} onChange={e => handleChange("productName", e.target.value)} />

                                <FormFields type="text" id="packSize" label="District" size="md" color="teal" error={true} register={register} errors={errors} RequiredErrorMsg={'Enter District'} value={product.packSize} onChange={e => handleChange("packSize", e.target.value)} />

                            </div>

                            <div className="my-4 flex sm:flex-row flex-col items-center gap-4 mb-8">

                                <FormFields type="text" label="Taluk" size="md" color="teal" error={true} register={register} errors={errors} RequiredErrorMsg={'Enter Taluk'} value={product.productName} onChange={e => handleChange("productName", e.target.value)} />

                                <FormFields type="text" id="packSize" label="City" size="md" color="teal" error={true} register={register} errors={errors} RequiredErrorMsg={'Enter City'} value={product.packSize} onChange={e => handleChange("packSize", e.target.value)} />

                            </div>

                            <div className="my-4 flex sm:flex-row flex-col items-center gap-4 mb-8">

                                <FormFields type="text" id="packSize" label="State" size="md" color="teal" error={true} register={register} errors={errors} RequiredErrorMsg={'Enter State'} value={product.packSize} onChange={e => handleChange("packSize", e.target.value)} />

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
                                        value={product.status}
                                        selectedValue={product.status}
                                        onChange={e => handleChange("status", e.target.value)}
                                    />
                                )}

                            </div>

                            <div className="my-4 flex sm:flex-row flex-col items-center gap-4 mb-8">

                                <FormFields type="textarea" id="remarks" label="Remarks" size="md" color="teal" error={true} register={register} errors={errors} RequiredErrorMsg={'Enter Pack Unit'} value={product.remarks} onChange={e => handleChange("remarks", e.target.value)} />

                            </div>


                            {/* //formfields */}
                            <div className='flex justify-center items-center'>
                                <Button type='submit' variant="filled" size="md" className='bg-primaryColor'>
                                    {isEditMode ? 'Update' : 'Save'}
                                </Button>
                            </div>
                        </form>
                    </Modal>


                    {/* ///delete modal component loading */}

                    <DeleteModal
                        visible={deleteProductsDialogVisible}
                        header="Confirm"
                        hideDeleteProductsDialog={hideDeleteProductsDialog}
                        handleDelete={handleDeleteProduct}
                        item={product.productName}
                    />

                    <UploadModal
                        visible={uploadModalVisible}
                        onHide={hideUploadModal}
                        header="Upload File"
                        handleUpload={handleUpload}
                        hideUploadModal={hideUploadModal}
                    />



                    {/* ///delete modal component loading */}

                </div>
            </div>
        </>
    );
}

export default AddRetailers;

