import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Stepper, { Step, StepLabel } from 'material-ui/Stepper';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';


function getSteps() {
    return ['Pick up a ball', 'Adjust position', 'Select angle', 'Select power'];
}

function getStepContent(step) {
    switch (step) {
        case 0:
            return 'Select campaign settings...';
        case 1:
            return 'What is an ad group anyways?';
        case 2:
            return 'This is the bit I really care about!';
        default:
            return 'Unknown step';
    }
}

export default class HorizontalLinearStepper extends React.Component {
    static propTypes = {
        classes: PropTypes.object,
    };

    state = {
        activeStep: 0,
        skipped: new Set(),
    };

    componentDidMount() {
        this.props.onRef(this)
    }
    componentWillUnmount() {
        this.props.onRef(undefined)
    }

    actionFromAbove = step => {
        this.setState({
            activeStep: step,
        });
    }

    isStepOptional = step => {
        return (step === 2 || step === 3);
        return;
    };

    isStepPosition = step => {
        return (step === 1);
        return;
    };

    isStepSkipped(step) {
        return this.state.skipped.has(step);
    }

    handleNext = () => {
        const { activeStep } = this.state;
        let { skipped } = this.state;
        if (this.isStepSkipped(activeStep)) {
            skipped = new Set(skipped.values());
            skipped.delete(activeStep);
        }
        this.setState({
            activeStep: activeStep + 1,
            skipped,
        });
    };

    handleBack = () => {
        const { activeStep } = this.state;
        this.setState({
            activeStep: activeStep - 1,
        });
    };

    handleSkip = () => {
        const { activeStep } = this.state;
        if (!this.isStepOptional(activeStep)) {
            // You probably want to guard against something like this,
            // it should never occur unless someone's actively trying to break something.
            throw new Error("You can't skip a step that isn't optional.");
        }
        const skipped = new Set(this.state.skipped.values());
        skipped.add(activeStep);
        this.setState({
            activeStep: this.state.activeStep + 1,
            skipped,
        });
    };

    handleReset = () => {
        this.setState({
            activeStep: 0,
        });
    };

    render() {
        const { classes } = this.props;
        const steps = getSteps();
        const { activeStep } = this.state;

        return (
            <div>
                <Stepper activeStep={activeStep} orientation="vertical">
                    {steps.map((label, index) => {
                        const props = {};
                        const labelProps = {};
                        if (this.isStepPosition(index)) {
                            labelProps.optional = <Typography variant="caption">arrow keys</Typography>;
                        }
                        if (this.isStepOptional(index)) {
                            labelProps.optional = <Typography variant="caption">spacebar</Typography>;
                        }
                        if (this.isStepSkipped(index)) {
                            props.completed = false;
                        }
                        return (
                            <Step key={label} {...props} style={{color:'white'}}>
                                <StepLabel {...labelProps} className="stepLabel">{label}</StepLabel>
                            </Step>
                        );
                    })}
                </Stepper>

            </div>
        );
    }
}

