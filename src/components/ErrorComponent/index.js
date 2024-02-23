import React from 'react';

const RequiredError = ({ message }) => (
  <span className="text-[12px] text-red-500">{message}</span>
);

const PatternError = ({ message }) => (
  <span className="text-[12px] text-red-500">{message}</span>
);

export {RequiredError,PatternError}