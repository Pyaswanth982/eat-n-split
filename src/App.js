import { useState } from "react";
import "./index.css";
import data from "./data.js";

function App() {
  return (
    <>
      <Header />
      <Component data={data} />
    </>
  );
}

function Header() {
  return (
    <div className="header">
      <h1>Eat-n-Split Good Morning</h1>
    </div>
  );
}

function Component({ data }) {

  //Part-1
  const [select, setSelect] = useState(false);

  //Part-2
  const [add, setAdd] = useState(false);

  //Part-3
  const [newItem, setNewItem] = useState([]);
  console.log("Selected State List =", newItem);

  //Part-4
  const dataLength = data.length;
  const [items, setItems] = useState(data);
  console.log("Items =", items);
  const itemsLength = items.length;


  function handleSelectButton(newItemList) {
    console.log(newItemList);

    const selectValue = newItemList.selectValue1;
    console.log(selectValue);


    if (selectValue === "Select" || selectValue === "Close") {

      if (select === false) {
        setSelect((select1) => (!select));
      } else {
        setSelect((select1) => (!select))
      }

      const itemList = newItemList.newItem1;
      console.log(itemList);
      setNewItem(() => (itemList));

    } else if (selectValue === "Add Friend" || selectValue === "Quit") {

      if (add === false) {
        setAdd((addButton) => (!add));
      } else {
        setAdd((addButton) => (!add));
      }

    } else if (selectValue === "Add") {

      const newList = { ...newItemList }
      delete newList.selectValue1
      console.log("New List =", newList);
      setItems((items1) => [...items1, newList]);

    } else if (selectValue === "Split Bill") {

      const newList = { ...newItemList }
      delete newList.selectValue1
      console.log("New List =", newList);

      const yourBalance = newList.yourBalance;
      const friendBalance = newList.friendBalance;

      items.map((item) => ({ ...item, yourBalance: yourBalance, friendBalance: friendBalance }));
      setItems(() => (items));

      setSelect(() => (!select));
    }

  }
  console.log("Select Value =", select);

  //Part2

  return (
    <div className="component">
      <div>
        {
          (itemsLength > dataLength) ?
            (
              <Comp1 items={items} select={select} onHandleSelect={handleSelectButton} newItem={newItem} />
            ) :
            (
              <Comp1 items={data} select={select} onHandleSelect={handleSelectButton} newItem={newItem} />
            )
        }
        <Comp2 add={add} onHandleSelect={handleSelectButton} />
        <Comp3 add={add} items={items} onHandleSelect={handleSelectButton} />
      </div>
      <div>
        <Comp4 select={select} newItem={newItem} onHandleSelect={handleSelectButton} />
      </div>
    </div>

  );
}

function Comp1({ items, select, onHandleSelect, newItem }) {
  return (
    <div className="component1">
      <ul className="ulItem">
        {
          items.map((item) => (
            <Item key={item.id} item={item} select={select} onHandleSelect={onHandleSelect} newItem={newItem} />
          ))
        }
      </ul>
    </div>
  );
}

function Item({ item, select, onHandleSelect, newItem }) {

  return (
    <li className="liItem" style={(select === true && item.name === newItem.name) ? { backgroundColor: "rgb(250, 211, 139)", borderRadius: "0.3rem" } : { backgroundColor: "" }}>
      <img src={item.image} alt={item.name} height="65px" width="65px" />
      <p>
        <span style={{ fontSize: "0.85rem" }}>{item.name}</span>
        {(item.yourBalance === 0 && item.friendBalance === 0) && <span style={
          {
            fontSize: "0.77rem",
            fontWeight: "normal"
          }
        }>You and {item.name} are even</span>}
        {(item.yourBalance !== 0 && item.friendBalance === 0) && <span style={
          {
            fontSize: "0.77rem",
            fontWeight: "normal",
            color: "red"
          }
        }>You have to give ₹ {Math.round(item.yourBalance)} to {item.name}</span>}
        {(item.yourBalance === 0 && item.friendBalance !== 0) && <span style={
          {
            fontSize: "0.77rem",
            fontWeight: "normal",
            color: "green"
          }
        }>{item.name} has to give ₹ {Math.round(item.friendBalance)} to you</span>}
      </p>
      {
        (select === true && item.name === newItem.name) ?
          (
            <Button item={item} onHandleSelect={onHandleSelect}>Close</Button>
          ) :
          (
            <Button item={item} onHandleSelect={onHandleSelect}>Select</Button>
          )
      }
    </li>
  )
}

