import React, { useState } from 'react';
import { DayPicker } from 'react-day-picker';
import { format } from 'date-fns';
import chair from '../../../assets/images/chair.png'
const AppointmentBanner = ({selectedDate,setSelectedDate}) => {
    
    return (
        <header className='my-5'>
            <div className="hero">
  <div className="hero-content flex-col lg:flex-row-reverse">
    <img src={chair} className="max-w-sm rounded-lg shadow-2xl" alt='' />
    <div className='mr-6'>
      <DayPicker
      mode='single'
      selected={selectedDate}
      onSelect={setSelectedDate}
      />
      <p>You have selected: {format(selectedDate, 'PP')}</p>
    </div>
  </div>
</div>
        </header>
    );
};

export default AppointmentBanner;