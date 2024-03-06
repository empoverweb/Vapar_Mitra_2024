import PrimeDataTable from "@/widgets/primedatatable";
import React, { useState , useEffect} from 'react'; 
import { ProductService } from '../../service/ProductService';
import Modal from "@/widgets/modal"; 
import { Button } from "@material-tailwind/react";

export function AddPoints() { 
  
  const [tableData, settableData] = useState(null); 
  const [showPopup,setShowPopup] = useState(false)
  const tableColumns = [
    {
      'field': 'countryCode',
      'header': "Seasons"
    },
    {
      'field': 'currency',
      'header': "Crops"
    },
    {
      'field': 'countryName',
      'header': "Sku"
    },
    {
      'field': 'id',
      'header': "Points"
    },
    {
      'field': 'status',
      'header': "Status"
    }
  ]

  // useEffect(() => {
  //     ProductService.getProducts().then((data) => settableData(data));

  // }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log(data);
        const response = await axios.get('http://123.176.45.59:8080/VyaparMitra/rest/nsl/masters/getCountries');
        settableData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
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
             <PrimeDataTable tableData={tableData} tableColumns={tableColumns} showActions={true} handleAddNew={handleAddNew} handleEdit={handleEdit} handleDelete={handleDelete} handleExport={true} />
             <Modal visible={showPopup}  onHide={() => setShowPopup(false)} footer={productDialogFooter} />
        </div>  
      </div>
      
    </>
  );
}

export default AddPoints;
