import React from 'react';

class Amount extends React.Component {


    renderCurrency = () => {
        switch (this.props.title) {
            case "USD":
                return '$';
                break;
            case 'EUR':
                return "€";
                break;
            case 'RUB':
                return '₽';
                break;
            default:
                break
        }
    }

    render() {
        return (
            <div className={this.props.amClassName}>
                <input
                    id={'amount'}
                    value={this.props.inpValue}
                    onChange={this.props.onInpChange}
                    placeholder={this.renderCurrency()}
                    disabled={this.props.amClassName === 'to-inp' ? 'disabled' : ''}
                    autoFocus={'autoFocus'}
                />
            </div>
        )
    }

}

export default Amount;