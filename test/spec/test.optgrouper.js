var numGroups = 2,
    numOptions = 2,
    testHTML = '<select>';
for (var g = 0; g < numGroups; g++) {
    for (var o = 0; o < numOptions; o++) {
        testHTML += '<option data-optgroup="test' + g + '"></option>';
    }
}
testHTML += '</select>';

describe('optgrouper', function() {

    describe('#getOptions()', function() {
        it('should return number of <option> elements', function() {
            var plugin = $(testHTML).optgrouper({
                    renderImmediately: false
                }).data('plugin_optgrouper');

            expect(plugin.getOptions().length).to.be(numOptions * numGroups);
        });
    });

    describe('#getGroups()', function() {
        it('should return number of distinct data-optgroup', function() {
            var plugin = $(testHTML).optgrouper({
                    renderImmediately: false
                }).data('plugin_optgrouper');

            expect(plugin.getGroups().length).to.be(numGroups);
        });
    });

    describe('#renderGroups()', function() {

        var $el = $(testHTML);
        $el.optgrouper();

        it('should render <option> under correct <optgroup>', function() {
            var incorrect = 0;

            $el.find('optgroup').each(function() {
                var $this = $(this),
                    label = $this.attr('label');

                incorrect += $this.find('option[data-optgroup!="' + label + '"]').length;
            });

            expect(incorrect).to.be(0);
        });

        it('should return actual <option> after render', function() {
            expect($el.find('option').length).to.be(numOptions * numGroups);
        });

        it('should return actual <optgroup> after render', function() {
            expect($el.find('optgroup').length).to.be(numGroups);
        });

    });

});