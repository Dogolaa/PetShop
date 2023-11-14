import React from "react";
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Home from './Screens/Homer'
import Clientes from './Screens/clientes'

const AppRoutes = () => {

    return(
        <>
            <Router>
                    <Routes>
                        <Route path='/' element = {<Home />}/>
                        <Route path='/Home' element = {<Home />}/>
                        <Route path='/Clientes' element = {<Clientes />}/>
                        <Route path='/Servicos' element = {<Clientes />}/>
                    </Routes>
            </Router>
        </>
    )
}

export default AppRoutes;
