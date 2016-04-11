var System;
(function (System) {
    var Guid = (function () {
        function Guid(guid) {
            this._guid = guid;
        }
        Guid.prototype.equals = function (other) {
            return this._guid == other.toString();
        };
        Guid.prototype.toString = function () {
            return this._guid;
        };
        Guid.MakeNew = function () {
            var result;
            var i;
            var j;
            result = "";
            for (j = 0; j < 32; j++) {
                if (j == 8 || j == 12 || j == 16 || j == 20)
                    result = result + '-';
                i = Math.floor(Math.random() * 16).toString(16).toUpperCase();
                result = result + i;
            }
            return new Guid(result);
        };
        return Guid;
    }());
    System.Guid = Guid;
})(System || (System = {}));
