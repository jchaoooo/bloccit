const ApplicationPolicy = require('./application');

module.exports = class TopicPolicy extends ApplicationPolicy {
    new() {
        return this.user != null;
    }

    create() {
        return this.user != null;
    }

    edit() {
        return this._isAdmin() || this._isOwner();
    }

    update() {
        return this.edit();
    }

    destroy() {
        return this.update();
    }
}
