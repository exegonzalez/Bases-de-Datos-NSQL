import React from 'react';

//************************************* Material-UI Components ****************************************
import Button from '@material-ui/core/Button';
import HomeIcon from '@material-ui/icons/Home';

//************************************* Styles ****************************************
import '../NotFound/css/style.css'


export default function index() {

    return (
        <div>
            <body>
                <section id="not-found">
                    <div id="title">
                    <Button size="large" variant="text" href="/home" color="inherit" startIcon={<HomeIcon />}>
                        Volver al inicio
                    </Button>
                    </div>
                    <div class="circles">
                        <p>404<br></br>
                            <small>PAGE NOT FOUND</small>
                        </p>
                        <span class="circle big"></span>
                        <span class="circle med"></span>
                        <span class="circle small"></span>
                    </div>
                </section>
            </body>
        </div>
    )
}