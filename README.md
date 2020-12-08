# DOMReactions
A small JS library to capture reactions on any DOM node.


## Usage

1. Do a long press on any DOM node. A contextual menu will appear.
1. Select how do you want to react.


## Installation

1. Add the .js and .css file in your HTML.
1. Initialize the component:

```javascript
$(selector).domReactions({
  reactions: { //The list of reactions to display in the contextual menu
    like:  {glyph: '\u{1F44D}', title: 'I like this'}, //every reaction has an Id (the key), a Glyph and a title
    laugh: {glyph: '\u{1F602}', title: 'This is funny'},
    angry: {glyph: '\u{1F620}', title: 'This makes me angry'}
  },
  commit: function(reaction) {
    $.post('://mysite.com/reactions', JSON.stringify(reaction));
  },
  extractLength: 50 //Optional. The length of the innerText captured.
});
```

To get a full list of UNICODE emojis, refer to https://unicode.org/emoji/charts/full-emoji-list.html .


## The reaction object

Once the raction is chosen, the `commit` event is triggered, which receives a `reaction` object:
```json
{ 
  "url": "https://mysite.com/arcticle/1345",
  "reaction": "like",
  "object": {
    "id": "ChosenDomNodeId",
    "element": "img",
    "index": 3,
    "extract": "Part of the node's inner text",
    "parents": [
      {
        "id": "FirstParentId",
        "element": "div"
      },
      {
        "id": "SecondParentId",
        "element": "body"
      },
    ]
  }
}
```

Object and parents ids may be null. Index is the ordinal of the node inside its parent.
