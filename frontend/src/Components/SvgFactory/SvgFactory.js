import React from "react";
import NotFoundSvg from "../SvgFactory/NotFoundSvg";
import MindLogo from "../SvgFactory/MindLogo";

const components = {
	mind: MindLogo
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
