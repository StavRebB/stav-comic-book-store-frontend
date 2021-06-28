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
    ReferenceInput,
    ReferenceField,
    ImageInput,
    ImageField
} from 'react-admin';
import { Fragment } from 'react';

const ImageBulkActionButtons = props => (
    <Fragment>
        <BulkDeleteWithConfirmButton {...props} />
    </Fragment>
);

const ImageTitle = ({ record }) => {
    return <span>Post {record ? `"${record.id}"` : ''}</span>;
};

const ImageEditToolbar = props => (
    <Toolbar {...props} >
        <SaveButton />
        <DeleteWithConfirmButton/>
    </Toolbar>
);

export const ImageList = props => (
    <List bulkActionButtons={<ImageBulkActionButtons />} {...props}>
        <Datagrid rowClick="edit">
            <ReferenceField source="ProductId" reference="products">
                <TextField source="Title"/>
            </ReferenceField>
            <TextField source="Caption" />
            <EditButton />
            <DeleteWithConfirmButton/>
        </Datagrid>
    </List>
);

export const ImageCreate = props => (
    <Create {...props}>
         <SimpleForm>
            <ReferenceInput source="ProductId" reference="products" name="productId">
                <SelectInput optionText="Title" />
            </ReferenceInput>
            <ImageInput source="pictures" accept="image/*" label="Drop some pictures to upload, or click to select one (up to 10MB)." name="pictures">
                <ImageField source="src" title="title" />
            </ImageInput>
            <TextInput source="Caption" validate={[required()]} name="caption"/>
         </SimpleForm>
     </Create>
 );

 export const ImageEdit = props => (
    <Edit title={<ImageTitle />} {...props}>
        <SimpleForm toaolbar={<ImageEditToolbar />}>
            <ReferenceInput source="ProductId" reference="products" name="ProductId">
                <SelectInput optionText="Title" />
            </ReferenceInput>
            <TextInput source="Caption" name="Caption"/>
        </SimpleForm>
    </Edit>
);