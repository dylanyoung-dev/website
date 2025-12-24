"use client";

import { useForm } from 'react-hook-form';

interface ContactFormProps {}

interface ContactFormData {
    firstName: string;
    lastName: string;
    email: string;
}

export function ContactForm() {
    const { register, handleSubmit, reset } = useForm<ContactFormData>();

    const onSubmit = (data: ContactFormData) => {
        console.log(data);
    };

    return (
        <div className="container mx-auto py-4 md:py-8">
            <div className="space-y-5">
                {/* Form implementation can be added here if needed */}
            </div>
        </div>
    );
}
