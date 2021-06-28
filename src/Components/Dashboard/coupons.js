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
    BooleanField,
    NumberInput,
    BooleanInput
} from 'react-admin';
import { Fragment } from 'react';

const CouponBulkActionButtons = props => (
    <Fragment>
        <BulkDeleteWithConfirmButton {...props} />
    </Fragment>
);

const CouponTitle = ({ record }) => {
    return <span>Post {record ? `"${record.Code}"` : ''}</span>;
};

const CouponEditToolbar = props => (
    <Toolbar {...props} >
        <SaveButton />
        <DeleteWithConfirmButton/>
    </Toolbar>
);

export const CouponList = props => (
    <List bulkActionButtons={<CouponBulkActionButtons />} {...props}>
        <Datagrid rowClick="edit">
            <TextField source="id" />
            <TextField source="Code" />
            <TextField source="Discount" />
            <BooleanField source="IsActive" />
            <EditButton />
        </Datagrid>
    </List>
);

export const CouponCreate = props => (
    <Create {...props}>
         <SimpleForm>
            <TextInput source="Code" validate={[required()]} name="code"/>
            <NumberInput source="Discount" name="discount" />
            <BooleanInput label="Active" source="IsActive" name="isActive" />
         </SimpleForm>
     </Create>
 );

 export const CouponEdit = props => (
    <Edit title={<CouponTitle />} {...props}>
        <SimpleForm toaolbar={<CouponEditToolbar />}>
            <TextInput source="Code" name="Code"/>
            <NumberInput source="Discount" name="Discount"/>
            <BooleanInput label="Active" source="IsActive" name="IsActive"/>
        </SimpleForm>
    </Edit>
);