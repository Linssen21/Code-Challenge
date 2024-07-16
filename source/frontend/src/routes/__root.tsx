import { createRootRoute, Link, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import {Container, Navbar} from 'react-bootstrap';

export const Route = createRootRoute({
  component: () => (
    <>
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
            <Navbar.Brand>
                <Link to="/">Crud Example</Link>
            </Navbar.Brand>
            </Container>
        </Navbar>
        <hr />
        <Outlet />
        <TanStackRouterDevtools />
    </>
  ),
})
