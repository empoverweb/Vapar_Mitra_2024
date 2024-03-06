import React from 'react';
import { RequiredError } from '../ErrorComponent'; 
import {
  Input,
  Popover,
  PopoverHandler,
  PopoverContent,
} from "@material-tailwind/react";
import { format } from "date-fns";
import { DayPicker } from "react-day-picker";
import { ChevronRightIcon, ChevronLeftIcon } from "@heroicons/react/24/outline";
import { statusDropdown,packUnits} from '@/utils';

const FormFields = ({ label, type, size, color, error, register, errors, id, value, placeholder, RequiredErrorMsg, selectedValue, onChange, optionsData , selectedDate , onSelectDate ,isRequired}) => {
 
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
            value={value}
            name={id} 
            {...register(`${id}`, { required: true, pattern: /^[A-Za-z]+$/ })}
            onChange={onChange}
            onKeyDown={(e) => {
              const regex = /^[A-Za-z\s]+$/; // Modify the regex to allow spaces
              if (!regex.test(e.key) && e.key !== 'Backspace') { // Allow backspace
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
            name={id}
            value={value}
            placeholder={placeholder} 
            {...register(`${id}`, { required: true, pattern: /^\S+@\S+\.\S+$/ })}
            onChange={onChange}
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
            name={id}
            size={size}
            value={value}
            color={color} 
            {...register(`${id}`, { required: true, pattern: /^[0-9]{10}$/ })}
            placeholder={placeholder}
            onChange={onChange}
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
    case 'number':
      return (
        <div className='w-full'>
          <Input
            type="text" 
            maxLength="4"
            label={label}
            name={id}
            size={size}
            color={color}
            value={value}
            placeholder={placeholder} 
            {...register(`${id}`, { required: true})}
            onChange={onChange}
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
            name={id}
            maxLength="6"
            size={size}
            value={value}
            color={color}
            placeholder={placeholder} 
            {...register(`${id}`, { required: true, pattern: /^[0-9]{6}$/ })} 
            onChange={onChange}
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
            name={id}
            value={value}
            color={color}
            {...register(`${id}`, { required: true, minLength: 8 })} 
            onChange={onChange}
          />
          {error && errors[`${id}`]?.type === 'required' && <RequiredError message={RequiredErrorMsg} />}
        </div>
      );
    case "dropdown":
      return (
        <div className="relative h-10 w-72 min-w-[200px]">
          <select
            className="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 empty:!bg-gray-900 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
            value={selectedValue}
            name={id} 
            {...register(`${id}`, { required: true })}
            onChange={onChange}
          >
          <option value="" selected hidden>
              Select {label}
            </option>
            {optionsData.map((option) => (
              <option key={option.id} value={option.id}>
                {option.name}
              </option>
            ))}
          </select>
          <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
            {label}
          </label>
        </div>
      );
    case "statusDropdown":
      return (
        <div className="relative w-full">
          <select
            className="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 empty:!bg-gray-900 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
            value={selectedValue}
            name={id} 
            {...register(`${id}`, { required: true })}
            onChange={onChange}
          >
            <option value="" selected hidden>
              Select Status
            </option>
            {statusDropdown().map((option) => (
              <option key={option.id} value={option.value}>
                {option.name}
              </option>
            ))}
          </select>
          <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
            {label}
          </label>
          {error && errors[`${id}`]?.type === 'required' && <RequiredError message={RequiredErrorMsg} />}
        </div>
      ); 
      case "packUnit":
        return (
          <div className="relative w-full">
            <select
              className="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 empty:!bg-gray-900 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
              value={selectedValue} 
              {...register(`${id}`, { required: true })}
              onChange={onChange}
              name={id}
            >
              <option value="" selected hidden>
                Select Pack Unit
              </option>
              {packUnits().map((option) => (
                <option key={option.id} value={option.value}>
                  {option.name}
                </option>
              ))}
            </select>
            <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
              {label}
            </label>
            {error && errors[`${id}`]?.type === 'required' && <RequiredError message={RequiredErrorMsg} />}
          </div>
        ); 
    case "Date":
      return (
        <div className="p-24">
          <Popover placement="bottom">
            <PopoverHandler>
              <Input
                label="Select a Date"
                value={selectedDate ? format(selectedDate, "PPP") : ""}
                name={id}
              />
            </PopoverHandler>
            <PopoverContent>
              <DayPicker
                mode="single"
                selected={selectedDate} 
                {...register(`${id}`, { required: true })}
                onSelect={onSelectDate}
                onChange={onChange}
                showOutsideDays
                className="border-0"
                classNames={{
                  caption:
                    "flex justify-center py-2 mb-4 relative items-center",
                  caption_label: "text-sm font-medium text-gray-900",
                  nav: "flex items-center",
                  nav_button:
                    "h-6 w-6 bg-transparent hover:bg-blue-gray-50 p-1 rounded-md transition-colors duration-300",
                  nav_button_previous: "absolute left-1.5",
                  nav_button_next: "absolute right-1.5",
                  table: "w-full border-collapse",
                  head_row: "flex font-medium text-gray-900",
                  head_cell: "m-0.5 w-9 font-normal text-sm",
                  row: "flex w-full mt-2",
                  cell: "text-gray-600 rounded-md h-9 w-9 text-center text-sm p-0 m-0.5 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-gray-900/20 [&:has([aria-selected].day-outside)]:text-white [&:has([aria-selected])]:bg-gray-900/50 first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
                  day: "h-9 w-9 p-0 font-normal",
                  day_range_end: "day-range-end",
                  day_selected:
                    "rounded-md bg-gray-900 text-white hover:bg-gray-900 hover:text-white focus:bg-gray-900 focus:text-white",
                  day_today: "rounded-md bg-gray-200 text-gray-900",
                  day_outside:
                    "day-outside text-gray-500 opacity-50 aria-selected:bg-gray-500 aria-selected:text-gray-900 aria-selected:bg-opacity-10",
                  day_disabled: "text-gray-500 opacity-50",
                  day_hidden: "invisible",
                }}
                components={{
                  IconLeft: ({ ...props }) => (
                    <ChevronLeftIcon {...props} className="h-4 w-4 stroke-2" />
                  ),
                  IconRight: ({ ...props }) => (
                    <ChevronRightIcon {...props} className="h-4 w-4 stroke-2" />
                  ),
                }}
              />
            </PopoverContent>
          </Popover>
        </div>
      );
    case 'textarea':
      return (
        <div class="relative w-full min-w-[200px]">
          <textarea
            value={value}
             name={id}
            {...register(`${id}`, { required: isRequired })}
            onChange={onChange}
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
