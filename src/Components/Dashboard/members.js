import * as React from "react";
import {
    Filter,
    List,
    Datagrid,
    TextField,
    EmailField,
    EditButton,
    Edit,
    Create,
    SimpleForm,
    ReferenceInput,
    SelectInput,
    TextInput,
    Toolbar,
    SaveButton,
    DeleteWithConfirmButton,
    required,
    ReferenceField,
    BooleanInput,
    DateInput,
    PasswordInput,
    email,
    minLength,
    BulkDeleteWithConfirmButton,
    BooleanField,
    ImageInput,
    ImageField
} from 'react-admin';
import { Fragment } from 'react';

const MemberBulkActionButtons = props => (
    <Fragment>
        <BulkDeleteWithConfirmButton {...props} />
    </Fragment>
);

const MemberEditToolbar = props => (
    <Toolbar {...props} >
        <SaveButton />
        <DeleteWithConfirmButton/>
    </Toolbar>
);

const MemberName = ({ record }) => {
    return <span>User {record ? `"${record.Name}"` : ''}</span>;
};

const MemberFilter = (props) => (
    <Filter {...props}>
        <TextInput label="Search" source="q" alwaysOn />
        <ReferenceInput label="Member" source="id" reference="members" allowEmpty>
            <SelectInput optionText="FirstName" />
        </ReferenceInput>
    </Filter>
);

export const MemberList = props => (
        <List filters={<MemberFilter />} bulkActionButtons={<MemberBulkActionButtons />} {...props}>
        <Datagrid rowClick="edit">
            <TextField source="id" />
            <TextField source="FirstName" />
            <TextField source="LastName" />
            <EmailField source="Email" />
            <TextField source="Country" />
            <TextField source="City" />
            <ReferenceField source="Role" reference="roles">
                <TextField source="Name"/>
            </ReferenceField>
            <BooleanField source="Active" />
            <EditButton />
            <DeleteWithConfirmButton/>
        </Datagrid>
    </List>
);

export const MemberEdit = props => {
    return (
        <Edit title={<MemberName />} {...props}>
            <SimpleForm toolbar={<MemberEditToolbar />}>
                <TextInput source="FirstName" name="FirstName"/>
                <TextInput source="LastName" name="LastName"/>
                <TextInput source="Email" validate={[email()]} name="Email"/>
                <BooleanInput label="Active" source="Active" defaultValue={true} name="Active"/>
                <ReferenceInput source="Role" reference="roles" name="Role">
                    <SelectInput optionText="Name" />
                </ReferenceInput>
                <PasswordInput source="Password" validate={[minLength(6)]} helperText={'Password be 6 characters or longer'} name="Password"/>
                <DateInput source="DateOfBirth" name="DateOfBirth"/>
                <SelectInput source="Gender" name="Gender" choices={[
                    { id: 0, name: 'Male' },
                    { id: 1, name: 'Female' },
                    { id: 2, name: 'Other' },
                ]} />
                <TextInput source="PhoneNumber" name="PhoneNumber"/>
                <TextInput source="ZipCode" name="ZipCode"/>
                <TextInput source="Address" name="Address"/>
                <TextInput source="City" name="City"/>
                <TextInput source="Country" name="Country"/>
            </SimpleForm>
        </Edit>
    )
} 

export const MemberCreate = props => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="FirstName" validate={[required()]} name="firstName"/>
            <TextInput source="LastName" validate={[required()]} name="lastName"/>
            <TextInput source="Email" validate={[required(), email()]} name="email"/>
            <BooleanInput label="Active" source="active" defaultValue={true} />
            <ReferenceInput source="Role" reference="roles" validate={[required()]} name="role">
                <SelectInput optionText="Name" />
            </ReferenceInput>
            <PasswordInput source="Password" validate={[required(),minLength(6)]} helperText={'Password be 6 characters or longer'} name="password"/>
            <DateInput source="dateOfBirth" validate={[required()]}/>
            <SelectInput source="gender" choices={[
                    { id: 0, name: 'Male' },
                    { id: 1, name: 'Female' },
                    { id: 2, name: 'Other' },
            ]} />
            <TextInput source="PhoneNumber" name="phoneNumber"/>
            <TextInput source="ZipCode" name="zipCode"/>
            <TextInput source="Address" name="address"/>
            <TextInput source="City" name="city"/>
            <TextInput source="Country" name="country"/>
            <ImageInput source="pictures" accept="image/*" label="Drop some pictures to upload, or click to select one (up to 10MB)." name="pictures">
                <ImageField source="src" title="title" />
            </ImageInput>
        </SimpleForm>
     </Create>
 );