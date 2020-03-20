import React from "react";

/*
class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hasError: false
        };
    }

    static getDerivedStateFromError(error) {
        return {
            hasError: true
        };
    }

    render() {
        if (this.state.hasError) {
            return (
                <div>
                    <h1>Smth went wrong </h1>
                </div>
            )
        }
        return this.props.children;
    }
}
*/

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hasError: false
        };
    }
    componentDidCatch(error) {
        this.setState({
            hasError: true
        });
    }
    render() {
        if(this.state.hasError) {
            return <h1>Smth went wrong</h1>;
        }
        return this.props.children;
    }
}

export default ErrorBoundary;