import React from "react";
import { DragSource } from "react-dnd";
import "../Containers/Game.scss";
import SvgFactory from "../Components/SvgFactory/SvgFactory";

const Card = props => {
	const style = { width: "90px" };
	const opacity = props.isDragging ? 0.4 : 1;
	console.log(props.cardValue);
	return (
		<div
			ref={props.connectDragSource}
			key={props.key}
			style={{ ...style, opacity }}
			className="container-card mx-1"
		>
			<SvgFactory iconname="card" />

			<div className="numero count-last">{props.cardValue}</div>
		</div>
	);
};
export default DragSource(
	"card",
	{
		beginDrag: props => {
			return { name: props.cardValue, id : props.idCardState };
        },
        endDrag(props, monitor) {
            const item = monitor.getItem()
            const dropResult = monitor.getDropResult()
            if (dropResult) {
				props.fromHandToBin(item.id);
            }
          },
	},
	(connect, monitor) => ({
		connectDragSource: connect.dragSource(),
		isDragging: monitor.isDragging()
	})
)(Card);
