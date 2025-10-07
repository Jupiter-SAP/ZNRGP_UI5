sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/odata/v2/ODataModel",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/ui/comp/valuehelpdialog/ValueHelpDialog",
    "sap/ui/comp/filterbar/FilterBar",
    "sap/ui/comp/filterbar/FilterGroupItem",
    "sap/ui/Device",
    "sap/m/BusyDialog",
    "sap/m/MessageToast",
    "sap/m/Input"
], function (
    Controller, JSONModel, ODataModel, Filter, FilterOperator,
    ValueHelpDialog, FilterBar, FilterGroupItem, Device, BusyDialog, MessageToast, Input
) {
    "use strict";

    return Controller.extend("znrgp.controller.nrgp", {

        onInit: function () {
          
            var oRouter = this.getOwnerComponent().getRouter();
            const sDocNo = oRouter.getRoute("Routenrgp").attachPatternMatched(this._onRouteMatched, this);

        //     this.btnModel = new JSONModel({
        //     visibility : false
        //     });
        //     this.getView().setModel(this.btnModel,"visibilityModel");

        //     let document = sDocNo._oRouter.oHashChanger.hash.substring(5);
        //     document = String(document);

        //      if(document.length === 10){
                
        //        this.getView().getModel("visibilityModel").setProperty("/visibility", false);

        //         const sPath = `/ZC_GATE_NRGP_HDR(DocumentNo='${document}')`; 
           
        //         var oModel = new ODataModel("/sap/opu/odata/sap/ZSB_GATE/");
        //         oModel.read(sPath, {
        //             success: function (oData) {
        
        //             const oViewModel = new JSONModel(oData);
        //             this.getView().setModel(oViewModel, "HEADER");
        //     }.bind(this),
        //             error: function (oError) {
        //             console.error("Read failed:", oError);
        //     }
        // });

        //        const oModel2 = new ODataModel("/sap/opu/odata/sap/ZSB_GATE/");

        //         oModel2.read("/zc_nrgp_item2", {
        //             filters: [
        //                 new sap.ui.model.Filter("DocumentNo", sap.ui.model.FilterOperator.EQ, document)
        //             ],
        //             success: function (oData2) {
        //                 const DetailsModel = new sap.ui.model.json.JSONModel({ Items: oData2.results });
        //                 this.getView().setModel(DetailsModel, "DETAILS");
        //                 console.log("Records loaded:", oData2.results);
        //             }.bind(this),
        //             error: function (oError2) {
        //                 console.error("Read failed:", oError2);
        //             }
        //         });

        //  }       
        //  if(document === 0) {
        //     debugger
        //     const oHeaderModel = new JSONModel({
        //         Plant: "", NRGPNo: "", NRGPDate: "", Loaction: "", Status: "",
        //         Partner: "", PatnerCode: "", PatnerName: "", Address1: "",
        //         Address2: "", StateCode: "", Pin: "", Description1: "", Description2: ""
        //     });
        //     this.getView().setModel(oHeaderModel, "HEADER");
        //     this.getView().getModel("visibilityModel").setProperty("/visibility", true);
       
        //     const newDate = new Date();
        //     const presentDate = newDate.toISOString().slice(0, 10).replace(/-/g, '');

        //     this.getView().getModel("HEADER").setProperty("/NRGPDate", presentDate);

        //     const oDetailsModel = new JSONModel({ Items: [] });
        //     this.getView().setModel(oDetailsModel, "DETAILS");

        //     const oODataModel = new ODataModel("/sap/opu/odata/sap/ZSB_GATE");
        //     this.getView().setModel(oODataModel, "nrgp");

        //     this.getView().getModel("HEADER").refresh(true);
        //     this.getView().getModel("DETAILS").refresh(true);
        // }
        //     console.log(this.getView().getModel("visibilityModel").getProperty("/visibility"))
        },

        _onRouteMatched: function (oEvent) {
            var oArgs = oEvent.getParameter("arguments");
            var document = oArgs.docNo;
            this.btnModel = new JSONModel({
            visibility : false,
            editability : false
            });
            this.getView().setModel(this.btnModel,"visibilityModel");
            console.log( this.getView().getModel("visibilityModel"))
            console.log(document)

             if(document.length === 10){
                
               this.getView().getModel("visibilityModel").setProperty("/visibility", false);
               this.getView().getModel("visibilityModel").setProperty("/editability", false);

                const sPath = `/ZC_GATE_NRGP_HDR(DocumentNo='${document}')`; 
           
                var oModel = new ODataModel("/sap/opu/odata/sap/ZSB_GATE/");
                oModel.read(sPath, {
                    success: function (oData) {
                    console.log(oData);
                    const oViewModel = new JSONModel(oData);
                    this.getView().setModel(oViewModel, "HEADER");
            }.bind(this),
                    error: function (oError) {
                    console.error("Read failed:", oError);
            }
        });

                const oModel2 = new ODataModel("/sap/opu/odata/sap/ZSB_GATE/");

                oModel2.read("/zc_nrgp_item2", {
                    filters: [
                        new sap.ui.model.Filter("DocumentNo", sap.ui.model.FilterOperator.EQ, document)
                    ],
                    success: function (oData2) {
                        const DetailsModel = new sap.ui.model.json.JSONModel({ Items: oData2.results });
                        this.getView().setModel(DetailsModel, "DETAILS");
                        console.log("Records loaded:", oData2.results);
                    }.bind(this),
                    error: function (oError2) {
                        console.error("Read failed:", oError2);
                    }
                });

         }       
         if(document.length === 1) {
   
            const oHeaderModel = new JSONModel({
                Plant: "", DocumentNo: "", NRGPDate: "", FromStorageLoc: "", Status: "",
                PartnerType: "", PartnerCode: "", PartnerName: "", Addr1: "",
                Addr2: "", StateCode: "", Pin: "", Description1: "", Description2: ""
            });
            this.getView().setModel(oHeaderModel, "HEADER");
            this.getView().getModel("visibilityModel").setProperty("/visibility", true);
            this.getView().getModel("visibilityModel").setProperty("/editability", true);
       
            const newDate = new Date();
            const presentDate = newDate.toISOString().slice(0, 10).replace(/-/g, '');

            this.getView().getModel("HEADER").setProperty("/NRGPDate", presentDate);

            const oDetailsModel = new JSONModel({ Items: [] });
            this.getView().setModel(oDetailsModel, "DETAILS");

            const oODataModel = new ODataModel("/sap/opu/odata/sap/ZSB_GATE");
            this.getView().setModel(oODataModel, "nrgp");

            this.getView().getModel("HEADER").refresh(true);
            this.getView().getModel("DETAILS").refresh(true);
        }
            console.log(this.getView().getModel("visibilityModel").getProperty("/visibility"))
            
},

        /* ======================== PARTNER VALUE HELP ======================== */
        onValueHelpPartner: async function (oEvt) {
            this._oCurrentInput = oEvt.getSource();
            const oView = this.getView();
            const sPartnerType = oView.byId("Partner").getSelectedKey();
            if (sPartnerType !== "Vendor" && sPartnerType !== "Customer") {
                MessageToast.show("Partner Code value help is only available for Vendors or Customers");
                return;
            }

            const oBusy = new BusyDialog({ text: "Loading..." });
            oBusy.open();

            if (!this._oPartnerVH) {
                const that = this;
                this._oPartnerVH = new ValueHelpDialog("PartnerVH", {
                    supportMultiselect: false,
                    key: "PartnerCode",
                    descriptionKey: "PartnerName",
                    stretch: Device.system.phone,
                    ok: function (oEvt) {
                        const aTokens = oEvt.getParameter("tokens");
                        if (aTokens && aTokens.length) {
                            const oSel = aTokens[0].getCustomData()[0].getValue();
                            oView.byId("PatnerCode").setValue(oSel.PartnerCode);
                            oView.byId("PatnerName").setValue(oSel.PartnerName);
                            oView.byId("Address1").setValue(oSel.Address1);
                            oView.byId("StateCode").setValue(oSel.StateCode);
                            oView.byId("Pin").setValue(oSel.Pin);
                        }
                        that._oPartnerVH.close();
                    },
                    cancel: function () { that._oPartnerVH.close(); }
                });
                oView.addDependent(this._oPartnerVH);

                const oTable = await this._oPartnerVH.getTableAsync();
                const oColModel = new JSONModel({
                    cols: [
                        { label: "Partner Code", template: "PartnerCode" },
                        { label: "Partner Name", template: "PartnerName" },
                        { label: "Address1", template: "Address1" },
                        { label: "Address2", template: "Address2" },
                        { label: "State", template: "StateCode" },
                        { label: "Pin", template: "Pin" }
                    ]
                });
                oTable.setModel(oColModel, "columns");
                oTable.setModel(this.getView().getModel("nrgp"));

                const oFilterBar = new FilterBar({
                    advancedMode: true,
                    filterBarExpanded: true,
                    filterGroupItems: [
                        new FilterGroupItem({
                            groupName: "grp",
                            name: "PartnerCode",
                            label: "Partner Code",
                            control: new Input()
                        })
                    ],
                    search: function (oEvt) {
                        const sVal = oEvt.getParameters().selectionSet[0].getValue();
                        const aFilters = [new Filter("EntityType", FilterOperator.EQ, sPartnerType)];
                        if (sVal) aFilters.push(new Filter("PartnerCode", FilterOperator.Contains, sVal));
                        oTable.bindRows({ path: "/ZI_NRGP_HDR_VH", parameters: { "$top": "5000" }, filters: aFilters });
                    }
                });
                this._oPartnerVH.setFilterBar(oFilterBar);
            }

            const oTable = await this._oPartnerVH.getTableAsync();
            oTable.bindRows({ path: "/ZI_NRGP_HDR_VH", parameters: { "$top": "5000" }, filters: [new Filter("EntityType", FilterOperator.EQ, sPartnerType)] });
            oBusy.close();
            this._oPartnerVH.open();
        },

        /* ======================== PARTNER TYPE CHANGE ======================== */
        onPartnerTypeChange: function (oEvt) {
            const oView = this.getView();
            // Clear the partner-related fields
            oView.byId("PatnerCode").setValue("");
            oView.byId("PatnerName").setValue("");
            oView.byId("Address1").setValue("");
            oView.byId("Address2").setValue("");
            oView.byId("StateCode").setValue("");
            oView.byId("Pin").setValue("");
        },

        /* ======================== PLANT VALUE HELP ======================== */
        onValueHelpPlant: async function (oEvt) {
             
           const oView = this.getView();
           const oHeaderModel = oView.getModel("HEADER");
            await jQuery.ajax({
                url: `/sap/bc/http/sap/ZHTTP_GATENRGP?shipped=false`, 
                method: "GET",                       
                contentType: "application/json",
                success: function (oResponse) {
                    
                    let doc_no = oResponse.slice(-10) ;
                    oHeaderModel.setProperty("/DocumentNo", doc_no);
                   
                },error: function (xhr, status, error) {
                    
                    sap.m.MessageBox.error("Error while fetching number: " + xhr.responseText);
                  
                } })

            this._oCurrentInput = oEvt.getSource();
          
            const oBusy = new BusyDialog({ text: "Loading..." });
            oBusy.open();

            if (!this._oPlantVH) {
                const that = this;
                this._oPlantVH = new ValueHelpDialog("PlantVH", {
                    supportMultiselect: false,
                    key: "Plant",
                    descriptionKey: "PlantName",
                    stretch: Device.system.phone,
                    ok: function (oEvt) {
                        const aTokens = oEvt.getParameter("tokens");
                        if (aTokens && aTokens.length) {
                            const oSel = aTokens[0].getCustomData()[0].getValue();
                            oView.byId("Plant").setValue(oSel.Plant);
                        }
                        that._oPlantVH.close();
                    },
                    cancel: function () { that._oPlantVH.close(); }
                });
                oView.addDependent(this._oPlantVH);

                const oTable = await this._oPlantVH.getTableAsync();
                const oColModel = new JSONModel({
                    cols: [
                        { label: "Plant", template: "Plant" },
                        { label: "Plant Name", template: "PlantName" }
                    ]
                });
                oTable.setModel(oColModel, "columns");
                oTable.setModel(this.getView().getModel("nrgp"));

                const oFilterBar = new FilterBar({
                    advancedMode: true,
                    filterBarExpanded: true,
                    filterGroupItems: [
                        new FilterGroupItem({ groupName: "grp", name: "Plant", label: "Plant", control: new Input() })
                    ],
                    search: function (oEvt) {
                        const sVal = oEvt.getParameters().selectionSet[0].getValue();
                        const aFilters = [];
                        if (sVal) aFilters.push(new Filter("Plant", FilterOperator.Contains, sVal));
                        oTable.bindRows({ path: "/I_Plant", parameters: { "$top": "500" }, filters: aFilters });
                    }
                });
                this._oPlantVH.setFilterBar(oFilterBar);
            }

            const oTable = await this._oPlantVH.getTableAsync();
            oTable.bindRows({ path: "/I_Plant", parameters: { "$top": "500" } });
            oBusy.close();
            this._oPlantVH.open();
        },

        /* ======================== STORAGE LOCATION VALUE HELP ======================== */
        onValueHelpLoc: async function (oEvt) {
            this._oCurrentInput = oEvt.getSource();
            const oView = this.getView();
            const oBusy = new BusyDialog({ text: "Loading storage locations..." });
            oBusy.open();

            if (!this._oLocVH) {
                const that = this;
                this._oLocVH = new ValueHelpDialog("LocVH", {
                    supportMultiselect: false,
                    key: "StorageLocation",
                    descriptionKey: "StorageLocName",
                    stretch: Device.system.phone,
                    ok: function (oEvt) {
                        const aTokens = oEvt.getParameter("tokens");
                        if (aTokens && aTokens.length) {
                            const oSel = aTokens[0].getCustomData()[0].getValue();
                            oView.byId("Loaction").setValue(oSel.StorageLocation);
                        }
                        that._oLocVH.close();
                    },
                    cancel: function () { that._oLocVH.close(); }
                });
                oView.addDependent(this._oLocVH);

                const oTable = await this._oLocVH.getTableAsync();
                const oColModel = new JSONModel({ cols: [{ label: "Storage Location", template: "StorageLocation" },
                    { label: "Plant", template: "Plant" }
                ] });
                oTable.setModel(oColModel, "columns");
                oTable.setModel(this.getView().getModel("nrgp"));

                const oFilterBar = new FilterBar({
                    advancedMode: true,
                    filterBarExpanded: true,
                    filterGroupItems: [
                        new FilterGroupItem({ groupName: "grp", name: "StorageLocation", label: "Storage Location", control: new Input() })
                    ],
                    search: function (oEvt) {
                        const sVal = oEvt.getParameters().selectionSet[0].getValue();
                        const aFilters = [];
                        if (sVal) aFilters.push(new Filter("StorageLocation", FilterOperator.Contains, sVal));
                        oTable.bindRows({ path: "/I_StorageLocation", parameters: { "$top": "500" }, filters: aFilters });
                    }
                });
                this._oLocVH.setFilterBar(oFilterBar);
            }

            const oTable = await this._oLocVH.getTableAsync();
            oTable.bindRows({ path: "/I_StorageLocation", parameters: { "$top": "500" } });
            oBusy.close();
            this._oLocVH.open();
        },

        /* ======================== ITEM VALUE HELP ======================== */
        onValueHelpitem: async function (oEvt) {
            this._oCurrentInput = oEvt.getSource();
            const oView = this.getView();
            const oBusy = new BusyDialog({ text: "Loading items..." });
            oBusy.open();

            if (!this._oItemVH) {
                const that = this;
                this._oItemVH = new ValueHelpDialog("ItemVH", {
                    supportMultiselect: false,
                    key: "ItemCode",
                    descriptionKey: "ItemName",
                    stretch: Device.system.phone,
                    ok: function (oEvt) {
                        const aTokens = oEvt.getParameter("tokens");
                        if (aTokens && aTokens.length) {
                            const oSel = aTokens[0].getCustomData()[0].getValue();
                            console.log(oSel)
                            const oCtx = that._oCurrentInput.getBindingContext("DETAILS");
                            if (oCtx) {
                                const sPath = oCtx.getPath();
                                const oDetailsModel = that.getView().getModel("DETAILS");
                                oDetailsModel.setProperty(sPath + "/ItemCode", oSel.ItemCode);
                                oDetailsModel.setProperty(sPath + "/ItemName", oSel.ItemName || "");
                                oDetailsModel.setProperty(sPath + "/Unit", oSel.Unit || "");
                                oDetailsModel.setProperty(sPath + "/NetWeight", parseFloat(oSel.NetWeight) || 0);
                                that._recalculateRow(sPath);
                            }
                        }
                        that._oItemVH.close();
                    },
                    cancel: function () { that._oItemVH.close(); }
                });
                oView.addDependent(this._oItemVH);

                const oTable = await this._oItemVH.getTableAsync();
                const oColModel = new JSONModel({
                    cols: [
                        { label: "Product", template: "ItemCode" },
                        { label: "Item Name", template: "ItemName" },
                        { label: "Unit", template: "Unit" },
                        { label: "Net Weight", template: "NetWeight" }
                    ]
                });
                oTable.setModel(oColModel, "columns");
                oTable.setModel(this.getView().getModel("nrgp"));

                const oFilterBar = new FilterBar({
                    advancedMode: true,
                    filterBarExpanded: true,
                    filterGroupItems: [
                        new FilterGroupItem({
                            groupName: "grp",
                            name: "ItemCode",
                            label: "Item Code",
                            control: new Input({ name: "ItemCode" })
                        }),
                        new FilterGroupItem({
                            groupName: "grp",
                            name: "ItemName",
                            label: "Item Name",
                            control: new Input({ name: "ItemName" })
                        })
                    ],
                    search: function (oEvt) {
                        const aSelectionSet = oEvt.getParameter("selectionSet");
                        const aFilters = [];

                        aSelectionSet.forEach(oControl => {
                            const sField = oControl.getName();
                            const sVal = oControl.getValue();
                            if (sVal) {
                                aFilters.push(new Filter(sField, FilterOperator.Contains, sVal));
                            }
                        });

                        const oBinding = oTable.getBinding("rows");
                        if (oBinding) {
                            oBinding.filter(aFilters);
                        }
                    }
                });
                this._oItemVH.setFilterBar(oFilterBar);
                oTable.bindRows({ path: "/ZI_NRGP_PRODUCT", parameters: { "$top": "500" } });
            }

            const oTable = await this._oItemVH.getTableAsync();
            oTable.bindRows({ path: "/ZI_NRGP_PRODUCT", parameters: { "$top": "500" } });
            oBusy.close();
            this._oItemVH.open();
        },

        /* ======================== TAX VALUE HELP ======================== */
        onValueHelptax: async function (oEvt) {
            this._oCurrentInput = oEvt.getSource();
            const oView = this.getView();
            const oBusy = new BusyDialog({ text: "Loading tax codes..." });
            oBusy.open();

            if (!this._oTaxVH) {
                const that = this;
                this._oTaxVH = new ValueHelpDialog("TaxVH", {
                    supportMultiselect: false,
                    key: "TaxCode",
                    descriptionKey: "ConditionRateRatio",
                    stretch: Device.system.phone,
                    ok: function (oEvt) {
                        const aTokens = oEvt.getParameter("tokens");
                        if (aTokens && aTokens.length) {
                            const oSel = aTokens[0].getCustomData()[0].getValue();
                            const oCtx = that._oCurrentInput.getBindingContext("DETAILS");
                            if (oCtx) {
                                const sPath = oCtx.getPath();
                                const oDetailsModel = that.getView().getModel("DETAILS");
                                oDetailsModel.setProperty(sPath + "/TaxCode", oSel.TaxCode);
                                oDetailsModel.setProperty(sPath + "/TaxPercent", parseFloat(oSel.ConditionRateRatio));
                                that._recalculateRow(sPath);
                            }
                        }
                        that._oTaxVH.close();
                    },
                    cancel: function () { that._oTaxVH.close(); }
                });
                oView.addDependent(this._oTaxVH);

                const oTable = await this._oTaxVH.getTableAsync();
                const oColModel = new JSONModel({
                    cols: [
                        { label: "Tax Code", template: "TaxCode" },
                        { label: "Description", template: "ConditionRateRatio" }
                    ]
                });
                oTable.setModel(oColModel, "columns");
                oTable.setModel(this.getView().getModel("nrgp"));


                const oFilterBar = new FilterBar({
                    advancedMode: true,
                    filterBarExpanded: true,
                    filterGroupItems: [
                        new FilterGroupItem({
                            groupName: "grp",
                            name: "TaxCode",
                            label: "Tax Code",
                            control: new Input()
                        })
                    ],
                    search: function (oEvt) {
                        const aSelectionSet = oEvt.getParameter("selectionSet");
                        const sVal = aSelectionSet[0].getValue();
                        const aFilters = [];
                        if (sVal) {
                            aFilters.push(new Filter("TaxCode", FilterOperator.Contains, sVal));
                        }
                        oTable.bindRows({
                            path: "/ZI_TAXCODE_VH",
                            parameters: { "$top": "500" },
                            filters: aFilters
                        });
                    }
                });
                this._oTaxVH.setFilterBar(oFilterBar);
            }

            const oTable = await this._oTaxVH.getTableAsync();
            oTable.bindRows({ path: "/ZI_TAXCODE_VH", parameters: { "$top": "500" } });
            oBusy.close();
            this._oTaxVH.open();
        },

        /* ======================== ROW CALCULATION ======================== */
        _recalculateRow: function (sPath) {
            const oDetailsModel = this.getView().getModel("DETAILS");
            const oRow = oDetailsModel.getProperty(sPath);
            const qty = parseFloat(oRow.Qty) || 0;
            const rate = parseFloat(oRow.Rate) || 0;
            const taxPercent = parseFloat(oRow.TaxPercent) || 0;

            const itemAmount = qty * rate;
            const taxAmount = itemAmount * (taxPercent / 100);
            const netAmount = itemAmount + taxAmount;

            oDetailsModel.setProperty(sPath + "/ItemAmount", parseFloat(itemAmount.toFixed(2)));
            oDetailsModel.setProperty(sPath + "/TaxAmount", parseFloat(taxAmount.toFixed(2)));
            oDetailsModel.setProperty(sPath + "/NetAmount", parseFloat(netAmount.toFixed(2)));
        },

        /* ======================== LIVE CHANGE HANDLER ======================== */
        onValueChange: function (oEvt) {
            const oInput = oEvt.getSource();
            const oCtx = oInput.getBindingContext("DETAILS");
            if (oCtx) {
                const sPath = oCtx.getPath();
                const oDetailsModel = this.getView().getModel("DETAILS");
                const prop = oInput.getBindingInfo("value").parts[0].path.split("/").pop();
                oDetailsModel.setProperty(sPath + "/" + prop, parseFloat(oInput.getValue()) || 0);
                this._recalculateRow(sPath);
            }
        },

        /* ======================== ADD / DELETE ROWS ======================== */
        addLine: function () {
            const oModel = this.getView().getModel("DETAILS");
            const aItems = oModel.getProperty("/Items") || [];
            let nextLine = 10;
            if (aItems.length > 0) nextLine = aItems[aItems.length - 1].LineNum + 10;
            aItems.push({
                LineNum: nextLine, ItemCode: "", ItemName: "", Description: "",
                Qty: 0, Unit: "", Rate: 0, ItemAmount: 0,
                TaxCode: "", TaxPercent: 0, TaxAmount: 0, NetAmount: 0
            });
            oModel.setProperty("/Items", aItems);
        },

        deleteLine: function () {
            const oTable = this.getView().byId("TableDetails");
            const aSel = oTable.getSelectedIndices();
            const oModel = this.getView().getModel("DETAILS");
            let aItems = oModel.getProperty("/Items") || [];
            aSel.sort((a, b) => b - a).forEach(idx => { if (idx >= 0 && idx < aItems.length) aItems.splice(idx, 1); });
            oModel.setProperty("/Items", aItems);
        },

        /* ======================== CREATE NRGP ======================== */
        onClickCreate: function () {
         
            const oView = this.getView();
            const oHeaderModel = oView.getModel("HEADER");
            const oDetailsModel = oView.getModel("DETAILS");

            const headerData = oHeaderModel.getData();
            const items = oDetailsModel.getProperty("/Items") || [];

            if (items.length === 0) {
                MessageToast.show("Please add at least one item.");
                return;
            }

            if (!headerData.Status) headerData.Status = "Inprocess";

            const newDate = new Date();

            const oPayload = {
                header: {
                    document_no: headerData.DocumentNo || "",
                    plant: headerData.Plant || "",
                    partner_type: oView.byId("Partner").getSelectedKey() || "",
                    partner_code: headerData.PartnerCode || "",
                    document_date: this.formatDateToIST(newDate),
                    partner_name: headerData.PartnerName || "",
                    from_storage_loc: headerData.FromStorageLoc || "",
                    addr1: headerData.Addr1 || "",
                    addr2: headerData.Add2 || "",
                    state_code: headerData.StateCode || "",
                    pin: headerData.Pin || "",
                    status: headerData.Status || "Inprocess",
                    description1: headerData.Description1 || "",
                    description2: headerData.Description2 || ""
                },
                items: items.map(i => ({

                    line_no: i.LineNum || "",
                    product: i.ItemCode || "",
                    productname: i.ItemName || "",
                    item_text: i.Description || "",
                    quantity: i.Qty ? i.Qty.toString() : "0",
                    unit: i.Unit || "",
                    rate: i.Rate ? i.Rate.toString() : "0",
                    item_amount: i.ItemAmount ? i.ItemAmount.toString() : "0",
                    tax_code: i.TaxCode || "",
                    tax_percent: i.TaxPercent ? i.TaxPercent.toString() : "0",
                    tax_amount: i.TaxAmount ? i.TaxAmount.toString() : "0",
                    net_amount: i.NetAmount ? i.NetAmount.toString() : "0",
                    net_weight: i.NetWeight ? i.NetWeight.toString() : "0",
                    batch: i.Batch || "",
                    cost_center: i.CostCenter || ""
                }))
            };
            debugger
            const oBusy = new BusyDialog({ text: "Creating NRGP..." });
            oBusy.open();

            const that = this; // keep reference to controller

            $.ajax({
                url: `/sap/bc/http/sap/ZHTTP_GATENRGP?shipped=false`,
                method: "POST",
                contentType: "application/json",
                data: JSON.stringify(oPayload),
                success: function (response) {
                    oBusy.close();

                    if (response) {
                        oHeaderModel.setProperty("/Status", "Inprocess");

                        MessageToast.show("Document Created for " + response);
                    } else {
                        MessageToast.show("NRGP created successfully!");
                    }


                },
                error: function (xhr, status, error) {
                    oBusy.close();
                    MessageToast.show("Error creating NRGP");

                }
            });
        },
        onClickShip: function () {
            const oView = this.getView();
           
            const oHeaderModel = oView.getModel("HEADER");
            const oDetailsModel = oView.getModel("DETAILS");

            const headerData = oHeaderModel.getData();
            const items = oDetailsModel.getProperty("/Items") || [];

            if (items.length === 0) {
                MessageToast.show("Please add at least one item.");
                return;
            }

            if (!headerData.Status) headerData.Status = "Shipped";
            const newDate = new Date();
             const oPayload = {
                header: {
                    document_no: headerData.DocumentNo || "",
                    plant: headerData.Plant || "",
                    partner_type: oView.byId("Partner").getSelectedKey() || "",
                    partner_code: headerData.PartnerCode || "",
                    document_date: this.formatDateToIST(newDate),
                    partner_name: headerData.PartnerName || "",
                    from_storage_loc: headerData.FromStorageLoc || "",
                    addr1: headerData.Addr1 || "",
                    addr2: headerData.Addr2 || "",
                    state_code: headerData.StateCode || "",
                    pin: headerData.Pin || "",
                    status: headerData.Status || "Inprocess",
                    description1: headerData.Description1 || "",
                    description2: headerData.Description2 || ""
                },
                items: items.map(i => ({

                    line_no: i.LineNum || "",
                    product: i.ItemCode || "",
                    productname: i.ItemName || "",
                    item_text: i.Description || "",
                    quantity: i.Qty ? i.Qty.toString() : "0",
                    unit: i.Unit || "",
                    rate: i.Rate ? i.Rate.toString() : "0",
                    item_amount: i.ItemAmount ? i.ItemAmount.toString() : "0",
                    tax_code: i.TaxCode || "",
                    tax_percent: i.TaxPercent ? i.TaxPercent.toString() : "0",
                    tax_amount: i.TaxAmount ? i.TaxAmount.toString() : "0",
                    net_amount: i.NetAmount ? i.NetAmount.toString() : "0",
                    net_weight: i.NetWeight ? i.NetWeight.toString() : "0",
                    batch: i.Batch || "",
                    cost_center: i.CostCenter || ""
                }))
            };

            headerData.Status = "Shipped";

            const oBusy = new BusyDialog({ text: "Shipping Goods" });
            oBusy.open();

            $.ajax({
                url: `/sap/bc/http/sap/ZHTTP_GATENRGP?shipped=true`,
                method: "POST",
                contentType: "application/json",
                data: JSON.stringify(oPayload),
                success: function (data) {
                    oBusy.close();

                    if (data) {
                        let resp = JSON.parse(data);
                        let nrgpPost = String(resp.POSTNUMBER).slice(-10);
                        oHeaderModel.setProperty("/PostNRGPNo", nrgpPost);

                        oHeaderModel.setProperty("/Status", "Shipped");
                        MessageToast.show("NRGP Shipped " + data);
                    }

                },
                error: function (xhr, status, error) {
                    oBusy.close();
                    MessageToast.show("Error creating NRGP");

                }
            });

        },

        formatDateToIST: function (dateValue) {
            if (!dateValue) return "";

            // Create a Date from input
            const date = new Date(dateValue);

            // Convert UTC timestamp to IST by adding +5:30 hours
            const utcTime = date.getTime() + (date.getTimezoneOffset() * 60000);
            const istTime = new Date(utcTime + (5.5 * 60 * 60 * 1000));

            const year = istTime.getFullYear();
            const month = String(istTime.getMonth() + 1).padStart(2, '0');
            const day = String(istTime.getDate()).padStart(2, '0');

            return `${year}-${month}-${day}`; // yyyy-mm-dd
        }


    });
});
