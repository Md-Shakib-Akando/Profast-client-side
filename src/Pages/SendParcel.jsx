import React from 'react';

const SendParcel = () => {
    return (
        <div className='  py-10'>
            <div className='bg-white rounded-lg py-10 px-4 md:15 xl:px-20'>
                <div className='flex flex-col justify-center space-y-2 pt-5 items-center'>
                    <h1 className='text-2xl font-bold'>Send a Parcel</h1>
                    <p className='text-lg font-medium'>Fill in the details below</p>
                </div>

                <div className='mt-14'>
                    <h1 className='text-2xl font-bold'>Enter your parcel details</h1>
                    <div className='pt-10'>
                        <div className='flex  gap-4'>
                            <label className='flex items-center gap-2'>
                                <input type="radio" value="document" />
                                Document
                            </label>
                            <label className='flex items-center gap-2'>
                                <input type="radio" value="non-document" />
                                Non  Document
                            </label>
                        </div>
                        <div className='flex flex-col md:flex-row gap-4 w-full mt-4'>
                            <div className='w-full'>
                                <label >Parcel name :</label>
                                <input type="text" placeholder='parcel name' className='input input-border focus:outline-none w-full' />
                            </div>
                            <div className='w-full'>
                                <label >Parcel weight(kg) :</label>
                                <input type="number" placeholder='parcel weight(kg)' className='input input-border focus:outline-none w-full' />
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
                                    <input type="text" placeholder='sender name' className='input input-border focus:outline-none w-full' />
                                </div>
                                <div className='flex-1'>
                                    <label>Select Region</label>
                                    <select className='select select-border focus:outline-none w-full'>
                                        <option value="">select region</option>
                                    </select>
                                </div>

                            </div>
                            <div className='flex flex-col md:flex-row gap-4 mt-3'>
                                <div className='flex-1'>
                                    <label >Address</label>
                                    <input type="text" placeholder='address' className='input input-border focus:outline-none w-full' />
                                </div>
                                <div className='flex-1'>
                                    <label >Contact No</label>
                                    <input type="number" placeholder='phone number' className='input input-border focus:outline-none w-full' />
                                </div>
                            </div>

                            <div className='flex mt-3'>
                                <div className='w-full'>
                                    <label>Select Region</label>
                                    <select className='select select-border focus:outline-none w-full'>
                                        <option value="">select region</option>
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
                                    <input type="text" placeholder='receiver name' className='input input-border focus:outline-none w-full' />
                                </div>
                                <div className='flex-1'>
                                    <label>Select Region</label>
                                    <select className='select select-border focus:outline-none w-full'>
                                        <option value="">select region</option>
                                    </select>
                                </div>

                            </div>
                            <div className='flex flex-col md:flex-row gap-4 mt-3'>
                                <div className='flex-1'>
                                    <label >Address</label>
                                    <input type="text" placeholder='address' className='input input-border focus:outline-none w-full' />
                                </div>
                                <div className='flex-1'>
                                    <label >Contact No</label>
                                    <input type="number" placeholder='phone number' className='input input-border focus:outline-none w-full' />
                                </div>
                            </div>

                            <div className='flex mt-3'>
                                <div className='w-full'>
                                    <label>Select Region</label>
                                    <select className='select select-border focus:outline-none w-full'>
                                        <option value="">select region</option>
                                    </select>
                                </div>
                            </div>
                            <div className="mt-4">
                                <label htmlFor="pickup-instruction" className="block text-sm font-medium text-gray-700 mb-1">
                                    Delivery Instruction
                                </label>
                                <textarea
                                    id="pickup-instruction"
                                    rows="4"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none text-sm"
                                    placeholder="Enter any special pickup instructions..."
                                ></textarea>
                            </div>

                        </div>
                    </div>

                </div>

                <h2 className='my-7 font-medium'>* PickUp Time 4pm-7pm Approx.</h2>

                <button className="btn bg-[#CAEB66] rounded-full">Proceed to Confirm Booking</button>

            </div>
        </div>
    );
};

export default SendParcel;