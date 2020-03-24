define([], function () {

    /**
     * Properties Panel
     * 
     */
    
    var prop = 
        {

			type: "items",
			component: "accordion",
			items: {
                //Extension Settings
                customSettings:{
                    component: "expandable-items",
                    label: "Settings",
    
                    items: {  
                        //Variables Settings : What is in the scope
                       scopeSettings : {
                            type :"items",
                            label: "Scope",
                            items:{
								scopeAutogenerate: {
									type: "boolean",
									label: "Autogenerate",
									ref: "check.scopeAutogenerate",
									defaultValue: false
								},

								scopeInline: {
									type: "boolean",
									label: "Inline",
									ref: "check.scopeInline",
									defaultValue: false
								},

								scopeResident: {
									type: "boolean",
									label: "Resident",
									ref: "check.scopeResident",
									defaultValue: false
								},

								scopeStore: {
									type: "boolean",
									label: "Store",
									ref: "check.scopeStore",
									defaultValue: false
								}


							}
                            
						},
						//Variables Settings : filter variables to delete
						displaySettings : {
							type :"items",
							label: "Display Settings",
							items:{

                                headerSwitch: {
                                    type: "boolean",
                                    component: "switch",
                                    label: "Header",
                                    ref: "headerSwitch",
                                    options: [{
                                        value: true,
                                        label: "Yes"
                                    }, {
                                        value: false,
                                        label: "No"
                                    }],
                                    defaultValue: true
                                },
    
                                headerLabel :{
                                    type: "string",
                                    label: "Header label",
                                    ref: "headerLabel",
                                    defaultValue: "Datasources",
                                },

								scopeAutogenerate: {
									type: "boolean",
									component: "switch",
									label: "Refine Data",
									ref: "check.refineData",
									options: [{
                                        value: true,
                                        label: "Yes"
                                    }, {
                                        value: false,
                                        label: "No"
                                    }],
									defaultValue: true
								}
							}
							
						}
						
                    }
				}
				,
				settings: {
					uses: "settings"
				}

			}
		

        }

    
    return prop;
});