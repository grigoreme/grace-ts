'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */

function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

function unwrapExports (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x.default : x;
}

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var C__Users_Grigore_Desktop_Work_tester_dist = createCommonjsModule(function (module, exports) {

Object.defineProperty(exports, '__esModule', { value: true });

class Tester {
    constructor() { }
}

// tslint:disable-next-line: function-name
function SafePath(path) {
    const option = (option) => {
        const result = path.split(option)[1];
        return (result ? `${option}/${result}` : '').replace(/(\/\\)|(\/\/)/g, '/');
    };
    return option('dist') || option('src') || path || '';
}

// tslint:disable-next-line: function-name
function Test(func, _input, _output, context, propertyKey) {
    const toArray = (item) => Array.isArray(item) ? item : [item];
    const input = toArray(_input);
    const output = toArray(_output);
    const result = func.call(context, ...input);
    if (JSON.stringify(output) !== JSON.stringify(result)) {
        console.error(`Unit testing failed for ${String(propertyKey)} inside ${SafePath(__filename)}.
  Expected: `, output, '\n  Returned: ', result);
    }
}

/**
 * Unit testing target function.
 */
// tslint:disable-next-line: function-name
function UnitTest(userInput, userOutput, context = {}) {
    return function (target, propertyKey, descriptor) {
        Test(descriptor.value, userInput, userOutput, context, propertyKey);
        return descriptor;
    };
}

exports.Tester = Tester;
exports.UnitTest = UnitTest;
});

unwrapExports(C__Users_Grigore_Desktop_Work_tester_dist);
var C__Users_Grigore_Desktop_Work_tester_dist_1 = C__Users_Grigore_Desktop_Work_tester_dist.Tester;
var C__Users_Grigore_Desktop_Work_tester_dist_2 = C__Users_Grigore_Desktop_Work_tester_dist.UnitTest;

class ObjectKeys {
    constructor() { }
    objectKeys(obj) {
        return Object.keys(obj);
    }
}
__decorate([
    C__Users_Grigore_Desktop_Work_tester_dist_2({ key1: true }, ['key1', 'key2'])
], ObjectKeys.prototype, "objectKeys", null);

exports.ObjectKeys = ObjectKeys;
