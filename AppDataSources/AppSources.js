'use strict';

define( 
	[
		'qlik',
		'jquery', 
		'./lib/js/common',
		'./lib/js/func',
		'./lib/js/properties',
		'css!./lib/css/AppSources.css',
	], 
function (qlik, $, common, func, properties, cssStyle ) {

	return {
		 initialProperties: properties,
		 definition : properties,
		 support : {
			 snapshot: true,
			 export:  false,
			 exportData: false
		 },

		paint: function  ($element, layout) {

			$element.empty();

			// Get current app
			//let app = qlik.currApp(this);

			// Get Current Engines Session
			let qix = qlik.currApp(this).model.engineApp

			//Container
			let $DivContainer = createElement('div','scroll','','');
			
			//Get Data Lineage and Create a list element
			qix.getLineage().then(function (reply) {
				let lineage = reply.qLineage;
				// Create Table/List
				let lineageTable = createLineageList(lineage,layout);
				// Add Table to div
				$DivContainer.append(lineageTable);
				return reply;
			});

			$element.append($DivContainer);
	
			return qlik.Promise.resolve();		
		}
	};
} );
