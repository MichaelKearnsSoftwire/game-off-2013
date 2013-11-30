define('constructedFacilitiesDisplay', ['jquery'], function($) {
    'use strict';

    return function(facilitiesList) {
        var constructedFacilities = $('#constructedFacilities');
        this.displayConstructedFacilities = function(facilities) {
            constructedFacilities.find('tr.constructed-facility').remove();
            $.each(facilities, function() {
                var facility = this[0];
                var facilityDisplay = $('<tr/>',{ class:'constructed-facility' });
                facilityDisplay.append(getEntryForValue(facility.name));
                facilityDisplay.append(getEntryForValue(facility.landCost));
                facilityDisplay.append(getEntryForValue(facility.energyDelta()));
                facilityDisplay.append(getEntryForValue(facility.foodDelta()));
                facilityDisplay.append(getEntryForValue(facility.pollutionDelta()));
                facilityDisplay.append(getDemolitionButtonForFacility(facility));
                if (!this[0].isPowered) {
                    facilityDisplay.css('color','red');
                } else if(!this[0].isBuilt()) {
                    facilityDisplay.css('color','gray');
                } else {
                    facilityDisplay.css('color','black');
                }
                constructedFacilities.append(facilityDisplay);
            });
        };

        function getEntryForValue(value)
        {
            return $('<td>' + value + '</td>');
        }

        function getDemolitionButtonForFacility(facility)
        {
            var button = $('<button>Demolish</button>');

            button.click(function(){
                facilitiesList.removeFacility(facility);
            });
            return button;
        }
    };
});