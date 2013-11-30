define('availableFacilitiesDisplay', ['jquery'], function($) {
    'use strict';

    return function(availableFacilities, facilityList) {
        var availableFacilitiesDisplay = $('#availableFacilities');

        $.each(availableFacilities, function() {
            var facilityDisplay = $('<tr/>',{ class:'facility', id:'facility-' + this.facilityId });
            facilityDisplay.append(getEntryForValue(this.name));
            facilityDisplay.append(getEntryForValue(this.landCost));
            facilityDisplay.append(getEntryForValue(this.normalDelta.energy));
            facilityDisplay.append(getEntryForValue(this.normalDelta.food));
            facilityDisplay.append(getEntryForValue(this.normalDelta.pollution));
            facilityDisplay.append(getPlacementButtonForFacility(this, 0));
            availableFacilitiesDisplay.append(facilityDisplay);
        });

        this.displayAvailableFacilities = function(landRemaining) {
            $.each(availableFacilities, function() {
                var buttonId = '#facility-' + this.facilityId + ' button';
                if (landRemaining < this.landCost) {
                    availableFacilitiesDisplay.find(buttonId).attr('disabled', true);
                } else {
                    availableFacilitiesDisplay.find(buttonId).removeAttr('disabled');
                }

            });
        };

        function getEntryForValue(value)
        {
            return $('<td>' + value + '</td>');
        }

        function getPlacementButtonForFacility(facility, landRemaining)
        {
            var button = $('<button>Construct</button>');

            if (landRemaining < facility.landCost) {
                button.attr('disabled', true);
            }

            button.click(function(){
                facilityList.addFacility(facility.name, Date.now());
            });
            return button;
        }
    };
});