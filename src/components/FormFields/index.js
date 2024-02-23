import React from 'react';
import { RequiredError } from '../ErrorComponent';
import {
  Input,
  Button
} from "@material-tailwind/react";


const FormFields = ({ label, type, size, color, error, register, errors, id, placeholder, RequiredErrorMsg }) => {
  switch (type) {
    case 'text':
      return (
        <div className='w-full'>
          <Input   
          type="text" 
          label={label} 
          size={size}  
          color={color} 
          maxLength="100"
          {...register(`${id}`, { required: true, pattern: /^[A-Za-z]+$/ })}
          onKeyDown={(e) => {
            const regex = /^[A-Za-z]+$/;
            if (!regex.test(e.key)) {
              e.preventDefault();
            }
          }}
          />  
          {error && errors[`${id}`]?.type === 'required' && <RequiredError message={RequiredErrorMsg} />}
        </div>
      );
    case 'email':
      return (
        <div className='w-full'>
             <Input 
              type="email"
              maxLength="100"
              size={size}  
              color={color} 
              label={label} 
              placeholder={placeholder}
              {...register(`${id}`, { required: true, pattern: /^\S+@\S+\.\S+$/ })} 
              onKeyDown={(e) => {
                const allowedCharacters = /^[a-zA-Z0-9@.]+$/;
                if (!allowedCharacters.test(e.key)) {
                  e.preventDefault();
                }
              }} 
            /> 
          {error && errors[`${id}`]?.type === 'required' && <RequiredError message={RequiredErrorMsg} />}
        </div>
      );
    case 'mobileno':
      return (
        <div className='w-full'>
           <Input 
              type="tel"
              maxLength="10"
              label={label} 
              size={size}  
              color={color} 
              placeholder={placeholder}
              {...register(`${id}`, { required: true, pattern: /^[0-9]{10}$/ })} 
              onKeyDown={(e) => { 
                // Allow backspace (key 'Backspace') and numbers (key '0' to '9')
                if (!(e.key === 'Backspace' || (e.key >= '0' && e.key <= '9'))) {
                e.preventDefault();
                }
              }}
            /> 
          {error && errors[`${id}`]?.type === 'required' && <RequiredError message={RequiredErrorMsg} />}
        </div>
      );
    case 'pincode':
      return (
        <div className='w-full'>
           <Input 
              type="tel"
              label={label} 
              maxLength="6"
              size={size}  
              color={color}  
              placeholder={placeholder}
              {...register(`${id}`, { required: true, pattern: /^[0-9]{6}$/ })}
              onKeyDown={(e) => {
                const regex = /^[0-9]+$/;
                if (!regex.test(e.key)) {
                  e.preventDefault();
                }
              }}
            /> 
          {error && errors[`${id}`]?.type === 'required' && <RequiredError message={RequiredErrorMsg} />}
        </div>
      );
    case 'password':
      return (
        <div className='w-full'>
         <Input 
              type="password"
              label={label}  
              size={size}  
              color={color} 
              {...register(`${id}`, { required: true, minLength: 8 })} 
            /> 
          {error && errors[`${id}`]?.type === 'required' && <RequiredError message={RequiredErrorMsg} />}
        </div>
      );
      case 'textarea':
        return (
          <div class="relative w-full min-w-[200px]">
          <textarea
            class="peer h-full min-h-[100px] w-full resize-none rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-primaryColor focus:border-t-transparent focus:outline-0 disabled:resize-none disabled:border-0 disabled:bg-blue-gray-50"
            placeholder=" "></textarea>
          <label
            class="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-green-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-green-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-green-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
             {label}
          </label>
          {error && errors[`${id}`]?.type === 'required' && <RequiredError message={RequiredErrorMsg} />}
        </div> 
        );
    // Add more cases for other field types as needed
    default:
      return null;
  }
};


export { FormFields };