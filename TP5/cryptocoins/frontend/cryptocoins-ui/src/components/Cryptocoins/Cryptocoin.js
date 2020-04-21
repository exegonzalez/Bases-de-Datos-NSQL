import React from 'react';

// Bootstrap
import {
    Card,
    Badge,
    Button,
} from 'react-bootstrap'

import axios from 'axios'
import {cryptocoinsURLBase} from '../utils/constants'

export default function Cryptocoin(props) {
    const handleRemoveCryptocoin = async coinToRemove => await axios.delete(`${cryptocoinsURLBase}/cryptocoins/${coinToRemove}`)
    
    return (
        <div>
        { 
            props.cryptocoin
            ? 
                <Card
                    className="mt-2 mb-2 mr-2 ml-2"
                    bg={'Light'}
                    text={'Dark'}
                    style={{ width: '18rem' }}
                    key={props.cryptocoin.data.id}
                >
                    <Card.Header className="text-center">{ props.cryptocoin.data.name }</Card.Header>
                    <Card.Body>
                        <ul className="list-group list-group-flush text-dark">
                            <h5 className="card-title text-center">Cryptocoin Data</h5>
                            <li className="list-group-item">
                                <div className="row">
                                    <div className="col-sm"><h6 className="font-weight-normal text-center">id</h6></div>
                                    <div className="col-sm"><Badge variant="success" className="font-weight-bold text-center">{`${props.cryptocoin.data.id}`}</Badge></div>
                                </div>
                            </li>
                            <li className="list-group-item">
                                <div className="row">
                                    <div className="col-sm"><h6 className="font-weight-normal text-center">symbol</h6></div>
                                    <div className="col-sm"><Badge variant="success" className="font-weight-bold text-center">{`${props.cryptocoin.data.symbol}`}</Badge></div>
                                </div>
                            </li>
                            <li className="list-group-item">
                                <div className="row">
                                    <div className="col-sm"><h6 className="font-weight-normal text-center">slug</h6></div>
                                    <div className="col-sm"><Badge variant="success" className="font-weight-bold text-center">{`${props.cryptocoin.data.slug}`}</Badge></div>
                                </div>
                            </li>
                            <li className="list-group-item">
                                <div className="row">
                                    <div className="col-sm"><h6 className="font-weight-normal text-center">num_market_pairs</h6></div>
                                    <div className="col-sm"><Badge variant="success" className="font-weight-bold text-center">{`${props.cryptocoin.data.num_market_pairs}`}</Badge></div>
                                </div>
                            </li>
                            <li className="list-group-item">
                                <div className="row">
                                    <div className="col-sm"><h6 className="font-weight-normal text-center">date_added</h6></div>
                                    <div className="col-sm"><Badge variant="success" className="font-weight-bold text-center">{props.cryptocoin.data.date_added}</Badge></div>
                                </div>
                            </li>
                            <li className="list-group-item">
                                <div className="row">
                                    <div className="col-sm"><h6 className="font-weight-normal text-center">tags</h6></div>
                                    { 
                                        props.cryptocoin.data.tags.map((t, i) => 
                                            <div key={i} className="col-sm"><Badge variant="success" className="font-weight-bold text-center">{`${props.cryptocoin.data.tags}`}</Badge></div>
                                        ) 
                                    }
                                </div>
                            </li>
                            <li className="list-group-item">
                                <div className="row">
                                    <div className="col-sm"><h6 className="font-weight-normal text-center">max_supply</h6></div>
                                    <div className="col-sm"><Badge variant="success" className="font-weight-bold text-center">{`${props.cryptocoin.data.max_supply}`}</Badge></div>
                                </div>
                            </li>
                            <li className="list-group-item">
                                <div className="row">
                                    <div className="col-sm"><h6 className="font-weight-normal text-center">circulating_supply</h6></div>
                                    <div className="col-sm"><Badge variant="success" className="font-weight-bold text-center">{`${props.cryptocoin.data.circulating_supply}`}</Badge></div>
                                </div>
                            </li>
                            <li className="list-group-item">
                                <div className="row">
                                    <div className="col-sm"><h6 className="font-weight-normal text-center">total_supply</h6></div>
                                    <div className="col-sm"><Badge variant="success" className="font-weight-bold text-center">{`${props.cryptocoin.data.total_supply}`}</Badge></div>
                                </div>
                            </li>
                            <li className="list-group-item">
                                <div className="row">
                                    <div className="col-sm"><h6 className="font-weight-normal text-center">platform</h6></div>
                                    <div className="col-sm"><Badge variant="success" className="font-weight-bold text-center">{`${props.cryptocoin.data.platform}`}</Badge></div>
                                </div>
                            </li>
                            <li className="list-group-item">
                                <div className="row">
                                    <div className="col-sm"><h6 className="font-weight-normal text-center">cmc_rank</h6></div>
                                    <div className="col-sm"><Badge variant="success" className="font-weight-bold text-center">{`${props.cryptocoin.data.cmc_rank}`}</Badge></div>
                                </div>
                            </li>
                            <li className="list-group-item">
                                <div className="row">
                                    <div className="col-sm"><h6 className="font-weight-normal text-center">last_updated</h6></div>
                                    <div className="col-sm"><Badge variant="success" className="font-weight-bold text-center">{`${props.cryptocoin.data.last_updated}`}</Badge></div>
                                </div>
                            </li>
                        </ul>
                        <ul className="list-group list-group-flush text-dark">
                            <h5 className="card-title text-center">Cryptocoin Quote</h5>
                            <li className="list-group-item">
                                <div className="row">
                                    <div className="col-sm"><h6 className="font-weight-normal text-center">price</h6></div>
                                    <div className="col-sm"><Badge variant="success" className="font-weight-bold text-center">{`${props.cryptocoin.data.quote.USD.price}`}</Badge></div>
                                </div>
                            </li>
                            <li className="list-group-item">
                                <div className="row">
                                    <div className="col-sm"><h6 className="font-weight-normal text-center">volume_24h</h6></div>
                                    <div className="col-sm"><Badge variant="success" className="font-weight-bold text-center">{`${props.cryptocoin.data.quote.USD.volume_24h}`}</Badge></div>
                                </div>
                            </li>
                            <li className="list-group-item">
                                <div className="row">
                                    <div className="col-sm"><h6 className="font-weight-normal text-center">percent_change_1h</h6></div>
                                    <div className="col-sm"><Badge variant="success" className="font-weight-bold text-center">{`${props.cryptocoin.data.quote.USD.percent_change_1h}`}</Badge></div>
                                </div>
                            </li>
                            <li className="list-group-item">
                                <div className="row">
                                    <div className="col-sm"><h6 className="font-weight-normal text-center">percent_change_24h</h6></div>
                                    <div className="col-sm"><Badge variant="success" className="font-weight-bold text-center">{`${props.cryptocoin.data.quote.USD.percent_change_24h}`}</Badge></div>
                                </div>
                            </li>
                            <li className="list-group-item">
                                <div className="row">
                                    <div className="col-sm"><h6 className="font-weight-normal text-center">percent_change_7d</h6></div>
                                    <div className="col-sm"><Badge variant="success" className="font-weight-bold text-center">{`${props.cryptocoin.data.quote.USD.percent_change_7d}`}</Badge></div>
                                </div>
                            </li>
                            <li className="list-group-item">
                                <div className="row">
                                    <div className="col-sm"><h6 className="font-weight-normal text-center">market_cap</h6></div>
                                    <div className="col-sm"><Badge variant="success" className="font-weight-bold text-center">{`${props.cryptocoin.data.quote.USD.market_cap}`}</Badge></div>
                                </div>
                            </li>
                            <li className="list-group-item">
                                <div className="row">
                                    <div className="col-sm"><h6 className="font-weight-normal text-center">volume_24h</h6></div>
                                    <div className="col-sm"><Badge variant="success" className="font-weight-bold text-center">{props.cryptocoin.data.quote.USD.volume_24h}</Badge></div>
                                </div>
                            </li>
                        </ul>
                    </Card.Body>
                    <Card.Footer>
                        <Button 
                            className="Borrar"
                            variant="danger" 
                            size="sm" 
                            block 
                            onClick={
                                () => handleRemoveCryptocoin(props.cryptocoin.data.cmc_rank)
                                    .then(() => props.handleUpdateCryptocoins(true))
                                }
                        >
                            Borrar
                        </Button>
                    </Card.Footer>

                </Card>
            : ''
        }
        </div>
    )
}
