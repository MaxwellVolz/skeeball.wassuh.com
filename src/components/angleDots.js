import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import MobileStepper from 'material-ui/MobileStepper';
import Button from 'material-ui/Button';
// import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
// import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';

let myInterval = 0;

export default class DotsMobileStepper extends React.Component {

    constructor(props) {
        super(props)
    }
    state = {
        activeStep: 0,
    };

    componentDidMount() {
        myInterval = setInterval(this.tick, 200);
        document.addEventListener("keydown", this.keyPress, false);

        this.props.onRef(this)
    }
    componentWillUnmount() {
        clearInterval(myInterval);
        document.removeEventListener("keydown", this.keyPress, false);

        this.props.onRef(undefined)
    }

    keyPress = (event) => {
        console.log(this.state.activeStep);
        if(event.key === ' ') this.props.angleFromDots(Number(this.state.activeStep));
    
    }

    tick = () => {
        if (this.state.activeStep < 6) {

            this.setState({
                activeStep: this.state.activeStep + 1
            });
        }
        else {
            this.setState({
                activeStep: 0
            });
        }
    };

    handleNext = () => {
        this.setState({
            activeStep: this.state.activeStep + 1,
        });
    };

    handleBack = () => {
        this.setState({
            activeStep: this.state.activeStep - 1,
        });
    };

    render() {
        const { classes, theme } = this.props;

        return (
            <MobileStepper
                variant="dots"
                steps={7}
                position="static"
                activeStep={this.state.activeStep}

            />
        );
    }
}
