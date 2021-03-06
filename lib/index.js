"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var React = _interopRequireWildcard(require("react"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (typeof call === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var noop = function noop() {};

var _id = 0;

var generateId = function generateId() {
  return "simplemde-editor-".concat(++_id);
};

var SimpleMDEEditor =
/*#__PURE__*/
function (_React$PureComponent) {
  _inherits(SimpleMDEEditor, _React$PureComponent);

  function SimpleMDEEditor(props) {
    var _this;

    _classCallCheck(this, SimpleMDEEditor);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(SimpleMDEEditor).call(this, props));
    _this.state = {
      keyChange: false,
      value: _this.props.value || ""
    };
    _this.id = _this.props.id ? _this.props.id : generateId();
    _this.simpleMde = null;
    _this.editorEl = null;
    _this.editorToolbarEl = null;

    _this.createEditor = function () {
      var SimpleMDE = require("easymde");

      var initialOptions = {
        element: document.getElementById(_this.id),
        initialValue: _this.props.value,
        label: _this.props.label
      };
      var allOptions = Object.assign({}, initialOptions, _this.props.options);
      _this.simpleMde = new SimpleMDE(allOptions);
    };

    _this.eventWrapper = function () {
      _this.setState({
        keyChange: true,
        value: _this.simpleMde.value()
      });

      _this.props.onChange(_this.simpleMde.value());
    };

    _this.removeEvents = function () {
      if (_this.editorEl && _this.editorToolbarEl) {
        _this.editorEl.removeEventListener("keyup", _this.eventWrapper);

        _this.editorEl.removeEventListener("paste", _this.eventWrapper);

        _this.editorToolbarEl.removeEventListener("click", _this.eventWrapper);
      }
    };

    _this.addEvents = function () {
      if (_this.elementWrapperRef && _this.simpleMde) {
        _this.editorEl = _this.elementWrapperRef;
        _this.editorToolbarEl = _this.elementWrapperRef.getElementsByClassName("editor-toolbar")[0];

        _this.editorEl.addEventListener("keyup", _this.eventWrapper);

        _this.editorEl.addEventListener("paste", _this.eventWrapper);

        _this.editorToolbarEl && _this.editorToolbarEl.addEventListener("click", _this.eventWrapper);

        _this.simpleMde.codemirror.on("cursorActivity", _this.getCursor);

        var _events = _this.props.events; // Handle custom events

        _events && Object.entries(_events).forEach(function (_ref) {
          var _ref2 = _slicedToArray(_ref, 2),
              eventName = _ref2[0],
              callback = _ref2[1];

          if (eventName && callback) {
            _this.simpleMde && _this.simpleMde.codemirror.on(eventName, callback);
          }
        });
      }
    };

    _this.getCursor = function () {
      // https://codemirror.net/doc/manual.html#api_selection
      if (_this.props.getLineAndCursor) {
        _this.props.getLineAndCursor(_this.simpleMde.codemirror.getDoc().getCursor());
      }
    };

    _this.getMdeInstance = function () {
      if (_this.props.getMdeInstance) {
        _this.props.getMdeInstance(_this.simpleMde);
      }
    };

    _this.addExtraKeys = function () {
      // https://codemirror.net/doc/manual.html#option_extraKeys
      if (_this.props.extraKeys) {
        _this.simpleMde.codemirror.setOption("extraKeys", _this.props.extraKeys);
      }
    };

    _this.elementWrapperRef = null;

    _this.setElementWrapperRef = function (element) {
      _this.elementWrapperRef = element;
    };

    return _this;
  }

  _createClass(SimpleMDEEditor, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      if (typeof window !== undefined) {
        this.createEditor();
        this.addEvents();
        this.addExtraKeys();
        this.getCursor();
        this.getMdeInstance();
      }
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      if (!this.state.keyChange && this.props.value !== this.state.value && // This is somehow fixes moving cursor for controlled case
      this.props.value !== prevProps.value // This one fixes no value change for uncontrolled input. If it's uncontrolled prevProps will be the same
      ) {
          this.simpleMde.value(this.props.value || "");
        }

      this.setState({
        keyChange: false
      });
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      if (this.editorEl !== null && this.editorEl !== undefined) {
        this.removeEvents();
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          events = _this$props.events,
          value = _this$props.value,
          options = _this$props.options,
          children = _this$props.children,
          extraKeys = _this$props.extraKeys,
          getLineAndCursor = _this$props.getLineAndCursor,
          getMdeInstance = _this$props.getMdeInstance,
          label = _this$props.label,
          onChange = _this$props.onChange,
          id = _this$props.id,
          rest = _objectWithoutProperties(_this$props, ["events", "value", "options", "children", "extraKeys", "getLineAndCursor", "getMdeInstance", "label", "onChange", "id"]);

      return React.createElement("div", Object.assign({
        id: "".concat(this.id, "-wrapper")
      }, rest, {
        ref: this.setElementWrapperRef
      }), React.createElement("textarea", {
        id: this.id
      }));
    }
  }]);

  return SimpleMDEEditor;
}(React.PureComponent);

exports.default = SimpleMDEEditor;
SimpleMDEEditor.defaultProps = {
  events: {},
  onChange: noop,
  options: {}
};
//# sourceMappingURL=index.js.map