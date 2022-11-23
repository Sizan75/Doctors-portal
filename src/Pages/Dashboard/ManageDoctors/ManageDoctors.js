import React from 'react';
import { useQuery } from '@tanstack/react-query'
import Loading from '../../Shared/Loading/Loading';
const ManageDoctors = () => {
    const { data: doctors, isLoading } = useQuery({
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
                                <td><button className="btn btn-xs btn-error">Delete</button></td>
                            </tr>
                            )
                        }

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageDoctors;