HTMLHint.addRule({
  id: 'grid-containment',
  description: 'A <div class="row"> tag can only contain columns',
  init: function(parser, reporter) {
      var self = this;
      var isInRow = false;
      var rowRegex = /\brow\b/i;
      // xs sm md lg xl
      var colRegex = /\bcol-(xs|sm|md|lg|xl)-(1[0-2]?|[1-9])\b/i;

      function onTagStart(event) {
          var attrs = event.attrs;
          var attr;
          var attrName;
          var attrValue;

          for(var i=0, l=attrs.length;i<l;i++) {
              attr = attrs[i];
              attrName = attr.name;
              attrValue = attr.value;
              if(attrName === 'class') {
                if(rowRegex.test(attrValue)) {
                  // TODO this does not allow for nested rows
                  isInRow = true;
                }

                if(isInRow && !colRegex.test(attrValue)) {
                  reporter.warn('The <div class="row"> tag can only contain col-*-* classes.', event.line, event.col, self, event.raw);
                }
              }
          }
      }

      function onTagEnd() {
          isInRow = false;
      }

      parser.addListener('tagstart', onTagStart);
      parser.addListener('tagend', onTagEnd);
  }
});
