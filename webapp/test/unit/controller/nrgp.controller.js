/*global QUnit*/

sap.ui.define([
	"znrgp/controller/nrgp.controller"
], function (Controller) {
	"use strict";

	QUnit.module("nrgp Controller");

	QUnit.test("I should test the nrgp controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});
