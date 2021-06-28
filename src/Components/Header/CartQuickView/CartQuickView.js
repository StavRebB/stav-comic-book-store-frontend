import React from "react";
// import data from '../../data.json';
import { Link } from 'react-router-dom';
import formatPrice from '../../utility/Price';

const CartQuickView = ({ handleClose, show, productList, itemNum, itemSum }) => {
  const showHideClassName = show ? "modal modal-visible" : "modal-hidden";

  return (
    <div className={showHideClassName}>
    <div 
      className="myModal absolute right-52 top-12 flex overflow-x-hidden overflow-y-auto z-50 outline-none focus:outline-none pr-2" 
      onClick={handleClose}
    >
    <div className="generalModal relative w-full mt-6 mx-auto max-w-3xl pr-2">
      {/*content*/}
      <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-yellow-50 outline-none focus:outline-none">
        {/*header*/}
        <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t">
          <h3 className="text-2xl font-semibold text-yellow-700">
            Your Cart
          </h3>
          <button 
            className="p-1 ml-auto bg-transparent border-0 text-black opacity-95 float-right text-3xl leading-none font-semibold outline-none focus:outline-none" 
            onClick={handleClose}
          >
            <span className="text-yellow-800 opacity-95 h-6 w-6 text-2xl block">
              ×
            </span>
          </button>
        </div>
        {/*body*/}
        {productList.map((product) => {
            return (
                <div 
                  className="pb-2 mr-5" 
                  key={product.ISBN13}
                >
                    <img 
                      src={product.MainImage ? `/photos/photoSrc/products/${product.MainImage}` : "https://via.placeholder.com/150x250"} 
                      className="cartImage float-left" 
                      alt="" 
                    />
                    <p className="productDeatils text-2xl text-yellow-700">
                      {product.Title}
                      <br/>
                      <span className="text-black">
                        {formatPrice(product.CurrentPrice)}
                      </span>
                    </p>
                </div>
            )
        })}
        <hr/>
        <div className="totalSum text-2xl">
            <span>
              <span className="font-medium">
                Sum Total: 
              </span> 
              {formatPrice(itemSum)}
            </span>
        </div>
        {/*footer*/}
        <div className="flex items-center justify-end px-5 pt-5 border-t border-solid border-gray-300 rounded-b">        
            <Link to="/shoppingCart">
            <button 
              className="bg-yellow-600 text-yellow-100 uppercase text-lg px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1" 
              type="button" 
              style={{ transition: "all .15s ease" }}
            >
              Go To Shopping Cart
            </button>
          </Link>
        </div>
        <div className="flex items-center justify-end px-5 pb-5 rounded-b">        
            <Link to="/signedInCheckout">
            <button 
              className="bg-yellow-800 text-yellow-100 uppercase text-lg px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1" 
              type="button" 
              style={{ transition: "all .15s ease" }}
            >
              Go To Checkout
            </button>
          </Link>
        </div>
      </div>
    </div>
  </div>
  <div className="opacity-10 fixed inset-0 z-40">
  </div>
  </div >
  );
};

export default CartQuickView;