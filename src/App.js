import React, { useSate, useEffect } from 'react';
import { Container, Row, Col } from 'reactstrap';
import Modal from './components/Modal';
import Table from '/components/Table';
import { CSVLink } from 'react-csv';

function App() {
  const [items, setItems] = useSate([]);

  useEffect(() => {
    const getItems = async () => {
      try {
        const response = await fetch('http://localhost:3000/crud');
        const json = await response.json();
        setItems(json);
      } catch (error) {
        console.log(error);
      }
    };
    getItems();
  }, []);

  const addItemToState = (item) => {
    setItems((prevState) => [...prevState.items, item]);
  };

  const updateState = (item) => {
    const itemIndex = items.findIndex((data) => data.id === item.id);
    const newArray = [
      // destructure all items from beginning to the indexed item
      ...items.slice(0, itemIndex),
      // add the updated item to the array
      item,
      // add the rest of the items to the array from the index after the replaced item
      ...items.slice(itemIndex + 1)
    ];
    setItems(newArray);
  };

  const deleteItemFromState = (id) => {
    const updatedItems = items.filter((item) => item.id !== id);
    setItems(updatedItems);
  };

  return (
    <Container className="App">
      <Row>
        <Col>
          <h1 style={{ margin: '20px 0' }}>CRUD Database</h1>
        </Col>
      </Row>
      <Row>
        <Col>
          <Table
            items={items}
            updateState={updateState}
            deleteItemFromState={deleteItemFromState}
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <CSVLink
            filename={'db.csv'}
            color="primary"
            style={{ float: 'left', marginRight: '10px' }}
            className="btn btn-primary"
            data={items}
          >
            Download CSV
          </CSVLink>
          <Modal buttonLabel="Add Item" addItemToState={addItemToState} />
        </Col>
      </Row>
    </Container>
  );
}

export default App;
