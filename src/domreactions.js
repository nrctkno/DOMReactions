$.fn.domReactions = function (options) {

    var plugin = this;

    var settings = $.extend({}, $.fn.domReactions.defaults, options);

    var reaction = null;
	 
	function showReactionModal() {
		var $modal = $('<ul class="domreaction_modal"></ul>');
		
		Object.entries(settings.reactions).map(function(e) {
			$modal.append('<li data_value="' + e[0] + '" title="' + e[1].title + '">' + e[1].glyph + '</li>');
		});
		
		$(document.body).append($modal);
		
		$('.domreaction_modal li').on('click', function() {
			reaction.reaction = $(this).attr('data_value');
			$('.domreaction_modal').remove();
            settings.commit(reaction);			
		});
	}
	
    plugin.on(settings.trigger.event, function (evt) {
        var coords = settings.trigger.handler(evt);
        var elem = document.elementFromPoint(coords.x - window.pageXOffset, coords.y - window.pageYOffset);
        var $elem = $(elem);
        reaction = {
            url: window.location.href,
            reaction: null,
            node: {
                id: elem.id,
                tag: elem.tagName,
                index: $elem.index(),
                title: elem.title,
                parents: []
            }
        };

        $elem.parents().map(function () {
            reaction.node.parents.push({
                id: this.id, tag: this.tagName
            });
        });

        showReactionModal();
    });

    return plugin;
};

$.fn.domReactions.defaults = {
    trigger: {
        event: 'click',
        handler: function (evt) {
            return {'x': evt.pageX, 'y': evt.pageY};
        }
    },
    reactions: {//The list of reactions to display in the contextual menu
        like: {glyph: '\u{1F44D}', title: 'I like this'}, //every reaction has an Id (the key), a Glyph and a title
        laugh: {glyph: '\u{1F602}', title: 'This is funny'},
        angry: {glyph: '\u{1F620}', title: 'This makes me angry'}
    },
    commit: function (reaction) {
        console.log(reaction);
    }
};