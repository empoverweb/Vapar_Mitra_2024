import React,{useEffect, useRef} from 'react'
import { Img } from '@/widgets/Img';
import { FormFields } from '@/widgets/FormFields';
import NSLLogo from '/img/logo.png';
import { useNavigate } from 'react-router-dom';
import BannerImg from '/img/banner.png';
import { useForm } from 'react-hook-form'; 
import { Toast } from 'primereact/toast';
import { UseStatesMaster, useGetCountries,UseDistrictMaster } from "@/utils"; 
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Button
} from "@material-tailwind/react";

export const SignUp = () => {

  const navigate = useNavigate();
  const [countryOptionsData,fetchcountryMasters] = useGetCountries();
  const [districtOptionsData , fetchdistrictMasters] = UseDistrictMaster();
  const [statesOptionsData , fetchStatesMasters]=  UseStatesMaster();
  const toast = useRef(null);
  const { register, handleSubmit, formState: { errors } } = useForm();

  useEffect(() => {
    fetchcountryMasters();
    fetchStatesMasters();
    fetchdistrictMasters();
  }, []);


  const handleLoginClick = () => {
    navigate('/');
  };

  const onSubmit = (data) => {
    alert(JSON.stringify(data))
    console.log(data);
  }



  return (
    <section class="gradient-form h-full bg-neutral-200 dark:bg-neutral-700">
     <Toast ref={toast} />
      <div class="w-full h-full p-10">
        <div class="flex h-full flex-wrap items-center justify-center text-neutral-800 dark:text-neutral-200">
          <div class="w-full">
            <div
              class="block rounded-lg bg-white shadow-lg dark:bg-neutral-800">
              <div class="g-0 lg:flex lg:flex-wrap">
                <div
                  class="flex items-center rounded-b-lg lg:w-6/12 lg:rounded-e-lg lg:rounded-bl-none"
                >
                  <img src={BannerImg} className='h-full' />
                </div>
                <div class="px-4 md:px-0 lg:w-6/12">
                  <div class="w-[80%] md:mx-6 md:p-4">
                    <div class="text-left">
                      <img
                        class="ml-0 w-40"
                        src={NSLLogo}
                        alt="logo" />
                      <h3 class="mb-0 mt-4  text-2xl font-semibold">
                      New Here?
                      </h3>
                      <h6 class="mb-12 mt-2 pb-0 text-base ">
                        Signing up is easy. It only takes a few steps
                      </h6>
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)}> 
                           
                          <div className='w-full'>

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

                              <FormFields type="dropdown" id="district" label="District" size="sm" color="teal" error={true} optionsData={districtOptionsData} register={register} errors={errors} RequiredErrorMsg={'Select State'} />
 
                            </div>

                            <div className="my-4 flex sm:flex-row flex-col items-center gap-4">

                              <FormFields type="dropdown" id="state" label="State" size="sm" color="teal" error={true} optionsData={statesOptionsData} register={register} errors={errors} RequiredErrorMsg={'Select State'} />
 
                              <FormFields type="dropdown" id="countryId" label="Country Name" size="sm" color="teal" error={true} optionsData={countryOptionsData} register={register} errors={errors} RequiredErrorMsg={'Select Country'} />
 
                            </div>

                           
                            <div className="my-4  items-center gap-4">

                              <FormFields type="textarea" id="address" label="Address" size="md" color="teal" error={true} register={register} errors={errors} RequiredErrorMsg={'Enter Address Line 1'} />

                            </div>
                          </div> 
                            <Button type='submit' variant="filled" size="lg" className='bg-primaryColor w-full'>SignUp</Button>
                         
                          <p className='text-base text-black text-center pt-4'>Already have an account? <span className='cursor-pointer font-bold text-primaryColor' onClick={handleLoginClick}>Login</span></p>
                         
                    </form>
                  </div>
                </div> 
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}