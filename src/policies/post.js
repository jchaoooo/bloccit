// #1
const ApplicationPolicy = require("./application");

module.exports = class PostPolicy extends ApplicationPolicy {

//member or admin
 new() {
   return (this.user != null || this._isAdmin());
 }

//member or admin
 create() {
   return (this.user != null || this._isAdmin());
 }

//all
 show() {
   return true;
 }

//owner or admin
 edit() {
   return this.user != null &&
     this.record && (this._isOwner() || this._isAdmin());
 }

//owner or admin
 update() {
   return this.edit();
 }

//owner or admin
 destroy() {
   return this.update();
 }
}
