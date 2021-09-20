import React, { useState, useEffect } from "react";
import "./style.css";

// get data from local storage

const Todo = () => {
  const getLocalStorageData = () => {
    const list = localStorage.getItem("mytodoList");
    if (list) {
      return JSON.parse(list);
    } else {
      return [];
    }
  };

  const [inputData, setinputData] = useState("");
  const [myItems, setmyItems] = useState(getLocalStorageData());
  const [isEditItem, setisEditItem] = useState("");
  const [toggleButton, settoggleButton] = useState(false);

  //   adding data
  const addItemsData = () => {
    if (!inputData) {
      alert("No data Available Please Enter Data First Thanks!");
    } else if (inputData && toggleButton) {
      setmyItems(
        myItems.map((curElem) => {
          if (curElem.id === isEditItem) {
            return { ...curElem, name: inputData };
          }
          return curElem;
        })
      );
      setinputData("");
      setisEditItem(null);
      settoggleButton(false);
    } else {
      const mynewInputData = {
        id: new Date().getTime().toString(),
        name: inputData,
      };
      setmyItems([...myItems, mynewInputData]);
      setinputData("");
    }
  };

  //   how to delete item section
  const deleteItem = (id) => {
    const updatedItems = myItems.filter((curElem) => {
      return curElem.id !== id;
    });
    setmyItems(updatedItems);
  };

  //   remove all values
  const removeAll = () => {
    setmyItems([]);
  };

  //   storing data in local storage
  useEffect(() => {
    localStorage.setItem("mytodoList", JSON.stringify(myItems));
  }, [myItems]);

  // edit items
  const editItem = (index) => {
    const item_todo_list = myItems.find((curElem) => {
      return curElem.id === index;
    });
    setinputData(item_todo_list.name);
    setisEditItem(index);
    settoggleButton(true);
  };

  return (
    <>
      <div className="main-div">
        <div className="child-div">
          <figure>
            <img src="./images/todo.svg" alt="todologo" />
            <figcaption>Add Your List Here ✌</figcaption>
          </figure>
          <div className="addItems">
            <input
              type="text"
              placeholder=" ✍️ Add Items "
              className="form-control"
              value={inputData}
              onChange={(event) => setinputData(event.target.value)}
            />
            {toggleButton ? (
              <i className="far fa-edit add-btn" onClick={addItemsData}></i>
            ) : (
              <i className="fa fa-plus add-btn" onClick={addItemsData}></i>
            )}
          </div>
          {/* show our items  */}
          <div className="showItems">
            {myItems.map((curElem) => {
              return (
                <div className="eachItem" key={curElem.id}>
                  <h3>{curElem.name}</h3>
                  <div className="todo-btn">
                    <i
                      className="far fa-edit add-btn"
                      onClick={() => editItem(curElem.id)}
                    ></i>
                    <i
                      className="far fa-trash-alt add-btn"
                      onClick={() => deleteItem(curElem.id)}
                    ></i>
                  </div>
                </div>
              );
            })}
          </div>
          {/* remove all button  */}
          <div className="showItems">
            <button
              className="btn effect04"
              data-sm-link-text="Remove All"
              onClick={removeAll}
            >
              <span>CHECK LIST</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Todo;
