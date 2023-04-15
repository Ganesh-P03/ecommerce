import React, { useState } from "react";

const AddItems = () => {
  const [items, setItems] = useState([]);
  const [item, setItem] = useState({
    name: "",
    price: "",
    description: "",
    image: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setItem((prevItem) => {
      return {
        ...prevItem,
        [name]: value,
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setItems((prevItems) => {
      return [...prevItems, item];
    });
    setItem({
      name: "",
      price: "",
      description: "",
      image: "",
    });
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <h1>Add Items</h1>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                onChange={handleChange}
                value={item.name}
                name="name"
                type="text"
                className="form-control"
                id="name"
                placeholder="Enter name"
              />
            </div>
            <div className="form-group">
              <label htmlFor="price">Price</label>
              <input
                onChange={handleChange}
                value={item.price}
                name="price"
                type="text"
                className="form-control"
                id="price"
                placeholder="Enter price"
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <input
                onChange={handleChange}
                value={item.description}
                name="description"
                type="text"
                className="form-control"
                id="description"
                placeholder="Enter description"
              />
            </div>
            <div className="form-group">
              <label htmlFor="image">Image</label>
              <input
                onChange={handleChange}
                value={item.image}
                name="image"
                type="text"
                className="form-control"
                id="image"
                placeholder="Enter image"
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddItems;
