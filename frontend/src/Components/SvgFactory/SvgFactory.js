import React from "react";
import NotFoundSvg from "./NotFoundSvg";
import MindLogo from "./MindLogo";
import Shuriken from "./Shuriken";
import Life from "./Life";
import Deck from "./Deck";
import Circle from "./Circle";
import Card from "./Card";

const components = {
	mind: MindLogo,
	shuriken: Shuriken,
	life: Life,
	deck: Deck,
	circle: Circle,
	card: Card
};

export default class SvgFactory extends React.Component {
	render() {
		const SpecificSvg = components[this.props.iconname];
		return components && components.hasOwnProperty(this.props.iconname) ? (
			<SpecificSvg {...this.props} />
		) : (
			<NotFoundSvg {...this.props} />
		);
	}
}
