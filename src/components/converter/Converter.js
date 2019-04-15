import React from 'react';
import Modal from 'react-modal';
import ViceVersaBtn from './parts/ViceVersaBtn';
import CurrencyContainer from './CurrencyContainer'
import './Converter.scss'


const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        height: '70vh',
        width: '70vw'
    }
};

Modal.setAppElement('#root');


class Converter extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            request: {
                amount: '',
                currencyInp: 'USD',
                currencyOut: 'RUB'
            },
            response: 0,
        }
    };

    convert = (from, to, amount) => {
        let res;
        if (from === to) {
            res = amount
        }
        else if (from === 'USD') {
            res = this.props.rates[from + to] * amount;
        }
        else if (to === 'USD') {
            res = Math.pow(this.props.rates[to + from], -1) * amount
        }
        else {
            res = this.props.rates['USD' + to] / this.props.rates['USD' + from] * amount;
        }
        return res;
    };

    afterOpenModal = () => {

    };

    closeModal = () => {
        this.props.close();
    };

    handleViceVersa = () => {
        this.setState((state) => {
            return {
                request: {
                    currencyInp: state.request.currencyOut,
                    currencyOut: state.request.currencyInp,
                    amount: state.request.amount
                },
                response: this.convert(state.request.currencyOut, state.request.currencyInp, state.request.amount)
            }
        })
    };

    handleRequestCurrencySelect = (e) => {
        e.persist();
        this.setState((state) => {
            return {
                request: {
                    amount: state.request.amount,
                    currencyInp: e.target.value,
                    currencyOut: state.request.currencyOut
                },
                response: this.convert(e.target.value, state.request.currencyOut, state.request.amount)
            }


        })
    };

    handleResponseCurrencySelect = (e) => {
        e.persist();
        this.setState((state) => {
            return {
                request: {
                    amount: state.request.amount,
                    currencyInp: state.request.currencyInp,
                    currencyOut: e.target.value
                },
                response: this.convert(state.request.currencyInp, e.target.value, state.request.amount)


            }


        })

    };


    handleAmountInput = (e) => { //todo handle conditions
        e.persist();
        let number = e.target.value;

        let amount = isNaN(number) ? this.state.request.amount : number;
        this.setState((state) => {
            return {
                request: {
                    amount: amount,
                    currencyInp: state.request.currencyInp,
                    currencyOut: state.request.currencyOut
                },
                response: this.convert(state.request.currencyInp, state.request.currencyOut, amount),
            }
        })
    };


    handleSubmit = (e) => {
        e.preventDefault();
        this.setState({
            response: this.convert(this.state.request.currencyInp, this.state.request.currencyOut, this.state.request.amount)
        })
    };


    render() {
        return (

            <Modal
                isOpen={this.props.modalIsOpen}
                onAfterOpen={this.afterOpenModal}
                onRequestClose={this.closeModal}
                style={customStyles}
                contentLabel="Currency converter"
            >

                <div className='converter container'>
                    <div className={'header'}>
                        <div className={'top-header'}>
                            <i className={'close icon'} onClick={this.closeModal}/>
                            <p>*Exchange rates are estimated according to permenanrly updating rates provided by The
                                European Central Bank</p>
                        </div>
                        <div id={'headings'}>
                            <h1>Accurate</h1>
                            <h2>Converter</h2>
                        </div>
                        <p>
                            {`1 ${this.state.request.currencyInp}:${this.convert(this.state.request.currencyInp, this.state.request.currencyOut, 1)} ${this.state.request.currencyOut}`}
                        </p>
                    </div>
                    <form onSubmit={this.handleSubmit}>

                        <div className={'content'}>
                            <CurrencyContainer
                                header={'From'}
                                curValue={this.state.request.currencyInp}
                                onCurChange={this.handleRequestCurrencySelect}
                                curClassName={'from-sel'}
                                title={this.state.request.currencyInp}
                                inpValue={this.state.request.amount}
                                onInpChange={this.handleAmountInput}
                                amClassName={'from-inp'}
                                containerName={'from'}
                            />
                            <ViceVersaBtn onClick={this.handleViceVersa} className={'vv-btn'}/>
                            <CurrencyContainer
                                header={'To'}
                                curValue={this.state.request.currencyOut}
                                onCurChange={this.handleResponseCurrencySelect}
                                curClassName={'to-sel'}
                                title={this.state.request.currencyOut}
                                inpValue={this.state.response === 0 ? '' : this.state.response}
                                onInpChange={(e) => {
                                    this.setState({response: e.target.value})
                                }}
                                amClassName={'to-inp'}
                                containerName={'to'}
                            />

                        </div>
                    </form>

                </div>

            </Modal>

        )
    }
}

export default Converter;