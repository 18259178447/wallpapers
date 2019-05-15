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

var Countdown = function(_wepy$component) {
    _inherits(Countdown, _wepy$component);
    function Countdown() {
        var _ref;
        var _temp, _this, _ret;
        _classCallCheck(this, Countdown);
        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }
        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Countdown.__proto__ || Object.getPrototypeOf(Countdown)).call.apply(_ref, [ this ].concat(args))), 
        _this), _this.props = {
            // process: {
            //   type: Number,
            //   default: 0
            // },
            total: {
                type: Number,
                default: 100
            },
            type: {
                type: String,
                default: "per"
            }
        }, _this.data = {
            canvasContext: null,
            process: 0
        }, _this.components = {}, _this.methods = {
            setProcess: function setProcess(value) {
                this.process = value;
                console.log(this.process);
                this.$apply();
            }
        }, _this.events = {}, _this.watch = {}, _this.computed = {}, _this.watch = {
            process: function process(newValue, oldValue) {
                console.log(newValue, oldValue);
                if (newValue > oldValue) {
                    this.draw();
                }
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }
    _createClass(Countdown, [ {
        key: "onLoad",
        value: function onLoad() {}
    }, {
        key: "draw",
        value: function draw() {
            if (!this.canvasContext) {
                this.canvasContext = wx.createCanvasContext("countdown");
            }
            var radio = Math.floor(300 / 375 * .7 * 100) / 100;
            var r = 180 - radio * 190;
            this.canvasContext.clearRect(0, 0, 300, 300);
            this.drawCircle(this.canvasContext, 300, 300, r);
            this.drawProgress(this.canvasContext, r, this.process / this.total * Math.PI * 2, 300, 300);
            // this.drawText(this.canvasContext);
                        this.canvasContext.draw();
        }
    }, {
        key: "drawCircle",
        value: function drawCircle(context, width, height, r) {
            context.strokeStyle = "#fff5cb";
            context.lineWidth = 10;
            context.beginPath();
            context.arc(width / 2, height / 2, r, 0, 2 * Math.PI);
            context.stroke();
        }
    }, {
        key: "drawProgress",
        value: function drawProgress(context, r, angle, width, height) {
            // console.log(angle);
            var gr = context.createLinearGradient(width / 2, width / 2, 180, width / 2);
            // 添加颜色端点
                        gr.addColorStop(0, "#FFE500");
            gr.addColorStop(1, "#FFCB00");
            context.strokeStyle = gr;
            // context.strokeStyle = "#FFCB00";
                        context.lineWidth = 10;
            context.beginPath();
            var eAngle = angle - .5 * Math.PI;
            context.arc(width / 2, height / 2, r, -Math.PI / 2, eAngle);
            context.stroke();
        }
    } ]);
    return Countdown;
}(_wepy2.default.component);

