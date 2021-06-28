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

const FormatBulkActionButtons = props => (
    <Fragment>
        <BulkDeleteWithConfirmButton {...props} />
    </Fragment>
);

const FormatTitle = ({ record }) => {
    return <span>Post {record ? `"${record.Name}"` : ''}</span>;
};

const FormatEditToolbar = props => (
    <Toolbar {...props} >
        <SaveButton />
        <DeleteWithConfirmButton/>
    </Toolbar>
);

export const FormatList = props => (
    <List bulkActionButtons={<FormatBulkActionButtons />} {...props}>
        <Datagrid rowClick="edit">
            <TextField source="id" />
            <TextField source="Name" />
            <EditButton />
        </Datagrid>
    </List>
);

export const FormatCreate = props => (
    <Create {...props}>
         <SimpleForm>
            <TextInput source="Name" validate={[required()]} name="name"/>
         </SimpleForm>
     </Create>
 );

 export const FormatEdit = props => (
    <Edit title={<FormatTitle />} {...props}>
        <SimpleForm toaolbar={<FormatEditToolbar />}>
            <TextInput source="Name" name="Name"/>
        </SimpleForm>
    </Edit>
);