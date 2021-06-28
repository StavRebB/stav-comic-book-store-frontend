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

const StatusBulkActionButtons = props => (
    <Fragment>
        <BulkDeleteWithConfirmButton {...props} />
    </Fragment>
);

const StatusTitle = ({ record }) => {
    return <span>Post {record ? `"${record.Name}"` : ''}</span>;
};

const StatusEditToolbar = props => (
    <Toolbar {...props} >
        <SaveButton />
        <DeleteWithConfirmButton/>
    </Toolbar>
);

export const StatusList = props => (
    <List bulkActionButtons={<StatusBulkActionButtons />} {...props}>
        <Datagrid rowClick="edit">
            <TextField source="id" />
            <TextField source="Name" />
            <EditButton />
        </Datagrid>
    </List>
);

export const StatusCreate = props => (
    <Create {...props}>
         <SimpleForm>
            <TextInput source="Name" validate={[required()]} name="name"/>
         </SimpleForm>
     </Create>
 );

 export const StatusEdit = props => (
    <Edit title={<StatusTitle />} {...props}>
        <SimpleForm toaolbar={<StatusEditToolbar />}>
            <TextInput source="Name" name="name"/>
        </SimpleForm>
    </Edit>
);