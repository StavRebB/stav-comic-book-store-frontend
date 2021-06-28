import * as React from "react";
import {
    List,
    Datagrid,
    TextField,
    EditButton,
    Edit,
    Create,
    SimpleForm,
    SelectInput,
    TextInput,
    BulkDeleteWithConfirmButton,
    Toolbar,
    SaveButton,
    DeleteWithConfirmButton,
    required,
    DateField,
    ReferenceInput,
    DateInput,
    ImageInput,
    ReferenceField,
    ImageField,
} from 'react-admin';
import { Fragment } from 'react';

const PostBulkActionButtons = props => (
    <Fragment>
        <BulkDeleteWithConfirmButton {...props} />
    </Fragment>
);

const PostTitle = ({ record }) => {
    return <span>Post {record ? `"${record.Title}"` : ''}</span>;
};

const PostEditToolbar = props => (
    <Toolbar {...props} >
        <SaveButton />
        <DeleteWithConfirmButton/>
    </Toolbar>
);

export const PostList = props => (
    <List bulkActionButtons={<PostBulkActionButtons />} {...props}>
        <Datagrid rowClick="edit">
            <TextField source="id" />
            <ReferenceField source="MemberId" reference="members" label="Written By">
                <TextField source="FirstName"/>
            </ReferenceField>
            <DateField source="DateOfWriting" />
            <TextField source="Title" />
            <EditButton />
        </Datagrid>
    </List>
);

export const PostCreate = props => (
    <Create {...props}>
         <SimpleForm>
            <TextInput source="Title" validate={[required()]} name="title"/>
            <TextInput source="Content" validate={[required()]} name="content"/>
            <ReferenceInput label="Member ID" source="MemberId" reference="members" name="memberId" validate={[required()]}>
                <SelectInput optionText="FirstName" />
            </ReferenceInput>
            <DateInput source="DateOfWriting" validate={[required()]} name="dateOfWriting"/>
            <ImageInput source="pictures" accept="image/*" label="Drop some pictures to upload, or click to select one (up to 10MB)." name="pictures">
                <ImageField source="src" title="title" />
            </ImageInput>
            <TextInput source="Video" label="Video URL" name="video"/>
         </SimpleForm>
     </Create>
 );

 export const PostEdit = props => (
    <Edit title={<PostTitle />} {...props}>
        <SimpleForm toaolbar={<PostEditToolbar />}>
            <TextInput source="Title" name="Title"/>
            <TextInput source="Content" name="Content"/>
            <ReferenceInput label="Member ID" source="MemberId" reference="members" name="MemberId">
                <SelectInput optionText="FirstName" />
            </ReferenceInput>
            <DateInput source="DateOfWriting" name="DateOfWriting"/>
            <TextInput source="Video" label="Video URL" name="Video"/>
        </SimpleForm>
    </Edit>
);