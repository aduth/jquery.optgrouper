/*! jquery.optgrouper 0.2.0 | (c) 2013 Andrew Duthie <andrew@andrewduthie.com> | MIT License */
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
            var $options = this.getOptions(),
                groups = [];

            for (var o = 0, ol = $options.length; o < ol; o++) {
                var groupName = $options[o].getAttribute('data-optgroup');

                if (!(groupName in groups)) {
                    groups[groupName] = [];
                }

                groups[groupName].push($options[o]);
            }

            this.groups = groups;
        }

        return this.groups;
    };

    Optgrouper.prototype.getSortedGroupLabels = function() {
        if (typeof this.sortedGroupLabels === 'undefined') {
            var sorter = [],
                groups = this.getGroups();

            for (var groupName in groups) {
                if (groups.hasOwnProperty(groupName)) {
                    sorter.push(groupName);
                }
            }

            this.sortedGroupLabels = this.options.sortGroups(sorter);
        }

        return this.sortedGroupLabels;
    };

    Optgrouper.prototype.renderGroups = function() {
        var groups = this.getGroups(),
            labels = this.getSortedGroupLabels(),
            rendered = [];

        for (var l = 0, ll = labels.length; l < ll; l++) {
            var groupName = labels[l],
                optgroupEl = document.createElement('optgroup'),
                groupOptions = groups[groupName];

            optgroupEl.label = groupName;

            for (var o = 0, ol = groupOptions.length; o < ol; o++) {
                optgroupEl.appendChild(groupOptions[o]);
            }

            rendered.push(optgroupEl.outerHTML);
        }

        this.$el.html(rendered.join());
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
