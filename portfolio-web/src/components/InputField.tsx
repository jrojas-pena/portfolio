import React, { InputHTMLAttributes} from "react";
import {useField} from "formik";
import {FormControl, FormLabel, Input, FormErrorMessage, InputGroup} from "@chakra-ui/react";

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
    name: string;
    label: string;
    placeholder: string;
    type: string;
}

export const InputField: React.FC<InputFieldProps> = ({label, size: _, children, ...props}) => {
    const [field, {error}] = useField(props);
    return (
        <FormControl isInvalid={!!error}>
            <FormLabel htmlFor={field.name}>{label}</FormLabel>
            <InputGroup>
            {children}
            <Input {...field} {...props} id={field.name} placeholder={props.placeholder} type={props.type}/>
            </InputGroup>
            {error ? <FormErrorMessage>{error}</FormErrorMessage> : null}
        </FormControl>
    );
}