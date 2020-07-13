import React from "react";

export default class StartButton extends React.Component {

    handleStart = () => {
        this.props.handleStart();
    }
    render() {
        return (
            <div>
                <div className="numero" onClick={this.handleStart}>Start the Game</div>
            </div>
        )
    }
} 