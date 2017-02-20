var LZString = function() {
	function endsWith(str, i) {
		if (!parent[str]) {
			parent[str] = {};
			var tailPos = 0;
			for (;tailPos < str.length;tailPos++) {
				parent[str][str.charAt(tailPos)] = tailPos;
			}
		}
		return parent[str][i];
	}
	var stringFromCharCode = String.fromCharCode;
	var str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
	var response = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+-$";
	var parent = {};
	var self = {
		compressToBase64 : function(input) {
			if (input == null) {
				return "";
			}
			var output = self._compress(input, 6, function(p) {
				return str.charAt(p);
			});
			switch(output.length % 4) {
				default:
				;
				case 0:
					return output;
				case 1:
					return output + "===";
				case 2:
					return output + "==";
				case 3:
					return output + "=";
			}
		},
		decompressFromBase64 : function(input) {
			if (input == null) {
				return "";
			}
			if (input == "") {
				return null;
			}
			return self._decompress(input.length, 32, function(j) {
				return endsWith(str, input.charAt(j));
			});
		},
		compressToUTF16 : function(input) {
			if (input == null) {
				return "";
			}
			return self._compress(input, 15, function(dataAndEvents) {
				return stringFromCharCode(dataAndEvents + 32);
			}) + " ";
		},
		decompressFromUTF16 : function(input) {
			if (input == null) {
				return "";
			}
			if (input == "") {
				return null;
			}
			return self._decompress(input.length, 16384, function(n) {
				return input.charCodeAt(n) - 32;
			});
		},
		compressToUint8Array : function(str) {
			var input = self.compress(str);
			var data = new Uint8Array(input.length * 2);
			var i = 0;
			var il = input.length;
			for (;i < il;i++) {
				var c = input.charCodeAt(i);
				data[i * 2] = c >>> 8;
				data[i * 2 + 1] = c % 256;
			}
			return data;
		},
		decompressFromUint8Array : function(output) {
			if (output === null || output === undefined) {
				return self.decompress(output);
			} else {
				var values = new Array(output.length / 2);
				var i = 0;
				var valuesLen = values.length;
				for (;i < valuesLen;i++) {
					values[i] = output[i * 2] * 256 + output[i * 2 + 1];
				}
				var rulesets = [];
				values.forEach(function(paths) {
					rulesets.push(stringFromCharCode(paths));
				});
				return self.decompress(rulesets.join(""));
			}
		},
		compressToEncodedURIComponent : function(sig) {
			if (sig == null) {
				return "";
			}
			return self._compress(sig, 6, function(index2) {
				return response.charAt(index2);
			});
		},
		decompressFromEncodedURIComponent : function(line) {
			if (line == null) {
				return "";
			}
			if (line == "") {
				return null;
			}
			line = line.replace(/ /g, "+");
			return self._decompress(line.length, 32, function(idx) {
				return endsWith(response, line.charAt(idx));
			});
		},
		compress : function(source) {
			return self._compress(source, 16, function(opt_e) {
				return stringFromCharCode(opt_e);
			});
		},
		_compress : function(s, opt_attributes, f) {
			if (s == null) {
				return "";
			}
			var j;
			var value;
			var holder = {};
			var old = {};
			var i = "";
			var key = "";
			var name = "";
			var v = 2;
			var count = 3;
			var k = 2;
			var accum = [];
			var context_data_val = 0;
			var context_data_position = 0;
			var n;
			n = 0;
			for (;n < s.length;n += 1) {
				i = s.charAt(n);
				if (!Object.prototype.hasOwnProperty.call(holder, i)) {
					holder[i] = count++;
					old[i] = true;
				}
				key = name + i;
				if (Object.prototype.hasOwnProperty.call(holder, key)) {
					name = key;
				} else {
					if (Object.prototype.hasOwnProperty.call(old, name)) {
						if (name.charCodeAt(0) < 256) {
							j = 0;
							for (;j < k;j++) {
								context_data_val = context_data_val << 1;
								if (context_data_position == opt_attributes - 1) {
									context_data_position = 0;
									accum.push(f(context_data_val));
									context_data_val = 0;
								} else {
									context_data_position++;
								}
							}
							value = name.charCodeAt(0);
							j = 0;
							for (;j < 8;j++) {
								context_data_val = context_data_val << 1 | value & 1;
								if (context_data_position == opt_attributes - 1) {
									context_data_position = 0;
									accum.push(f(context_data_val));
									context_data_val = 0;
								} else {
									context_data_position++;
								}
								value = value >> 1;
							}
						} else {
							value = 1;
							j = 0;
							for (;j < k;j++) {
								context_data_val = context_data_val << 1 | value;
								if (context_data_position == opt_attributes - 1) {
									context_data_position = 0;
									accum.push(f(context_data_val));
									context_data_val = 0;
								} else {
									context_data_position++;
								}
								value = 0;
							}
							value = name.charCodeAt(0);
							j = 0;
							for (;j < 16;j++) {
								context_data_val = context_data_val << 1 | value & 1;
								if (context_data_position == opt_attributes - 1) {
									context_data_position = 0;
									accum.push(f(context_data_val));
									context_data_val = 0;
								} else {
									context_data_position++;
								}
								value = value >> 1;
							}
						}
						v--;
						if (v == 0) {
							v = Math.pow(2, k);
							k++;
						}
						delete old[name];
					} else {
						value = holder[name];
						j = 0;
						for (;j < k;j++) {
							context_data_val = context_data_val << 1 | value & 1;
							if (context_data_position == opt_attributes - 1) {
								context_data_position = 0;
								accum.push(f(context_data_val));
								context_data_val = 0;
							} else {
								context_data_position++;
							}
							value = value >> 1;
						}
					}
					v--;
					if (v == 0) {
						v = Math.pow(2, k);
						k++;
					}
					holder[key] = count++;
					name = String(i);
				}
			}
			if (name !== "") {
				if (Object.prototype.hasOwnProperty.call(old, name)) {
					if (name.charCodeAt(0) < 256) {
						j = 0;
						for (;j < k;j++) {
							context_data_val = context_data_val << 1;
							if (context_data_position == opt_attributes - 1) {
								context_data_position = 0;
								accum.push(f(context_data_val));
								context_data_val = 0;
							} else {
								context_data_position++;
							}
						}
						value = name.charCodeAt(0);
						j = 0;
						for (;j < 8;j++) {
							context_data_val = context_data_val << 1 | value & 1;
							if (context_data_position == opt_attributes - 1) {
								context_data_position = 0;
								accum.push(f(context_data_val));
								context_data_val = 0;
							} else {
								context_data_position++;
							}
							value = value >> 1;
						}
					} else {
						value = 1;
						j = 0;
						for (;j < k;j++) {
							context_data_val = context_data_val << 1 | value;
							if (context_data_position == opt_attributes - 1) {
								context_data_position = 0;
								accum.push(f(context_data_val));
								context_data_val = 0;
							} else {
								context_data_position++;
							}
							value = 0;
						}
						value = name.charCodeAt(0);
						j = 0;
						for (;j < 16;j++) {
							context_data_val = context_data_val << 1 | value & 1;
							if (context_data_position == opt_attributes - 1) {
								context_data_position = 0;
								accum.push(f(context_data_val));
								context_data_val = 0;
							} else {
								context_data_position++;
							}
							value = value >> 1;
						}
					}
					v--;
					if (v == 0) {
						v = Math.pow(2, k);
						k++;
					}
					delete old[name];
				} else {
					value = holder[name];
					j = 0;
					for (;j < k;j++) {
						context_data_val = context_data_val << 1 | value & 1;
						if (context_data_position == opt_attributes - 1) {
							context_data_position = 0;
							accum.push(f(context_data_val));
							context_data_val = 0;
						} else {
							context_data_position++;
						}
						value = value >> 1;
					}
				}
				v--;
				if (v == 0) {
					v = Math.pow(2, k);
					k++;
				}
			}
			value = 2;
			j = 0;
			for (;j < k;j++) {
				context_data_val = context_data_val << 1 | value & 1;
				if (context_data_position == opt_attributes - 1) {
					context_data_position = 0;
					accum.push(f(context_data_val));
					context_data_val = 0;
				} else {
					context_data_position++;
				}
				value = value >> 1;
			}
			for (;true;) {
				context_data_val = context_data_val << 1;
				if (context_data_position == opt_attributes - 1) {
					accum.push(f(context_data_val));
					break;
				} else {
					context_data_position++;
				}
			}
			return accum.join("");
		},
		decompress : function(input) {
			if (input == null) {
				return "";
			}
			if (input == "") {
				return null;
			}
			return self._decompress(input.length, 32768, function(n) {
				return input.charCodeAt(n);
			});
		},
		_decompress : function(i, opt_attributes, $timeout) {
			var res = [];
			var mode;
			var right = 4;
			var resLength = 4;
			var exponent = 3;
			var tmp = "";
			var buffer = [];
			var key;
			var fn;
			var value;
			var resb;
			var n;
			var cfdbname;
			var val;
			var data = {
				val : $timeout(0),
				position : opt_attributes,
				index : 1
			};
			key = 0;
			for (;key < 3;key += 1) {
				res[key] = key;
			}
			value = 0;
			n = Math.pow(2, 2);
			cfdbname = 1;
			for (;cfdbname != n;) {
				resb = data.val & data.position;
				data.position >>= 1;
				if (data.position == 0) {
					data.position = opt_attributes;
					data.val = $timeout(data.index++);
				}
				value |= (resb > 0 ? 1 : 0) * cfdbname;
				cfdbname <<= 1;
			}
			switch(mode = value) {
				case 0:
					value = 0;
					n = Math.pow(2, 8);
					cfdbname = 1;
					for (;cfdbname != n;) {
						resb = data.val & data.position;
						data.position >>= 1;
						if (data.position == 0) {
							data.position = opt_attributes;
							data.val = $timeout(data.index++);
						}
						value |= (resb > 0 ? 1 : 0) * cfdbname;
						cfdbname <<= 1;
					}
					val = stringFromCharCode(value);
					break;
				case 1:
					value = 0;
					n = Math.pow(2, 16);
					cfdbname = 1;
					for (;cfdbname != n;) {
						resb = data.val & data.position;
						data.position >>= 1;
						if (data.position == 0) {
							data.position = opt_attributes;
							data.val = $timeout(data.index++);
						}
						value |= (resb > 0 ? 1 : 0) * cfdbname;
						cfdbname <<= 1;
					}
					val = stringFromCharCode(value);
					break;
				case 2:
					return "";
			}
			res[3] = val;
			fn = val;
			buffer.push(val);
			for (;true;) {
				if (data.index > i) {
					return "";
				}
				value = 0;
				n = Math.pow(2, exponent);
				cfdbname = 1;
				for (;cfdbname != n;) {
					resb = data.val & data.position;
					data.position >>= 1;
					if (data.position == 0) {
						data.position = opt_attributes;
						data.val = $timeout(data.index++);
					}
					value |= (resb > 0 ? 1 : 0) * cfdbname;
					cfdbname <<= 1;
				}
				switch(val = value) {
					case 0:
						value = 0;
						n = Math.pow(2, 8);
						cfdbname = 1;
						for (;cfdbname != n;) {
							resb = data.val & data.position;
							data.position >>= 1;
							if (data.position == 0) {
								data.position = opt_attributes;
								data.val = $timeout(data.index++);
							}
							value |= (resb > 0 ? 1 : 0) * cfdbname;
							cfdbname <<= 1;
						}
						res[resLength++] = stringFromCharCode(value);
						val = resLength - 1;
						right--;
						break;
					case 1:
						value = 0;
						n = Math.pow(2, 16);
						cfdbname = 1;
						for (;cfdbname != n;) {
							resb = data.val & data.position;
							data.position >>= 1;
							if (data.position == 0) {
								data.position = opt_attributes;
								data.val = $timeout(data.index++);
							}
							value |= (resb > 0 ? 1 : 0) * cfdbname;
							cfdbname <<= 1;
						}
						res[resLength++] = stringFromCharCode(value);
						val = resLength - 1;
						right--;
						break;
					case 2:
						return buffer.join("");
				}
				if (right == 0) {
					right = Math.pow(2, exponent);
					exponent++;
				}
				if (res[val]) {
					tmp = res[val];
				} else {
					if (val === resLength) {
						tmp = fn + fn.charAt(0);
					} else {
						return null;
					}
				}
				buffer.push(tmp);
				res[resLength++] = fn + tmp.charAt(0);
				right--;
				fn = tmp;
				if (right == 0) {
					right = Math.pow(2, exponent);
					exponent++;
				}
			}
		}
	};
	return self;
}();

