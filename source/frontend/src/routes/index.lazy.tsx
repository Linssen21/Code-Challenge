import { createLazyFileRoute } from '@tanstack/react-router';
import {Container, Table} from 'react-bootstrap';

export const Route = createLazyFileRoute('/')({
  component: Index
})

function Index() {
  return (
    <Container className='mt-5'>
      <h3>Customer Table</h3>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Id</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Contact Number</th>
          </tr>
        </thead>
      </Table>
    </Container>
  )
}