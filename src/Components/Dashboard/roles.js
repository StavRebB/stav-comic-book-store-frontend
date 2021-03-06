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
} from 'react-admin';
import { Fragment } from 'react';

const RoleBulkActionButtons = props => (
    <Fragment>
        <BulkDeleteWithConfirmButton {...props} />
    </Fragment>
);

const RoleTitle = ({ record }) => {
    return <span>Post {record ? `"${record.Name}"` : ''}</span>;
};

const RoleEditToolbar = props => (
    <Toolbar {...props} >
        <SaveButton />
        <DeleteWithConfirmButton/>
    </Toolbar>
);

export const RoleList = props => (
    <List bulkActionButtons={<RoleBulkActionButtons />} {...props}>
        <Datagrid rowClick="edit">
            <TextField source="id" />
            <TextField source="Name" />
            <EditButton />
        </Datagrid>
    </List>
);

export const RoleCreate = props => (
    <Create {...props}>
         <SimpleForm>
            <TextInput source="Name" validate={[required()]} name="name"/>
         </SimpleForm>
     </Create>
 );

 export const RoleEdit = props => (
    <Edit title={<RoleTitle />} {...props}>
        <SimpleForm toolbar={<RoleEditToolbar />}>
            <TextInput source="Name" validate={[required()]} name="name"/>
        </SimpleForm>
    </Edit>
);