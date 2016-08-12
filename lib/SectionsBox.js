'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

var SectionsBox = _react2['default'].createClass({
    displayName: 'SectionsBox',

    propTypes: {
        speed: _react2['default'].PropTypes.number
    },
    getDefaultProps: function getDefaultProps() {
        return {
            speed: this.props && this.props.speed > 500 ? this.props.speed : 500
        };
    },
    getInitialState: function getInitialState() {
        return {
            width: window.innerWidth,
            height: window.innerHeight,
            length: 0,
            current: 1,
            postionY: 0,
            isMouseWhell: false,
            prevSection: 1
        };
    },
    _onResize: function _onResize() {
        this.setState({
            height: window.innerHeight
        });
    },
    _onMouseWheel: function _onMouseWheel(ev) {
        var _this = this;

        this._removeMouseWheelEvent();
        var e = window.event || ev;
        var delta = Math.max(-1, Math.min(1, e.wheelDelta || -e.detail));

        this._getSectionIndex(delta);

        setTimeout(function () {
            _this._addMouseWheelEvent();
            _this.setState({
                isMouseWhell: false,
                postionY: 0
            });
        }, this.props.speed);
    },
    _getSectionIndex: function _getSectionIndex(delta) {
        var prev = this.state.current;
        var _postionY = undefined;
        if (delta > 0) {
            _postionY = this.state.height;
        } else {
            _postionY = 0 - this.state.height;
        }
        var sectionIndex = undefined;
        if (this.state.current + delta <= 1) {
            sectionIndex = 1;
        } else if (this.state.current + delta >= this.state.length) {
            sectionIndex = this.state.length;
        } else {
            sectionIndex = this.state.current + delta;
        }

        if (this.state.current == 1 && delta < 0) {
            this.setState({
                current: sectionIndex,
                prevSection: prev
            });
        } else if (this.state.current == this.state.length && delta > 0) {
            this.setState({
                current: sectionIndex,
                prevSection: prev
            });
        } else {
            this.setState({
                isMouseWhell: true,
                current: sectionIndex,
                prevSection: prev,
                postionY: _postionY
            });
        }
    },
    _addMouseWheelEvent: function _addMouseWheelEvent() {
        window.addEventListener('mousewheel', this._onMouseWheel, false);
        window.addEventListener('DOMMouseScroll', this._onMouseWheel, false);
    },
    _removeMouseWheelEvent: function _removeMouseWheelEvent() {
        window.removeEventListener('mousewheel', this._onMouseWheel);
        window.removeEventListener('DOMMouseScroll', this._onMouseWheel);
    },
    componentDidMount: function componentDidMount() {
        window.addEventListener('resize', this._onResize);
        this.setState({
            current: 1,
            length: _react2['default'].Children.count(this.props.children)
        });
        this._addMouseWheelEvent();
    },
    componentWillUnmount: function componentWillUnmount() {
        window.removeEventListener('resize', this._onResize);
    },
    _addChildrenElement: function _addChildrenElement() {
        return _react2['default'].Children.map(this.props.children, (function (child, i) {
            return _react2['default'].cloneElement(child, {
                id: i + 1,
                current: this.state.current,
                prev: this.state.prevSection,
                slide: this.state.isMouseWhell,
                postionY: this.state.postionY,
                speed: this.props.speed
            });
        }).bind(this));
    },
    render: function render() {
        return _react2['default'].createElement(
            'div',
            { ref: 'fullpage', className: 'fullpage-warpper', style: { height: this.state.height } },
            this._addChildrenElement()
        );
    }
});

exports['default'] = SectionsBox;
module.exports = exports['default'];