import React from "react";
import data from '../../../../data.json';
import { Link } from 'react-router-dom';
import formatPrice from '../../../utility/Price';
import formatStars from '../../../utility/Stars'

const Modal = ({ handleClose, show, title, products, addToStorage }) => {
  const showHideClassName = show ? "modal modal-visible" : "modal-hidden";
  let obj;
  if(title != null) {
    obj = products.filter(product => product.Title === title)
    obj = obj[0];
  } else {
    obj = data.products.filter(product => product.title === "Lorem ipsum dolor: sit amet consectetur")
    obj = obj[0];
  }

  return (
    <div className={showHideClassName}>
    <div className="justify-center items-center fixed inset-0 flex overflow-x-hidden overflow-y-auto z-50 outline-none focus:outline-none" onClick={handleClose}>
    <div className="relative w-auto my-6 mx-auto max-w-3xl">
      {/*content*/}
      <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-yellow-50 outline-none focus:outline-none">
        {/*header*/}
        <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t">
          <h3 className="text-3xl font-semibold text-yellow-700">
            {obj.Title}
          </h3>
          <button className="p-1 ml-auto bg-transparent border-0 text-black opacity-95 float-right text-3xl leading-none font-semibold outline-none focus:outline-none" onClick={handleClose}>
            <span className="text-yellow-800 opacity-95 h-6 w-6 text-2xl block">
              ×
            </span>
          </button>
        </div>
        {/*body*/}
        <div className="relative p-6 flex-auto">
          <img src={obj.MainImage ? `${process.env.REACT_APP_SERVER_DOMAIN}/photos/photoSrc/products/${obj.MainImage}` : "https://via.placeholder.com/150x250"} className="float-left pr-12" alt="" />
          <p className="my-1 text-gray-600 text-xl leading-relaxed">
            Author: {obj.Author}
            <br/>
            Artist: {obj.Artist}
          </p>
          <p className="my-1 text-yellow-400 text-xl leading-relaxed">
            {formatStars(obj.Stars)}
          </p>
          <p className="my-2 text-gray-600 text-lg leading-relaxed">
            {obj.Description}
          </p>
          <p className="text-3xl float-right">
            {formatPrice(obj.CurrentPrice)}
          </p>
          <p>
          </p>
          <button 
            className="bg-yellow-800 text-yellow-100 uppercase text-lg px-6 py-3 rounded shadow hover:text-yellow-800 hover:bg-yellow-200 outline-none focus:outline-none mr-1 mb-1"
            onClick={() => addToStorage(obj.ISBN10)}>
            <i className="fas fa-cart-arrow-down pr-4"></i>
            Add to Cart
          </button>
        </div>
        {/*footer*/}
        <div className="flex items-center justify-end p-6 border-t border-solid border-gray-300 rounded-b">
          <Link to={"/item/" + obj.id}>
            <button 
              className="bg-yellow-600 text-yellow-100 uppercase text-lg px-6 py-3 rounded shadow hover:shadow-lg hover:text-yellow-600 hover:bg-yellow-200 outline-none focus:outline-none mr-1 mb-1" 
              type="button" 
              style={{ transition: "all .15s ease" }}
            >
              Read More
            </button>
          </Link>
        </div>
      </div>
    </div>
  </div>
  <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
  </div >
  );
};

export default Modal;