HTMLHint.addRule({
  id: 'grid-containment',
  description: 'A <div class="row"> tag can only contain columns',
  init: function(parser, reporter) {
      var self = this;
      var rowRegex = /\brow\b/i;
      var colRegex = /\bcol-(xs|sm|md|lg|xl)-(1[0-2]?|[1-9])\b/i;
      var stack = [];

      function isInRow() {
        return stack.length && stack[stack.length - 1].isRow;
      }

      function onTagStart(event) {
          var attrs = event.attrs;
          var attr;
          var attrName;
          var attrValue;
          var isRow = false;

          for(var i=0, l=attrs.length;i<l;i++) {
              attr = attrs[i];
              attrName = attr.name;
              attrValue = attr.value;

              if(attrName === 'class') {
                isRow = rowRegex.test(attrValue);
              }
          }

          if(!isRow && isInRow() && !colRegex.test(attrValue)) {
            reporter.warn('The <div class="row"> tag can only contain col-*-* classes.',
              event.line, event.col, self, event.raw);
          }

          stack.push({
            tagName: event.tagName,
            isRow: isRow,
            line: event.line,
            raw: event.raw
          });
      }

      function onTagEnd() {          
          stack.pop();
      }

      parser.addListener('tagstart', onTagStart);
      parser.addListener('tagend', onTagEnd);
  }
});
