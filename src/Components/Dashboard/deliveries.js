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
    NumberInput,
} from 'react-admin';
import { Fragment } from 'react';

const DeliveryBulkActionButtons = props => (
    <Fragment>
        <BulkDeleteWithConfirmButton {...props} />
    </Fragment>
);

const DeliveryTitle = ({ record }) => {
    return <span>Post {record ? `"${record.Code}"` : ''}</span>;
};

const DeliveryEditToolbar = props => (
    <Toolbar {...props} >
        <SaveButton />
        <DeleteWithConfirmButton/>
    </Toolbar>
);

export const DeliveryList = props => (
    <List bulkActionButtons={<DeliveryBulkActionButtons />} {...props}>
        <Datagrid rowClick="edit">
            <TextField source="id" />
            <TextField source="Name" />
            <TextField source="Price" label="Price (in Dollars)" />
            <TextField source="Duration" />
            <EditButton />
        </Datagrid>
    </List>
);

export const DeliveryCreate = props => (
    <Create {...props}>
         <SimpleForm>
            <TextInput source="Name" validate={[required()]} name="name"/>
            <NumberInput source="Price" name="price" validate={[required()]} label="Price (in Dollars)" />
            <TextInput source="Duration" validate={[required()]} name="duration"/>
         </SimpleForm>
     </Create>
 );

 export const DeliveryEdit = props => (
    <Edit title={<DeliveryTitle />} {...props}>
        <SimpleForm toaolbar={<DeliveryEditToolbar />}>
            <TextInput source="Name" name="Name"/>
            <NumberInput source="Price" name="Price" label="Price (in Dollars)" />
            <TextInput source="Duration" name="Duration"/>
        </SimpleForm>
    </Edit>
);