Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = undefined;

var _createClass = function() {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
        }
    }
    return function(Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);
        if (staticProps) defineProperties(Constructor, staticProps);
        return Constructor;
    };
}();

var _wepy = require("./../npm/wepy/lib/wepy.js");

var _wepy2 = _interopRequireDefault(_wepy);

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

function _possibleConstructorReturn(self, call) {
    if (!self) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }
    return call && (typeof call === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }
    subClass.prototype = Object.create(superClass && superClass.prototype, {
        constructor: {
            value: subClass,
            enumerable: false,
            writable: true,
            configurable: true
        }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

function hexToRgb(hex) {
    var color = [];
    var rgb = [];
    hex = hex.replace(/#/, "");
    if (hex.length === 3) {
        var tmp = [];
        for (var i = 0; i < 3; i++) {
            tmp.push(hex.charAt(i) + hex.charAt(i));
        }
        hex = tmp.join("");
    }
    for (var _i = 0; _i < 3; _i++) {
        color[_i] = "0x" + hex.substr(_i * 2, 2);
        rgb.push(parseInt(Number(color[_i])));
    }
    return rgb.join(",");
}

var AlMask = function(_wepy$component) {
    _inherits(AlMask, _wepy$component);
    function AlMask() {
        var _ref;
        var _temp, _this, _ret;
        _classCallCheck(this, AlMask);
        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }
        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = AlMask.__proto__ || Object.getPrototypeOf(AlMask)).call.apply(_ref, [ this ].concat(args))), 
        _this), _this.props = {
            status: {
                type: String,
                default: "hide"
            },
            opacity: {
                type: [ String, Number ],
                default: .6
            },
            backgroundColor: {
                type: String,
                default: "#000000"
            },
            locked: {
                type: [ String ],
                default: "hide"
            },
            contentAlign: {
                type: String,
                default: "tl"
            }
        }, _this.data = {
            __positionStyle: {
                type: String,
                default: "top:0; left:0"
            }
        }, _this.computed = {
            zIndex: function zIndex() {
                if (this.status === "show") {
                    var app = this.$root.$parent;
                    if (!app.globalData) {
                        Object.assign(app, {
                            globalData: {}
                        });
                    }
                    var globalData = app.globalData;
                    var zIndex = globalData._zIndex || 1e3;
                    globalData._zIndex = zIndex;
                    return zIndex;
                } else {
                    return 0;
                }
            }
        }, _this.methods = {
            toggle: function toggle(mode) {
                var status = this.status;
                if (typeof mode !== "boolean") {
                    mode = status !== "show";
                }
                if (mode) {
                    this.status = "show";
                } else {
                    this.status = "hide";
                }
            },
            maskTap: function maskTap(event) {
                if (this.locked && this.locked !== "true") {
                    this.status = "hide";
                }
                return false;
            },
            longTap: function longTap() {
                return true;
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }
    _createClass(AlMask, [ {
        key: "onLoad",
        value: function onLoad() {
            this.backgroundColor = hexToRgb(this.backgroundColor);
            var contentAlignStyle = void 0;
            switch (this.contentAlign) {
              case "tl":
                {
                    contentAlignStyle = "top:0; left:0";
                    break;
                }

              case "tr":
                {
                    contentAlignStyle = "top:0; right:0";
                    break;
                }

              case "bl":
                {
                    contentAlignStyle = "bottom:0; left:0";
                    break;
                }

              case "br":
                {
                    contentAlignStyle = "bottom:0; right:0";
                    break;
                }

              case "cc":
                {
                    contentAlignStyle = "top: 50%; left: 50%; transform: translate(-50%, -50%);";
                    break;
                }
            }
            this.__positionStyle = contentAlignStyle;
        }
    } ]);
    return AlMask;
}(_wepy2.default.component);

exports.default = AlMask;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRpYWxvZy1tYXNrLmpzIl0sIm5hbWVzIjpbImhleFRvUmdiIiwiaGV4IiwiY29sb3IiLCJyZ2IiLCJyZXBsYWNlIiwibGVuZ3RoIiwidG1wIiwiaSIsInB1c2giLCJjaGFyQXQiLCJqb2luIiwic3Vic3RyIiwicGFyc2VJbnQiLCJOdW1iZXIiLCJBbE1hc2siLCJwcm9wcyIsInN0YXR1cyIsInR5cGUiLCJTdHJpbmciLCJkZWZhdWx0Iiwib3BhY2l0eSIsImJhY2tncm91bmRDb2xvciIsImxvY2tlZCIsImNvbnRlbnRBbGlnbiIsImRhdGEiLCJfX3Bvc2l0aW9uU3R5bGUiLCJjb21wdXRlZCIsInpJbmRleCIsImFwcCIsIiRyb290IiwiJHBhcmVudCIsImdsb2JhbERhdGEiLCJPYmplY3QiLCJhc3NpZ24iLCJfekluZGV4IiwibWV0aG9kcyIsInRvZ2dsZSIsIm1vZGUiLCJtYXNrVGFwIiwiZXZlbnQiLCJsb25nVGFwIiwiY29udGVudEFsaWduU3R5bGUiLCJ3ZXB5IiwiY29tcG9uZW50Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUF5QkE7Ozs7Ozs7Ozs7OztBQXZCQSxTQUFTQSxRQUFULENBQWtCQyxHQUFsQixFQUF1QjtBQUNyQixNQUFJQyxRQUFRLEVBQVo7QUFDQSxNQUFJQyxNQUFNLEVBQVY7O0FBRUFGLFFBQU1BLElBQUlHLE9BQUosQ0FBWSxHQUFaLEVBQWlCLEVBQWpCLENBQU47O0FBRUEsTUFBSUgsSUFBSUksTUFBSixLQUFlLENBQW5CLEVBQXNCO0FBQ3BCLFFBQUlDLE1BQU0sRUFBVjs7QUFFQSxTQUFLLElBQUlDLElBQUksQ0FBYixFQUFnQkEsSUFBSSxDQUFwQixFQUF1QkEsR0FBdkIsRUFBNEI7QUFDMUJELFVBQUlFLElBQUosQ0FBU1AsSUFBSVEsTUFBSixDQUFXRixDQUFYLElBQWdCTixJQUFJUSxNQUFKLENBQVdGLENBQVgsQ0FBekI7QUFDRDs7QUFFRE4sVUFBTUssSUFBSUksSUFBSixDQUFTLEVBQVQsQ0FBTjtBQUNEOztBQUVE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RDtBQXhCSDtBQTBCQSxXQUFLaEIsZUFBTCxHQUF1QmdCLGlCQUF2QjtBQUNEOzs7O0VBdEdpQ0MsZUFBS0MsUzs7a0JBQXBCN0IsTSIsImZpbGUiOiJkaWFsb2ctbWFzay5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuXG5mdW5jdGlvbiBoZXhUb1JnYihoZXgpIHtcbiAgbGV0IGNvbG9yID0gW107XG4gIGxldCByZ2IgPSBbXTtcblxuICBoZXggPSBoZXgucmVwbGFjZSgvIy8sICcnKTtcblxuICBpZiAoaGV4Lmxlbmd0aCA9PT0gMykge1xuICAgIGxldCB0bXAgPSBbXTtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMzsgaSsrKSB7XG4gICAgICB0bXAucHVzaChoZXguY2hhckF0KGkpICsgaGV4LmNoYXJBdChpKSk7XG4gICAgfVxuXG4gICAgaGV4ID0gdG1wLmpvaW4oJycpO1xuICB9XG5cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCAzOyBpKyspIHtcbiAgICBjb2xvcltpXSA9ICcweCcgKyBoZXguc3Vic3RyKGkgKiAyLCAyKTtcbiAgICByZ2IucHVzaChwYXJzZUludChOdW1iZXIoY29sb3JbaV0pKSk7XG4gIH1cblxuICByZXR1cm4gcmdiLmpvaW4oJywnKTtcbn1cbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknO1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQWxNYXNrIGV4dGVuZHMgd2VweS5jb21wb25lbnQge1xuICBwcm9wcyA9IHtcbiAgICBzdGF0dXM6IHtcbiAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgIGRlZmF1bHQ6ICdoaWRlJ1xuICAgIH0sXG4gICAgb3BhY2l0eToge1xuICAgICAgdHlwZTogW1N0cmluZywgTnVtYmVyXSxcbiAgICAgIGRlZmF1bHQ6IDAuNlxuICAgIH0sXG4gICAgYmFja2dyb3VuZENvbG9yOiB7XG4gICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICBkZWZhdWx0OiAnIzAwMDAwMCdcbiAgICB9LFxuICAgIGxvY2tlZDoge1xuICAgICAgdHlwZTogW1N0cmluZ10sXG4gICAgICBkZWZhdWx0OiAnaGlkZSdcbiAgICB9LFxuICAgIGNvbnRlbnRBbGlnbjoge1xuICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgZGVmYXVsdDogJ3RsJ1xuICAgIH1cblxuICB9XG5cbiAgZGF0YSA9IHtcbiAgICBfX3Bvc2l0aW9uU3R5bGU6IHtcbiAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgIGRlZmF1bHQ6ICd0b3A6MDsgbGVmdDowJ1xuICAgIH1cbiAgfVxuXG4gIGNvbXB1dGVkID0ge1xuICAgIHpJbmRleCgpIHtcbiAgICAgIGlmICh0aGlzLnN0YXR1cyA9PT0gJ3Nob3cnKSB7XG4gICAgICAgIGxldCBhcHAgPSB0aGlzLiRyb290LiRwYXJlbnQ7XG4gICAgICAgIGlmICghYXBwLmdsb2JhbERhdGEpIHtcbiAgICAgICAgICBPYmplY3QuYXNzaWduKGFwcCwgeyBnbG9iYWxEYXRhOiB7fSB9KTtcbiAgICAgICAgfVxuICAgICAgICBsZXQgZ2xvYmFsRGF0YSA9IGFwcC5nbG9iYWxEYXRhO1xuICAgICAgICBsZXQgekluZGV4ID0gKGdsb2JhbERhdGEuX3pJbmRleCB8fCAxMDAwKTtcbiAgICAgICAgZ2xvYmFsRGF0YS5fekluZGV4ID0gekluZGV4O1xuICAgICAgICByZXR1cm4gekluZGV4O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIDA7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIG1ldGhvZHMgPSB7XG4gICAgdG9nZ2xlKG1vZGUpIHtcbiAgICAgIGxldCBzdGF0dXMgPSB0aGlzLnN0YXR1cztcbiAgICAgIGlmICh0eXBlb2YgbW9kZSAhPT0gJ2Jvb2xlYW4nKSB7XG4gICAgICAgIG1vZGUgPSBzdGF0dXMgIT09ICdzaG93JztcbiAgICAgIH1cbiAgICAgIGlmIChtb2RlKSB7XG4gICAgICAgIHRoaXMuc3RhdHVzID0gJ3Nob3cnO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5zdGF0dXMgPSAnaGlkZSc7XG4gICAgICB9XG4gICAgfSxcbiAgICBtYXNrVGFwOiBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgIGlmICh0aGlzLmxvY2tlZCAmJiB0aGlzLmxvY2tlZCAhPT0gJ3RydWUnKSB7XG4gICAgICAgIHRoaXMuc3RhdHVzID0gJ2hpZGUnO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0sXG4gICAgbG9uZ1RhcDogZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICB9XG5cbiAgb25Mb2FkKCkge1xuICAgIHRoaXMuYmFja2dyb3VuZENvbG9yID0gaGV4VG9SZ2IodGhpcy5iYWNrZ3JvdW5kQ29sb3IpO1xuICAgIGxldCBjb250ZW50QWxpZ25TdHlsZTtcblxuICAgIHN3aXRjaCAodGhpcy5jb250ZW50QWxpZ24pIHtcbiAgICAgIGNhc2UgJ3RsJzoge1xuICAgICAgICBjb250ZW50QWxpZ25TdHlsZSA9ICd0b3A6MDsgbGVmdDowJztcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG5cbiAgICAgIGNhc2UgJ3RyJzoge1xuICAgICAgICBjb250ZW50QWxpZ25TdHlsZSA9ICd0b3A6MDsgcmlnaHQ6MCc7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuXG4gICAgICBjYXNlICdibCc6IHtcbiAgICAgICAgY29udGVudEFsaWduU3R5bGUgPSAnYm90dG9tOjA7IGxlZnQ6MCc7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuXG4gICAgICBjYXNlICdicic6IHtcbiAgICAgICAgY29udGVudEFsaWduU3R5bGUgPSAnYm90dG9tOjA7IHJpZ2h0OjAnO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cblxuICAgICAgY2FzZSAnY2MnOiB7XG4gICAgICAgIGNvbnRlbnRBbGlnblN0eWxlID0gJ3RvcDogNTAlOyBsZWZ0OiA1MCU7IHRyYW5zZm9ybTogdHJhbnNsYXRlKC01MCUsIC01MCUpOyc7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLl9fcG9zaXRpb25TdHlsZSA9IGNvbnRlbnRBbGlnblN0eWxlO1xuICB9XG59XG4iXX0=