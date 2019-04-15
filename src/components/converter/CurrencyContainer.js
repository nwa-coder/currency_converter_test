import React from 'react';
import CurSel from './parts/CurSel'
import Amount from './parts/Amount'

class CurrencyContainer extends React.Component{
    render(){
        return(
            <div className={this.props.containerName}>
                <CurSel
                    header={this.props.header}
                    curClassName={this.props.curClassName}
                    curValue={this.props.curValue}
                    onCurChange={this.props.onCurChange}
                />
                <Amount
                    title={this.props.title}
                    inpValue={this.props.inpValue}
                    onInpChange={this.props.onInpChange}
                    amClassName={this.props.amClassName}

                />
            </div>
        )
    }
}

export default CurrencyContainer;