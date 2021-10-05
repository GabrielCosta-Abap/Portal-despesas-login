sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageToast"
],
	/**
	 * @param {typeof sap.ui.core.mvc.Controller} Controller
	 */
	function (Controller, MessageToast) {
		"use strict";

		return Controller.extend("queroquerons.logon.controller.Login", {
			onInit: function () {
				// var oModel = new sap.ui.model.odata.v2.ODataModel("/sap/opu/odata/sap/zportaldespesas_srv")
				// sap.ui.getCore().setModel(oModel, "myModel");
				// window.pernrInfo = {}
			},

			onLoginTap: function (){
			 var oUser = this.getView().byId('uid').getValue()
			 var oPass = this.getView().byId('pasw').getValue()
			 var oModel = new sap.ui.model.odata.v2.ODataModel("/sap/opu/odata/sap/zportaldespesas_srv", { useBatch: false })

			 var oReadurl = `/VALIDATE_USERSet(IPass='${oPass}',IUser='${oUser}')`
			 
			 oModel.read(oReadurl, {
				success: function(response) { 

					if(response.EsResponse.Type=='E'){

						if(response.EsResponse.Message=='WRONG_PASSWORD'){
							MessageToast.show( 'Usuário e/ou senha incorretos')
						}else{
							MessageToast.show(response.EsResponse.Message)
						}

					}else{
						// sap.pernrInfo = { 
						// 	matricula: "fmachado",
						// 	tipoUnidade: 'M' }

							var oViewModel = new sap.ui.model.json.JSONModel();
							sap.ui.getCore().setModel(oViewModel);

							sap.ui.getCore().getModel().setData({
								Data123: ["test"]
							});

							// window.pernrInfo.matricula 	 = "fmachado"
							// window.pernrInfo.tipoUnidade = 'M' 

						var sUrlApp = window.location.protocol + '//' + window.location.host + '/sap/bc/bsp/sap/zportal_home/index.html' + 'user=#' + oUser
						window.location.replace(sUrlApp);
					}
				 },
				error: function(oError) { 
					console.log('Erro no serviço')
				}
			  });

			}

		});
	});
