import * as React from "react";
import {
    List,
    Datagrid,
    TextField,
    EditButton,
    Edit,
    SimpleForm,
    SelectInput,
    TextInput,
    ArrayField,
    ChipField,
    SingleFieldList,
    ShowButton, 
    TabbedShowLayout,
    Tab,
    Show,
    ReferenceField,
    BooleanField,
    ReferenceInput,
    BooleanInput,
    DateField
} from 'react-admin';

const OrderID = ({ record }) => {
    return <span>Order {record ? `"${record.id}"` : ''}</span>;
};

const MyPriceField = ({ record = {}, source }) => {
    let price = Number.parseFloat(record[source]).toFixed(2)
    return (
        <span>
            {price}$
        </span>
    );
}

export const OrderList = props => (
        <List {...props}>
        <Datagrid rowClick="edit">
            <TextField source="id" />
            <TextField source="OrderNum" />
            <TextField source="RecieverName" />
            <DateField source="OrderDate"/>
            <TextField source="Country" />
            <TextField source="Payment" />
            <ArrayField source="Products">
                <SingleFieldList>
                    <ChipField source="id" />
                </SingleFieldList>
            </ArrayField>
            <MyPriceField source="Sum" />
            <ReferenceField source="Status" reference="status">
                <TextField source="Name"/>
            </ReferenceField>
            <ReferenceField source="Delivery" reference="deliveries">
                <TextField source="Name"/>
            </ReferenceField> 
            <ReferenceField source="Coupon" reference="coupons">
                <TextField source="Code"/>
            </ReferenceField> 
            <BooleanField source="Refund" />                 
            <ShowButton/>
           <EditButton />
        </Datagrid>
    </List>
);

export const OrderEdit = props => {
    return (
    <Edit title={<OrderID />} {...props}>
        <SimpleForm>
            <TextInput source="PayerName" name="PayerName"/>
            <TextInput source="Email" name="Email"/>
            <TextInput source="RecieverName" name="RecieverName"/>
            <TextInput source="Address" name="Address"/>
            <TextInput source="ZipCode" name="ZipCode"/>
            <TextInput source="City" name="City"/>
            <TextInput source="Country" name="Country"/>
            <TextInput source="PhoneNumber" name="PhoneNumber"/>
            <ReferenceInput source="Status" reference="status" name="Status">
                <SelectInput optionText="Name" />
            </ReferenceInput>
            <ReferenceInput source="Delivery" reference="deliveries" name="Delivery">
                <SelectInput optionText="Name" />
            </ReferenceInput>
            <ReferenceInput source="Coupon" reference="coupons" name="Coupon">
                <SelectInput optionText="Code" />
            </ReferenceInput>
            <ReferenceInput source="MemberId" reference="members" name="MemberId">
                <SelectInput optionText="FirstName" />
            </ReferenceInput>
            <TextInput source="Notes" name="Notes"/>
            <BooleanInput label="Refund" source="refund" defaultValue={false} name="Refund"/>
        </SimpleForm>
    </Edit>
)};

export const OrderShow = (props) => (
    <Show {...props}>
        <TabbedShowLayout>
            <Tab label="Payer Information">
                <TextField source="id" label="Order ID"/>
                <TextField source="OrderNum" />
                <TextField source="PayerName" />
                <TextField source="Email"/>
                <TextField source="Payment"/>
                <TextField source="Sum"/>
                <TextField source="Status"/>
            </Tab>
            <Tab label="Items">
                <ArrayField source="Products" fieldKey="id">
                    <Datagrid>
                        <TextField source="id"/>
                        <ReferenceField source="id" reference="products" label="Title">
                            <TextField source="Title"/>
                        </ReferenceField>
                        <ReferenceField source="id" reference="products" label="Price Per Unit">
                            <TextField source="CurrentPrice"/>
                        </ReferenceField>
                        <TextField source="amount"/>
                    </Datagrid>
                </ArrayField>
            </Tab>
            <Tab label="Reciever Information">
                <TextField source="RecieverName"/>
                <TextField source="PhoneNumber"/>
                <TextField source="Address"/>
                <TextField source="ZipCode"/>
                <TextField source="City"/>
                <TextField source="Country"/>
                <TextField source="Notes"/>
            </Tab>
        </TabbedShowLayout>
    </Show>
);