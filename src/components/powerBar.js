import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import MobileStepper from 'material-ui/MobileStepper';
import Button from 'material-ui/Button';
// import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
// import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';

// const styles = {
//   root: {
//     
//   },
// };
let myInterval = 0,
    hidePower = true;

export default class ProgressMobileStepper extends React.Component {
    constructor(props) {
        super(props)

		// this.powerKeyPress = this.powerKeyPress.bind(this);
		// this.showPower = this.showPower.bind(this);

    }
    state = {
        activeStep: 0,
    };
    tick = () => {
        if (this.state.activeStep < 22) {

            this.setState({
                activeStep: this.state.activeStep + 1
            });
        }
        else {
            this.setState({
                activeStep: -7
            });
        }
    };

    componentDidMount() {
        myInterval = setInterval(this.tick, 100);
        document.addEventListener("keydown", this.powerKeyPress, false);

        this.props.onRef(this)
    }
    componentWillUnmount() {
        clearInterval(myInterval);
        document.removeEventListener("keydown", this.powerKeyPress, false);
        
        this.props.onRef(undefined)
    }
    showPower = () => {
        this.setState({
            activeStep: 0
        });
    }
    powerKeyPress = (event) => {

        if(event.key === ' ') this.props.powerFromBar(this.state.activeStep);
    
    }



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
                variant="progress"
                steps={20}
                position="static"
                activeStep={this.state.activeStep}
                id="powerBarContainer"
                style={{
                    // 'maxWidth': 400,
                    // 'flexGrow': 1,
                    width: '100%'
                }}
            // className={classes.root}
            // nextButton={
            //   <Button size="small" onClick={this.handleNext} disabled={this.state.activeStep === 5}>
            //     Next
            //     {/* {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />} */}
            //   </Button>
            // }
            // backButton={
            //   <Button size="small" onClick={this.handleBack} disabled={this.state.activeStep === 0}>
            //     {/* {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />} */}
            //     Back
            //   </Button>
            // }
            />
        );
    }
}
