"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MinimalPortfolio = void 0;
var _react = _interopRequireWildcard(require("react"));
var _axios = _interopRequireDefault(require("axios"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t2 in e) "default" !== _t2 && {}.hasOwnProperty.call(e, _t2) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t2)) && (i.get || i.set) ? o(f, _t2, i) : f[_t2] = e[_t2]); return f; })(e, t); }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; } // components/templates/MinimalPortfolio.jsx
// export const MinimalPortfolio = ({ data }) => {
//     return (
//         <div className="min-h-screen bg-white p-8 text-gray-800 font-sans">
//             <img src={data.avatar} alt="avatar" className="w-24 h-24 rounded-full" />
//             <h1 className="text-4xl font-bold mt-4">{data.name}</h1>
//             <p className="text-lg">{data.bio}</p>
//             <h2 className="mt-6 text-2xl font-semibold">Skills</h2>
//             <ul className="list-disc ml-6">
//                 {data.skills.map((skill) => <li key={skill}>{skill}</li>)}
//             </ul>
//         </div>
//     );
// };
// pages/PortfolioPage.tsx
var MinimalPortfolio = exports.MinimalPortfolio = function MinimalPortfolio(_ref) {
  var _profile$location, _profile$location2;
  var data = _ref.data;
  var _useState = (0, _react.useState)({
      clientName: '',
      clientEmail: '',
      meetingDate: '',
      startTime: '',
      endTime: '',
      notes: ''
    }),
    _useState2 = _slicedToArray(_useState, 2),
    formData = _useState2[0],
    setFormData = _useState2[1];
  var _useState3 = (0, _react.useState)(''),
    _useState4 = _slicedToArray(_useState3, 2),
    successMsg = _useState4[0],
    setSuccessMsg = _useState4[1];
  var _useState5 = (0, _react.useState)(''),
    _useState6 = _slicedToArray(_useState5, 2),
    errorMsg = _useState6[0],
    setErrorMsg = _useState6[1];
  var _useState7 = (0, _react.useState)(false),
    _useState8 = _slicedToArray(_useState7, 2),
    loading = _useState8[0],
    setLoading = _useState8[1];
  if (!data) return /*#__PURE__*/_react["default"].createElement("div", {
    className: "p-8"
  }, "Loading...");
  var profile = data.profile,
    projects = data.projects,
    testimonials = data.testimonials,
    clients = data.clients;
  var handleChange = function handleChange(e) {
    setFormData(function (prev) {
      return _objectSpread(_objectSpread({}, prev), {}, _defineProperty({}, e.target.name, e.target.value));
    });
  };
  var handleSubmit = /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(e) {
      var _t;
      return _regenerator().w(function (_context) {
        while (1) switch (_context.p = _context.n) {
          case 0:
            e.preventDefault();
            setLoading(true);
            setSuccessMsg('');
            setErrorMsg('');
            _context.p = 1;
            _context.n = 2;
            return _axios["default"].post("".concat(import.meta.env.VITE_REACT_APP_BACKEND_BASEURL, "/api/meetings/request"), _objectSpread({
              freelancerId: profile._id
            }, formData));
          case 2:
            setSuccessMsg("Meeting request submitted successfully. You'll receive an email if accepted.");
            setFormData({
              clientName: '',
              clientEmail: '',
              meetingDate: '',
              startTime: '',
              endTime: '',
              notes: ''
            });
            _context.n = 4;
            break;
          case 3:
            _context.p = 3;
            _t = _context.v;
            setErrorMsg('Failed to submit meeting request. Please try again later.');
          case 4:
            setLoading(false);
          case 5:
            return _context.a(2);
        }
      }, _callee, null, [[1, 3]]);
    }));
    return function handleSubmit(_x) {
      return _ref2.apply(this, arguments);
    };
  }();
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: "max-w-6xl mx-auto p-8 space-y-12"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "flex items-center gap-6"
  }, /*#__PURE__*/_react["default"].createElement("img", {
    src: profile.profile,
    alt: "Profile",
    className: "w-28 h-28 rounded-full object-cover"
  }), /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("h1", {
    className: "text-3xl font-bold"
  }, profile.name), /*#__PURE__*/_react["default"].createElement("p", {
    className: "text-gray-600"
  }, (_profile$location = profile.location) === null || _profile$location === void 0 ? void 0 : _profile$location.city, ", ", (_profile$location2 = profile.location) === null || _profile$location2 === void 0 ? void 0 : _profile$location2.country), /*#__PURE__*/_react["default"].createElement("p", {
    className: "mt-2 text-gray-700"
  }, profile.bio))), /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("h2", {
    className: "text-xl font-semibold mb-2"
  }, "Skills"), /*#__PURE__*/_react["default"].createElement("div", {
    className: "flex flex-wrap gap-2"
  }, profile.skills.map(function (skill, i) {
    return /*#__PURE__*/_react["default"].createElement("span", {
      key: i,
      className: "bg-gray-100 px-3 py-1 rounded-full"
    }, skill);
  }))), /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("h2", {
    className: "text-xl font-semibold mb-4"
  }, "Projects"), /*#__PURE__*/_react["default"].createElement("div", {
    className: "grid grid-cols-1 md:grid-cols-2 gap-6"
  }, projects.map(function (project) {
    var _project$image;
    return /*#__PURE__*/_react["default"].createElement("div", {
      key: project._id,
      className: "p-4 border rounded-lg shadow"
    }, ((_project$image = project.image) === null || _project$image === void 0 ? void 0 : _project$image.url) && /*#__PURE__*/_react["default"].createElement("img", {
      src: project.image.url,
      alt: "Project",
      className: "w-full h-48 object-cover mb-4 rounded"
    }), /*#__PURE__*/_react["default"].createElement("h3", {
      className: "text-lg font-bold"
    }, project.title), /*#__PURE__*/_react["default"].createElement("p", {
      className: "text-gray-600"
    }, project.description), /*#__PURE__*/_react["default"].createElement("div", {
      className: "mt-2 text-sm text-blue-600"
    }, project.technologies.join(', ')), project.link && /*#__PURE__*/_react["default"].createElement("a", {
      href: project.link,
      className: "text-blue-500 underline text-sm"
    }, "Live Demo"), project.githubUrl && /*#__PURE__*/_react["default"].createElement("a", {
      href: project.githubUrl,
      className: "text-blue-500 ml-2 underline text-sm"
    }, "GitHub"));
  }))), /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("h2", {
    className: "text-xl font-semibold mb-4"
  }, "Testimonials"), /*#__PURE__*/_react["default"].createElement("div", {
    className: "grid grid-cols-1 md:grid-cols-2 gap-6"
  }, testimonials.map(function (t) {
    var _t$clientPhoto;
    return /*#__PURE__*/_react["default"].createElement("div", {
      key: t._id,
      className: "p-4 border rounded-lg bg-gray-50"
    }, /*#__PURE__*/_react["default"].createElement("div", {
      className: "flex items-center gap-4 mb-2"
    }, /*#__PURE__*/_react["default"].createElement("img", {
      src: (_t$clientPhoto = t.clientPhoto) === null || _t$clientPhoto === void 0 ? void 0 : _t$clientPhoto.url,
      alt: t.clientName,
      className: "w-12 h-12 rounded-full"
    }), /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("p", {
      className: "font-semibold"
    }, t.clientName), /*#__PURE__*/_react["default"].createElement("p", {
      className: "text-xs text-gray-600"
    }, t.clientRole, " at ", t.clientCompany))), /*#__PURE__*/_react["default"].createElement("p", {
      className: "text-gray-700 italic"
    }, "\u201C", t.feedback, "\u201D"));
  }))), /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("h2", {
    className: "text-xl font-semibold mb-4"
  }, "Client Work Summary"), clients.map(function (client, idx) {
    return /*#__PURE__*/_react["default"].createElement("div", {
      key: idx,
      className: "mb-6 border-b pb-4"
    }, /*#__PURE__*/_react["default"].createElement("h3", {
      className: "font-bold text-lg"
    }, client.name, " (", client.company, ")"), /*#__PURE__*/_react["default"].createElement("ul", {
      className: "ml-4 list-disc text-gray-700 mt-2"
    }, client.works.map(function (work, i) {
      return /*#__PURE__*/_react["default"].createElement("li", {
        key: i
      }, /*#__PURE__*/_react["default"].createElement("span", {
        className: "font-medium"
      }, work.fieldOfWork), " \u2013 ", work.workDescription, " ", /*#__PURE__*/_react["default"].createElement("br", null), /*#__PURE__*/_react["default"].createElement("span", {
        className: "text-sm text-gray-500"
      }, "\u20B9", work.cost, " | ", new Date(work.startDate).toLocaleDateString(), " - ", new Date(work.endDate).toLocaleDateString()));
    })));
  })), /*#__PURE__*/_react["default"].createElement("div", {
    className: "max-w-xl mx-auto p-6 bg-white shadow-md rounded-lg"
  }, /*#__PURE__*/_react["default"].createElement("h2", {
    className: "text-xl font-semibold mb-4"
  }, "Set a Meeting"), successMsg && /*#__PURE__*/_react["default"].createElement("p", {
    className: "text-green-600 mb-2"
  }, successMsg), errorMsg && /*#__PURE__*/_react["default"].createElement("p", {
    className: "text-red-600 mb-2"
  }, errorMsg), /*#__PURE__*/_react["default"].createElement("form", {
    onSubmit: handleSubmit,
    className: "space-y-4"
  }, /*#__PURE__*/_react["default"].createElement("input", {
    type: "text",
    name: "clientName",
    value: formData.clientName,
    onChange: handleChange,
    placeholder: "Your Name",
    required: true,
    className: "w-full border px-3 py-2 rounded"
  }), /*#__PURE__*/_react["default"].createElement("input", {
    type: "email",
    name: "clientEmail",
    value: formData.clientEmail,
    onChange: handleChange,
    placeholder: "Your Email",
    required: true,
    className: "w-full border px-3 py-2 rounded"
  }), /*#__PURE__*/_react["default"].createElement("input", {
    type: "date",
    name: "meetingDate",
    value: formData.meetingDate,
    onChange: handleChange,
    required: true,
    className: "w-full border px-3 py-2 rounded"
  }), /*#__PURE__*/_react["default"].createElement("div", {
    className: "flex gap-4"
  }, /*#__PURE__*/_react["default"].createElement("input", {
    type: "time",
    name: "startTime",
    value: formData.startTime,
    onChange: handleChange,
    required: true,
    className: "w-full border px-3 py-2 rounded"
  }), /*#__PURE__*/_react["default"].createElement("input", {
    type: "time",
    name: "endTime",
    value: formData.endTime,
    onChange: handleChange,
    required: true,
    className: "w-full border px-3 py-2 rounded"
  })), /*#__PURE__*/_react["default"].createElement("textarea", {
    name: "notes",
    value: formData.notes,
    onChange: handleChange,
    placeholder: "Any notes...",
    className: "w-full border px-3 py-2 rounded",
    rows: 3
  }), /*#__PURE__*/_react["default"].createElement("button", {
    type: "submit",
    disabled: loading,
    className: "bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
  }, loading ? "Submitting..." : "Submit Request"))));
};