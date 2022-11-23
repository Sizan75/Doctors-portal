import React from 'react';
import { useForm } from 'react-hook-form';
import { useQuery } from '@tanstack/react-query'
import Loading from '../../Shared/Loading/Loading';
import { Result } from 'postcss';
const AddDoctor = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const imageHostKey= process.env.REACT_APP_img_key
    const { data: specialities, isLoading } = useQuery({
        queryKey: ['specialty'],
        queryFn: async () => {
            const res = await fetch('http://localhost:5000/appointmentSpecialty')
            const data = await res.json()
            return data;
        }
    })

    const handleAddDoctor = data => {
       const image= data.img[0]
       
       const formData= new FormData();
       formData.append('image', image);
       const url= `https://api.imgbb.com/1/upload?expiration=600&key=${imageHostKey}`
        fetch(url,{
            method:"POST",
            body:formData
        })
        .then(res=> res.json())
        .then(imgData=>{
            if(imgData.success){
            console.log(imgData.data.url)
            const doctor= {
                name: data.name,
                email: data.email,
                speciality: data.speciality,
                image: imgData.data.url
            }
            fetch('http://localhost:5000/doctors',{
                method: "POST",
                headers:{
                    'content-type': 'application/json',
                    authorization: `bearer ${localStorage.getItem('accessToken')}`
                },
                body: JSON.stringify(doctor)
            })
            .then(res=>res.json())
            .then(result=>{
                console.log(result)
            })
            }
        })
    }
    if (isLoading) {
        return <Loading></Loading>
    }
    return (

        <div className='w-96 p-7'>
            <h2 className='text-4xl'>Add a Doctor</h2>
            <form onSubmit={handleSubmit(handleAddDoctor)}>
                <div className="form-control w-full max-w-xs">
                    <label className="label"> <span className="label-text">Name</span></label>
                    <input type="text" {...register("name", {
                        required: "Name is Required"
                    })} className="input input-bordered w-full max-w-xs" />
                    {errors.name && <p className='text-red-500'>{errors.name.message}</p>}
                </div>
                <div className="form-control w-full max-w-xs">
                    <label className="label"> <span className="label-text">Email</span></label>
                    <input type="email" {...register("email", {
                        required: true
                    })} className="input input-bordered w-full max-w-xs" />
                    {errors.email && <p className='text-red-500'>{errors.email.message}</p>}
                </div>
                <div className="form-control w-full max-w-xs">
                    <label className="label"> <span className="label-text">Specialty</span></label>
                        <select 
                        {...register("speciality", {
                            required: "Speciality is Required"
                        })}
                        className="select select-bordered">
                            {
                                specialities.map(specialty => <option key={specialty._id}
                                    value={specialty.name}
                                >{specialty.name}</option>)
                            }
                        </select>
                </div>
                <div className="form-control w-full max-w-xs">
                    <label className="label"> <span className="label-text">Image</span></label>
                    <input type="file" {...register("img", {
                        required: "Img is Required"
                    })} className="input input-bordered w-full max-w-xs" />
                    {errors.img && <p className='text-red-500'>{errors.img.message}</p>}
                </div>
                <input className='btn btn-accent w-full mt-4' value="Add Doctor" type="submit" />

            </form>


        </div>

    );
};

export default AddDoctor;