! function(e, E) {
    "object" == typeof exports && "object" == typeof module ? module.exports = E() : "function" == typeof define && define.amd ? define([], E) : "object" == typeof exports ? exports.sqlFormatter = E() : e.sqlFormatter = E()
}(this, function() {
    return function(e) {
        function E(n) {
            if (t[n]) return t[n].exports;
            var r = t[n] = {
                exports: {},
                id: n,
                loaded: !1
            };
            return e[n].call(r.exports, r, r.exports, E), r.loaded = !0, r.exports
        }
        var t = {};
        return E.m = e, E.c = t, E.p = "", E(0)
    }([function(e, E, t) {
        "use strict";

        function n(e) {
            return e && e.__esModule ? e : {
                "default": e
            }
        }
        E.__esModule = !0;
        var r = t(18),
            T = n(r),
            R = t(19),
            o = n(R),
            N = t(20),
            A = n(N),
            I = t(21),
            O = n(I);
        E["default"] = {
            format: function(e, E) {
                switch (E = E || {}, E.language) {
                    case "db2":
                        return new T["default"](E).format(e);
                    case "n1ql":
                        return new o["default"](E).format(e);
                    case "pl/sql":
                        return new A["default"](E).format(e);
                    case "sql":
                    case void 0:
                        return new O["default"](E).format(e);
                    default:
                        throw Error("Unsupported SQL dialect: " + E.language)
                }
            }
        }, e.exports = E["default"]
    }, function(e, E) {
        "use strict";
        E.__esModule = !0, E["default"] = function(e, E) {
            if (!(e instanceof E)) throw new TypeError("Cannot call a class as a function")
        }
    }, function(e, E, t) {
        var n = t(39),
            r = "object" == typeof self && self && self.Object === Object && self,
            T = n || r || Function("return this")();
        e.exports = T
    }, function(e, E, t) {
        function n(e, E) {
            var t = T(e, E);
            return r(t) ? t : void 0
        }
        var r = t(33),
            T = t(41);
        e.exports = n
    }, function(e, E, t) {
        "use strict";

        function n(e) {
            return e && e.__esModule ? e : {
                "default": e
            }
        }
        E.__esModule = !0;
        var r = t(1),
            T = n(r),
            R = t(66),
            o = n(R),
            N = t(7),
            A = n(N),
            I = t(15),
            O = n(I),
            i = t(16),
            S = n(i),
            u = t(17),
            L = n(u),
            C = function() {
                function e(E, t) {
                    (0, T["default"])(this, e), this.cfg = E || {}, this.indentation = new O["default"](this.cfg.indent), this.inlineBlock = new S["default"], this.params = new L["default"](this.cfg.params), this.tokenizer = t, this.previousReservedWord = {}
                }
                return e.prototype.format = function(e) {
                    var E = this.tokenizer.tokenize(e),
                        t = this.getFormattedQueryFromTokens(E);
                    return t.trim()
                }, e.prototype.getFormattedQueryFromTokens = function(e) {
                    var E = this,
                        t = "";
                    return e.forEach(function(n, r) {
                        n.type !== A["default"].WHITESPACE && (n.type === A["default"].LINE_COMMENT ? t = E.formatLineComment(n, t) : n.type === A["default"].BLOCK_COMMENT ? t = E.formatBlockComment(n, t) : n.type === A["default"].RESERVED_TOPLEVEL ? (t = E.formatToplevelReservedWord(n, t), E.previousReservedWord = n) : n.type === A["default"].RESERVED_NEWLINE ? (t = E.formatNewlineReservedWord(n, t), E.previousReservedWord = n) : n.type === A["default"].RESERVED ? (t = E.formatWithSpaces(n, t), E.previousReservedWord = n) : t = n.type === A["default"].OPEN_PAREN ? E.formatOpeningParentheses(e, r, t) : n.type === A["default"].CLOSE_PAREN ? E.formatClosingParentheses(n, t) : n.type === A["default"].PLACEHOLDER ? E.formatPlaceholder(n, t) : "," === n.value ? E.formatComma(n, t) : ":" === n.value ? E.formatWithSpaceAfter(n, t) : "." === n.value || ";" === n.value ? E.formatWithoutSpaces(n, t) : E.formatWithSpaces(n, t))
                    }), t
                }, e.prototype.formatLineComment = function(e, E) {
                    return this.addNewline(E + e.value)
                }, e.prototype.formatBlockComment = function(e, E) {
                    return this.addNewline(this.addNewline(E) + this.indentComment(e.value))
                }, e.prototype.indentComment = function(e) {
                    return e.replace(/\n/g, "\n" + this.indentation.getIndent())
                }, e.prototype.formatToplevelReservedWord = function(e, E) {
                    return this.indentation.decreaseTopLevel(), E = this.addNewline(E), this.indentation.increaseToplevel(), E += this.equalizeWhitespace(e.value), this.addNewline(E)
                }, e.prototype.formatNewlineReservedWord = function(e, E) {
                    return this.addNewline(E) + this.equalizeWhitespace(e.value) + " "
                }, e.prototype.equalizeWhitespace = function(e) {
                    return e.replace(/\s+/g, " ")
                }, e.prototype.formatOpeningParentheses = function(e, E, t) {
                    var n = e[E - 1];
                    return n && n.type !== A["default"].WHITESPACE && n.type !== A["default"].OPEN_PAREN && (t = (0, o["default"])(t)), t += e[E].value, this.inlineBlock.beginIfPossible(e, E), this.inlineBlock.isActive() || (this.indentation.increaseBlockLevel(), t = this.addNewline(t)), t
                }, e.prototype.formatClosingParentheses = function(e, E) {
                    return this.inlineBlock.isActive() ? (this.inlineBlock.end(), this.formatWithSpaceAfter(e, E)) : (this.indentation.decreaseBlockLevel(), this.formatWithSpaces(e, this.addNewline(E)))
                }, e.prototype.formatPlaceholder = function(e, E) {
                    return E + this.params.get(e) + " "
                }, e.prototype.formatComma = function(e, E) {
                    return E = (0, o["default"])(E) + e.value + " ", this.inlineBlock.isActive() ? E : /^LIMIT$/i.test(this.previousReservedWord.value) ? E : this.addNewline(E)
                }, e.prototype.formatWithSpaceAfter = function(e, E) {
                    return (0, o["default"])(E) + e.value + " "
                }, e.prototype.formatWithoutSpaces = function(e, E) {
                    return (0, o["default"])(E) + e.value
                }, e.prototype.formatWithSpaces = function(e, E) {
                    return E + e.value + " "
                }, e.prototype.addNewline = function(e) {
                    return (0, o["default"])(e) + "\n" + this.indentation.getIndent()
                }, e
            }();
        E["default"] = C, e.exports = E["default"]
    }, function(e, E, t) {
        "use strict";

        function n(e) {
            return e && e.__esModule ? e : {
                "default": e
            }
        }
        E.__esModule = !0;
        var r = t(1),
            T = n(r),
            R = t(58),
            o = n(R),
            N = t(53),
            A = n(N),
            I = t(7),
            O = n(I),
            i = function() {
                function e(E) {
                    (0, T["default"])(this, e), this.WHITESPACE_REGEX = /^(\s+)/, this.NUMBER_REGEX = /^((-\s*)?[0-9]+(\.[0-9]+)?|0x[0-9a-fA-F]+|0b[01]+)\b/, this.OPERATOR_REGEX = /^(!=|<>|==|<=|>=|!<|!>|\|\||::|->>|->|~~\*|~~|!~~\*|!~~|~\*|!~\*|!~|.)/, this.BLOCK_COMMENT_REGEX = /^(\/\*[^]*?(?:\*\/|$))/, this.LINE_COMMENT_REGEX = this.createLineCommentRegex(E.lineCommentTypes), this.RESERVED_TOPLEVEL_REGEX = this.createReservedWordRegex(E.reservedToplevelWords), this.RESERVED_NEWLINE_REGEX = this.createReservedWordRegex(E.reservedNewlineWords), this.RESERVED_PLAIN_REGEX = this.createReservedWordRegex(E.reservedWords), this.WORD_REGEX = this.createWordRegex(E.specialWordChars), this.STRING_REGEX = this.createStringRegex(E.stringTypes), this.OPEN_PAREN_REGEX = this.createParenRegex(E.openParens), this.CLOSE_PAREN_REGEX = this.createParenRegex(E.closeParens), this.INDEXED_PLACEHOLDER_REGEX = this.createPlaceholderRegex(E.indexedPlaceholderTypes, "[0-9]*"), this.IDENT_NAMED_PLACEHOLDER_REGEX = this.createPlaceholderRegex(E.namedPlaceholderTypes, "[a-zA-Z0-9._$]+"), this.STRING_NAMED_PLACEHOLDER_REGEX = this.createPlaceholderRegex(E.namedPlaceholderTypes, this.createStringPattern(E.stringTypes))
                }
                return e.prototype.createLineCommentRegex = function(e) {
                    return RegExp("^((?:" + e.map(function(e) {
                        return (0, A["default"])(e)
                    }).join("|") + ").*?(?:\n|$))")
                }, e.prototype.createReservedWordRegex = function(e) {
                    var E = e.join("|").replace(/ /g, "\\s+");
                    return RegExp("^(" + E + ")\\b", "i")
                }, e.prototype.createWordRegex = function() {
                    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [];
                    return RegExp("^([\\w" + e.join("") + "]+)")
                }, e.prototype.createStringRegex = function(e) {
                    return RegExp("^(" + this.createStringPattern(e) + ")")
                }, e.prototype.createStringPattern = function(e) {
                    var E = {
                        "``": "((`[^`]*($|`))+)",
                        "[]": "((\\[[^\\]]*($|\\]))(\\][^\\]]*($|\\]))*)",
                        '""': '(("[^"\\\\]*(?:\\\\.[^"\\\\]*)*("|$))+)',
                        "''": "(('[^'\\\\]*(?:\\\\.[^'\\\\]*)*('|$))+)",
                        "N''": "((N'[^N'\\\\]*(?:\\\\.[^N'\\\\]*)*('|$))+)"
                    };
                    return e.map(function(e) {
                        return E[e]
                    }).join("|")
                }, e.prototype.createParenRegex = function(e) {
                    var E = this;
                    return RegExp("^(" + e.map(function(e) {
                        return E.escapeParen(e)
                    }).join("|") + ")", "i")
                }, e.prototype.escapeParen = function(e) {
                    return 1 === e.length ? (0, A["default"])(e) : "\\b" + e + "\\b"
                }, e.prototype.createPlaceholderRegex = function(e, E) {
                    if ((0, o["default"])(e)) return !1;
                    var t = e.map(A["default"]).join("|");
                    return RegExp("^((?:" + t + ")(?:" + E + "))")
                }, e.prototype.tokenize = function(e) {
                    for (var E = [], t = void 0; e.length;) t = this.getNextToken(e, t), e = e.substring(t.value.length), E.push(t);
                    return E
                }, e.prototype.getNextToken = function(e, E) {
                    return this.getWhitespaceToken(e) || this.getCommentToken(e) || this.getStringToken(e) || this.getOpenParenToken(e) || this.getCloseParenToken(e) || this.getPlaceholderToken(e) || this.getNumberToken(e) || this.getReservedWordToken(e, E) || this.getWordToken(e) || this.getOperatorToken(e)
                }, e.prototype.getWhitespaceToken = function(e) {
                    return this.getTokenOnFirstMatch({
                        input: e,
                        type: O["default"].WHITESPACE,
                        regex: this.WHITESPACE_REGEX
                    })
                }, e.prototype.getCommentToken = function(e) {
                    return this.getLineCommentToken(e) || this.getBlockCommentToken(e)
                }, e.prototype.getLineCommentToken = function(e) {
                    return this.getTokenOnFirstMatch({
                        input: e,
                        type: O["default"].LINE_COMMENT,
                        regex: this.LINE_COMMENT_REGEX
                    })
                }, e.prototype.getBlockCommentToken = function(e) {
                    return this.getTokenOnFirstMatch({
                        input: e,
                        type: O["default"].BLOCK_COMMENT,
                        regex: this.BLOCK_COMMENT_REGEX
                    })
                }, e.prototype.getStringToken = function(e) {
                    return this.getTokenOnFirstMatch({
                        input: e,
                        type: O["default"].STRING,
                        regex: this.STRING_REGEX
                    })
                }, e.prototype.getOpenParenToken = function(e) {
                    return this.getTokenOnFirstMatch({
                        input: e,
                        type: O["default"].OPEN_PAREN,
                        regex: this.OPEN_PAREN_REGEX
                    })
                }, e.prototype.getCloseParenToken = function(e) {
                    return this.getTokenOnFirstMatch({
                        input: e,
                        type: O["default"].CLOSE_PAREN,
                        regex: this.CLOSE_PAREN_REGEX
                    })
                }, e.prototype.getPlaceholderToken = function(e) {
                    return this.getIdentNamedPlaceholderToken(e) || this.getStringNamedPlaceholderToken(e) || this.getIndexedPlaceholderToken(e)
                }, e.prototype.getIdentNamedPlaceholderToken = function(e) {
                    return this.getPlaceholderTokenWithKey({
                        input: e,
                        regex: this.IDENT_NAMED_PLACEHOLDER_REGEX,
                        parseKey: function(e) {
                            return e.slice(1)
                        }
                    })
                }, e.prototype.getStringNamedPlaceholderToken = function(e) {
                    var E = this;
                    return this.getPlaceholderTokenWithKey({
                        input: e,
                        regex: this.STRING_NAMED_PLACEHOLDER_REGEX,
                        parseKey: function(e) {
                            return E.getEscapedPlaceholderKey({
                                key: e.slice(2, -1),
                                quoteChar: e.slice(-1)
                            })
                        }
                    })
                }, e.prototype.getIndexedPlaceholderToken = function(e) {
                    return this.getPlaceholderTokenWithKey({
                        input: e,
                        regex: this.INDEXED_PLACEHOLDER_REGEX,
                        parseKey: function(e) {
                            return e.slice(1)
                        }
                    })
                }, e.prototype.getPlaceholderTokenWithKey = function(e) {
                    var E = e.input,
                        t = e.regex,
                        n = e.parseKey,
                        r = this.getTokenOnFirstMatch({
                            input: E,
                            regex: t,
                            type: O["default"].PLACEHOLDER
                        });
                    return r && (r.key = n(r.value)), r
                }, e.prototype.getEscapedPlaceholderKey = function(e) {
                    var E = e.key,
                        t = e.quoteChar;
                    return E.replace(RegExp((0, A["default"])("\\") + t, "g"), t)
                }, e.prototype.getNumberToken = function(e) {
                    return this.getTokenOnFirstMatch({
                        input: e,
                        type: O["default"].NUMBER,
                        regex: this.NUMBER_REGEX
                    })
                }, e.prototype.getOperatorToken = function(e) {
                    return this.getTokenOnFirstMatch({
                        input: e,
                        type: O["default"].OPERATOR,
                        regex: this.OPERATOR_REGEX
                    })
                }, e.prototype.getReservedWordToken = function(e, E) {
                    if (!E || !E.value || "." !== E.value) return this.getToplevelReservedToken(e) || this.getNewlineReservedToken(e) || this.getPlainReservedToken(e)
                }, e.prototype.getToplevelReservedToken = function(e) {
                    return this.getTokenOnFirstMatch({
                        input: e,
                        type: O["default"].RESERVED_TOPLEVEL,
                        regex: this.RESERVED_TOPLEVEL_REGEX
                    })
                }, e.prototype.getNewlineReservedToken = function(e) {
                    return this.getTokenOnFirstMatch({
                        input: e,
                        type: O["default"].RESERVED_NEWLINE,
                        regex: this.RESERVED_NEWLINE_REGEX
                    })
                }, e.prototype.getPlainReservedToken = function(e) {
                    return this.getTokenOnFirstMatch({
                        input: e,
                        type: O["default"].RESERVED,
                        regex: this.RESERVED_PLAIN_REGEX
                    })
                }, e.prototype.getWordToken = function(e) {
                    return this.getTokenOnFirstMatch({
                        input: e,
                        type: O["default"].WORD,
                        regex: this.WORD_REGEX
                    })
                }, e.prototype.getTokenOnFirstMatch = function(e) {
                    var E = e.input,
                        t = e.type,
                        n = e.regex,
                        r = E.match(n);
                    if (r) return {
                        type: t,
                        value: r[1]
                    }
                }, e
            }();
        E["default"] = i, e.exports = E["default"]
    }, function(e, E) {
        function t(e) {
            var E = typeof e;
            return null != e && ("object" == E || "function" == E)
        }
        e.exports = t
    }, function(e, E) {
        "use strict";
        E.__esModule = !0, E["default"] = {
            WHITESPACE: "whitespace",
            WORD: "word",
            STRING: "string",
            RESERVED: "reserved",
            RESERVED_TOPLEVEL: "reserved-toplevel",
            RESERVED_NEWLINE: "reserved-newline",
            OPERATOR: "operator",
            OPEN_PAREN: "open-paren",
            CLOSE_PAREN: "close-paren",
            LINE_COMMENT: "line-comment",
            BLOCK_COMMENT: "block-comment",
            NUMBER: "number",
            PLACEHOLDER: "placeholder"
        }, e.exports = E["default"]
    }, function(e, E, t) {
        function n(e) {
            return null != e && T(e.length) && !r(e)
        }
        var r = t(12),
            T = t(59);
        e.exports = n
    }, function(e, E, t) {
        function n(e) {
            return null == e ? "" : r(e)
        }
        var r = t(10);
        e.exports = n
    }, function(e, E, t) {
        function n(e) {
            if ("string" == typeof e) return e;
            if (T(e)) return N ? N.call(e) : "";
            var E = e + "";
            return "0" == E && 1 / e == -R ? "-0" : E
        }
        var r = t(26),
            T = t(14),
            R = 1 / 0,
            o = r ? r.prototype : void 0,
            N = o ? o.toString : void 0;
        e.exports = n
    }, function(e, E) {
        function t(e) {
            if (null != e) {
                try {
                    return r.call(e)
                } catch (E) {}
                try {
                    return e + ""
                } catch (E) {}
            }
            return ""
        }
        var n = Function.prototype,
            r = n.toString;
        e.exports = t
    }, function(e, E, t) {
        function n(e) {
            var E = r(e) ? N.call(e) : "";
            return E == T || E == R
        }
        var r = t(6),
            T = "[object Function]",
            R = "[object GeneratorFunction]",
            o = Object.prototype,
            N = o.toString;
        e.exports = n
    }, function(e, E) {
        function t(e) {
            return null != e && "object" == typeof e
        }
        e.exports = t
    }, function(e, E, t) {
        function n(e) {
            return "symbol" == typeof e || r(e) && o.call(e) == T
        }
        var r = t(13),
            T = "[object Symbol]",
            R = Object.prototype,
            o = R.toString;
        e.exports = n
    }, function(e, E, t) {
        "use strict";

        function n(e) {
            return e && e.__esModule ? e : {
                "default": e
            }
        }
        E.__esModule = !0;
        var r = t(1),
            T = n(r),
            R = t(61),
            o = n(R),
            N = t(60),
            A = n(N),
            I = "top-level",
            O = "block-level",
            i = function() {
                function e(E) {
                    (0, T["default"])(this, e), this.indent = E || "  ", this.indentTypes = []
                }
                return e.prototype.getIndent = function() {
                    return (0, o["default"])(this.indent, this.indentTypes.length)
                }, e.prototype.increaseToplevel = function() {
                    this.indentTypes.push(I)
                }, e.prototype.increaseBlockLevel = function() {
                    this.indentTypes.push(O)
                }, e.prototype.decreaseTopLevel = function() {
                    (0, A["default"])(this.indentTypes) === I && this.indentTypes.pop()
                }, e.prototype.decreaseBlockLevel = function() {
                    for (; this.indentTypes.length > 0;) {
                        var e = this.indentTypes.pop();
                        if (e !== I) break
                    }
                }, e
            }();
        E["default"] = i, e.exports = E["default"]
    }, function(e, E, t) {
        "use strict";

        function n(e) {
            return e && e.__esModule ? e : {
                "default": e
            }
        }
        E.__esModule = !0;
        var r = t(1),
            T = n(r),
            R = t(7),
            o = n(R),
            N = 50,
            A = function() {
                function e() {
                    (0, T["default"])(this, e), this.level = 0
                }
                return e.prototype.beginIfPossible = function(e, E) {
                    0 === this.level && this.isInlineBlock(e, E) ? this.level = 1 : this.level > 0 ? this.level++ : this.level = 0
                }, e.prototype.end = function() {
                    this.level--
                }, e.prototype.isActive = function() {
                    return this.level > 0
                }, e.prototype.isInlineBlock = function(e, E) {
                    for (var t = 0, n = 0, r = E; e.length > r; r++) {
                        var T = e[r];
                        if (t += T.value.length, t > N) return !1;
                        if (T.type === o["default"].OPEN_PAREN) n++;
                        else if (T.type === o["default"].CLOSE_PAREN && (n--, 0 === n)) return !0;
                        if (this.isForbiddenToken(T)) return !1
                    }
                    return !1
                }, e.prototype.isForbiddenToken = function(e) {
                    var E = e.type,
                        t = e.value;
                    return E === o["default"].RESERVED_TOPLEVEL || E === o["default"].RESERVED_NEWLINE || E === o["default"].COMMENT || E === o["default"].BLOCK_COMMENT || ";" === t
                }, e
            }();
        E["default"] = A, e.exports = E["default"]
    }, function(e, E, t) {
        "use strict";

        function n(e) {
            return e && e.__esModule ? e : {
                "default": e
            }
        }
        E.__esModule = !0;
        var r = t(1),
            T = n(r),
            R = function() {
                function e(E) {
                    (0, T["default"])(this, e), this.params = E, this.index = 0
                }
                return e.prototype.get = function(e) {
                    var E = e.key,
                        t = e.value;
                    return this.params ? E ? this.params[E] : this.params[this.index++] : t
                }, e
            }();
        E["default"] = R, e.exports = E["default"]
    }, function(e, E, t) {
        "use strict";

        function n(e) {
            return e && e.__esModule ? e : {
                "default": e
            }
        }
        E.__esModule = !0;
        var r = t(1),
            T = n(r),
            R = t(4),
            o = n(R),
            N = t(5),
            A = n(N),
            I = ["ABS", "ACTIVATE", "ALIAS", "ALL", "ALLOCATE", "ALLOW", "ALTER", "ANY", "ARE", "ARRAY", "AS", "ASC", "ASENSITIVE", "ASSOCIATE", "ASUTIME", "ASYMMETRIC", "AT", "ATOMIC", "ATTRIBUTES", "AUDIT", "AUTHORIZATION", "AUX", "AUXILIARY", "AVG", "BEFORE", "BEGIN", "BETWEEN", "BIGINT", "BINARY", "BLOB", "BOOLEAN", "BOTH", "BUFFERPOOL", "BY", "CACHE", "CALL", "CALLED", "CAPTURE", "CARDINALITY", "CASCADED", "CASE", "CAST", "CCSID", "CEIL", "CEILING", "CHAR", "CHARACTER", "CHARACTER_LENGTH", "CHAR_LENGTH", "CHECK", "CLOB", "CLONE", "CLOSE", "CLUSTER", "COALESCE", "COLLATE", "COLLECT", "COLLECTION", "COLLID", "COLUMN", "COMMENT", "COMMIT", "CONCAT", "CONDITION", "CONNECT", "CONNECTION", "CONSTRAINT", "CONTAINS", "CONTINUE", "CONVERT", "CORR", "CORRESPONDING", "COUNT", "COUNT_BIG", "COVAR_POP", "COVAR_SAMP", "CREATE", "CROSS", "CUBE", "CUME_DIST", "CURRENT", "CURRENT_DATE", "CURRENT_DEFAULT_TRANSFORM_GROUP", "CURRENT_LC_CTYPE", "CURRENT_PATH", "CURRENT_ROLE", "CURRENT_SCHEMA", "CURRENT_SERVER", "CURRENT_TIME", "CURRENT_TIMESTAMP", "CURRENT_TIMEZONE", "CURRENT_TRANSFORM_GROUP_FOR_TYPE", "CURRENT_USER", "CURSOR", "CYCLE", "DATA", "DATABASE", "DATAPARTITIONNAME", "DATAPARTITIONNUM", "DATE", "DAY", "DAYS", "DB2GENERAL", "DB2GENRL", "DB2SQL", "DBINFO", "DBPARTITIONNAME", "DBPARTITIONNUM", "DEALLOCATE", "DEC", "DECIMAL", "DECLARE", "DEFAULT", "DEFAULTS", "DEFINITION", "DELETE", "DENSERANK", "DENSE_RANK", "DEREF", "DESCRIBE", "DESCRIPTOR", "DETERMINISTIC", "DIAGNOSTICS", "DISABLE", "DISALLOW", "DISCONNECT", "DISTINCT", "DO", "DOCUMENT", "DOUBLE", "DROP", "DSSIZE", "DYNAMIC", "EACH", "EDITPROC", "ELEMENT", "ELSE", "ELSEIF", "ENABLE", "ENCODING", "ENCRYPTION", "END", "END-EXEC", "ENDING", "ERASE", "ESCAPE", "EVERY", "EXCEPTION", "EXCLUDING", "EXCLUSIVE", "EXEC", "EXECUTE", "EXISTS", "EXIT", "EXP", "EXPLAIN", "EXTENDED", "EXTERNAL", "EXTRACT", "FALSE", "FENCED", "FETCH", "FIELDPROC", "FILE", "FILTER", "FINAL", "FIRST", "FLOAT", "FLOOR", "FOR", "FOREIGN", "FREE", "FULL", "FUNCTION", "FUSION", "GENERAL", "GENERATED", "GET", "GLOBAL", "GOTO", "GRANT", "GRAPHIC", "GROUP", "GROUPING", "HANDLER", "HASH", "HASHED_VALUE", "HINT", "HOLD", "HOUR", "HOURS", "IDENTITY", "IF", "IMMEDIATE", "IN", "INCLUDING", "INCLUSIVE", "INCREMENT", "INDEX", "INDICATOR", "INDICATORS", "INF", "INFINITY", "INHERIT", "INNER", "INOUT", "INSENSITIVE", "INSERT", "INT", "INTEGER", "INTEGRITY", "INTERSECTION", "INTERVAL", "INTO", "IS", "ISOBID", "ISOLATION", "ITERATE", "JAR", "JAVA", "KEEP", "KEY", "LABEL", "LANGUAGE", "LARGE", "LATERAL", "LC_CTYPE", "LEADING", "LEAVE", "LEFT", "LIKE", "LINKTYPE", "LN", "LOCAL", "LOCALDATE", "LOCALE", "LOCALTIME", "LOCALTIMESTAMP", "LOCATOR", "LOCATORS", "LOCK", "LOCKMAX", "LOCKSIZE", "LONG", "LOOP", "LOWER", "MAINTAINED", "MATCH", "MATERIALIZED", "MAX", "MAXVALUE", "MEMBER", "MERGE", "METHOD", "MICROSECOND", "MICROSECONDS", "MIN", "MINUTE", "MINUTES", "MINVALUE", "MOD", "MODE", "MODIFIES", "MODULE", "MONTH", "MONTHS", "MULTISET", "NAN", "NATIONAL", "NATURAL", "NCHAR", "NCLOB", "NEW", "NEW_TABLE", "NEXTVAL", "NO", "NOCACHE", "NOCYCLE", "NODENAME", "NODENUMBER", "NOMAXVALUE", "NOMINVALUE", "NONE", "NOORDER", "NORMALIZE", "NORMALIZED", "NOT", "NULL", "NULLIF", "NULLS", "NUMERIC", "NUMPARTS", "OBID", "OCTET_LENGTH", "OF", "OFFSET", "OLD", "OLD_TABLE", "ON", "ONLY", "OPEN", "OPTIMIZATION", "OPTIMIZE", "OPTION", "ORDER", "OUT", "OUTER", "OVER", "OVERLAPS", "OVERLAY", "OVERRIDING", "PACKAGE", "PADDED", "PAGESIZE", "PARAMETER", "PART", "PARTITION", "PARTITIONED", "PARTITIONING", "PARTITIONS", "PASSWORD", "PATH", "PERCENTILE_CONT", "PERCENTILE_DISC", "PERCENT_RANK", "PIECESIZE", "PLAN", "POSITION", "POWER", "PRECISION", "PREPARE", "PREVVAL", "PRIMARY", "PRIQTY", "PRIVILEGES", "PROCEDURE", "PROGRAM", "PSID", "PUBLIC", "QUERY", "QUERYNO", "RANGE", "RANK", "READ", "READS", "REAL", "RECOVERY", "RECURSIVE", "REF", "REFERENCES", "REFERENCING", "REFRESH", "REGR_AVGX", "REGR_AVGY", "REGR_COUNT", "REGR_INTERCEPT", "REGR_R2", "REGR_SLOPE", "REGR_SXX", "REGR_SXY", "REGR_SYY", "RELEASE", "RENAME", "REPEAT", "RESET", "RESIGNAL", "RESTART", "RESTRICT", 
            O = ["ADD", "AFTER", "ALTER COLUMN", "ALTER TABLE", "DELETE FROM", "EXCEPT", "FETCH FIRST", "FROM", "GROUP BY", "GO", "HAVING", "INSERT INTO", "INTERSECT", "LIMIT", "ORDER BY", "SELECT", "SET CURRENT SCHEMA", "SET SCHEMA", "SET", "UNION ALL", "UPDATE", "VALUES", "WHERE"],
            i = ["AND", "CROSS JOIN", "INNER JOIN", "JOIN", "LEFT JOIN", "LEFT OUTER JOIN", "OR", "OUTER JOIN", "RIGHT JOIN", "RIGHT OUTER JOIN"],
            S = void 0,
            u = function() {
                function e(E) {
                    (0, T["default"])(this, e), this.cfg = E
                }
                return e.prototype.format = function(e) {
                    return S || (S = new A["default"]({
                        reservedWords: I,
                        reservedToplevelWords: O,
                        reservedNewlineWords: i,
                        stringTypes: ['""', "''", "``", "[]"],
                        openParens: ["("],
                        closeParens: [")"],
                        indexedPlaceholderTypes: ["?"],
                        namedPlaceholderTypes: [":"],
                        lineCommentTypes: ["--"],
                        specialWordChars: ["#", "@"]
                    })), new o["default"](this.cfg, S).format(e)
                }, e
            }();
        E["default"] = u, e.exports = E["default"]
    }, function(e, E, t) {
        "use strict";

        function n(e) {
            return e && e.__esModule ? e : {
                "default": e
            }
        }
        E.__esModule = !0;
        var r = t(1),
            T = n(r),
            R = t(4),
            o = n(R),
            N = t(5),
            A = n(N),
            I = ["ALL", "ALTER", "ANALYZE", "AND", "ANY", "ARRAY", "AS", "ASC", "BEGIN", "BETWEEN", "BINARY", "BOOLEAN", "BREAK", "BUCKET", "BUILD", "BY", "CALL", "CASE", "CAST", "CLUSTER", "COLLATE", "COLLECTION", "COMMIT", "CONNECT", "CONTINUE", "CORRELATE", "COVER", "CREATE", "DATABASE", "DATASET", "DATASTORE", "DECLARE", "DECREMENT", "DELETE", "DERIVED", "DESC", "DESCRIBE", "DISTINCT", "DO", "DROP", "EACH", "ELEMENT", "ELSE", "END", "EVERY", "EXCEPT", "EXCLUDE", "EXECUTE", "EXISTS", "EXPLAIN", "FALSE", "FETCH", "FIRST", "FLATTEN", "FOR", "FORCE", "FROM", "FUNCTION", "GRANT", "GROUP", "GSI", "HAVING", "IF", "IGNORE", "ILIKE", "IN", "INCLUDE", "INCREMENT", "INDEX", "INFER", "INLINE", "INNER", "INSERT", "INTERSECT", "INTO", "IS", "JOIN", "KEY", "KEYS", "KEYSPACE", "KNOWN", "LAST", "LEFT", "LET", "LETTING", "LIKE", "LIMIT", "LSM", "MAP", "MAPPING", "MATCHED", "MATERIALIZED", "MERGE", "MINUS", "MISSING", "NAMESPACE", "NEST", "NOT", "NULL", "NUMBER", "OBJECT", "OFFSET", "ON", "OPTION", "OR", "ORDER", "OUTER", "OVER", "PARSE", "PARTITION", "PASSWORD", "PATH", "POOL", "PREPARE", "PRIMARY", "PRIVATE", "PRIVILEGE", "PROCEDURE", "PUBLIC", "RAW", "REALM", "REDUCE", "RENAME", "RETURN", "RETURNING", "REVOKE", "RIGHT", "ROLE", "ROLLBACK", "SATISFIES", "SCHEMA", "SELECT", "SELF", "SEMI", "SET", "SHOW", "SOME", "START", "STATISTICS", "STRING", "SYSTEM", "THEN", "TO", "TRANSACTION", "TRIGGER", "TRUE", "TRUNCATE", "UNDER", "UNION", "UNIQUE", "UNKNOWN", "UNNEST", "UNSET", "UPDATE", "UPSERT", "USE", "USER", "USING", "VALIDATE", "VALUE", "VALUED", "VALUES", "VIA", "VIEW", "WHEN", "WHERE", "WHILE", "WITH", "WITHIN", "WORK", "XOR"],
            O = ["DELETE FROM", "EXCEPT ALL", "EXCEPT", "EXPLAIN DELETE FROM", "EXPLAIN UPDATE", "EXPLAIN UPSERT", "FROM", "GROUP BY", "HAVING", "INFER", "INSERT INTO", "INTERSECT ALL", "INTERSECT", "LET", "LIMIT", "MERGE", "NEST", "ORDER BY", "PREPARE", "SELECT", "SET CURRENT SCHEMA", "SET SCHEMA", "SET", "UNION ALL", "UNION", "UNNEST", "UPDATE", "UPSERT", "USE KEYS", "VALUES", "WHERE"],
            i = ["AND", "INNER JOIN", "JOIN", "LEFT JOIN", "LEFT OUTER JOIN", "OR", "OUTER JOIN", "RIGHT JOIN", "RIGHT OUTER JOIN", "XOR"],
            S = void 0,
            u = function() {
                function e(E) {
                    (0, T["default"])(this, e), this.cfg = E
                }
                return e.prototype.format = function(e) {
                    return S || (S = new A["default"]({
                        reservedWords: I,
                        reservedToplevelWords: O,
                        reservedNewlineWords: i,
                        stringTypes: ['""', "''", "``"],
                        openParens: ["(", "[", "{"],
                        closeParens: [")", "]", "}"],
                        namedPlaceholderTypes: ["$"],
                        lineCommentTypes: ["#", "--"]
                    })), new o["default"](this.cfg, S).format(e)
                }, e
            }();
        E["default"] = u, e.exports = E["default"]
    }, function(e, E, t) {
        "use strict";

        function n(e) {
            return e && e.__esModule ? e : {
                "default": e
            }
        }
        E.__esModule = !0;
        var r = t(1),
            T = n(r),
            R = t(4),
            o = n(R),
            N = t(5),
            A = n(N),
            I = ["A", "ACCESSIBLE", "AGENT", "AGGREGATE", "ALL", "ALTER", "ANY", "ARRAY", "AS", "ASC", "AT", "ATTRIBUTE", "AUTHID", "AVG", "BETWEEN", "BFILE_BASE", "BINARY_INTEGER", "BINARY", "BLOB_BASE", "BLOCK", "BODY", "BOOLEAN", "BOTH", "BOUND", "BULK", "BY", "BYTE", "C", "CALL", "CALLING", "CASCADE", "CASE", "CHAR_BASE", "CHAR", "CHARACTER", "CHARSET", "CHARSETFORM", "CHARSETID", "CHECK", "CLOB_BASE", "CLONE", "CLOSE", "CLUSTER", "CLUSTERS", "COALESCE", "COLAUTH", "COLLECT", "COLUMNS", "COMMENT", "COMMIT", "COMMITTED", "COMPILED", "COMPRESS", "CONNECT", "CONSTANT", "CONSTRUCTOR", "CONTEXT", "CONTINUE", "CONVERT", "COUNT", "CRASH", "CREATE", "CREDENTIAL", "CURRENT", "CURRVAL", "CURSOR", "CUSTOMDATUM", "DANGLING", "DATA", "DATE_BASE", "DATE", "DAY", "DECIMAL", "DEFAULT", "DEFINE", "DELETE", "DESC", "DETERMINISTIC", "DIRECTORY", "DISTINCT", "DO", "DOUBLE", "DROP", "DURATION", "ELEMENT", "ELSIF", "EMPTY", "ESCAPE", "EXCEPTIONS", "EXCLUSIVE", "EXECUTE", "EXISTS", "EXIT", "EXTENDS", "EXTERNAL", "EXTRACT", "FALSE", "FETCH", "FINAL", "FIRST", "FIXED", "FLOAT", "FOR", "FORALL", "FORCE", "FROM", "FUNCTION", "GENERAL", "GOTO", "GRANT", "GROUP", "HASH", "HEAP", "HIDDEN", "HOUR", "IDENTIFIED", "IF", "IMMEDIATE", "IN", "INCLUDING", "INDEX", "INDEXES", "INDICATOR", "INDICES", "INFINITE", "INSTANTIABLE", "INT", "INTEGER", "INTERFACE", "INTERVAL", "INTO", "INVALIDATE", "IS", "ISOLATION", "JAVA", "LANGUAGE", "LARGE", "LEADING", "LENGTH", "LEVEL", "LIBRARY", "LIKE", "LIKE2", "LIKE4", "LIKEC", "LIMITED", "LOCAL", "LOCK", "LONG", "MAP", "MAX", "MAXLEN", "MEMBER", "MERGE", "MIN", "MINUS", "MINUTE", "MLSLABEL", "MOD", "MODE", "MONTH", "MULTISET", "NAME", "NAN", "NATIONAL", "NATIVE", "NATURAL", "NATURALN", "NCHAR", "NEW", "NEXTVAL", "NOCOMPRESS", "NOCOPY", "NOT", "NOWAIT", "NULL", "NULLIF", "NUMBER_BASE", "NUMBER", "OBJECT", "OCICOLL", "OCIDATE", "OCIDATETIME", "OCIDURATION", "OCIINTERVAL", "OCILOBLOCATOR", "OCINUMBER", "OCIRAW", "OCIREF", "OCIREFCURSOR", "OCIROWID", "OCISTRING", "OCITYPE", "OF", "OLD", "ON", "ONLY", "OPAQUE", "OPEN", "OPERATOR", "OPTION", "ORACLE", "ORADATA", "ORDER", "ORGANIZATION", "ORLANY", "ORLVARY", "OTHERS", "OUT", "OVERLAPS", "OVERRIDING", "PACKAGE", "PARALLEL_ENABLE", "PARAMETER", "PARAMETERS", "PARENT", "PARTITION", "PASCAL", "PCTFREE", "PIPE", "PIPELINED", "PLS_INTEGER", "PLUGGABLE", "POSITIVE", "POSITIVEN", "PRAGMA", "PRECISION", "PRIOR", "PRIVATE", "PROCEDURE", "PUBLIC", "RAISE", "RANGE", "RAW", "READ", "REAL", "RECORD", "REF", "REFERENCE", "RELEASE", "RELIES_ON", "REM", "REMAINDER", "RENAME", "RESOURCE", "RESULT_CACHE", "RESULT", "RETURN", "RETURNING", "REVERSE", "REVOKE", "ROLLBACK", "ROW", "ROWID", "ROWNUM", "ROWTYPE", "SAMPLE", "SAVE", "SAVEPOINT", "SB1", "SB2", "SB4", "SECOND", "SEGMENT", "SELF", "SEPARATE", "SEQUENCE", "SERIALIZABLE", "SHARE", "SHORT", "SIZE_T", "SIZE", "SMALLINT", "SOME", "SPACE", "SPARSE", "SQL", "SQLCODE", "SQLDATA", "SQLERRM", "SQLNAME", "SQLSTATE", "STANDARD", "START", "STATIC", "STDDEV", "STORED", "STRING", "STRUCT", "STYLE", "SUBMULTISET", "SUBPARTITION", "SUBSTITUTABLE", "SUBTYPE", "SUCCESSFUL", "SUM", "SYNONYM", "SYSDATE", "TABAUTH", "TABLE", "TDO", "THE", "THEN", "TIME", "TIMESTAMP", "TIMEZONE_ABBR", "TIMEZONE_HOUR", "TIMEZONE_MINUTE", "TIMEZONE_REGION", "TO", "TRAILING", "TRANSACTION", "TRANSACTIONAL", "TRIGGER", "TRUE", "TRUSTED", "TYPE", "UB1", "UB2", "UB4", "UID", "UNDER", "UNIQUE", "UNPLUG", "UNSIGNED", "UNTRUSTED", "USE", "USER", "USING", "VALIDATE", "VALIST", "VALUE", "VARCHAR", "VARCHAR2", "VARIABLE", "VARIANCE", "VARRAY", "VARYING", "VIEW", "VIEWS", "VOID", "WHENEVER", "WHILE", "WITH", "WORK", "WRAPPED", "WRITE", "YEAR", "ZONE"],
            O = ["ADD", "ALTER COLUMN", "ALTER TABLE", "BEGIN", "CONNECT BY", "DECLARE", "DELETE FROM", "DELETE", "END", "EXCEPT", "EXCEPTION", "FETCH FIRST", "FROM", "GROUP BY", "HAVING", "INSERT INTO", "INSERT", "INTERSECT", "LIMIT", "LOOP", "MODIFY", "ORDER BY", "SELECT", "SET CURRENT SCHEMA", "SET SCHEMA", "SET", "START WITH", "UNION ALL", "UNION", "UPDATE", "VALUES", "WHERE"],
            i = ["AND", "CROSS APPLY", "CROSS JOIN", "ELSE", "END", "INNER JOIN", "JOIN", "LEFT JOIN", "LEFT OUTER JOIN", "OR", "OUTER APPLY", "OUTER JOIN", "RIGHT JOIN", "RIGHT OUTER JOIN", "WHEN", "XOR"],
            S = void 0,
            u = function() {
                function e(E) {
                    (0, T["default"])(this, e), this.cfg = E
                }
                return e.prototype.format = function(e) {
                    return S || (S = new A["default"]({
                        reservedWords: I,
                        reservedToplevelWords: O,
                        reservedNewlineWords: i,
                        stringTypes: ['""', "N''", "''", "``"],
                        openParens: ["(", "CASE"],
                        closeParens: [")", "END"],
                        indexedPlaceholderTypes: ["?"],
                        namedPlaceholderTypes: [":"],
                        lineCommentTypes: ["--"],
                        specialWordChars: ["_", "$", "#", ".", "@"]
                    })), new o["default"](this.cfg, S).format(e)
                }, e
            }();
        E["default"] = u, e.exports = E["default"]
    }, function(e, E, t) {
        "use strict";

        function n(e) {
            return e && e.__esModule ? e : {
                "default": e
            }
        }
        E.__esModule = !0;
        var r = t(1),
            T = n(r),
            R = t(4),
            o = n(R),
            N = t(5),
            A = n(N),
            I = ["ACCESSIBLE", "ACTION", "AGAINST", "AGGREGATE", "ALGORITHM", "ALL", "ALTER", "ANALYSE", "ANALYZE", "AS", "ASC", "AUTOCOMMIT", "AUTO_INCREMENT", "BACKUP", "BEGIN", "BETWEEN", "BINLOG", "BOTH", "CASCADE", "CASE", "CHANGE", "CHANGED", "CHARACTER SET", "CHARSET", "CHECK", "CHECKSUM", "COLLATE", "COLLATION", "COLUMN", "COLUMNS", "COMMENT", "COMMIT", "COMMITTED", "COMPRESSED", "CONCURRENT", "CONSTRAINT", "CONTAINS", "CONVERT", "CREATE", "CROSS", "CURRENT_TIMESTAMP", "DATABASE", "DATABASES", "DAY", "DAY_HOUR", "DAY_MINUTE", "DAY_SECOND", "DEFAULT", "DEFINER", "DELAYED", "DELETE", "DESC", "DESCRIBE", "DETERMINISTIC", "DISTINCT", "DISTINCTROW", "DIV", "DO", "DROP", "DUMPFILE", "DUPLICATE", "DYNAMIC", "ELSE", "ENCLOSED", "END", "ENGINE", "ENGINES", "ENGINE_TYPE", "ESCAPE", "ESCAPED", "EVENTS", "EXEC", "EXECUTE", "EXISTS", "EXPLAIN", "EXTENDED", "FAST", "FETCH", "FIELDS", "FILE", "FIRST", "FIXED", "FLUSH", "FOR", "FORCE", "FOREIGN", "FULL", "FULLTEXT", "FUNCTION", "GLOBAL", "GRANT", "GRANTS", "GROUP_CONCAT", "HEAP", "HIGH_PRIORITY", "HOSTS", "HOUR", "HOUR_MINUTE", "HOUR_SECOND", "IDENTIFIED", "IF", "IFNULL", "IGNORE", "IN", "INDEX", "INDEXES", "INFILE", "INSERT", "INSERT_ID", "INSERT_METHOD", "INTERVAL", "INTO", "INVOKER", "IS", "ISOLATION", "KEY", "KEYS", "KILL", "LAST_INSERT_ID", "LEADING", "LEVEL", "LIKE", "LINEAR", "LINES", "LOAD", "LOCAL", "LOCK", "LOCKS", "LOGS", "LOW_PRIORITY", "MARIA", "MASTER", "MASTER_CONNECT_RETRY", "MASTER_HOST", "MASTER_LOG_FILE", "MATCH", "MAX_CONNECTIONS_PER_HOUR", "MAX_QUERIES_PER_HOUR", "MAX_ROWS", "MAX_UPDATES_PER_HOUR", "MAX_USER_CONNECTIONS", "MEDIUM", "MERGE", "MINUTE", "MINUTE_SECOND", "MIN_ROWS", "MODE", "MODIFY", "MONTH", "MRG_MYISAM", "MYISAM", "NAMES", "NATURAL", "NOT", "NOW()", "NULL", "OFFSET", "ON DELETE", "ON UPDATE", "ON", "ONLY", "OPEN", "OPTIMIZE", "OPTION", "OPTIONALLY", "OUTFILE", "PACK_KEYS", "PAGE", "PARTIAL", "PARTITION", "PARTITIONS", "PASSWORD", "PRIMARY", "PRIVILEGES", "PROCEDURE", "PROCESS", "PROCESSLIST", "PURGE", "QUICK", "RAID0", "RAID_CHUNKS", "RAID_CHUNKSIZE", "RAID_TYPE", "RANGE", "READ", "READ_ONLY", "READ_WRITE", "REFERENCES", "REGEXP", "RELOAD", "RENAME", "REPAIR", "REPEATABLE", "REPLACE", "REPLICATION", "RESET", "RESTORE", "RESTRICT", "RETURN", "RETURNS", "REVOKE", "RLIKE", "ROLLBACK", "ROW", "ROWS", "ROW_FORMAT", "SECOND", "SECURITY", "SEPARATOR", "SERIALIZABLE", "SESSION", "SHARE", "SHOW", "SHUTDOWN", "SLAVE", "SONAME", "SOUNDS", "SQL", "SQL_AUTO_IS_NULL", "SQL_BIG_RESULT", "SQL_BIG_SELECTS", "SQL_BIG_TABLES", "SQL_BUFFER_RESULT", "SQL_CACHE", "SQL_CALC_FOUND_ROWS", "SQL_LOG_BIN", "SQL_LOG_OFF", "SQL_LOG_UPDATE", "SQL_LOW_PRIORITY_UPDATES", "SQL_MAX_JOIN_SIZE", "SQL_NO_CACHE", "SQL_QUOTE_SHOW_CREATE", "SQL_SAFE_UPDATES", "SQL_SELECT_LIMIT", "SQL_SLAVE_SKIP_COUNTER", "SQL_SMALL_RESULT", "SQL_WARNINGS", "START", "STARTING", "STATUS", "STOP", "STORAGE", "STRAIGHT_JOIN", "STRING", "STRIPED", "SUPER", "TABLE", "TABLES", "TEMPORARY", "TERMINATED", "THEN", "TO", "TRAILING", "TRANSACTIONAL", "TRUE", "TRUNCATE", "TYPE", "TYPES", "UNCOMMITTED", "UNIQUE", "UNLOCK", "UNSIGNED", "USAGE", "USE", "USING", "VARIABLES", "VIEW", "WHEN", "WITH", "WORK", "WRITE", "YEAR_MONTH"],
            O = ["ADD", "AFTER", "ALTER COLUMN", "ALTER TABLE", "DELETE FROM", "EXCEPT", "FETCH FIRST", "FROM", "GROUP BY", "GO", "HAVING", "INSERT INTO", "INSERT", "INTERSECT", "LIMIT", "MODIFY", "ORDER BY", "SELECT", "SET CURRENT SCHEMA", "SET SCHEMA", "SET", "UNION ALL", "UNION", "UPDATE", "VALUES", "WHERE"],
            i = ["AND", "CROSS APPLY", "CROSS JOIN", "ELSE", "INNER JOIN", "JOIN", "LEFT JOIN", "LEFT OUTER JOIN", "OR", "OUTER APPLY", "OUTER JOIN", "RIGHT JOIN", "RIGHT OUTER JOIN", "WHEN", "XOR"],
            S = void 0,
            u = function() {
                function e(E) {
                    (0, T["default"])(this, e), this.cfg = E
                }
                return e.prototype.format = function(e) {
                    return S || (S = new A["default"]({
                        reservedWords: I,
                        reservedToplevelWords: O,
                        reservedNewlineWords: i,
                        stringTypes: ['""', "N''", "''", "``", "[]"],
                        openParens: ["(", "CASE"],
                        closeParens: [")", "END"],
                        indexedPlaceholderTypes: ["?"],
                        namedPlaceholderTypes: ["@", ":"],
                        lineCommentTypes: ["#", "--"]
                    })), new o["default"](this.cfg, S).format(e)
                }, e
            }();
        E["default"] = u, e.exports = E["default"]
    }, function(e, E, t) {
        var n = t(3),
            r = t(2),
            T = n(r, "DataView");
        e.exports = T
    }, function(e, E, t) {
        var n = t(3),
            r = t(2),
            T = n(r, "Map");
        e.exports = T
    }, function(e, E, t) {
        var n = t(3),
            r = t(2),
            T = n(r, "Promise");
        e.exports = T
    }, function(e, E, t) {
        var n = t(3),
            r = t(2),
            T = n(r, "Set");
        e.exports = T
    }, function(e, E, t) {
        var n = t(2),
            r = n.Symbol;
        e.exports = r
    }, function(e, E, t) {
        var n = t(3),
            r = t(2),
            T = n(r, "WeakMap");
        e.exports = T
    }, function(e, E) {
        function t(e) {
            return e.split("")
        }
        e.exports = t
    }, function(e, E) {
        function t(e, E, t, n) {
            for (var r = e.length, T = t + (n ? 1 : -1); n ? T-- : ++T < r;)
                if (E(e[T], T, e)) return T;
            return -1
        }
        e.exports = t
    }, function(e, E) {
        function t(e) {
            return r.call(e)
        }
        var n = Object.prototype,
            r = n.toString;
        e.exports = t
    }, function(e, E, t) {
        function n(e, E, t) {
            return E === E ? R(e, E, t) : r(e, T, t)
        }
        var r = t(29),
            T = t(32),
            R = t(49);
        e.exports = n
    }, function(e, E) {
        function t(e) {
            return e !== e
        }
        e.exports = t
    }, function(e, E, t) {
        function n(e) {
            if (!R(e) || T(e)) return !1;
            var E = r(e) ? u : A;
            return E.test(o(e))
        }
        var r = t(12),
            T = t(45),
            R = t(6),
            o = t(11),
            N = /[\\^$.*+?()[\]{}|]/g,
            A = /^\[object .+?Constructor\]$/,
            I = Function.prototype,
            O = Object.prototype,
            i = I.toString,
            S = O.hasOwnProperty,
            u = RegExp("^" + i.call(S).replace(N, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$");
        e.exports = n
    }, function(e, E) {
        function t(e, E) {
            var t = "";
            if (!e || 1 > E || E > n) return t;
            do E % 2 && (t += e), E = r(E / 2), E && (e += e); while (E);
            return t
        }
        var n = 9007199254740991,
            r = Math.floor;
        e.exports = t
    }, function(e, E) {
        function t(e, E, t) {
            var n = -1,
                r = e.length;
            0 > E && (E = -E > r ? 0 : r + E), t = t > r ? r : t, 0 > t && (t += r), r = E > t ? 0 : t - E >>> 0, E >>>= 0;
            for (var T = Array(r); ++n < r;) T[n] = e[n + E];
            return T
        }
        e.exports = t
    }, function(e, E, t) {
        function n(e, E, t) {
            var n = e.length;
            return t = void 0 === t ? n : t, E || n > t ? r(e, E, t) : e
        }
        var r = t(35);
        e.exports = n
    }, function(e, E, t) {
        function n(e, E) {
            for (var t = e.length; t-- && r(E, e[t], 0) > -1;);
            return t
        }
        var r = t(31);
        e.exports = n
    }, function(e, E, t) {
        var n = t(2),
            r = n["__core-js_shared__"];
        e.exports = r
    }, function(e, E) {
        (function(E) {
            var t = "object" == typeof E && E && E.Object === Object && E;
            e.exports = t
        }).call(E, function() {
            return this
        }())
    }, function(e, E, t) {
        var n = t(22),
            r = t(23),
            T = t(24),
            R = t(25),
            o = t(27),
            N = t(30),
            A = t(11),
            I = "[object Map]",
            O = "[object Object]",
            i = "[object Promise]",
            S = "[object Set]",
            u = "[object WeakMap]",
            L = "[object DataView]",
            C = Object.prototype,
            s = C.toString,
            a = A(n),
            f = A(r),
            c = A(T),
            p = A(R),
            l = A(o),
            D = N;
        (n && D(new n(new ArrayBuffer(1))) != L || r && D(new r) != I || T && D(T.resolve()) != i || R && D(new R) != S || o && D(new o) != u) && (D = function(e) {
            var E = s.call(e),
                t = E == O ? e.constructor : void 0,
                n = t ? A(t) : void 0;
            if (n) switch (n) {
                case a:
                    return L;
                case f:
                    return I;
                case c:
                    return i;
                case p:
                    return S;
                case l:
                    return u
            }
            return E
        }), e.exports = D
    }, function(e, E) {
        function t(e, E) {
            return null == e ? void 0 : e[E]
        }
        e.exports = t
    }, function(e, E) {
        function t(e) {
            return N.test(e)
        }
        var n = "\\ud800-\\udfff",
            r = "\\u0300-\\u036f\\ufe20-\\ufe23",
            T = "\\u20d0-\\u20f0",
            R = "\\ufe0e\\ufe0f",
            o = "\\u200d",
            N = RegExp("[" + o + n + r + T + R + "]");
        e.exports = t
    }, function(e, E) {
        function t(e, E) {
            return E = null == E ? n : E, !!E && ("number" == typeof e || r.test(e)) && e > -1 && e % 1 == 0 && E > e
        }
        var n = 9007199254740991,
            r = /^(?:0|[1-9]\d*)$/;
        e.exports = t
    }, function(e, E, t) {
        function n(e, E, t) {
            if (!o(t)) return !1;
            var n = typeof E;
            return !!("number" == n ? T(t) && R(E, t.length) : "string" == n && E in t) && r(t[E], e)
        }
        var r = t(52),
            T = t(8),
            R = t(43),
            o = t(6);
        e.exports = n
    }, function(e, E, t) {
        function n(e) {
            return !!T && T in e
        }
        var r = t(38),
            T = function() {
                var e = /[^.]+$/.exec(r && r.keys && r.keys.IE_PROTO || "");
                return e ? "Symbol(src)_1." + e : ""
            }();
        e.exports = n
    }, function(e, E) {
        function t(e) {
            var E = e && e.constructor,
                t = "function" == typeof E && E.prototype || n;
            return e === t
        }
        var n = Object.prototype;
        e.exports = t
    }, function(e, E, t) {
        var n = t(48),
            r = n(Object.keys, Object);
        e.exports = r
    }, function(e, E) {
        function t(e, E) {
            return function(t) {
                return e(E(t))
            }
        }
        e.exports = t
    }, function(e, E) {
        function t(e, E, t) {
            for (var n = t - 1, r = e.length; ++n < r;)
                if (e[n] === E) return n;
            return -1
        }
        e.exports = t
    }, function(e, E, t) {
        function n(e) {
            return T(e) ? R(e) : r(e)
        }
        var r = t(28),
            T = t(42),
            R = t(51);
        e.exports = n
    }, function(e, E) {
        function t(e) {
            return e.match(c) || []
        }
        var n = "\\ud800-\\udfff",
            r = "\\u0300-\\u036f\\ufe20-\\ufe23",
            T = "\\u20d0-\\u20f0",
            R = "\\ufe0e\\ufe0f",
            o = "[" + n + "]",
            N = "[" + r + T + "]",
            A = "\\ud83c[\\udffb-\\udfff]",
            I = "(?:" + N + "|" + A + ")",
            O = "[^" + n + "]",
            i = "(?:\\ud83c[\\udde6-\\uddff]){2}",
            S = "[\\ud800-\\udbff][\\udc00-\\udfff]",
            u = "\\u200d",
            L = I + "?",
            C = "[" + R + "]?",
            s = "(?:" + u + "(?:" + [O, i, S].join("|") + ")" + C + L + ")*",
            a = C + L + s,
            f = "(?:" + [O + N + "?", N, i, S, o].join("|") + ")",
            c = RegExp(A + "(?=" + A + ")|" + f + a, "g");
        e.exports = t
    }, function(e, E) {
        function t(e, E) {
            return e === E || e !== e && E !== E
        }
        e.exports = t
    }, function(e, E, t) {
        function n(e) {
            return e = r(e), e && R.test(e) ? e.replace(T, "\\$&") : e
        }
        var r = t(9),
            T = /[\\^$.*+?()[\]{}|]/g,
            R = RegExp(T.source);
        e.exports = n
    }, function(e, E, t) {
        function n(e) {
            return r(e) && o.call(e, "callee") && (!A.call(e, "callee") || N.call(e) == T)
        }
        var r = t(56),
            T = "[object Arguments]",
            R = Object.prototype,
            o = R.hasOwnProperty,
            N = R.toString,
            A = R.propertyIsEnumerable;
        e.exports = n
    }, function(e, E) {
        var t = Array.isArray;
        e.exports = t
    }, function(e, E, t) {
        function n(e) {
            return T(e) && r(e)
        }
        var r = t(8),
            T = t(13);
        e.exports = n
    }, function(e, E, t) {
        (function(e) {
            var n = t(2),
                r = t(62),
                T = "object" == typeof E && E && !E.nodeType && E,
                R = T && "object" == typeof e && e && !e.nodeType && e,
                o = R && R.exports === T,
                N = o ? n.Buffer : void 0,
                A = N ? N.isBuffer : void 0,
                I = A || r;
            e.exports = I
        }).call(E, t(67)(e))
    }, function(e, E, t) {
        function n(e) {
            if (o(e) && (R(e) || "string" == typeof e || "function" == typeof e.splice || N(e) || T(e))) return !e.length;
            var E = r(e);
            if (E == O || E == i) return !e.size;
            if (A(e)) return !I(e).length;
            for (var t in e)
                if (u.call(e, t)) return !1;
            return !0
        }
        var r = t(40),
            T = t(54),
            R = t(55),
            o = t(8),
            N = t(57),
            A = t(46),
            I = t(47),
            O = "[object Map]",
            i = "[object Set]",
            S = Object.prototype,
            u = S.hasOwnProperty;
        e.exports = n
    }, function(e, E) {
        function t(e) {
            return "number" == typeof e && e > -1 && e % 1 == 0 && n >= e
        }
        var n = 9007199254740991;
        e.exports = t
    }, function(e, E) {
        function t(e) {
            var E = e ? e.length : 0;
            return E ? e[E - 1] : void 0
        }
        e.exports = t
    }, function(e, E, t) {
        function n(e, E, t) {
            return E = (t ? T(e, E, t) : void 0 === E) ? 1 : R(E), r(o(e), E)
        }
        var r = t(34),
            T = t(44),
            R = t(64),
            o = t(9);
        e.exports = n
    }, function(e, E) {
        function t() {
            return !1
        }
        e.exports = t
    }, function(e, E, t) {
        function n(e) {
            if (!e) return 0 === e ? e : 0;
            if (e = r(e), e === T || e === -T) {
                var E = 0 > e ? -1 : 1;
                return E * R
            }
            return e === e ? e : 0
        }
        var r = t(65),
            T = 1 / 0,
            R = 1.7976931348623157e308;
        e.exports = n
    }, function(e, E, t) {
        function n(e) {
            var E = r(e),
                t = E % 1;
            return E === E ? t ? E - t : E : 0
        }
        var r = t(63);
        e.exports = n
    }, function(e, E, t) {
        function n(e) {
            if ("number" == typeof e) return e;
            if (T(e)) return R;
            if (r(e)) {
                var E = "function" == typeof e.valueOf ? e.valueOf() : e;
                e = r(E) ? E + "" : E
            }
            if ("string" != typeof e) return 0 === e ? e : +e;
            e = e.replace(o, "");
            var t = A.test(e);
            return t || I.test(e) ? O(e.slice(2), t ? 2 : 8) : N.test(e) ? R : +e
        }
        var r = t(6),
            T = t(14),
            R = NaN,
            o = /^\s+|\s+$/g,
            N = /^[-+]0x[0-9a-f]+$/i,
            A = /^0b[01]+$/i,
            I = /^0o[0-7]+$/i,
            O = parseInt;
        e.exports = n
    }, function(e, E, t) {
        function n(e, E, t) {
            if (e = N(e), e && (t || void 0 === E)) return e.replace(A, "");
            if (!e || !(E = r(E))) return e;
            var n = o(e),
                I = R(n, o(E)) + 1;
            return T(n, 0, I).join("")
        }
        var r = t(10),
            T = t(36),
            R = t(37),
            o = t(50),
            N = t(9),
            A = /\s+$/;
        e.exports = n
    }, function(e, E) {
        e.exports = function(e) {
            return e.webpackPolyfill || (e.deprecate = function() {}, e.paths = [], e.children = [], e.webpackPolyfill = 1), e
        }
    }])
});

function escape2Html(str) {
    var arrEntities = {
        'lt': '<',
        'gt': '>',
        'nbsp': '',
        'amp': '&',
        'quot': '"'
    };
    return str.replace(/&(lt|gt|nbsp|amp|quot);/ig, function(all, t) {
        return arrEntities[t];
    });
}

function load() {
    let codeList = document.getElementsByTagName('code');

    for (let i = 0; i < codeList.length; i++) {
        codeList[i].innerHTML = window.sqlFormatter.format(escape2Html(codeList[i].innerHTML))
    }
};
