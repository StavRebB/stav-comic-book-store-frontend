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
    ReferenceField,
    DateField,
    ReferenceInput,
    DateInput
} from 'react-admin';
import { Fragment } from 'react';

const CommentBulkActionButtons = props => (
    <Fragment>
        <BulkDeleteWithConfirmButton {...props} />
    </Fragment>
);

const CommentTitle = ({ record }) => {
    return <span>Post {record ? `"${record.Code}"` : ''}</span>;
};

const CommentEditToolbar = props => (
    <Toolbar {...props} >
        <SaveButton />
        <DeleteWithConfirmButton/>
    </Toolbar>
);

export const CommentList = props => (
    <List bulkActionButtons={<CommentBulkActionButtons />} {...props}>
        <Datagrid rowClick="edit">
            <TextField source="id" />
            <ReferenceField source="PostId" reference="blogposts" label="Post">
                <TextField source="Title"/>
            </ReferenceField>
            <ReferenceField source="MemberId" reference="members" label="Written By">
                <TextField source="FirstName"/>
            </ReferenceField>
            <DateField source="DateOfWriting" />
            <EditButton />
        </Datagrid>
    </List>
);

export const CommentCreate = props => (
    <Create {...props}>
         <SimpleForm>
            <ReferenceInput label="Writer" source="MemberId" reference="members" name="memberId" validate={[required()]}>
                <SelectInput optionText="FirstName" />
            </ReferenceInput>
            <ReferenceInput label="Post" source="PostId" reference="blogposts" name="postId" validate={[required()]}>
                <SelectInput optionText="Title" />
            </ReferenceInput>
            <TextInput source="Content" validate={[required()]} name="content"/>
            <DateInput source="DateOfWriting" validate={[required()]} name="dateOfWriting"/>
         </SimpleForm>
     </Create>
 );

 export const CommentEdit = props => (
    <Edit title={<CommentTitle />} {...props}>
        <SimpleForm toaolbar={<CommentEditToolbar />}>
            <ReferenceInput label="Writer" source="MemberId" reference="members" name="MemberId">
                <SelectInput optionText="FirstName" />
            </ReferenceInput>
            <ReferenceInput label="Post" source="PostId" reference="blogposts" name="PostId">
                <SelectInput optionText="Title" />
            </ReferenceInput>
            <TextInput source="Content" name="Content"/>
            <DateInput source="DateOfWriting" name="DateOfWriting"/>
        </SimpleForm>
    </Edit>
);