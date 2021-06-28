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

const LanguageBulkActionButtons = props => (
    <Fragment>
        <BulkDeleteWithConfirmButton {...props} />
    </Fragment>
);

const LanguageTitle = ({ record }) => {
    return <span>Post {record ? `"${record.Name}"` : ''}</span>;
};

const LanguageEditToolbar = props => (
    <Toolbar {...props} >
        <SaveButton />
        <DeleteWithConfirmButton/>
    </Toolbar>
);

export const LanguageList = props => (
    <List bulkActionButtons={<LanguageBulkActionButtons />} {...props}>
        <Datagrid rowClick="edit">
            <TextField source="id" />
            <TextField source="Name" />
            <EditButton />
        </Datagrid>
    </List>
);

export const LanguageCreate = props => (
    <Create {...props}>
         <SimpleForm>
            <TextInput source="Name" validate={[required()]} name="name"/>
         </SimpleForm>
     </Create>
 );

 export const LanguageEdit = props => (
    <Edit title={<LanguageTitle />} {...props}>
        <SimpleForm toaolbar={<LanguageEditToolbar />}>
            <TextInput source="Name" name="Name"/>
        </SimpleForm>
    </Edit>
);