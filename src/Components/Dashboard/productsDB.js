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
    Toolbar,
    SaveButton,
    DeleteWithConfirmButton,
    required,
    BooleanInput,
    BulkDeleteWithConfirmButton,
    Filter,
    ReferenceInput,
    ReferenceField,
    BooleanField,
    DateInput,
    ImageInput,
    ImageField,
    NumberInput
} from 'react-admin';
import { Fragment } from 'react';

const ProductBulkActionButtons = props => (
    <Fragment>
        <BulkDeleteWithConfirmButton {...props} />
    </Fragment>
);

const ProductEditToolbar = props => (
    <Toolbar {...props} >
        <SaveButton />
        <DeleteWithConfirmButton/>
    </Toolbar>
);

const ProductName = ({ record }) => {
    return <span>User {record ? `"${record.Title}"` : ''}</span>;
};

const ProductFilter = (props) => (
    <Filter {...props}>
        <TextInput label="Search" source="q" alwaysOn />
        <ReferenceInput label="Product" source="id" reference="products" allowEmpty>
            <SelectInput optionText="Title" />
        </ReferenceInput>
    </Filter>
);

export const ProductList = props => (
    <List filters={<ProductFilter />} bulkActionButtons={<ProductBulkActionButtons />} {...props}>
        <Datagrid rowClick="edit">
            <TextField source="id" />
            <TextField source="ISBN10" />
            <TextField source="Title" />
            <ReferenceField source="Format" reference="formats">
                <TextField source="Name"/>
            </ReferenceField>
            <ReferenceField source="Language" reference="languages">
                <TextField source="Name"/>
            </ReferenceField>
            <TextField source="Stars" />
            <TextField source="OriginalPrice" label="Original Price" />
            <TextField source="CurrentPrice" label="Current Price" />
            <BooleanField source="Special"/>
            <BooleanField source="Top"/>
            <BooleanField source="IsNew"/>
            <EditButton />
            <DeleteWithConfirmButton/>
        </Datagrid>
    </List>
);

export const ProductEdit = props => (
    <Edit title={<ProductName />} {...props}>
        <SimpleForm toolbar={<ProductEditToolbar />}>
            <TextInput source="ISBN10" name="ISBN10"/>
            <TextInput source="ISBN13" name="ISBN13"/>
            <TextInput source="Title" name="Title"/>
            <TextInput source="Author" name="Author"/>
            <TextInput source="Artist" name="Artist"/>
            <NumberInput source="Pages" name="Pages" />
            <TextInput source="Dimensions" name="Dimensions" />
            <NumberInput source="Stars" name="Stars" />
            <ReferenceInput source="Publisher" reference="publishers" name="Publisher">
                <SelectInput optionText="Name" />
            </ReferenceInput>
            <ReferenceInput source="Format" reference="formats" name="Format">
                <SelectInput optionText="Name" />
            </ReferenceInput>
            <ReferenceInput source="Language" reference="languages" name="Language">
                <SelectInput optionText="Name" />
            </ReferenceInput>
            <TextInput source="Weight" name="Weight" />
            <NumberInput source="OriginalPrice" name="OriginalPrice"/>
            <NumberInput source="CurrentPrice" name="CurrentPrice"/>
            <DateInput source="PublicationDate" name="PublicationDate"/>
            <TextInput source="Description" name="Description"/>
            <BooleanInput label="Special" source="Special"/>
            <BooleanInput label="IsNew" source="IsNew"/>
            <BooleanInput label="Top" source="Top"/>
        </SimpleForm>
    </Edit>
);

export const ProductCreate = props => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="ISBN10" name="ISBN10" validate={[required()]}/>
            <TextInput source="ISBN13" name="ISBN13" validate={[required()]}/>
            <TextInput source="Title" name="title" validate={[required()]}/>
            <TextInput source="Author" name="author" validate={[required()]}/>
            <TextInput source="Artist" name="artist" validate={[required()]}/>
            <NumberInput source="Pages" name="pages" validate={[required()]}/>
            <TextInput source="Dimensions" name="dimensions" validate={[required()]}/>
            <ReferenceInput source="Publisher" reference="publishers" name="publisher" validate={[required()]}>
                <SelectInput optionText="Name" />
            </ReferenceInput>
            <ReferenceInput source="Format" reference="formats" name="format" validate={[required()]}>
                <SelectInput optionText="Name" />
            </ReferenceInput>
            <ReferenceInput source="Language" reference="languages" name="language" validate={[required()]}>
                <SelectInput optionText="Name" />
            </ReferenceInput>
            <TextInput source="Weight" name="weight" validate={[required()]}/>
            <TextInput source="OriginalPrice" name="originalPrice" validate={[required()]}/>
            <DateInput source="PublicationDate" name="publicationDate" validate={[required()]}/>
            <TextInput source="Description" name="description" validate={[required()]}/>
            <BooleanInput label="Special" source="special"/>
            <BooleanInput label="IsNew" source="isNew"/>
            <BooleanInput label="Top" source="top"/>
            <ImageInput source="pictures" accept="image/*" label="Drop some pictures to upload, or click to select one (up to 10MB)." name="pictures">
                <ImageField source="src" title="title" />
            </ImageInput>
        </SimpleForm>
     </Create>
 );