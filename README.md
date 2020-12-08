# DOMReactions

This is a small JQuery library to capture reactions on any DOM node, giving the users the option to express themselves about any part of a website. It's also a powerful tool to collect metrics.

The `root` is the topmost element, indicated when the library is initialized. A `reaction` object is the result of the user's interaction (see below for more details).

This library is more a proof of concept than a stable component, so feel free to fork this repo, propose enhancements, or whatever. Have fun my friend!


## Usage

1. Click on any DOM node inside the root. A contextual menu will appear.
1. Select how do you want to react.


## Installation

1. Add the JQuery library, .js and .css file inside your HTML's head tag.
```html
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script
    <link href="path/to/domreactions.css" rel="stylesheet">
    <script src="path/to/domreactions.js"></script>
```
	
2. Initialize the component, adding the script before closing the `<body>` tag:

```javascript
<script>
$(selector).domReactions({
  reactions: { //The list of reactions to display in the contextual menu
    like:  {glyph: '\u{1F44D}', title: 'I like this'}, //every reaction has an Id (the key), a Glyph and a title
    laugh: {glyph: '\u{1F602}', title: 'This is funny'},
    angry: {glyph: '\u{1F620}', title: 'This makes me angry'}
  },
  commit: function(reaction) {
    $.post('://mysite.com/reactions', JSON.stringify(reaction));
  }
});
</script>
```

To get a full list of UNICODE emojis, visit https://unicode.org/emoji/charts/full-emoji-list.html .


## Options

```javascript
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
```

By default, this library reacts to the click event. However, you can customize it overriding the `trigger.event` and `trigger.handler` parameters.


## The reaction object

Once the raction is selected by the user, the `commit` event is triggered, which receives a `reaction` object:

```json
{ 
  "url": "https://mysite.com/arcticle/1345",
  "reaction": "like",
  "node": {
    "id": "ChosenDomNodeId",
    "tag": "img",
    "index": 3,
    "title": "Part of the node's inner text",
    "parents": [
      {
        "id": "FirstParentId",
        "tag": "div"
      },
      {
        "id": "SecondParentId",
        "tag": "body"
      },
    ]
  }
}
```

Node `id`, node `title` and parent's `id`s may be null when they're not set. Index is the ordinal of the node inside its parent.
