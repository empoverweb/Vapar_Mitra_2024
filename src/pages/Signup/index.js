import React from 'react'
import { Img, FormFields } from '../../components'
import NSLLogoIcon from '../../assests/Images/logo.png';
import NSLLogoFooter from '../../assests/Images/footer_bg.png';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Button
} from "@material-tailwind/react";

export const Signup = () => {

  const navigate = useNavigate(); 
  const { register, handleSubmit, formState: { errors } } = useForm();

  
  const handleLoginClick = () => {
    navigate('/login');
  };

  const onSubmit = (data) => {
    alert(JSON.stringify(data))
    console.log(data);
  }

  return ( 
    <div class="sm:flex p-8">
      <div class="sm:w-1/2 w-full">
      <img
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80"
              alt="card-image"
              className="h-full w-full rounded-xl"
            />
      </div>
      <div class="sm:w-1/2 w-full">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Card className="w-full flex-row rounded-e-none"> 
          <CardBody className='w-full'>
            <Img
              src={NSLLogoIcon}
              alt="Splash Screen"
              className="w-28 mb-4 block m-auto"
            />
            <Typography variant="h4" color="black" className="mb-4 text-center">
              Create an account !
            </Typography>
            <Typography variant="h5" color="black" className="mb-2 text-sm text-center">
              Please enter all the details
            </Typography>
            {/* //formfields */}
            <div className='signupForm sm:p-6 p-0 w-3/4 mx-auto'>

              <div className="my-4 flex sm:flex-row flex-col items-center gap-4">

                <FormFields type="text" id="firstname" label="First name" size="sm" color="teal" error={true} register={register} errors={errors} RequiredErrorMsg={'Enter First name'} />
                
                <FormFields type="text" id="lastname" label="Last name" size="sm" color="teal" error={true} register={register} errors={errors} RequiredErrorMsg={'Enter Last Name'} />

              </div>

              <div className="my-4 items-center gap-4"> 

                 <FormFields type="text" id="firmname" label="Firm Name" size="lg" color="teal" error={true} register={register} errors={errors} RequiredErrorMsg={'Enter Firm Name'} />
 
              </div>

              <div className="my-4  items-center gap-4"> 

              <FormFields type="mobileno" id="mbno" label="Mobile Number" size="lg" color="teal" error={true} register={register} errors={errors} RequiredErrorMsg={'Enter Mobile Number'} />

              </div>

              <div className="my-4 flex sm:flex-row flex-col items-center gap-4"> 

              <FormFields type="text" id="village" label="Village/City" size="lg" color="teal" error={true} register={register} errors={errors} RequiredErrorMsg={'Enter Village/City'} />

              <FormFields type="text" id="district" label="District" size="lg" color="teal" error={true} register={register} errors={errors} RequiredErrorMsg={'Enter District'} />

              </div>

              <div className="my-4  items-center gap-4"> 

              <FormFields type="text" id="state" label="State" size="lg" color="teal" error={true} register={register} errors={errors} RequiredErrorMsg={'Enter State'} />

              </div> 

              <div className="my-4  items-center gap-4">  
               
              <FormFields type="textarea" id="address" label="Address" size="md" color="teal" error={true} register={register} errors={errors} RequiredErrorMsg={'Enter Address Line 1'} />
 
              </div>
            </div>

            {/* //formfields */}
            <div className='flex justify-center items-center'> 
            <Button type='submit' variant="filled" size="md" className='bg-primaryColor'>SignUp</Button>  
            </div>
             <p className='text-base text-black text-center pt-4'>Already have an account? <span className='cursor-pointer font-bold text-primaryColor' onClick={handleLoginClick}>Login</span></p>
          </CardBody>
        </Card>
      </form> 
      </div>
    </div> 
  );
}