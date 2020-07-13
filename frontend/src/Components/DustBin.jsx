import React from "react";
import { DropTarget } from "react-dnd";
import SvgFactory from "../Components/SvgFactory/SvgFactory";
import StartButton from "./StartButton";


const style = { width: "60%", maxWidth: "300px" };
const Dustbin = ({ canDrop, isOver, connectDropTarget, ...props }) => {
	const isActive = canDrop && isOver;
	//console.log(props.lastValue);
	return (
		<div ref={connectDropTarget} style={{ ...style }} className="container-circle mx-2">
			<SvgFactory iconname="circle" />
			{props.turn === 0 && props.gameStatus <=1 ? <StartButton handleStart={props.handleStart} /> : 
			isActive || props.lastValue.length !== 0 ? (
				<div className="numero count-main">{props.lastValue[0] && props.lastValue[0].value}</div>
			) : (
				<div className="numero">
					<img src={require("../runner_start.svg")} width="100%" alt="runner" />
				</div>
            )}
		</div>
	);
};
export default DropTarget(
	"card",
	{
		drop: () => ({ name: "Dustbin" })
	},
	(connect, monitor) => ({
		connectDropTarget: connect.dropTarget(),
		isOver: monitor.isOver(),
		canDrop: monitor.canDrop()
	})
)(Dustbin);
