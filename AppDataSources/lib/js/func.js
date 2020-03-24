/**
 * Process and transform Lineage Data
 * @param {*} data 
 * @param {*} layout 
 */
function createLineageList(data,layout) {

    //Data
    let dataToDisplay = data;
    //To manage source type
    let typeConnection = 'Uncatched';
    let loopQuery = 1;

    //sort data (manage Discriminator doublons)
    dataToDisplay.sort();

    // Processing .....
    // For all Lineage Data
    dataToDisplay.forEach(function(row,index,data){

       ////////////////////////
       // Manage source type //
       ////////////////////////
       typeConnection = 'Uncatched';

        if(row.qDiscriminator.substring(0, row.qDiscriminator.length - 1)==='INLINE'){
            typeConnection = 'Inline';
        } else if(row.qDiscriminator.substring(0, row.qDiscriminator.length - 1)==='AUTOGENERATE'){
            typeConnection = 'Autogenerate';
        } else if(row.qDiscriminator.substring(1,6)==='STORE'){
            typeConnection = 'Store';
        } else if(row.qDiscriminator.substring(0,8)==='RESIDENT'){
            typeConnection = 'Resident';
        } else if(row.qStatement){
            typeConnection = 'Query';
        }  else{
            typeConnection = 'File'
        }
        
        row.typeConnection = typeConnection;

       ////////////////////////////////////////////////////////////////////////
       //Refine Display (';', Multiple discrimniator,...)                    //
       ////////////////////////////////////////////////////////////////////////
       
        //----> Remove ';' last character
        row.qDiscriminatorDisplay = row.qDiscriminator.substring(0, row.qDiscriminator.length - 1);
        
        // Manage Multi Queries : Indicate the number of the query if many have the same discriminator
        if(index>0){
            if(dataToDisplay[index].qDiscriminator===dataToDisplay[index-1].qDiscriminator){
                loopQuery++;
                row.qDiscriminatorDisplay = row.qDiscriminatorDisplay + ' - Query ' + loopQuery;
            } else if(index<dataToDisplay.length-1){
                if(dataToDisplay[index].qDiscriminator===dataToDisplay[index+1].qDiscriminator){
                    row.qDiscriminatorDisplay = row.qDiscriminatorDisplay + ' - Query ' + loopQuery;
                }
            } else {
                loopQuery = 1;
            }
        }
    });

    ////////////////////////////////////////////////////////////////////////
    //Manage Display condition                                           //
    ///////////////////////////////////////////////////////////////////////
    let filter = [];
    if(!layout.check.scopeAutogenerate){filter.push('Autogenerate')};
    if(!layout.check.scopeInline){filter.push('Inline')};
    if(!layout.check.scopeStore){filter.push('Store')};
    if(!layout.check.scopeResident){filter.push('Resident')};

    let filteredDataToDisplay = dataToDisplay.filter(function(value, index, arr){ 
        return  filter.indexOf(value.typeConnection)<0;
    });

    // Call Html List generation
    let $list         = createLineageListElement(filteredDataToDisplay,layout);
    //return Html list
    return $list;
}

/**
 * Display Lineage Data in a HTML list
 * @param {*} data 
 * @param {*} layout 
 */
function createLineageListElement(data,layout) {

    //list creation
    let $list                   = createElement('ul', 'lui-list');

   // Manage Header display
    if(layout.headerSwitch){
        let $listHeader             = createElement('li', 'lui-list__header'); 
        let $listHeaderSpan         = createElement('span', 'lui-list__text','',layout.headerLabel); 
        $listHeader.append($listHeaderSpan);        
        $list.append($listHeader);
    }


    // Create list element for each data lineage in the scope
    data.sort().forEach(function(row,index,data){

        //Manage type of Display : Raw or Refined
        let discriminatorDisplay;
        if(layout.check.refineData){
            discriminatorDisplay = row.qDiscriminatorDisplay;
        } else {
            discriminatorDisplay = row.qDiscriminator;   
        };

        //Manage style for "Query Element" (Database icone and class for action)
        let listItemClass;
        if(row.qStatement){
            listItemClass = 'lui-list__aside lui-icon lui-icon--database';
        }else {
            listItemClass = 'lui-list__aside';
        }
       
        //Create list
        let $listItem           = createElement('li','lui-list__item dataSourceAccordion');
        let $listItemSpanIcon   = createElement('span', listItemClass);
        let $listItemText       = createElement('span','lui-list__text','',discriminatorDisplay);
        let $listItemDiv        = createElement('div','lui-bg-alt dataSourcePanel','white-space: pre-wrap',row.qStatement);

        $listItem.append($listItemSpanIcon);
        $listItem.append($listItemText);

        // add listener for Queries (Display/hide query)
        if(row.qStatement){
            onSubmitDisplayPanel($listItem);
        };
      
        $list.append($listItem);
        $list.append($listItemDiv);  

    });

    return $list;
}


/**
 * Manage display of Query Statement
 * @param {*} element 
 */
function onSubmitDisplayPanel(element) {
    element.onclick = function(){
        this.classList.toggle("lui-active");

        var panel = this.nextElementSibling;
        if (panel.style.display === "block") {
            panel.style.display = "none";
        } else {
            panel.style.display = "block";
        }
    }
}