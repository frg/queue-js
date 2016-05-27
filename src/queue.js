module.exports = function (doSomething) {
    this.pendingQ = [];
    this.hotQ = [];
    this._doSomething = doSomething;
    
    this.doSomething = function () {
        console.info('[q]: doSomething called');
        // move pendingQ
        this.hotQ = this.pendingQ.slice();
        // call original doSomething
        this._doSomething.call(this, this.hotQ, function () {
            console.info('[q]: Success', this.hotQ);
            // success callback
            removeElements(this.pendingQ, this.hotQ);

            // once done check if there are elements in q
            if (this.pendingQ.length > 0) {
                this.doSomething();
            }
        }.bind(this), function () {
            console.info('[q]: Failed');
            // fail callback
            this.doSomething();
        }.bind(this));
    }

    this.push = function (obj) {
        var initialLength = this.pendingQ.length;
        
        if (obj instanceof Array) {
            this.pendingQ = this.pendingQ.concat(obj);
        } else {
            this.pendingQ.push(obj);
        }
        
        // if q is empty doSomething
        if (initialLength === 0) {
            console.info('[q]: Initial Q call');
            this.doSomething();
        }

        return this;
    }

    return this;

    function removeElements(arr1, arr2) {
        for (var i = 0, len = arr2.length; i < len; i++) {
            var index = arr1.indexOf(arr2[i]);
            if (index > -1) {
                arr1.splice(index, 1);
            }
        }
    }
}