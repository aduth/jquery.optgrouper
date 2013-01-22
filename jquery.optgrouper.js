/*! jquery.optgrouper 0.1.0 | (c) 2013 Andrew Duthie <andrew@andrewduthie.com> | MIT License %> */
;(function($) {

    var plugin = 'optgrouper',
        defaultOptions = {
            sortGroups: function(groups) { return groups; },
            renderImmediately: true
        };

    var Optgrouper = function(el, options) {
        this.$el = $(el);
        this._options = options;
        this.options = $.extend({}, defaultOptions, options);

        if (this.options.renderImmediately) {
            this.renderGroups();
        }
    };

    Optgrouper.prototype.getOptions = function() {
        if (typeof this.$options === 'undefined') {
            this.$options = $('option', this.$el);
        }

        return this.$options;
    };

    Optgrouper.prototype.getGroups = function() {
        if (typeof this.groups === 'undefined') {
            var groups = [];

            this.getOptions().each(function() {
                var $o = $(this),
                    groupName = $o.data('optgroup');

                if ($.inArray(groupName, groups) < 0) {
                    groups.push(groupName);
                }
            });

            this.groups = groups;
        }

        return this.groups;
    };

    Optgrouper.prototype.renderGroups = function() {
        var $options = this.getOptions(),
            groups = this.options.sortGroups(this.getGroups()),
            rendered = [];

        for (var i = 0, gl = groups.length; i < gl; i++) {
            var groupName = groups[i],
                $groupEl = $('<optgroup label="' + groupName + '"/>');

            $options.filter('option[data-optgroup="' + groupName + '"]').appendTo($groupEl);

            rendered.push($groupEl);
        }

        this.$el.html(rendered);
    };

    window.Optgrouper = Optgrouper;

    $.fn[plugin] = function(options) {
        return this.each(function() {
            if (!$.data(this, 'plugin_' + plugin)) {
                $.data(this, 'plugin_' + plugin, new Optgrouper(this, options));
            }
        });
    };

})(this.jQuery);