import React, { Component } from 'react';
import './AdminMain.css';
import { Admin, Resource} from 'react-admin';
import { RoleCreate, RoleEdit, RoleList } from "./roles";
import { MemberCreate, MemberList, MemberEdit } from "./members";
import { PostList, PostCreate, PostEdit } from "./blogPosts";
import { CouponList, CouponCreate, CouponEdit } from "./coupons";
import { CommentCreate, CommentEdit, CommentList } from "./comments";
import { DeliveryCreate, DeliveryEdit, DeliveryList } from "./deliveries";
import { FormatCreate, FormatEdit, FormatList } from "./format";
import { ImageCreate, ImageEdit, ImageList } from "./productImages";
import { LanguageCreate, LanguageEdit, LanguageList } from "./languages";
import { StatusCreate, StatusEdit, StatusList } from "./status";
import { PublisherCreate, PublisherEdit, PublisherList } from "./publishers";
import { DetailsCreate, DetailsEdit, DetailsList } from "./storeDetails";
import PostIcon from '@material-ui/icons/Book';
import UserIcon from '@material-ui/icons/Group';
import LabelIcon from '@material-ui/icons/Label';
import Dashboard from './Dashboard';
import "firebase/database";
import { ProductCreate, ProductEdit, ProductList } from './productsDB';
import { OrderEdit, OrderList, OrderShow } from './orders';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import StyleIcon from '@material-ui/icons/Style';
import simpleRestProvider from 'ra-data-simple-rest';
import MoneyOffIcon from '@material-ui/icons/MoneyOff';
import CreateIcon from '@material-ui/icons/Create';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import ImportContactsIcon from '@material-ui/icons/ImportContacts';
import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary';
import TranslateIcon from '@material-ui/icons/Translate';
import BeenhereIcon from '@material-ui/icons/Beenhere';
import LocalLibraryIcon from '@material-ui/icons/LocalLibrary';
import StorefrontIcon from '@material-ui/icons/Storefront';
const { nanoid } = require('nanoid')

const dataProvider = simpleRestProvider('http://localhost:5000')

const convertFileToBase64 = file =>

    new Promise((resolve, reject) => {

        const reader = new FileReader();
        
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;

        reader.readAsDataURL(file.rawFile);
 });

const myDataProvider = {

    ...dataProvider,

    create: (resource, params) => {

        if (resource !== 'products' && !params.data.pictures) {
            
            return dataProvider.create(resource, params);
        }
        
        console.log(params.data.pictures)
        if(!Array.isArray(params.data.pictures)) {
            params.data.pictures = [params.data.pictures]
        }
        const newPictures = params.data.pictures.filter(
            p => p.rawFile instanceof File
        );
        const formerPictures = params.data.pictures.filter(
            p => !(p.rawFile instanceof File)
        );

        const nano = nanoid();

        return Promise.all(newPictures.map(convertFileToBase64))
            .then(base64Pictures =>
                base64Pictures.map((picture64, i) => ({
                    src: picture64,
                    title: `${nano}.${params.data.pictures[i].title.split(/\.(?=[^\.]+$)/)[1]}`, //eslint-disable-line
                }))
            )
            .then(transformedNewPictures =>
                dataProvider.create(resource, {
                    ...params,
                    data: {
                        ...params.data,
                        pictures: [
                            ...transformedNewPictures,
                            ...formerPictures
                        ],
                    },
                })
            );
    },
    update: (resource, params) => {

        if (resource !== 'products' || !params.data.pictures) {
            
            return dataProvider.update(resource, params);
        }

        if(!Array.isArray(params.data.pictures)) {
            params.data.pictures = [params.data.pictures]
        }
        const newPictures = params.data.pictures.filter(
            p => p.rawFile instanceof File
        );
        const formerPictures = params.data.pictures.filter(
            p => !(p.rawFile instanceof File)
        );

        return Promise.all(newPictures.map(convertFileToBase64))
            .then(base64Pictures =>
                base64Pictures.map((picture64, i) => ({
                    src: picture64,
                    title: `${params.data.firstName}-${(new Date()).getTime()}${i}.${params.data.pictures[i].title.split(/\.(?=[^\.]+$)/)[1]}`, //eslint-disable-line
                }))
            )
            .then(transformedNewPictures =>
                dataProvider.update(resource, {
                    ...params,
                    data: {
                        ...params.data,
                        pictures: [
                            ...transformedNewPictures,
                            ...formerPictures
                        ],
                    },
                })
            );
    }
};

class AdminMain extends Component {
    render () {
        return(    
            <div className="big">
                <Admin dashboard={Dashboard} dataProvider={myDataProvider}>
                    <Resource name="blogposts" list={PostList} edit={PostEdit} create={PostCreate} icon={PostIcon}/>
                    <Resource name="comments" list={CommentList} edit={CommentEdit} create={CommentCreate} icon={CreateIcon}/>
                    <Resource name="coupons" list={CouponList} edit={CouponEdit} create={CouponCreate} icon={MoneyOffIcon}/>
                    <Resource name="members" list={MemberList} edit={MemberEdit} create={MemberCreate} icon={UserIcon}/>
                    <Resource name="deliveries" list={DeliveryList} edit={DeliveryEdit} create={DeliveryCreate} icon={LocalShippingIcon}/>
                    <Resource name="formats" list={FormatList} edit={FormatEdit} create={FormatCreate} icon={ImportContactsIcon}/>
                    <Resource name="productimages" list={ImageList} edit={ImageEdit} create={ImageCreate} icon={PhotoLibraryIcon} options={{ label: 'Products Images' }}/>
                    <Resource name="languages" list={LanguageList} edit={LanguageEdit} create={LanguageCreate} icon={TranslateIcon}/>
                    <Resource name="status" list={StatusList} edit={StatusEdit} create={StatusCreate} icon={BeenhereIcon}/>
                    <Resource name="publishers" list={PublisherList} edit={PublisherEdit} create={PublisherCreate} icon={LocalLibraryIcon}/>
                    <Resource name="storedetails" list={DetailsList} edit={DetailsEdit} create={DetailsCreate} icon={StorefrontIcon}/>
                    <Resource name="roles" list={RoleList} edit={RoleEdit} create={RoleCreate} icon={LabelIcon}/>
                    <Resource name="products" list={ProductList} edit={ProductEdit} create={ProductCreate} icon={StyleIcon}/>
                    <Resource name="orders" list={OrderList} show={OrderShow} edit={OrderEdit} icon={ShoppingBasketIcon}/>
                </Admin>
            </div>
        )
    }
}

export default AdminMain;