import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query'
import Loading from '../../Shared/Loading/Loading';
import toast from 'react-hot-toast';
import ConfirmationModal from '../../Shared/ConfirmationModal/ConfirmationModal';
const ManageDoctors = () => {
    const [deletingDoctor, setDeletingDoctor]= useState(null)

const closeModal = () =>{
    setDeletingDoctor(null)
}   

    const { data: doctors, isLoading, refetch } = useQuery({
        queryKey: ['doctors'],
        queryFn: async () => {
            try {
                const res = await fetch('http://localhost:5000/doctors', {
                    headers: {
                        authorization: `bearer ${localStorage.getItem('accessToken')}`
                    }
                })
                const data = res.json()
                return data;
            }
            catch (error) {

            }
        }
    })

    const handleDoctorDelete = doctor =>{
        fetch(`http://localhost:5000/doctors/${doctor._id}`,{
            method: 'DELETE',
            headers:{
              authorization: `bearer ${localStorage.getItem('accessToken')}`
                }
        })
        .then(res=> res.json())
        .then(data=>{
            if(data.deletedCount >0){
                refetch()
            toast.success(`Doctor ${doctor.name} deleted Successfully`)
            }

        })
        }
    if(isLoading){
        return <Loading></Loading>
    }
    return (
        <div>
            <h2 className='text-3xl'>Manage Doctors: {doctors?.length}</h2>
            <div className="overflow-x-auto">
                <table className="table table-zebra w-full">

                    <thead>
                        <tr>
                            <th></th>
                            <th>Avater</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Speciality</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            doctors.map((doctor, i) => <tr key={doctor._id}>
                                <th>{i + 1}</th>
                                <td><div className="avatar">
                                    <div className="w-24 rounded-full">
                                        <img src={doctor.image} alt="doctors image" />
                                    </div>
                                </div></td>
                                <td>{doctor.name}</td>
                                <td>{doctor.email}</td>
                                <td>{doctor.speciality}</td>
                                <td>
                                    <label onClick={()=> setDeletingDoctor(doctor)} htmlFor="confirmation-modal" className="btn btn-xs btn-error">Delete</label>
                                    </td>
                            </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
            {
                deletingDoctor && 
                <ConfirmationModal
                title={'Are you sure you want to delete'}
                message={`If you delete ${ deletingDoctor.name} can not be undone`}
                closeModal= {closeModal}
                successAction= {handleDoctorDelete}
                successButton={'Delete'}
                modalData= {deletingDoctor}
                >

                </ConfirmationModal>
            }
        </div>
    );
};

export default ManageDoctors;