import { Nav,  NavDropdown } from 'react-bootstrap';
import React from 'react'

const NavReferent = () => {
    return (
        <div>
            <Nav defaultActiveKey="/home" className="flex-column vert navVert d-none d-xl-block nav" style={{ height: '100vh', padding:'10vh 0 0 2%' }}>
                {/* <img fluid src={logo} alt="logo missions locales" style={{ width: "8vw", minWidth: "70px" }} /> */}
                <Nav.Link href="/espace-personnel">Tableau de bord</Nav.Link>
                <NavDropdown.Divider />
                <Nav.Link href="/profil-beneficiaire">Profil</Nav.Link>
                <NavDropdown.Divider />
                <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                    <NavDropdown.Item href="/beneficiaire-logement" className='d-flex justify-content-between align-items-center'>Thomas
                    </NavDropdown.Item>
                    <NavDropdown.Item href="/beneficiaire-mobilite" className='d-flex justify-content-between align-items-center'>Annick
                    </NavDropdown.Item>
                    <NavDropdown.Item href="/beneficiaire-formation-emploi" className='d-flex justify-content-between align-items-center'>Alexandre
                    </NavDropdown.Item>
                    <NavDropdown.Item href="/beneficiaire-finance" className='d-flex justify-content-between align-items-center'>Ludovic
                    </NavDropdown.Item>
                    <NavDropdown.Item href="/beneficiaire-citoyennete" className='d-flex justify-content-between align-items-center'>Baptiste
                    </NavDropdown.Item>
                    <NavDropdown.Item href="/beneficiaire-sante" className='d-flex justify-content-between align-items-center'>Noa
                    </NavDropdown.Item>
                    <NavDropdown.Item href="/beneficiaire-sante" className='d-flex justify-content-between align-items-center'>Ilian
                    </NavDropdown.Item>
                    <NavDropdown.Item href="/beneficiaire-sante" className='d-flex justify-content-between align-items-center'>Marianne
                    </NavDropdown.Item>
                    <NavDropdown.Item href="/beneficiaire-sante" className='d-flex justify-content-between align-items-center'>Elodie
                    </NavDropdown.Item>
                    <NavDropdown.Item href="/beneficiaire-sante" className='d-flex justify-content-between align-items-center'>Sebastien
                    </NavDropdown.Item>
                    <NavDropdown.Item href="/beneficiaire-sante" className='d-flex justify-content-between align-items-center'>Sylvain
                    </NavDropdown.Item>
                    

                </NavDropdown>
                {/* <Nav.Link eventKey="link-2">Link</Nav.Link>
  <Nav.Link eventKey="disabled" disabled>
    Disabled
  </Nav.Link> */}
            </Nav> 
        </div>
    )
}

export default NavReferent
