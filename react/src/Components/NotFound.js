import React from 'react';
import { Link } from 'react-router-dom';


const NotFound = () => (
<div>
<img src="http://developer.hondumall.net/static/files/404page.jpg" className="notfound" />
<center>Tuvimos un error al mostrarte la pagina, no te preocupes y </center>
<center><Link to="/"><strong>Volvamos al inicio</strong></Link></center>
</div>
);

export default NotFound;