import React from 'react';
import Converter from './converter/Converter'
import cl from '../api/curLayer'


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modalIsOpen: false,
            rates: {
                USDEUR: 0.8,
                USDRUB: 63
            }
        }
    }

    componentDidMount() {
        this.currencyRateRequest();
        setInterval(() =>
                this.currencyRateRequest()
            , 15000)
    }

    currencyRateRequest = () => {
        cl.get('live', {
            params: {
                access_key: 'a2f4e5049591577ca646111a721eb91b',
                source: 'USD'
            }
        }).then(response =>
                this.setState({
                    rates: {
                        USDEUR: response.data.quotes['USDEUR'],
                        USDRUB: response.data.quotes['USDRUB']
                    }
                }), reject => {
                console.log(reject);
                alert('Unsuccessful exchange rate synchronization. Check your Internet connection. ' +
                    'USD exchange rates are presumed to be\nUSD-EUR:0.8\nUSD-RUB:63'.toUpperCase());
                setTimeout(() => {
                }, 40000);
            }
        )
    }


    handleClose = () => {
        this.setState({
            modalIsOpen: false
        })
    };

    render() {
        return (
            <div>
                <i onClick={() => {

                    this.setState({modalIsOpen: true});
                }}
                className='massive money bill alternate outline icon'

                >
                </i>
                <Converter modalIsOpen={this.state.modalIsOpen}
                           close={this.handleClose}
                           rates={this.state.rates}
                />
            </div>
        )
    }
}

export default App;