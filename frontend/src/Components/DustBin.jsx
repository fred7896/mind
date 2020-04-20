import React from "react";
import { DropTarget } from "react-dnd";
import SvgFactory from "../Components/SvgFactory/SvgFactory";


const style = { width: "60%", maxWidth: "300px" };
const Dustbin = ({ canDrop, isOver, connectDropTarget, ...props }) => {
    const isActive = canDrop && isOver;
	return (
		<div ref={connectDropTarget} style={{ ...style }} className="container-circle mx-2">
			<SvgFactory iconname="circle" />
			{isActive || props.lastValue.length !== 0 ? (
				<div className="numero count-main">{props.lastValue}</div>
			) : (
				<div className="numero">
					<img src={require("../runner_start.svg")} width="100%" />
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
