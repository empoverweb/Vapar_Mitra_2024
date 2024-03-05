import PrimeDataTable from "@/widgets/primedatatable";
import React, { useState , useEffect} from 'react'; 
import { ProductService } from '../../service/ProductService';
import Modal from "@/widgets/modal"; 
import { Button } from "@material-tailwind/react";

export function AddCategory() { 
  
  const [tableData, settableData] = useState(null); 
  const [showPopup,setShowPopup] = useState(false)
  const tableColumns = [  
    {
      'field': 'category',
      'header': "Category"
    },
    {
      'field': 'quantity',
      'header': "Status"
    }
  ]

  useEffect(() => {
      ProductService.getProducts().then((data) => settableData(data));
  }, []);

    //On Edit/ update

  const handleEdit = () =>{
    alert("edit clicked")
    setShowPopup(true)
  }
  

  //on delete 
  
  const handleDelete = () =>{
    alert("delete clicked")
    setShowPopup(true)
  }   

  // add new record

  const handleAddNew = () =>{
    alert("Add new clicked")
    setShowPopup(true)
  }  

  //close the modal popup

  const hideDialog = () => {  
    setShowPopup(false);
  }; 

  const productDialogFooter = (
    <React.Fragment>
        <Button label="Cancel" icon="pi pi-times" outlined onClick={hideDialog} />
        <Button label="Save" icon="pi pi-check"  />
    </React.Fragment>
);
  

  return (
    <>
      <div class="relative flex flex-col w-full h-full text-gray-700 shadow-md rounded-xl bg-clip-border"> 
        <div class="p-0 px-0"> 
             <PrimeDataTable tableHeading={'Add Category'} tableData={tableData} tableColumns={tableColumns} showActions={true} handleAddNew={handleAddNew} handleEdit={handleEdit} handleDelete={handleDelete} handleExport={true} />
             <Modal visible={showPopup}  onHide={() => setShowPopup(false)} footer={productDialogFooter} />
        </div>  
      </div>
    </>
  );
}

export default AddCategory;
