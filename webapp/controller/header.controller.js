sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageToast",
    "sap/ui/thirdparty/jquery"
], (Controller, JSONModel, MessageToast, jQuery) => {
    "use strict";

    return Controller.extend("znrgp.controller.header", {

        onInit() {

             var oRouter = this.getOwnerComponent().getRouter();
            const sDocNo = oRouter.getRoute("Routehome").attachPatternMatched(this._onRouteMatched, this);

        },
        _onRouteMatched(){
               const oSmartTable = this.byId("headerTable");
               oSmartTable.rebindTable();
        
        },
        onEditPage(oEvent){ 
        var oBindingContext = oEvent.getSource().getParent().getParent().getBindingContext();
        var sDocumentNo = oBindingContext.getProperty("DocumentNo");
        console.log("Document Number:", sDocumentNo);
            const router1 = this.getOwnerComponent().getRouter();
            if(router1){
            router1.navTo("Routenrgp",{
            docNo : sDocumentNo 
        })
            }
        },
        onNavigate(){
            const router1 = this.getOwnerComponent().getRouter();
            if(router1){
             router1.navTo("Routenrgp",{
              docNo : "0"
        })
            }
        },
    });
});