// Import necessary components and libraries
import React, { useState, useEffect, useRef } from 'react';
import { Toast } from 'primereact/toast';
import { ApiService } from "@/service";
import { getUsers } from "@/utils";
import PrimeDataTable from "@/widgets/primedatatable";
import Modal from "@/widgets/modal";
import { ApproveModal } from "@/widgets/modal/approveModal";

// Functional component for e-KYC Bypass Approval
export function AddEkycBypassApproval() {

    let emptyUser = {
        id: 0,
        name: '',
        firmName: '',
        mobileNumber: '',
        ekycStatus: '',
    };

    // State variables initialization
    const [tableData, setTableData] = useState(null);
    const [previousData, setPreviousData] = useState([]);
    const [showPopup, setShowPopup] = useState(false);
    const toast = useRef(null);
    const [approvalDialogVisible, setApprovalDialogVisible] = useState(false);
    const [userData, setUserData] = useState(emptyUser);

    // Define table columns for PrimeDataTable
    const tableColumns = [
        {
            'field': 'name',
            'header': "User Name"
        },
        {
            'field': 'firmName',
            'header': "Firm Name"
        },
        {
            'field': 'mobileNumber',
            'header': "Mobile Number"
        },
        {
            'field': 'ekycStatus',
            'header': "e-KYC Status"
        }
    ];

    // Fetch users data on component mount or when tableData changes
    useEffect(() => {
        const fetchUsersData = async () => {
            try {
                const apiUrl = getUsers;
                const response = await ApiService.getData(apiUrl);
                setTableData(response.response.userList);
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        if (JSON.stringify(previousData) !== JSON.stringify(tableData)) {
            fetchUsersData();
            setPreviousData(tableData);
        }
    }, [tableData, previousData]);

    // Function to handle approve button click
    const handleApproveButton = (rowData) => {
        alert(JSON.stringify(rowData));
        setUserData(rowData);
        // Set the approve modal visible
        setApprovalDialogVisible(true);
    };

    // Function to hide the approval dialog/modal
    const hideApprovalDialog = () => {
        setApprovalDialogVisible(false);
    };

    return (
        <>
            {/* <div className="relative flex flex-col w-full h-full text-gray-700 shadow-md rounded-xl bg-clip-border"> */}
            <div className="relative flex flex-col w-full h-full text-gray-700">
                <div className="p-0 px-0">
                    <Toast ref={toast} />
                    <PrimeDataTable tableHeading={'e-KYC By Pass Approval'} tableData={tableData} tableColumns={tableColumns} showActions={true} handleExport={false} buttonName={'Approval'} handleApproveButton={handleApproveButton} />
                    <Modal visible={showPopup} onHide={() => setShowPopup(false)} header={"Confirmation Message"}>
                    </Modal>
                    <ApproveModal
                        visible={approvalDialogVisible}
                        header="Confirm"
                        hideApprovalDialog={hideApprovalDialog}
                        onHide={hideApprovalDialog}
                        userName={userData.name}
                    />
                </div>
            </div>
            
        </>
    );
}

export default AddEkycBypassApproval;