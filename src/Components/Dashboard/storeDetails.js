import * as React from "react";
import {
    List,
    Datagrid,
    TextField,
    EditButton,
    Edit,
    Create,
    SimpleForm,
    TextInput,
    BulkDeleteWithConfirmButton,
    Toolbar,
    SaveButton,
    DeleteWithConfirmButton,
    required,
    EmailField
} from 'react-admin';
import { Fragment } from 'react';

const DetailsBulkActionButtons = props => (
    <Fragment>
        <BulkDeleteWithConfirmButton {...props} />
    </Fragment>
);

const DetailsTitle = ({ record }) => {
    return <span>Post {record ? `"${record.Name}"` : ''}</span>;
};

const DetailsEditToolbar = props => (
    <Toolbar {...props} >
        <SaveButton />
        <DeleteWithConfirmButton/>
    </Toolbar>
);

export const DetailsList = props => (
    <List bulkActionButtons={<DetailsBulkActionButtons />} {...props}>
        <Datagrid rowClick="edit">
            <TextField source="id" />
            <TextField source="Name" />
            <TextField source="Address" />
            <TextField source="ZipCode" />
            <TextField source="City" />
            <TextField source="Country" />
            <TextField source="PhoneNumber" />
            <EmailField source="Email"/>
            <EditButton />
        </Datagrid>
    </List>
);

export const DetailsCreate = props => (
    <Create {...props}>
         <SimpleForm>
            <TextInput source="Name" validate={[required()]} name="name"/>
            <TextInput source="Address" validate={[required()]} name="address"/>
            <TextInput source="ZipCode" validate={[required()]} name="zipCode"/>
            <TextInput source="City" validate={[required()]} name="city"/>
            <TextInput source="Country" validate={[required()]} name="country"/>
            <TextInput source="PhoneNumber" validate={[required()]} name="phoneNumber"/>
            <TextInput source="Email" validate={[required()]} name="email"/>
         </SimpleForm>
     </Create>
 );

 export const DetailsEdit = props => (
    <Edit title={<DetailsTitle />} {...props}>
        <SimpleForm toaolbar={<DetailsEditToolbar />}>
            <TextInput source="Name" name="name"/>
            <TextInput source="Address" name="address"/>
            <TextInput source="ZipCode" name="zipCode"/>
            <TextInput source="City" name="city"/>
            <TextInput source="Country" name="country"/>
            <TextInput source="PhoneNumber" name="phoneNumber"/>
            <TextInput source="Email" name="email"/>
        </SimpleForm>
    </Edit>
);