function Comp2({ add, onHandleSelect }) {
  return (
    <div className="component2">
      {
        (add === true) ?
          (
            <Button onHandleSelect={onHandleSelect}>Quit</Button>
          ) :
          (
            <Button onHandleSelect={onHandleSelect}>Add Friend</Button>
          )
      }
    </div>
  );
}

function Comp3({ add, items, onHandleSelect }) {
  return (
    <>
      {add && (
        <Addnewmember items={items} onHandleSelect={onHandleSelect} />
      )}
    </>
  )
}

function Addnewmember({ items, onHandleSelect }) {

  const [name, setName] = useState("");
  function handleName(e) {
    setName((name1) => (e.target.value));
  }

  const [image, setImage] = useState("");
  function handleImage(e) {
    (name === "") ? (alert("Kindly Enter the Name")) : (setImage((image) => (e.target.value)));
  }

  const [urBalance, setUrBalance] = useState(0);
  function handleUrBalance(e) {
    (name === "" && image === "") ? (alert("Kindly Enter the Name & Image Details")) :(setUrBalance(() => (e.target.value)));
  }

  const [friendBalance, setBalanceFriend] = useState(0);
  function handleFrndBalance(e) {
    (name === "" && image === "" && urBalance === 0) ? (alert("Kindly Enter the Name, Image and Your Expense Details")) :(setBalanceFriend(() => (e.target.value)));
  }

  return (
    <>
      <div className="component3">
        <label htmlFor="newName">Enter Name:</label>
        <input type="text" id="newName" value={name} onChange={handleName} />

        <label htmlFor="newImage">Enter Image:</label>
        <input type="text" id="newImage" value={image} onChange={handleImage} />

        <label htmlFor="newUrBalance">Add your Balance:</label>
        <input type="text" id="newUrBalance" value={urBalance} onChange={handleUrBalance} />

        <label htmlFor="newFrndBalance">Add Friend's Balance:</label>
        <input type="text" id="newFrndBalance" value={friendBalance} onChange={handleFrndBalance} />
      </div>
      <div className="comp3">
        <Button name={name} image={image} urBalance={urBalance} friendBalance={friendBalance} items={items} setName = {setName} setImage = {setImage} setUrBalance = {setUrBalance} setBalanceFriend = {setBalanceFriend} onHandleSelect={onHandleSelect}>Add</Button>
      </div>
    </>
  );
}

function Comp4({ select, newItem, onHandleSelect }) {
  return (
    <>
      {select && (
        <Splitbill newItem={newItem} onHandleSelect={onHandleSelect} />
      )}
    </>
  );
}

function Splitbill({ newItem, onHandleSelect }) {

  const [bill, setBill] = useState("");
  function handleBill(e) {
    setBill((bill1) => (e.target.value));
  }

  const [urExpense, setUrExpense] = useState("");
  function handleUrExpense(e) {
    (bill === "") ? (alert("Kindly Enter the Bill")) : (setUrExpense((urExpense1) => (e.target.value)));
  }

  // const friendExpense = bill - urExpense;
  let friendExpense = "";
  if (urExpense !== "") {
    friendExpense = bill - urExpense;
  }

  const [person, setPerson] = useState("you");
  function handlePerson(e) {
    (bill === "") ? (alert("Kindly Enter the Bill & Expenses")) : (setPerson(() => (e.target.value)));
  }

  const newSelectedItem = {
    bill,
    urExpense,
    friendExpense,
    person
  }
  console.log("New Selected Item =", newSelectedItem);



  return (
    <div className="component4">
      <h2>Split the bill with {newItem.name}</h2>

      <div className="billValue">
        <label htmlFor="billValue">💰 Bill Value</label>
        <input type="text" id="billValue" value={bill} onChange={handleBill} />
      </div>

      <div className="myExpense">
        <label htmlFor="myExpense">🧑‍🦰 Your Expense</label>
        <input type="text" id="myExpense" value={urExpense} onChange={handleUrExpense} />
      </div>

      <div className="friendExpense">
        <label htmlFor="friendExpense">🧑‍🤝‍🧑 {newItem.name}'s Expense</label>
        <span>{friendExpense}</span>
      </div>

      <div className="payingBill">
        <label>🤑 Who is paying the bill?</label>
        <select value={person} onChange={handlePerson}>
          <option value={newItem.selectedPayers.payer1}>You</option>
          <option value={newItem.selectedPayers.payer2}>{newItem.name}</option>
        </select>
      </div>

      <Button newSelectedItem={newSelectedItem} newItem={newItem} onHandleSelect={onHandleSelect}>Split Bill</Button>
    </div>
  );
}

