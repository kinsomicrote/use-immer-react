import React from "react";
import {useImmerReducer } from "use-immer";

const initialState = {
  additionalPrice: 0,
  car: {
    price: 26395,
    name: "2019 Ford Mustang",
    image: "https://cdn.motor1.com/images/mgl/0AN2V/s1/2019-ford-mustang-bullitt.jpg",
    features: []
  },
  store: [
    { id: 1, name: "V-6 engine", price: 1500 },
    { id: 2, name: "Racing detail package", price: 1500 },
    { id: 3, name: "Premium sound system", price: 500 },
    { id: 4, name: "Rear spoiler", price: 250 }
  ]
};

const reducer = (state, action) => {
  switch (action.type) {
    case "REMOVE_ITEM":
      return {
        ...state,
        additionalPrice: state.additionalPrice - action.item.price,
        car: { ...state.car, features: state.car.features.filter((x) => x.id !== action.item.id)},
        store: [...state.store, action.item]
      };
    case "BUY_ITEM":
      return {
        ...state,
        additionalPrice: state.additionalPrice + action.item.price,
        car: { ...state.car, features: [...state.car.features, action.item] },
        store: state.store.filter((x) => x.id !== action.item.id)
      }
    default:
      return state;
  }
}

const Car = () => {
  const [state, dispatch] = useImmerReducer(reducer, initialState);
  
  const removeFeature = (item) => {
    dispatch({ type: 'REMOVE_ITEM', item });
  }
  
  const buyItem = (item) => {
    dispatch({ type: 'BUY_ITEM', item })
  }
  
  return (
    <div>
      <div className="box">
        <figure className="image is-128x128">
          <img src={state.car.image} />
        </figure>
        <h2>{state.car.name}</h2>
        <p>Amount: ${state.car.price}</p>
        <div className="content">
          <h6>Extra items you bought:</h6>
          {state.car.features.length ? 
            (
              <ol type="1">
                {state.car.features.map((item) => (
                  <li key={item.id}>
                    {item.name}
                    <button
                      onClick={() => removeFeature(item)}
                      className="button">X
                    </button>
                  </li>
                ))}
              </ol>
            ) : <p>You can purchase items from the store.</p>
          }
        </div>
      </div>
      <div className="box">
        <div className="content">
          <h4>Store:</h4>
          {state.store.length ? 
            (
            <ol type="1">
              {state.store.map((item) => (
                <li key={item.id}>
                  <p>{item.name}</p>
                  <button
                    onClick={() => buyItem(item)}
                    className="button">Buy</button>
                </li>
              ))}
            </ol>
            ) : <p>No features</p>
          }
        </div>

        <div className="content">
        <h4>
          Total Amount: ${state.car.price + state.additionalPrice}
        </h4>
      </div>
      </div>
    </div>
  );
}

export default Car;