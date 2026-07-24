import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Stack } from "@mui/material";

import { customerSchema } from "../../validations/customer.schema";

import GeneralInfoSection from "./GeneralInfoSection";
import TaxInfoSection from "./TaxInfoSection";
import AddressSection from "./AddressSection";
import NotesSection from "./NotesSection";
import StatusSection from "./StatusSection";

const CustomerForm = ({
    defaultValues,
    onSubmit,
}) => {
    const methods = useForm({
        resolver: zodResolver(customerSchema),

        defaultValues: {
            name: defaultValues?.name ?? "",
            companyName: defaultValues?.companyName ?? "",
            email: defaultValues?.email ?? "",
            phone: defaultValues?.phone ?? "",
            gstNumber: defaultValues?.gstNumber ?? "",
            taxId: defaultValues?.taxId ?? "",
            billingAddress: defaultValues?.billingAddress ?? "",
            shippingAddress: defaultValues?.shippingAddress ?? "",
            notes: defaultValues?.notes ?? "",
            isActive: defaultValues?.isActive ?? true,
        },

        mode: "onTouched",
    });

    return (
        <FormProvider {...methods}>
            <form id="customer-form"
                onSubmit={methods.handleSubmit(onSubmit)}
                noValidate>
                <Stack spacing={4}>
                    <GeneralInfoSection />

                    <TaxInfoSection />

                    <AddressSection />

                    <NotesSection />

                    <StatusSection />
                </Stack>
            </form>
        </FormProvider>
    );
};

export default CustomerForm;