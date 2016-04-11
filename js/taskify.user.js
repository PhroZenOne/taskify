var Taskify;
(function (Taskify) {
    var User = (function () {
        function User(userid, username) {
            this.userid = userid;
            this.username = username;
        }
        return User;
    }());
    Taskify.User = User;
})(Taskify || (Taskify = {}));
