import { Navbar, Nav } from 'rsuite';


 const navbar = () => (
  <Navbar>
    <Navbar.Brand  href="#"> 
    <img src="https://media.licdn.com/dms/image/C560BAQEP48KeRuB3VA/company-logo_200_200/0/1674571067007/nushop_logo?e=2147483647&v=beta&t=QK31JtNF6CfhRNtfxAhb5Y5O9xiot97dWd8ppYY2a1g" alt="Img" width={35} />
    </Navbar.Brand>
    <Nav>
     <h1 style={{color:"black"}}>Welcome Admin</h1>
    </Nav>
    <Nav pullRight>
    </Nav>
  </Navbar>
);
export default navbar;