exports.default = Countdown;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvdW50ZG93bi5qcyJdLCJuYW1lcyI6WyJDb3VudGRvd24iLCJwcm9wcyIsInRvdGFsIiwidHlwZSIsIk51bWJlciIsImRlZmF1bHQiLCJTdHJpbmciLCJkYXRhIiwiY2FudmFzQ29udGV4dCIsInByb2Nlc3MiLCJjb21wb25lbnRzIiwibWV0aG9kcyIsInNldFByb2Nlc3MiLCJ2YWx1ZSIsImNvbnNvbGUiLCJsb2ciLCIkYXBwbHkiLCJldmVudHMiLCJ3YXRjaCIsImNvbXB1dGVkIiwibmV3VmFsdWUiLCJvbGRWYWx1ZSIsImRyYXciLCJ3eCIsImNyZWF0ZUNhbnZhc0NvbnRleHQiLCJyYWRpbyIsIk1hdGgiLCJmbG9vciIsInIiLCJjbGVhclJlY3QiLCJkcmF3Q2lyY2xlIiwiZHJhd1Byb2dyZXNzIiwiUEkiLCJjb250ZXh0Iiwid2lkdGgiLCJoZWlnaHQiLCJzdHJva2VTdHlsZSIsImxpbmVXaWR0aCIsImJlZ2luUGF0aCIsImFyYyIsInN0cm9rZSIsImFuZ2xlIiwiZ3IiLCJjcmVhdGVMaW5lYXJHcmFkaWVudCIsImFkZENvbG9yU3RvcCIsImVBbmdsZSIsIndlcHkiLCJjb21wb25lbnQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFDcUJBLFM7Ozs7Ozs7Ozs7Ozs7OzRMQUNuQkMsSyxHQUFRO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQUMsYUFBTztBQUNMQyxjQUFNQyxNQUREO0FBRUxDLGlCQUFTO0FBRkosT0FMRDtBQVNORixZQUFNO0FBQ0pBLGNBQU1HLE1BREY7QUFFSkQsaUJBQVM7QUFGTDtBQVRBLEssUUFlUkUsSSxHQUFPO0FBQ0xDLHFCQUFlLElBRFY7QUFFTEMsZUFBUztBQUZKLEssUUFLUEMsVSxHQUFhLEUsUUFFYkMsTyxHQUFVO0FBQ1JDLGdCQURRLHNCQUNHQyxLQURILEVBQ1U7QUFDaEIsYUFBS0osT0FBTCxHQUFlSSxLQUFmO0FBQ0FDLGdCQUFRQyxHQUFSLENBQVksS0FBS04sT0FBakI7QUFDQSxhQUFLTyxNQUFMO0FBQ0Q7QUFMTyxLLFFBUVZDLE0sR0FBUyxFLFFBRVRDLEssR0FBUSxFLFFBRVJDLFEsR0FBVyxFLFFBMkNYRCxLLEdBQVE7QUFDTlQsYUFETSxtQkFDRVcsUUFERixFQUNZQyxRQURaLEVBQ3NCO0FBQzFCUCxnQkFBUUMsR0FBUixDQUFZSyxRQUFaLEVBQXNCQyxRQUF0QjtBQUNBLFlBQUlELFdBQVdDLFFBQWYsRUFBeUI7QUFDdkIsZUFBS0MsSUFBTDtBQUNEO0FBQ0Y7QUFOSyxLOzs7Ozs2QkF2Q0MsQ0FBRzs7OzJCQUVMO0FBQ0wsVUFBSSxDQUFDLEtBQUtkLGFBQVYsRUFBeUI7QUFDdkIsYUFBS0EsYUFBTCxHQUFxQmUsR0FBR0MsbUJBQUgsQ0FBdUIsV0FBdkIsQ0FBckI7QUFDRDtBQUNELFVBQU1DLFFBQVFDLEtBQUtDLEtBQUwsQ0FBVyxNQUFNLEdBQU4sR0FBWSxHQUFaLEdBQWtCLEdBQTdCLElBQW9DLEdBQWxEO0FBQ0EsVUFBTUMsSUFBSSxNQUFNSCxRQUFRLEdBQXhCO0FBQ0EsV0FBS2pCLGFBQUwsQ0FBbUJxQixTQUFuQixDQUE2QixDQUE3QixFQUFnQyxDQUFoQyxFQUFtQyxHQUFuQyxFQUF3QyxHQUF4QztBQUNBLFdBQUtDLFVBQUwsQ0FBZ0IsS0FBS3RCLGFBQXJCLEVBQW9DLEdBQXBDLEVBQXlDLEdBQXpDLEVBQThDb0IsQ0FBOUM7QUFDQSxXQUFLRyxZQUFMLENBQWtCLEtBQUt2QixhQUF2QixFQUFzQ29CLENBQXRDLEVBQTBDLEtBQUtuQixPQUFMLEdBQWUsS0FBS1AsS0FBckIsR0FBOEJ3QixLQUFLTSxFQUFuQyxHQUF3QyxDQUFqRixFQUFvRixHQUFwRixFQUF5RixHQUF6RjtBQUNBO0FBQ0EsV0FBS3hCLGFBQUwsQ0FBbUJjLElBQW5CO0FBQ0Q7OzsrQkFFVVcsTyxFQUFTQyxLLEVBQU9DLE0sRUFBUVAsQyxFQUFHO0FBQ3BDSyxjQUFRRyxXQUFSLEdBQXNCLFNBQXRCO0FBQ0FILGNBQVFJLFNBQVIsR0FBb0IsRUFBcEI7QUFDQUosY0FBUUssU0FBUjtBQUNBTCxjQUFRTSxHQUFSLENBQVlMLFFBQVEsQ0FBcEIsRUFBdUJDLFNBQVMsQ0FBaEMsRUFBbUNQLENBQW5DLEVBQXNDLENBQXRDLEVBQ0UsSUFBSUYsS0FBS00sRUFEWDtBQUVBQyxjQUFRTyxNQUFSO0FBQ0Q7OztpQ0FFWVAsTyxFQUFTTCxDLEVBQUdhLEssRUFBT1AsSyxFQUFPQyxNLEVBQVE7QUFDN0M7QUFDQSxVQUFNTyxLQUFLVCxRQUFRVSxvQkFBUixDQUE2QlQsUUFBUSxDQUFyQyxFQUF3Q0EsUUFBUSxDQUFoRCxFQUFtRCxHQUFuRCxFQUF3REEsUUFBUSxDQUFoRSxDQUFYO0FBQ0E7QUFDQVEsU0FBR0UsWUFBSCxDQUFnQixDQUFoQixFQUFtQixTQUFuQjtBQUNBRixTQUFHRSxZQUFILENBQWdCLENBQWhCLEVBQW1CLFNBQW5CO0FBQ0FYLGNBQVFHLFdBQVIsR0FBc0JNLEVBQXRCO0FBQ0E7QUFDQVQsY0FBUUksU0FBUixHQUFvQixFQUFwQjtBQUNBSixjQUFRSyxTQUFSO0FBQ0EsVUFBTU8sU0FBU0osUUFBUSxNQUFNZixLQUFLTSxFQUFsQztBQUNBQyxjQUFRTSxHQUFSLENBQVlMLFFBQVEsQ0FBcEIsRUFBdUJDLFNBQVMsQ0FBaEMsRUFBbUNQLENBQW5DLEVBQXNDLENBQUNGLEtBQUtNLEVBQU4sR0FBVyxDQUFqRCxFQUFvRGEsTUFBcEQ7QUFDQVosY0FBUU8sTUFBUjtBQUNEOzs7O0VBNUVvQ00sZUFBS0MsUzs7a0JBQXZCL0MsUyIsImZpbGUiOiJjb3VudGRvd24uanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknO1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ291bnRkb3duIGV4dGVuZHMgd2VweS5jb21wb25lbnQge1xuICBwcm9wcyA9IHtcbiAgICAvLyBwcm9jZXNzOiB7XG4gICAgLy8gICB0eXBlOiBOdW1iZXIsXG4gICAgLy8gICBkZWZhdWx0OiAwXG4gICAgLy8gfSxcbiAgICB0b3RhbDoge1xuICAgICAgdHlwZTogTnVtYmVyLFxuICAgICAgZGVmYXVsdDogMTAwXG4gICAgfSxcbiAgICB0eXBlOiB7XG4gICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICBkZWZhdWx0OiAncGVyJ1xuICAgIH1cbiAgfTtcblxuICBkYXRhID0ge1xuICAgIGNhbnZhc0NvbnRleHQ6IG51bGwsXG4gICAgcHJvY2VzczogMFxuICB9O1xuXG4gIGNvbXBvbmVudHMgPSB7fTtcblxuICBtZXRob2RzID0ge1xuICAgIHNldFByb2Nlc3ModmFsdWUpIHtcbiAgICAgIHRoaXMucHJvY2VzcyA9IHZhbHVlO1xuICAgICAgY29uc29sZS5sb2codGhpcy5wcm9jZXNzKTtcbiAgICAgIHRoaXMuJGFwcGx5KCk7XG4gICAgfVxuICB9O1xuXG4gIGV2ZW50cyA9IHt9O1xuXG4gIHdhdGNoID0ge307XG5cbiAgY29tcHV0ZWQgPSB7XG5cbiAgfTtcblxuICBvbkxvYWQoKSB7IH07XG5cbiAgZHJhdygpIHtcbiAgICBpZiAoIXRoaXMuY2FudmFzQ29udGV4dCkge1xuICAgICAgdGhpcy5jYW52YXNDb250ZXh0ID0gd3guY3JlYXRlQ2FudmFzQ29udGV4dCgnY291bnRkb3duJyk7XG4gICAgfVxuICAgIGNvbnN0IHJhZGlvID0gTWF0aC5mbG9vcigzMDAgLyAzNzUgKiAwLjcgKiAxMDApIC8gMTAwO1xuICAgIGNvbnN0IHIgPSAxODAgLSByYWRpbyAqIDE5MDtcbiAgICB0aGlzLmNhbnZhc0NvbnRleHQuY2xlYXJSZWN0KDAsIDAsIDMwMCwgMzAwKTtcbiAgICB0aGlzLmRyYXdDaXJjbGUodGhpcy5jYW52YXNDb250ZXh0LCAzMDAsIDMwMCwgcik7XG4gICAgdGhpcy5kcmF3UHJvZ3Jlc3ModGhpcy5jYW52YXNDb250ZXh0LCByLCAodGhpcy5wcm9jZXNzIC8gdGhpcy50b3RhbCkgKiBNYXRoLlBJICogMiwgMzAwLCAzMDApO1xuICAgIC8vIHRoaXMuZHJhd1RleHQodGhpcy5jYW52YXNDb250ZXh0KTtcbiAgICB0aGlzLmNhbnZhc0NvbnRleHQuZHJhdygpO1xuICB9XG5cbiAgZHJhd0NpcmNsZShjb250ZXh0LCB3aWR0aCwgaGVpZ2h0LCByKSB7XG4gICAgY29udGV4dC5zdHJva2VTdHlsZSA9ICcjZmZmNWNiJztcbiAgICBjb250ZXh0LmxpbmVXaWR0aCA9IDEwO1xuICAgIGNvbnRleHQuYmVnaW5QYXRoKCk7XG4gICAgY29udGV4dC5hcmMod2lkdGggLyAyLCBoZWlnaHQgLyAyLCByLCAwLFxuICAgICAgMiAqIE1hdGguUEkpO1xuICAgIGNvbnRleHQuc3Ryb2tlKCk7XG4gIH1cblxuICBkcmF3UHJvZ3Jlc3MoY29udGV4dCwgciwgYW5nbGUsIHdpZHRoLCBoZWlnaHQpIHtcbiAgICAvLyBjb25zb2xlLmxvZyhhbmdsZSk7XG4gICAgY29uc3QgZ3IgPSBjb250ZXh0LmNyZWF0ZUxpbmVhckdyYWRpZW50KHdpZHRoIC8gMiwgd2lkdGggLyAyLCAxODAsIHdpZHRoIC8gMik7XG4gICAgLy8g5re75Yqg6aKc6Imy56uv54K5XG4gICAgZ3IuYWRkQ29sb3JTdG9wKDAsICcjRkZFNTAwJyk7XG4gICAgZ3IuYWRkQ29sb3JTdG9wKDEsICcjRkZDQjAwJyk7XG4gICAgY29udGV4dC5zdHJva2VTdHlsZSA9IGdyO1xuICAgIC8vIGNvbnRleHQuc3Ryb2tlU3R5bGUgPSBcIiNGRkNCMDBcIjtcbiAgICBjb250ZXh0LmxpbmVXaWR0aCA9IDEwO1xuICAgIGNvbnRleHQuYmVnaW5QYXRoKCk7XG4gICAgY29uc3QgZUFuZ2xlID0gYW5nbGUgLSAwLjUgKiBNYXRoLlBJO1xuICAgIGNvbnRleHQuYXJjKHdpZHRoIC8gMiwgaGVpZ2h0IC8gMiwgciwgLU1hdGguUEkgLyAyLCBlQW5nbGUpO1xuICAgIGNvbnRleHQuc3Ryb2tlKCk7XG4gIH1cblxuICB3YXRjaCA9IHtcbiAgICBwcm9jZXNzKG5ld1ZhbHVlLCBvbGRWYWx1ZSkge1xuICAgICAgY29uc29sZS5sb2cobmV3VmFsdWUsIG9sZFZhbHVlKTtcbiAgICAgIGlmIChuZXdWYWx1ZSA+IG9sZFZhbHVlKSB7XG4gICAgICAgIHRoaXMuZHJhdygpO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuIl19