import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';


function App() {

  var tables = [
      {
        key: 'table1',
        name: 'Table 1'
      },
      {
        key: 'table2',
        name: 'Table 2'
      },
      {
        key: 'table3',
        name: 'Table 3'
      },
      {
        key: 'table4',
        name: 'Table 4'
      },
      {
        key: 'table5',
        name: 'Table 5'
      },
      {
        key: 'table6',
        name: 'Table 6'
      }
    ]
  var table_image_url = 'https://images.demandware.net/dw/image/v2/BBBV_PRD/on/demandware.static/-/Sites-master-catalog/default/dw04b3c19c/images/600000/606028.jpg?sw=2000'
  return (
    <div className="App">

      {/* Title */}
      <div className="container align-top text-center">
        <h1>Restaurant management app</h1>
      </div>


      {/* Content */}
      <Container className="container d-flex justify-content-evenly">
        <Row className='d-flex justify-content-evenly'>
      {tables.map((table, i) =>{
        return(
          <Card style={{ width: '24rem' }} className="col-md-4">
          <Card.Img variant="top" src={table_image_url} />
          <Card.Body>
            <Card.Title>{table.name}</Card.Title>
            <Card.Text>
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </Card.Text>  
              <Button variant="primary">Go to {table.name}</Button>
            </Card.Body>
          </Card>
        )
      })}
        </Row>
      </Container>
    </div>
  );
}

export default App;
