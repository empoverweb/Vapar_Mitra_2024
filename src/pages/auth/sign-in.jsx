import React from 'react' 
import NSLLogo from '/img/1_Splash_Screen.svg';
import NSLLogoFooter from '/img/footer_bg.png';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button
} from "@material-tailwind/react";
import { Img } from '@/widgets/Img';
import { FormFields } from '@/widgets/FormFields';

export const SignIn = () => {

  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm();

  const handleSignUpClick = () => {
    navigate('/sign-up');
  };

  ////form submit data
  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className='flex justify-center items-center h-screen'>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Card className="mt-6 w-96">
          <CardHeader color="blue-gray" className="relative h-56">
            <Img
              src={NSLLogo}
              alt="Splash Screen"
            />
          </CardHeader>
          <CardBody>
            <Typography variant="h6" color="blue-gray" className="mb-2">
              Welcome Back!
            </Typography>
            <Typography color='black'>
              Sign in to your account
            </Typography> 
            {/* //formfields */}

            <div className="my-4 flex items-center gap-4"> 

            <FormFields label="User Name" type="text"  size="lg" color="teal"  id="username"  placeholder="User Name" error={true} register={register} errors={errors} RequiredErrorMsg={'UserName Required'} /> 

            </div>

            
            <div className="my-4 flex items-center gap-4"> 

            <FormFields label="Password" type="password" size="lg" color="teal"  id="password"  placeholder="Password" error={true} register={register} errors={errors} RequiredErrorMsg={'Password Required'} /> 

            </div>
            {/* //formfields */}

          </CardBody>
          <CardFooter className="pt-0 bg-cover bg-center h-[150px] opacity-20 rounded-t" style={{ backgroundImage: `url(${NSLLogoFooter})` }}></CardFooter>
          <div className=" w-[100%]  absolute bottom-[10%] left-[25%]">
            <Button type='submit' variant="filled" size="md" className='bg-primaryColor w-[50%] mb-2'>Login</Button>
            <p className='text-base text-black'>Don’t have an account? <span className='cursor-pointer font-bold text-primaryColor'onClick={handleSignUpClick}>Sign Up</span></p>
          </div>
        </Card>
      </form>
    </div>
  );
}