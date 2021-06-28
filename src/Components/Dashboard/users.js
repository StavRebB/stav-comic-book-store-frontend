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
    minLength
} from 'react-admin';
import {auth, db} from '../../firebase';

const UserEditToolbar = props => (
    <Toolbar {...props} >
        <SaveButton />
        <DeleteWithConfirmButton/>
    </Toolbar>
);

const UserName = ({ record }) => {
    return <span>User {record ? `"${record.name}"` : ''}</span>;
};

const UserFilter = (props) => (
    <Filter {...props}>
        <TextInput label="Search" source="q" alwaysOn />
        <ReferenceInput label="User" source="userId" reference="users" allowEmpty>
            <SelectInput optionText="name" />
        </ReferenceInput>
    </Filter>
);

export const UserList = props => (
        <List filters={<UserFilter />} {...props}>
        <Datagrid rowClick="edit">
            <TextField source="id" />
            <TextField source="firstName" />
            <TextField source="lastName" />
            <EmailField source="email" />
            <TextField source="country" />
            <TextField source="city" />
            <ReferenceField source="role" reference="roles">
                <TextField source="title"/>
            </ReferenceField>
            <TextField source="active" />
            <EditButton />
            <DeleteWithConfirmButton/>
        </Datagrid>
    </List>
);

export const UserEdit = props => {
    return (
        <Edit title={<UserName />} {...props}>
            <SimpleForm toolbar={<UserEditToolbar />}>
                <TextInput disabled source="id" />
                <TextInput source="firstName" validate={[required()]}/>
                <TextInput source="lastName" validate={[required()]}/>
                <TextInput disabled source="email"/>
                <TextInput source="country"/>
                <TextInput source="city"/>
                <TextInput source="address"/>
                <TextInput source="phoneNum"/>
                <DateInput source="dateOfBirth"/>
                <ReferenceInput source="role" reference="roles">
                    <SelectInput optionText="title" />
                </ReferenceInput>
                <BooleanInput label="Active" source="active"/>
            </SimpleForm>
        </Edit>
    )
} 

let firstName = null;
let lastName = null;
let newEmail = null;
let Country = "none";
let City = "none";
let Address = "none";
let phoneNum = "none";
let Password = null;
let DOB = "none";
let newRole = null;
let Active = true;

let validateString = (str) => {
    if(str.length || str.replace(/\s/g, '').length) {
        return str
    } else {
        return "none"
    }
}

let createAccount = async (fn, ln, email, country, city, address, pn, password, dob, role, active, props) => {
    await auth.createUserWithEmailAndPassword(email, password)
    .then((result) => {

        let usrID = result.user.uid

        result.user.updateProfile({
            displayName: fn
        })

        let data = {
            firstName: fn,
            lastName: ln,
            password: password,
            email: email,
            country: country,
            city: city,
            address: address,
            phoneNum: pn,
            dateOfBirth: dob,
            role: role,
            active: active,
        }

        db.ref().child("users").child(usrID).set(
            {
                'id': usrID,
                ...data
            }
        )

        console.log(props)
    })
    .then(() => {
        props.history.push("/users")
    })
    .catch((error) => {console.log(error.message)})
}

export const UserCreate = props => (
    <Create {...props}>
        <SimpleForm save={() => {createAccount(firstName, lastName, newEmail, Country, City, Address, phoneNum, Password, DOB, newRole, Active, props)}}>
            <TextInput source="firstName" validate={[required()]} onChange={(event) => {firstName = event.target.value}}/>
            <TextInput source="lastName" validate={[required()]} onChange={(event) => {lastName = event.target.value}}/>
            <TextInput source="email" validate={[required(), email()]} onChange={(event) => {newEmail = event.target.value}}/>
            <TextInput source="country" onChange={(event) => {Country = validateString(event.target.value)}}/>
            <TextInput source="city" onChange={(event) => {City = validateString(event.target.value)}}/>
            <TextInput source="address" onChange={(event) => {Address = validateString(event.target.value)}}/>
            <TextInput source="phoneNum" onChange={(event) => {phoneNum = validateString(event.target.value)}}/>
            <PasswordInput source="password" validate={[required(),minLength(6)]} helperText={'Password be 6 characters or longer'} onChange={(event) => {Password = event.target.value}}/>
            <DateInput source="dateOfBirth" validate={[required()]} onChange={(event) => {DOB = validateString(event.target.value)}}/>
            <ReferenceInput source="role" reference="roles" validate={[required()]} onChange={(event) => {newRole = event.target.value}}>
                <SelectInput optionText="title" />
            </ReferenceInput>
            <BooleanInput label="Active" source="active" defaultValue={true} onChange={(event) => {Active = event.target.value}}/>
        </SimpleForm>
     </Create>
 );