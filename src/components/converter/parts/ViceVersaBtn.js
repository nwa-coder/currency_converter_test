import React from 'react';


class ViceVersaBtn extends React.Component{
    render(){
        return(
                <i className={'big arrows alternate horizontal icon '+this.props.className}
                   onClick={this.props.onClick}
                   />
        )
    }

}

export default ViceVersaBtn;