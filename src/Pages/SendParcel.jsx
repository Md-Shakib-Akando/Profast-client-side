import React from 'react';
import { useForm } from 'react-hook-form';
import { useLoaderData } from 'react-router';
import Swal from 'sweetalert2';
import UseAuth from '../UseAuth';
import useAxiosSecure from '../useAxiosSecure';
const SendParcel = () => {
    const { user } = UseAuth();
    const { register, watch, handleSubmit, formState: { errors }, } = useForm();
    const axiosSecure = useAxiosSecure();
    const parcelType = watch('type');
    const senderRegion = watch('sender_region')
    const receiverRegion = watch('receiver_region')
    const serviceCenters = useLoaderData();


    const uniqueRegion = [...new Set(serviceCenters.map((w) => w.region))]
    const getDistrictByRegion = (region) => serviceCenters.filter((w) => w.region === region).map((w) => w.district)

    const generateTrackingID = () => {
        const date = new Date();
        const datePart = date.toISOString().split("T")[0].replace(/-/g, "");
        const rand = Math.random().toString(36).substring(2, 7).toUpperCase();
        return `PCL-${datePart}-${rand}`;
    };

    const onSubmit = (data) => {
        const weight = parseFloat(data.weight) || 0;
        const isSameDistrict = data.sender_center === data.receiver_center;

        let baseCost = 0;
        let extraCost = 0;
        let breakdown = "";

        if (data.type === "document") {
            baseCost = isSameDistrict ? 60 : 80;
            breakdown = `Document delivery ${isSameDistrict ? "within" : "outside"} the district.`;
        } else {
            if (weight <= 3) {
                baseCost = isSameDistrict ? 110 : 150;
                breakdown = `Non-document up to 3kg ${isSameDistrict ? "within" : "outside"} the district.`;
            } else {
                const extraKg = weight - 3;
                const perKgCharge = extraKg * 40;
                const districtExtra = isSameDistrict ? 0 : 40;
                baseCost = isSameDistrict ? 110 : 150;
                extraCost = perKgCharge + districtExtra;

                breakdown = `
                Non-document over 3kg ${isSameDistrict ? "within" : "outside"} the district.<br/>
                Extra charge: ৳40 x ${extraKg.toFixed(1)}kg = ৳${perKgCharge}<br/>
                ${districtExtra ? "+ ৳40 extra for outside district delivery" : ""}
            `;
            }
        }

        const totalCost = baseCost + extraCost;

        Swal.fire({
            title: "Delivery Cost Breakdown",
            icon: "info",
            html: `
            <div class="text-left text-base space-y-2">
                <p><strong>Parcel Type:</strong> ${data.type}</p>
                <p><strong>Weight:</strong> ${weight} kg</p>
                <p><strong>Delivery Zone:</strong> ${isSameDistrict ? "Within Same District" : "Outside District"}</p>
                <hr class="my-2"/>
                <p><strong>Base Cost:</strong> ৳${baseCost}</p>
                ${extraCost > 0 ? `<p><strong>Extra Charges:</strong> ৳${extraCost}</p>` : ""}
                <div class="text-gray-500 text-sm">${breakdown}</div>
                <hr class="my-2"/>
                <p class="text-xl font-bold text-green-600">Total Cost: ৳${totalCost}</p>
            </div>
        `,
            showDenyButton: true,
            confirmButtonText: "💳 Proceed to Payment",
            denyButtonText: "✏️ Continue Editing",
            confirmButtonColor: "#16a34a",
            denyButtonColor: "#d3d3d3",
            customClass: {
                popup: "rounded-xl shadow-md px-6 py-6",
            },
        }).then((result) => {
            if (result.isConfirmed) {
                const parcelData = {
                    ...data,
                    cost: totalCost,
                    created_by: user.email,
                    payment_status: 'unpaid',
                    delivery_status: 'not_collected',
                    creation_date: new Date().toISOString(),
                    tracking_id: generateTrackingID(),
                };

                console.log("Ready for payment:", parcelData);
                // You can now proceed to payment logic here
                axiosSecure.post('/parcels', parcelData)
                    .then(res => {
                        if (res.data.insertedId) {
                            // TODO: redirect to a payment page 
                            Swal.fire({
                                title: "Redirecting...",
                                text: "Proceeding to payment gateway.",
                                icon: "success",
                                timer: 1500,
                                showConfirmButton: false,
                            });
                        }
                    })
            }
        });
    };



    return (
        <div className='  py-10'>
            <div className='bg-white rounded-lg py-10 px-4 md:15 xl:px-20'>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className='flex flex-col justify-center space-y-2 pt-5 items-center'>
                        <h1 className='text-2xl font-bold'>Send a Parcel</h1>
                        <p className='text-lg font-medium'>Fill in the details below</p>
                    </div>

                    <div className='mt-14'>
                        <h1 className='text-2xl font-bold'>Enter your parcel details</h1>
                        <div className='pt-10'>
                            <div className='flex  gap-4'>
                                <label className='flex items-center gap-2'>
                                    <input {...register('type', { required: true })} type="radio" value="document" />
                                    Document
                                </label>
                                <label className='flex items-center gap-2'>
                                    <input type="radio" {...register('type', { required: true })} value="non-document" />
                                    Non  Document
                                </label>
                            </div>
                            <div className='flex flex-col md:flex-row gap-4 w-full mt-4'>
                                <div className='w-full'>
                                    <label >Parcel name :</label>
                                    <input type="text" {...register('title', { required: true })} placeholder='parcel name' className='input input-border focus:outline-none w-full' />
                                    {errors.title && <p className="text-red-500 text-sm">Parcel name is required</p>}
                                </div>
                                <div className='w-full'>
                                    <label >Parcel weight(kg) :</label>
                                    <input type="number" {...register('weight')}
                                        disabled={parcelType !== "non-document"}
                                        placeholder='parcel weight(kg)'
                                        className={`input input-border focus:outline-none w-full ${parcelType !== "non-document" ? "bg-gray-50 cursor-not-allowed" : ""}`} />

                                </div>
                            </div>
                        </div>
                        <div className='border-1 border-gray-300 my-7'></div>
                        <div className='grid grid-cols-1 lg:grid-cols-2 gap-12'>
                            <div className='flex-1'>
                                <h1 className='text-lg font-medium'>Sender Details</h1>
                                <div className='flex flex-col md:flex-row gap-4 mt-5'>
                                    <div className='flex-1'>
                                        <label>Sender Name</label>
                                        <input type="text" {...register('sender_name', { required: true })} placeholder='sender name' className='input input-border focus:outline-none w-full' />
                                        {errors.sender_name && <p className="text-red-500 text-sm">Sender name is required</p>}
                                    </div>
                                    <div className='flex-1'>
                                        <label>Select Region</label>
                                        <select {...register('sender_region', { required: true })} className='select select-border focus:outline-none w-full'>
                                            <option value="">select region</option>
                                            {uniqueRegion.map((region) => (
                                                <option key={region} value={region}>{region}</option>
                                            ))}
                                        </select>
                                    </div>

                                </div>
                                <div className='flex flex-col md:flex-row gap-4 mt-3'>
                                    <div className='flex-1'>
                                        <label >Address</label>
                                        <input type="text" {...register('sender_address', { required: true })} placeholder='address' className='input input-border focus:outline-none w-full' />
                                    </div>
                                    <div className='flex-1'>
                                        <label >Contact No</label>
                                        <input type="number" {...register('sender_contact', { required: true })} placeholder='phone number' className='input input-border focus:outline-none w-full' />
                                    </div>
                                </div>

                                <div className='flex mt-3'>
                                    <div className='w-full'>
                                        <label>Select Service Center</label>
                                        <select {...register('sender_center', { required: true })} className='select select-border focus:outline-none w-full'>
                                            <option value="">select center</option>
                                            {
                                                getDistrictByRegion(senderRegion).map((district) => (
                                                    <option key={district} value={district}>{district}</option>
                                                ))
                                            }
                                        </select>
                                    </div>
                                </div>
                                <div className="mt-4">
                                    <label htmlFor="pickup-instruction" className="block text-sm font-medium text-gray-700 mb-1">
                                        Pickup Instruction
                                    </label>
                                    <textarea
                                        id="pickup-instruction"
                                        rows="4"
                                        {...register('pickup-instruction', { required: true })}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none text-sm"
                                        placeholder="Enter any special pickup instructions..."
                                    ></textarea>
                                </div>

                            </div>
                            <div className='flex-1'>
                                <h1 className='text-lg font-medium'>Receiver Details</h1>
                                <div className='flex flex-col md:flex-row gap-4 mt-5'>
                                    <div className='flex-1'>
                                        <label>Receiver Name</label>
                                        <input type="text" {...register('receiver_name', { required: true })} placeholder='receiver name' className='input input-border focus:outline-none w-full' />
                                        {errors.receiver_name && <p className="text-red-500 text-sm">Receiver name is required</p>}
                                    </div>
                                    <div className='flex-1'>
                                        <label>Select Region</label>
                                        <select  {...register('receiver_region', { required: true })} className='select select-border focus:outline-none w-full'>
                                            <option value="">select region</option>
                                            {uniqueRegion.map((region) => (
                                                <option key={region} value={region}>{region}</option>
                                            ))}
                                        </select>
                                    </div>

                                </div>
                                <div className='flex flex-col md:flex-row gap-4 mt-3'>
                                    <div className='flex-1'>
                                        <label >Address</label>
                                        <input type="text" {...register('receiver_address', { required: true })} placeholder='address' className='input input-border focus:outline-none w-full' />
                                    </div>
                                    <div className='flex-1'>
                                        <label >Contact No</label>
                                        <input type="number" {...register('receiver_contact', { required: true })} placeholder='phone number' className='input input-border focus:outline-none w-full' />
                                    </div>
                                </div>

                                <div className='flex mt-3'>
                                    <div className='w-full'>
                                        <label>Select service center</label>
                                        <select  {...register('receiver_center', { required: true })} className='select select-border focus:outline-none w-full'>
                                            <option value="">select center</option>
                                            {getDistrictByRegion(receiverRegion).map((district) => (
                                                <option key={district} value={district}>{district}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                <div className="mt-4">
                                    <label htmlFor="delivery-instruction" className="block text-sm font-medium text-gray-700 mb-1">
                                        Delivery Instruction
                                    </label>
                                    <textarea
                                        id="pickup-instruction"
                                        rows="4"
                                        {...register('delivery-instruction', { required: true })}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none text-sm"
                                        placeholder="Enter any special pickup instructions..."
                                    ></textarea>
                                </div>

                            </div>
                        </div>

                    </div>

                    <h2 className='my-7 font-medium'>* PickUp Time 4pm-7pm Approx.</h2>

                    <button type='submit' className="btn bg-[#CAEB66] rounded-full">Proceed to Confirm Booking</button>
                </form>

            </div>
        </div>
    );
};

export default SendParcel;