function Button({ item, name, image, urBalance, friendBalance, items, onHandleSelect, newItem, newSelectedItem, setName, setImage, setUrBalance, setBalanceFriend, children }) {

  console.log(item);
  function handleSelect() {
    if (children === "Select" || children === "Close") {

      const selectValue1 = children;
      const newItemList = {
        selectValue1: selectValue1,
        newItem1: item
      }
      console.log("Select List =", newItemList);
      onHandleSelect(newItemList);

    } else if (children === "Add Friend" || children === "Quit") {

      const selectValue1 = children;
      const newItemList = {
        selectValue1: selectValue1,
      }
      onHandleSelect(newItemList);

    } else if (children === "Add") {

      const listLength = items.length;
      const id = listLength + 1;

      const selectValue1 = children;

      const newItemList = {
        id: id,
        name: name,
        image: image,
        yourBalance: urBalance,
        friendBalance: friendBalance,
        selectedFriend: {
          id: id,
          select: false
        },
        selectedPayers: {
          payer1: "you",
          payer2: name
        },
        selectValue1: selectValue1
      }
      onHandleSelect(newItemList);
      setName("");
      setImage("");
      setUrBalance(0);
      setBalanceFriend(0);
      
    } else if (children === "Split Bill") {
      console.log("New item =", newItem);
      const yourBalance = newItem.yourBalance;
      const friendBalance = newItem.friendBalance;

      const payer = newSelectedItem.person;
      // const bill = newSelectedItem.bill;
      const yourExpense = newSelectedItem.urExpense;
      const friendExpense = newSelectedItem.friendExpense;

      console.log("Before cal =", newItem);
      if (payer === "you") {

        if (yourBalance === 0 && friendBalance === 0) {

          newItem.yourBalance = 0;
          newItem.friendBalance = friendExpense;

        } else if (yourBalance !== 0 && friendBalance === 0) {

          newItem.yourBalance = 0;
          newItem.friendBalance = Number(friendExpense) - Number(yourBalance);

        } else if (yourBalance === 0 && friendBalance !== 0) {

          newItem.yourBalance = 0;
          newItem.friendBalance = Number(friendExpense) + Number(friendBalance);

        }

      } else {

        if (yourBalance === 0 && friendBalance === 0) {

          newItem.yourBalance = yourExpense;
          newItem.friendBalance = 0;

        } else if (yourBalance !== 0 && friendBalance === 0) {

          newItem.yourBalance = Number(yourExpense) + Number(yourBalance);
          newItem.friendBalance = 0;

        } else if (yourBalance === 0 && friendBalance !== 0) {

          newItem.yourBalance = Number(yourExpense) - Number(friendBalance);
          newItem.friendBalance = 0;

        }

      }
      const selectValue1 = children;
      newItem.selectValue1 = selectValue1;
      console.log("After cal =", newItem);

      onHandleSelect(newItem);
    }
  }

  return (
    <>
      <button onClick={handleSelect}>{children}</button>
    </>
  );
}


export default App;

//Working Directory  --(git add)-->  Staging Area
// Staging Area       --(git commit)--> Local Repository
