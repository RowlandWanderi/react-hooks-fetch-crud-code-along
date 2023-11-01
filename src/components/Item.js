import React from "react";

function Item({ item , onUpdateItem, onDeleteItem}) {

  function handleDeleteClick() {
    fetch(`http://localhost:3000/items/${item.id}`, {
      method: "DELETE",
    })
      .then((r) => r.json())
      .then(() => onDeleteItem(item));
  }

  function handleAddToCartClick() {
    console.log("clicked item:", item)

    fetch(`http://localhost:3000/items/${item.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        //patch to be the opposite of the value of isInCart from our server
        isInCart: !item.isInCart,
      }),
    })
      .then((r) => r.json())
      .then((updatedItem) => onUpdateItem(updatedItem));

  }
  return (
    <li className={item.isInCart ? "in-cart" : ""}>
      <span>{item.name}</span>
      <span className="category">{item.category}</span>
      <button onClick={handleAddToCartClick} className={item.isInCart ? "remove" : "add"}>
        {item.isInCart ? "Remove From" : "Add to"} Cart
      </button>
      <button type="button" onClick={handleDeleteClick} className="remove">Delete</button>
    </li>
  );
}

export default Item;
