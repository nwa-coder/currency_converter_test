import React from 'react';
import '../options.scss';

class CurSel extends React.Component {
    render() {
        return (
            <div className={this.props.curClassName}>
                <label
                    style={{marginRight: '2vw'}}
                >{this.props.header}</label>
                <select value={this.props.curValue}
                        onChange={this.props.onCurChange}
                        className={'select-css'}>
                    <option value={'USD'}>USD</option>
                    <option value={'EUR'}>EUR</option>
                    <option value={'RUB'}>RUB</option>
                </select>
            </div>
        )
    }
}

export default CurSel;