import React from 'react'
import $ from 'jquery'

let SectionsBox = React.createClass({
    propTypes: {
        speed: React.PropTypes.number
    },
    getDefaultProps() {
        return {
            speed: this.props && this.props.speed > 500 ? this.props.speed : 500
        }
    },
    getInitialState() {
        return {
            width: window.innerWidth,
            height: window.innerHeight,
            length: 0,
            current: 1,
            postionY: 0,
            isMouseWhell: false,
            prevSection: 1
        }
    },
    _onResize() {
        this.setState({
            height: window.innerHeight
        });
    },
    _onMouseWheel(ev) {
        this._removeMouseWheelEvent();
        const e = window.event || ev;
        const delta = Math.max(-1, Math.min(1, e.wheelDelta || -e.detail));        

        this._getSectionIndex(delta);
        
        
        setTimeout (() => {
            this._addMouseWheelEvent();
            this.setState({
                isMouseWhell: false,
                postionY: 0
            });
        }, this.props.speed);        
    },
    _getSectionIndex(delta) {
        let prev = this.state.current;
        let _postionY ;
        if (delta > 0) {
            _postionY = this.state.height;
        } else {
            _postionY = 0 - this.state.height;
        }
        let sectionIndex;
        if (this.state.current + delta <= 1) {
            sectionIndex = 1;
        } else if (this.state.current + delta >= this.state.length) {
            sectionIndex = this.state.length;
        } else {
            sectionIndex = this.state.current + delta;            
        } 

        if (this.state.current == 1 && delta < 0) {
            this.setState({
                current : sectionIndex,
                prevSection: prev
            });
        } else if (this.state.current == this.state.length && delta > 0){
            this.setState({
                current : sectionIndex,
                prevSection: prev
            });
        } else {
            this.setState({
                isMouseWhell: true,
                current : sectionIndex,
                prevSection: prev,
                postionY: _postionY
            });
        }
    },
    _addMouseWheelEvent() {
        window.addEventListener('mousewheel', this._onMouseWheel, false);
        window.addEventListener('DOMMouseScroll', this._onMouseWheel, false);
    },
    _removeMouseWheelEvent() {
        window.removeEventListener('mousewheel', this._onMouseWheel);
        window.removeEventListener('DOMMouseScroll', this._onMouseWheel);
    },
    componentDidMount() {
        window.addEventListener('resize', this._onResize);        
        this.setState({
            current: 1,
            length: React.Children.count(this.props.children)
        });
        this._addMouseWheelEvent();
    },
    componentWillUnmount() {
        window.removeEventListener('resize', this._onResize);
    },
    _addChildrenElement() {        
        return React.Children.map(this.props.children, function(child, i) {
            return React.cloneElement(child, {
                id: i + 1,
                current: this.state.current,
                prev: this.state.prevSection,
                slide: this.state.isMouseWhell,
                postionY: this.state.postionY,
                speed: this.props.speed
            });                
        }.bind(this));
    },
    render() {        
        return ( 
            <div ref = "fullpage" className = "fullpage-warpper" style = {{ height: this.state.height } } >
                {this._addChildrenElement()} 
            </div>
        )
    }
});

export default SectionsBox
 

