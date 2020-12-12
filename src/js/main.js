const UPPER_LIMIT = 6;
const YEAR_ENDING_IN_9 = new RegExp(/\b(19|20)\d9\b/);

const reportsWidget = {
    options: {
        layout: '.layout_container',
        selector: '.reports',
        template:
            '{{#.}}' +
            '<article class="reports_item">' +
            '<a href="{{cover}}" target="_blank">' +
            '<figure>' +
            '<img class="reports_cover" src="{{cover}}" alt="{{title}} Cover"/>' +
            '</figure>' +
            '</a>' +
            '<footer class="reports_docs">' +
            '{{#documents}}' +
            '<h3 class="reports_title">' +
            '<a href="{{url}}" target="_blank">{{title}}&nbsp;<span>({{file_size}} {{file_type}})</a>' +
            '</h3>' +
            '{{/documents}}' +
            '</footer>' +
            '</article>' +
            '{{/.}}'
    },
    init: function (data, mode) {
        switch (mode) {
            case 'byDecade': {
                this.renderReportsByDecade(data);
                break;
            }
            case 'byRecency': {
                this.renderReportsSegmentedByRecency(data);
                break;
            }
            case 'byShowMore': {
                this.renderWithShowMore(data);
                break;
            }
            default: {
                this.renderReports(data);
                break;
            }
        }
    },

    renderReports: function (data) {
        const options = this.options;
        $(options.layout).append('<div class=' + options.selector.slice(1) + '></div>')
        $(options.selector).html(Mustache.render(options.template, data));
    },

    renderReportsByDecade: function (data) {
        const selector = this.options.selector;
        const selectorClass = selector.slice(1);
        const layout = this.options.layout;
        const template = this.options.template;

        $(layout).append('<div class=' + selectorClass + '></div>');
        let target = $(selector).last();

        data.forEach(function(entry, index) {
            const year = findYearInString(entry.title);
            if (index > 0 && year !== null) {
                // If the year ends with a nine, subtract 9 to get the beginning of the decade
                const begin = parseInt(year[0]) - 9;
                $(layout).append('<h2 class="divider">' + begin + 's</h2><div class="' + selectorClass + '"></div>');
                target = $(selector).last();
            }
            $(target).append(Mustache.render(template, entry));
        });
    },

    renderReportsSegmentedByRecency: function (data) {
        const selector = this.options.selector;
        const selectorClass = selector.slice(1);
        const layout = this.options.layout;
        const template = this.options.template;

        $(layout).append('<div class=' + selectorClass + '></div>');
        let target = $(selector).last();

        data.forEach(function(entry, index) {
            if (index === UPPER_LIMIT) {
                $(layout).append('<h2 class="divider">More Reports</h2><div class="' + selectorClass + ' list"></div>');
                target = $(selector).last();
            }
            $(target).append(Mustache.render(template, entry));
        });
    },

    renderWithShowMore: function (data) {
        const selector = this.options.selector;
        const selectorClass = selector.slice(1);
        const layout = this.options.layout;
        const template = this.options.template;

        $(layout).append('<div class="' + selectorClass + ' current"></div>');
        let target = $(selector).last();

        data.forEach(function(entry, index) {
            if (index > 0 && (index % UPPER_LIMIT) === 0) {
                $(layout).append('<div class="' + selectorClass + ' hide"></div>');
                target = $(selector).last();
            }
            $(target).append(Mustache.render(template, entry));
        });

        $(layout).append('<button id="next" class="button" type="button"> Show More </button>');

        $('#next').click(function () {
            const temp = $('.current');
            const next = temp.next().slideDown({
                start: function () {
                    $(this).css({ display: "flex" });
                    $(this).addClass('current');
                }
            });
            temp.removeClass('current');
            if (next.is(':nth-last-child(2)')) {
                $('#next').remove();
            }
        });

    }

};

function findYearInString(str) {
    return str.match(YEAR_ENDING_IN_9);
}

reportsWidget.init(reportData || []);