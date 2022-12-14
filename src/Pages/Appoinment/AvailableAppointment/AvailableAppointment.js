import React, {  useState } from 'react';
import { format } from 'date-fns';
import {useQuery} from '@tanstack/react-query'
import AppointmentOption from './AppointmentOption';
import BookingModal from '../BookingModal/BookingModal';
import Loading from '../../Shared/Loading/Loading';
const AvailableAppointment = ({selectedDate}) => {
    const [treatment, setTreatment] = useState(null);
    const date= format(selectedDate, 'PP')
    const {data:appointmentOptions=[], refetch, isLoading}= useQuery({
        queryKey:['appointmentOptions', date],
        queryFn: ()=> fetch(`http://localhost:5000/appointmentoptions/?date=${date}`)
        .then(res => res.json())
    })
    if(isLoading){
        return <Loading></Loading>
    }
    return (
        <section className='my-16'>
            <p className='text-center text-secondary font-bold'>Available Appointments on {format(selectedDate, 'PP')}</p>
            <div className='grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-6'>
                {
                    appointmentOptions.map(option => <AppointmentOption
                        key={option._id}
                        appointmentOption={option}
                        setTreatment={setTreatment}
                    ></AppointmentOption>)
                }
            </div>
            {
                treatment &&
                <BookingModal
                    selectedDate={selectedDate}
                    treatment={treatment}
                    refetch={refetch}
                    setTreatment={setTreatment}
                ></BookingModal>
            }
        </section>
    );
};

export default AvailableAppointment;