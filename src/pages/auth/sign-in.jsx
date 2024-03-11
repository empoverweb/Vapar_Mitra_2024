import React, { useRef } from 'react'
import NSLLogo from '/img/logo.png';
import BannerImg from '/img/banner.png';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Toast } from 'primereact/toast';
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
  Checkbox
} from "@material-tailwind/react";
import { Img } from '@/widgets/Img';
import { FormFields } from '@/widgets/FormFields';
import { EncryptPassword, login } from '@/utils';
import { ApiService } from '@/service';
import { setLoginDetails, useVparmitraController } from "@/context";

export const SignIn = () => {

  const navigate = useNavigate();
  const toast = useRef(null);
  const { register, handleSubmit, formState: { isSubmitting, errors } } = useForm();
  const [controller, dispatch] = useVparmitraController();

  const handleSignUpClick = () => {
    navigate('/auth/sign-up');
  };

  ////form submit data
  const onSubmit = async (userData) => {
    debugger;
    const apiUrl = login
    const postData = { ...userData, password: EncryptPassword(userData.password) };
    const response = await ApiService.postData(apiUrl, postData);
    if (response.statusCode === 200) {
      toast.current.show({ severity: 'success', summary: 'Success', detail: response.message, life: 3000 });
      setLoginDetails(dispatch, response.response);
      navigate('/dashboard/home');
    } else {
      toast.current.show({ severity: 'error', summary: 'Error', detail: response.message, life: 3000 });

    }
  };

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
                  <img src={BannerImg} />
                </div>
                <div class="px-4 md:px-0 lg:w-6/12">
                  <div class="w-9/12 md:mx-6 md:p-12">
                    <div class="text-left">
                      <img
                        class="ml-0 w-40"
                        src={NSLLogo}
                        alt="logo" />
                      <h3 class="mb-0 mt-4  text-2xl font-semibold">
                        Welcome Back
                      </h3>
                      <h6 class="mb-12 mt-2 pb-0 text-base ">
                        Sign in to your account
                      </h6>
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)}>
                      <div className="w-full my-8 ">

                        <FormFields label="Email/Mobile Number" type="mobileno" size="lg" color="teal" id="userId" error={true} register={register} errors={errors} RequiredErrorMsg={'UserName Required'} />

                      </div>

                      <div className="w-full my-8">

                        <FormFields label="Password" type="password" size="lg" color="teal" id="password" placeholder="Password" error={true} register={register} errors={errors} RequiredErrorMsg={'Password Required'} />

                      </div>
                      <div class="mb-6 flex items-center justify-between">
                        <Checkbox color="blue"  label="Remember Me" />
                        <a
                          href="#!"
                          class="text-primary focus:outline-none dark:text-primary-400 text-primaryColor"
                        >Forgot password?</a
                        >
                      </div> 
                        <div className=" w-full">
                          <Button type='submit' variant="filled" size="md" className='bg-primaryColor mb-2 w-full' disabled={isSubmitting}> {isSubmitting ? 'Submitting...' : 'Login'}</Button>
                          <p className='text-base text-black text-center mt-4'>Don’t have an account? <span className='cursor-pointer font-bold text-primaryColor' onClick={handleSignUpClick}>Sign Up</span></p>
                        </div>  
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