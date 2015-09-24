/**
* tour.js
* @param doc The doc object
* @param $ The jQuery object
*/

(function(doc, $) {

    // common config shared among almost all layers
    var commonLayerConfig = {
        'align': 'center',
        'width': '460px',
        'shownby': 'none',
        'hiddenby': 'none',
        'addClass': 'tour'
    },
    //content
    _tourFirstStepContent = "<div class='tour-content'><h4>Title</h4><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse mattis auctor turpis</p></div><div class='tour-content__opcions'><div class='mesh-col-m-6 tour-content__align-left'><a href='#' id='finishTourStep1'>Saltear tour</a></div><div class='mesh-col-m-6 tour-content__align-right'><a href='#' class='ch-btn ch-btn-small' id='toSecondStep'>Siguiente</a></div></div>",
    _tourSecondStepContent = "<div class='tour-content'><h4>Title</h4><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse mattis auctor turpis</p></div><div class='tour-content__opcions'><div class='mesh-col-m-6 tour-content__align-left'><a href='#' id='finishTourStep2'>Saltear tour</a></div><div class='mesh-col-m-6 tour-content__align-right'><a href='#' class='ch-btn ch-btn-small' id='toThirdStep'>Siguiente</a></div></div>",
    _tourThirdStepContent = "<div class='tour-content'><h4>Title</h4><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse mattis auctor turpis</p></div><div class='tour-content__opcions'><a href='#' class='ch-btn ch-btn-small' id='finishStep'>Entendido</a></div>",
    // layers urls, which should be added in the common layer config
    tourFirstStepContentURL = _tourFirstStepContent,
    tourSecondStepContentURL = _tourSecondStepContent,
    tourThirdStepContentURL = _tourThirdStepContent,
    // layer elements
    tourFirstStepLayerContainer = doc.getElementById('firstStep'),
    $tourFirstStepLayerContainer = $(tourFirstStepLayerContainer),
    tourSecondStepLayerContainer = doc.getElementById('secondStep'),
    $tourSecondStepLayerContainer = $(tourSecondStepLayerContainer),
    tourThirdStepLayerContainer = doc.getElementById('thirdStep'),
    $tourThirdStepLayerContainer = $(tourThirdStepLayerContainer),
    // layer instances
    tourFirstStepLayerInstance,
    tourSecondStepLayerInstance,
    tourThirdStepLayerInstance;

    function createLayers() {
        // single var pattern inside module's methods
        var firstStepLayerWidth = '500px';

        commonLayerConfig.content = tourSecondStepContentURL;
        tourSecondStepLayerInstance = $tourSecondStepLayerContainer.layer(commonLayerConfig);

        commonLayerConfig.content = tourThirdStepContentURL;
        tourThirdStepLayerInstance = $tourThirdStepLayerContainer.layer(commonLayerConfig);

        commonLayerConfig.content = tourFirstStepContentURL;
        commonLayerConfig.width = firstStepLayerWidth;
        tourFirstStepLayerInstance = $tourFirstStepLayerContainer.layer(commonLayerConfig);

       
        tourFirstStepLayerInstance.show();
    };

    function bindEvents() {
        // layer events
        // first step layer show event handler
        tourFirstStepLayerInstance.on('show', function(e) {
            var secondStepTrigger = doc.getElementById('toSecondStep'),
                $secondStepTrigger = $(secondStepTrigger),
                finishTourStep1Trigger = doc.getElementById('finishTourStep1'),
                $finishTourStep1Trigger = $(finishTourStep1Trigger);

            $secondStepTrigger.on('click', function (e) {
                tourFirstStepLayerInstance.hide();
                tourSecondStepLayerInstance.show();   
            });
            $finishTourStep1Trigger.on('click', function (e){
                tourFirstStepLayerInstance.hide();
                tourSecondStepLayerInstance.hide();
                tourThirdStepLayerInstance.hide();            
            });
            $.ajax({
                type: 'GET',
                url: "/receive-payments/tools/hide_tour",
                success: function(data) {}
            });
        });

        // second step layer show event handler
        tourSecondStepLayerInstance.on('show', function(e){
            var thirdStepTrigger = doc.getElementById('toThirdStep'),
                $thirdStepTrigger = $(thirdStepTrigger),
                finishTourStep2Trigger = doc.getElementById('finishTourStep2'),
                $finishTourStep2Trigger = $(finishTourStep2Trigger);

            $thirdStepTrigger.on('click', function (e){
                tourSecondStepLayerInstance.hide();
                tourThirdStepLayerInstance.show();      
            });
            $finishTourStep2Trigger.on('click', function (e){
                tourFirstStepLayerInstance.hide();
                tourSecondStepLayerInstance.hide();
                tourThirdStepLayerInstance.hide();      
            });

        });
        
        // Third and last step layer show event handler
        tourThirdStepLayerInstance.on('show', function(e){
            var finishStepTrigger = doc.getElementById('finishStep'),
            $finishStepTrigger = $(finishStepTrigger);

            $finishStepTrigger.on('click', function (e){
                tourFirstStepLayerInstance.hide();
                tourSecondStepLayerInstance.hide();
                tourThirdStepLayerInstance.hide();       
            });
        });

    };
    
    createLayers();
    bindEvents();

}(document, $));