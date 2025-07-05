import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router';

import Swal from 'sweetalert2';
import UseAuth from '../../../UseAuth';
import useAxiosSecure from '../../../useAxiosSecure';

const CheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const { id } = useParams();
    const { user } = UseAuth();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();

    const [error, setError] = useState('');

    const { isPending, data: parcelInfo = {} } = useQuery({
        queryKey: ['parcels', id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/parcels/${id}`);
            return res.data;
        },
        enabled: !!id,
    });

    if (isPending) {
        return '...loading';
    }

    const amount = parcelInfo.cost || 0;
    const amountInCents = Math.round(amount * 100);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement);
        if (!card) {
            return;
        }

        // Step 1: Create payment method
        const { error: paymentError, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
            billing_details: {
                name: user?.displayName || 'Anonymous',
                email: user?.email || '',
            },
        });

        if (paymentError) {
            setError(paymentError.message);
            return;
        } else {
            setError('');
            console.log('payment method', paymentMethod);

            // Step 2: Create payment intent on backend
            const res = await axiosSecure.post('/create-payment-intent', {
                amountInCents,
                id,
            });

            const clientSecret = res.data.clientSecret;

            // Step 3: Confirm card payment
            const result = await stripe.confirmCardPayment(clientSecret, {
                payment_method: paymentMethod.id,
            });

            if (result.error) {
                setError(result.error.message);
            } else {
                setError('');
                if (result.paymentIntent.status === 'succeeded') {
                    console.log('Payment succeeded!');
                    const transactionId = result.paymentIntent.id;

                    // Step 4: Send payment info to backend
                    const paymentData = {
                        id,
                        email: user.email,
                        amount,
                        transactionId,
                        paymentMethod: result.paymentIntent.payment_method_types,
                    };

                    const paymentRes = await axiosSecure.post('/payments', paymentData);

                    if (paymentRes.data.insertedId) {
                        await Swal.fire({
                            icon: 'success',
                            title: 'Payment Successful!',
                            html: `<strong>Transaction ID:</strong> <code>${transactionId}</code>`,
                            confirmButtonText: 'Go to My Parcels',
                        });

                        navigate('/dashboard/myParcel');
                    }
                }
            }
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="space-y-4 bg-white p-6 rounded-xl shadow-md w-full max-w-md mx-auto"
        >
            <CardElement className="p-2 border rounded" />
            <button type="submit" className="btn btn-primary text-black w-full" disabled={!stripe}>
                Pay ${amount}
            </button>
            {error && <p className="text-red-500">{error}</p>}
        </form>
    );
};

export default CheckoutForm;
