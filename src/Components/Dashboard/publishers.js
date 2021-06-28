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

const PublisherBulkActionButtons = props => (
    <Fragment>
        <BulkDeleteWithConfirmButton {...props} />
    </Fragment>
);

const PublisherTitle = ({ record }) => {
    return <span>Post {record ? `"${record.Name}"` : ''}</span>;
};

const PublisherEditToolbar = props => (
    <Toolbar {...props} >
        <SaveButton />
        <DeleteWithConfirmButton/>
    </Toolbar>
);

export const PublisherList = props => (
    <List bulkActionButtons={<PublisherBulkActionButtons />} {...props}>
        <Datagrid rowClick="edit">
            <TextField source="id" />
            <TextField source="Name" />
            <TextField source="PublicationCity" />
            <TextField source="PublicationCountry" />
            <EditButton />
        </Datagrid>
    </List>
);

export const PublisherCreate = props => (
    <Create {...props}>
         <SimpleForm>
            <TextInput source="Name" validate={[required()]} name="name"/>
            <TextInput source="PublicationCity" validate={[required()]} name="publicationCity"/>
            <TextInput source="PublicationCountry" validate={[required()]} name="publicationCountry"/>
         </SimpleForm>
     </Create>
 );

 export const PublisherEdit = props => (
    <Edit title={<PublisherTitle />} {...props}>
        <SimpleForm toaolbar={<PublisherEditToolbar />}>
            <TextInput source="Name" name="name"/>
            <TextInput source="PublicationCity" name="publicationCity"/>
            <TextInput source="PublicationCountry" name="publicationCountry"/>
        </SimpleForm>
    </Edit>
);